#!/usr/bin/env node

// This module contains some utilities for reshaping JSON from the Airtable API into 
// normalized JSON objects that we can persist to the application as static data.

require("dotenv").config()
const fs = require('fs')
const path = require('path')
const Airtable = require('airtable')

const at = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})

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
          // things.concat(records)
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
  const base = at.base(process.env.AIRTABLE_MITH_BASE_ID)
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

persistPeople()
