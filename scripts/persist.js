#!/usr/bin/env node

// This module contains some utilities for reshaping JSON from the Airtable API into 
// normalized JSON objects that we can persist to the application as static data.

// We recommend running this script via a package manager (e.g. npm) using `npm run persist`
// You can persist a single table by passing its name as a parameter, e.g. `npm run persist -- people`

require("dotenv").config()
const fs = require('fs')
const path = require('path')
const Airtable = require('airtable')

const airtableKey = process.env.AIRTABLE_API_KEY
if (! airtableKey) {
  console.error('Please add AIRTABLE_API_KEY to your environment or .env file!')
  process.exit()
}
const at = new Airtable({apiKey: airtableKey})

function writeJson(o, filename) {
  const fullPath = path.resolve(__dirname, '../static/data/', filename)
  fs.writeFileSync(fullPath, JSON.stringify(o, null, 2) + '\n')
  console.log(`wrote ${fullPath}`)
}

function getDataFor(base, table) {
  return new Promise((resolve, reject) => {
    const things = {}
    base(table).select()
      .eachPage(
        async (records, nextPage) => {
          for (const r of records) {
            things[r.id] = r
          }
          nextPage()
        },
        (error) => {
          if (error) {
            console.log(`error while fetching from ${table}: ${error}`)
            reject(error)
          } else {
            resolve(things)
          }
        }
      )
  })
}

async function persistPeople() {

  const baseId = process.env.AIRTABLE_MITH_BASE_ID
  if (! baseId) {
    console.error('Please add AIRTABLE_MITH_BASE_ID to your environment or .env file!')
    return
  }
  const base = at.base(baseId)

  try {
    const people = await getDataFor(base, 'People')
    const groups = await getDataFor(base, 'Groups')

    const staff = []

    for (const persId in people) {
      const person = people[persId]

      const persGroups = person.get('people groups')
      if (!persGroups) continue
      const resolvedGroups = persGroups.map(groupId => {
        return groups[groupId].get('type')
      })

      const persInfo = person.fields
      persInfo['people groups'] = resolvedGroups
      staff.push(persInfo)
    }

    writeJson(staff, 'people.json')
  } catch(e) {
    throw new Error(e)
  }
}

async function persistPosts() {
  const base = at.base(process.env.AIRTABLE_POSTS_BASE_ID)
  try {
    const postsData = await getDataFor(base, 'Posts')

    const posts = []

    for (const postId in postsData) {
      const post = postsData[postId]

      const postInfo = post.fields
      posts.push(postInfo)
    }

    writeJson(posts, 'posts.json')
  } catch(e) {
    throw new Error(e)
  }
}

async function persistResearch() {
  const base = at.base(process.env.AIRTABLE_MITH_BASE_ID)
  try {
    const researchItems = await getDataFor(base, 'Research')
    const people = await getDataFor(base, 'People')
    const identities = await getDataFor(base, 'Identities')

    const research = []

    for (const researchItemId in researchItems) {
      const researchItem = researchItems[researchItemId]

      const intParticipants = (researchItem.get('linked internal participant affiliations') || []).map(
        idId => identities[idId].fields
      )

      const extParticipants = (researchItem.get('linked external participant affiliations') || []).map(
        idId => identities[idId].fields
      )

      for (participant of intParticipants.concat(extParticipants)) {
        participant['linked person']
        const person = people[participant['linked person'][0]]
        if (!person) continue
        participant.name = person.get('name')
      }

      researchItem.fields.participants = intParticipants

      research.push(researchItem.fields)
    }

    writeJson(research, 'research.json')
  } catch(e) {
    throw new Error(e)
  }
}

async function persist() {
  await persistPeople()
  await persistPosts()
  await persistResearch()
}

switch (process.argv[2]) {
  case 'people':
    persistPeople()
    break
  case 'posts':
    persistPosts()
    break
  case 'research':
    persistResearch()
    break
  default:
    persist()
}
