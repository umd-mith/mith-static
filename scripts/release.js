#!/usr/bin/env node

// This program is designed to be run from cron in order to 
// deploy new releases of mith-static to the production website.
// It looks for a candidate release in the Releases Airtable table.

const fs = require('fs')
const npm = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const dotenv = require('dotenv')
const request = require('request')
const winston = require('winston')
const Airtable = require('airtable')
const unzipper = require('unzipper')
const childProcess = require('child_process')

dotenv.config()
const appDir = path.resolve(__dirname, '..')
const log = createLogger()

async function main() {
  log.info('starting')

  const release = await getPendingRelease()
  if (! release) {
    log.info('no release, stopping')
    return
  }

  try {
    await setStarted(release)
    await checkout(release)
    await build(release)
    await publish(release)
    await cleanup(release)
    await setFinished(release)
  } catch(e) {
    log.error(e)
    console.error(e)
  }

  log.info('finished')
}

async function getPendingRelease() {
  const releases = getReleasesTable()
  const results = await releases.select({
    maxRecords: 1, 
    filterByFormula: "AND(id, date, initiator, description, tag, finished = '')",
    sort: [{field: 'date', direction: 'asc'}]
  }).firstPage()

  if (results.length == 0) {
    return null
  }

  const release = results[0]
  if (release.fields.started) {
    log.info(`release ${release.fields.id} already started`)
    return null
  }

  return release
}

async function setStarted(release) {
  const releases = getReleasesTable()
  releases.update(release.id, {started: new Date()})
  log.info(`started release for ${release.fields.id}`)
}

async function checkout(release) {
  const tag = release.fields.tag
  const releaseDir = getReleaseDir(release)

  if (fs.existsSync(releaseDir)) {
    throw `checked out directory already exists: ${releaseDir}`
  }

  fs.mkdirSync(releaseDir, {recursive: true})
  const url = `https://github.com/umd-mith/mith-static/archive/${release.fields.tag}.zip`
  await request(url).pipe(unzipper.Extract({path: releaseDir})).promise()
  log.info(`checked out ${tag} to ${releaseDir}`)
}

async function build(release) {
  const buildDir = getBuildDir(release)
  log.info(`building release in ${buildDir}`)
  await run('npm install', buildDir)
  await run('npm run build', buildDir)
  log.info(`built release ${release.fields.id}`)
}

async function publish(release) {
  const buildDir = getBuildDir()
  log.info(`publishing release in ${buildDir}`)
  await run('npm run rsync', buildDir)
  log.info(`published ${release.fields.id}`)
}

async function cleanup(release) {
  const releaseDir = getReleaseDir(release)
  fs.rmSync(releaseDir, {recursive: true})
  log.info(`cleaned up release dir: ${releaseDir}`)
}

async function setFinished(release) {
  const releases = getReleasesTable()
  releases.update(release.id, {finished: new Date()})
  log.info(`finished release ${release.fields.id}`)
}

function getReleasesTable() {
  const key = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_POSTS_BASE_ID
  if (!key || !baseId) {
    console.error('Make sure AIRTABLE_API_KEY and AIRTABLE_POSTS_BASE_ID are set')
    process.exit(1)
  }
  const base = new Airtable({apiKey: key}).base(baseId)
  return base('Releases')
}

function getReleaseDir(release) {
  return path.resolve(appDir, 'releases', release.fields.tag)
}

function getBuildDir(release) {
  const releaseDir = getReleaseDir(release)
  const files = fs.readdirSync(releaseDir)
  const buildDir = path.resolve(releaseDir, files[0])
  return buildDir
}

function createLogger() {
  const logPath = path.resolve(appDir, 'release.log')
  const fileLog = new winston.transports.File({filename: logPath, timestamp: true})
  const consoleLog = new winston.transports.Console()
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [fileLog]
  })
}

function run(cmd, buildDir) {
  return new Promise((resolve, reject) => {
  
    // commands should be run relative to the build directory
    const oldDir = process.cwd()
    process.chdir(buildDir)

    childProcess.exec(cmd, (error, stdout, stderr) => {
      process.chdir(oldDir)
      if (error) {
        reject(error)
      } else {
        resolve(stdout)
      }
    })

  })
}

main().catch(e => console.log(e))
