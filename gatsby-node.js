const path = require('path')
const {createRemoteFileNode} = require('gatsby-source-filesystem')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makePeople(createPage, graphql, pathPrefix)
  await makePosts(createPage, graphql, pathPrefix)
  await makePostIndex(createPage, graphql, pathPrefix)
  await makeResearch(createPage, graphql, pathPrefix)
  await makeResearchIndex(createPage, graphql, pathPrefix)
  // await makeEvents(createPage, graphql, pathPrefix)
  await makeEventIndex(createPage, graphql, pathPrefix)
  // await makeDialogues(createPage, graphql, pathPrefix)
  // await makeDialogueIndex(createPage, graphql, pathPrefix)
}

async function makePeople(createPage, graphql) {
  const results = await graphql(`
    query PagePeopleQuery {
      allAirtablePeople(filter: {data: {group_type: {eq: "Staff"}}}) {
        nodes {
          data {
            name
            id
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    width: 500
                    height: 500
                    transformOptions: {fit: COVER}
                    quality: 100
                    backgroundColor: "rgba(255,255,255,0)"
                  )
                }
                publicURL
              }
            }
            bio {
              childMarkdownRemark {
                html
              }
            }
            title
            website
            twitter
            phone
            email
            bio_external
            research_interests
            people_groups {
              data {
                group_name
              }
            }
            new_id
          }
        }
      }
    }
  `)

  for (const node of results.data.allAirtablePeople.nodes) {
    const person = node.data
    // Simplify fields
    if (person.bio) {
      person.bio = person.bio.childMarkdownRemark.html
    }
    createPage({
      path: `/people/${person.id}/`,
      component: require.resolve(`./src/templates/person.js`),
      context: {
        ...person
      }
    })
  }
}

async function makePosts(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allFile(filter: {sourceInstanceName: {eq: "news"}}) {
        nodes {
          childMarkdownRemark {
            html
            fileAbsolutePath
          }
        }
      }
    }
  `)
  
  for (const _post of results.data.allFile.nodes) {
    const post = _post.childMarkdownRemark
    const slug = path.basename(post.fileAbsolutePath, '.md')
    createPage({
      path: `/news/${slug}/`,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        slug,
        ...post
      }
    })
  }
}

async function makePostIndex(createPage, graphql, pathPrefix) {
  console.log(`making post index`)
  const results = await graphql(`
    query {
      allFile(filter: {sourceInstanceName: {eq: "news"}}) {
        pageInfo {
          itemCount
        }
      }
    }
  `)

  const numPosts = results.data.allFile.pageInfo.itemCount
  const postsPerPage = 25
  const numPages = Math.ceil(numPosts / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/news` : `/news/${i + 1}`,
      component: path.resolve("./src/templates/post-index.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeResearchIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtableResearchItems {
        pageInfo {
          itemCount
        }
      }
    }
  `)

  const numItems = results.data.allAirtableResearchItems.pageInfo.itemCount
  const itemsPerPage = 30
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/research` : `/research/${i + 1}/`,
      component: path.resolve("./src/templates/research-index.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeResearch(createPage, graphql) {
  const results = await graphql(`
    query {
      allAirtableResearchItems {
        nodes {
          data {
            id
            description {
              childMarkdownRemark {
                html
              }
            }
            excerpt {
              childMarkdownRemark {
                html
              }
            }
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(width: 1400, quality: 0, backgroundColor: "rgba(255,255,255,0)")
                }
              }
            }
            active
            title
            twitter_account
            year_end
            year_start
            month_start
            month_end
            linked_participants {
              data {
                name
                slug
                new_id
                group_type
                id
              }
            }
            linked_internal_participant_affiliations {
              data {
                title
                institution
                department
                end
                start
                person_name
                linked_person {
                  data {
                    id
                  }
                }
              }
            }
            linked_external_participant_affiliations {
                data {
                  department
                  end
                  institution
                  start
                  title
                  person_name
                  linked_person {
                    data {
                      id
                    }
                  }
              	}
              id
            }
            linked_directors {
              data {
                name
                group_type
                slug
                new_id
                id
              }
            }
            linked_director_affiliations {
              data {
                title
                department
                institution
                start
                end
                linked_person {
                  data {
                    id
                  }
                }
              }
            }
            linked_links {
              data {
                type
                url
                title
              }
            }
            linked_sponsors {
              data {
                name
                website
                type
                slug
              }
            }
            linked_partners {
              data {
                name
                website
                type
                slug
              }
            }
            linked_events {
              data {
                id
                event_title
                talk_title
                talk_subtitle
                location
                event_type
                start_date
                end_date
              }
            }
            linked_posts {
              data {
                post_title
                author
                author_name
                post_date(formatString: "MMMM D, YYYY")
                slug
              }
            }
            disciplines {
              data {
                name
                method_or_discipline
              }
            }
            methods {
              data {
                name
                method_or_discipline
              }
            }
          }
        }
      }
    }
  `)

  for (const node of results.data.allAirtableResearchItems.nodes) {
    const item = node.data

    if (item.linked_participants) {
      item.participants = item.linked_participants.map(p => {
        const new_p = Object.assign({}, p);
        const id = p.data.id

        if (p.data.group_type.includes("Staff") || p.data.group_type.includes("Past")) {
          // Lookup staff members in internal participants
          if (item.linked_internal_participant_affiliations) {
            for (const aff of item.linked_internal_participant_affiliations) {
              if (!aff.data.linked_person[0]) continue;
              if (aff.data.linked_person[0].data.id === id) {
                if (new_p.data.affiliations) {
                  new_p.data.affiliations.push(aff)
                } else {
                  new_p.data.affiliations = [aff] 
                }
                break;
              }
            }
          }
        } else {
          // Lookup other people in external participants
          if (item.linked_external_participant_affiliations) {
            for (const aff of item.linked_external_participant_affiliations) {
              if (!aff.data.linked_person[0].data) continue;
              if (aff.data.linked_person[0].data.id === id) {
                if (new_p.data.affiliations) {
                  new_p.data.affiliations.push(aff)
                } else {
                  new_p.data.affiliations = [aff] 
                }
                break;
              }
            }
          }
        }
        return new_p;
      })
    }
    if (item.linked_directors) {
      item.directors = item.linked_directors.map(p => {
        const new_p = Object.assign({}, p);
        const id = p.data.id
        if (item.linked_director_affiliations) {
          for (const aff of item.linked_director_affiliations) {
            if (!aff.data.linked_person[0].data) continue;
            if (aff.data.linked_person[0].data.id === id) {
              if (new_p.data.affiliations) {
                new_p.data.affiliations.push(aff)
              } else {
                new_p.data.affiliations = [aff] 
              }
              break;
            }
          }
        }
        return new_p;
      })
    }

    createPage({
      path: `/research/${item.id}/`,
      component: require.resolve(`./src/templates/research.js`),
      context: {
        item
      }
    })
  }
}


async function makeEventIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtableEvents {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allAirtableEvents.pageInfo.itemCount
  const itemsPerPage = 30
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/events/` : `/events/${i + 1}/`,
      component: path.resolve("./src/templates/event-index.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}


async function makeEvents(createPage, graphql) {
  const results = await graphql(`
    query {
      allEventsJson {
        nodes {
          airtable_id
          fields {
            eventsDescription {
              childMarkdownRemark {
                html
              }
            }
            image {
              childImageSharp {
                gatsbyImageData(width: 1400, quality: 100, backgroundColor: "rgba(255,255,255,0)")
              }
            }
          }
          event_title
          talk_title
          talk_subtitle
          type: event_type
          start: start_date
          end: end_date
          location
          speakers {
            name
            affiliations {
              title
              department
              institution
            }
            person_group
            slug
            new_id
          }
          participants {
            name
            title
            department
            institution
            start
            end
            person_group
            slug
            new_id
          }
          links {
            title
            url
            type
          }
          sponsors {
            name
            website
            type
            slug
          }
          partners {
            name
            website
            type
            slug
          }
          research {
            id
            title
            image {
              url
            }
          }
          posts {
            post_title
            author
            author_name
            post_date(formatString: "MMMM D, YYYY")
            slug
          }
          disciplines {
            term: name
            type: method_or_discipline
          }
          methods {
            term: name
            type: method_or_discipline
          }
        }
      }
      allIdentitiesJson(
        filter: {
          person_bio: {ne: null}, 
          fields: {identitiesPerson_bio: {
            childMarkdownRemark: {html: {ne: ""} } 
          } }
        }
      ) {
        nodes {
          slug
          person_slug
          fields {
            identitiesPerson_bio {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
      allPeopleJson(
        filter: {
          events_as_speaker: {ne: null}
        }
      ) {
        nodes {
          slug
          fields {
            headshot {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
      allResearchJson(
        filter: {
          linked_events: {ne: null}, 
          image: {elemMatch: {url: {ne: null}}}
        }
      ) {
        nodes {
          id
          fields {
            image  {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }  
  `)

  for (const node of results.data.allEventsJson.nodes) {
    // Attach headshot and speakers bio from people and identities table
    node.speakers.forEach(sp => {
      results.data.allPeopleJson.nodes.map(pers => {
        if (pers.slug === sp.slug) {
          if (pers.fields) {
            sp.headshot = pers.fields.headshot
          }
        }
      })
      results.data.allIdentitiesJson.nodes.map(ident => {
        if (ident.person_slug === sp.slug) {
          if (ident.fields) {
            sp.bio = ident.fields.identitiesPerson_bio
          }
        }
      })
    })
    node.research.forEach(rr => {
      results.data.allResearchJson.nodes.map(research => {
        if (research.airtable_id === rr.airtable_id) {
          if (research.fields) {
            rr.image = research.fields.image
          }
        }
      })
    })
    createPage({
      path: `/events/${node.airtable_id}/`,
      component: require.resolve(`./src/templates/event.js`),
      context: {
        ...node
      }
    })
  }
}


async function makeDialogueIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allEventsJson {
        pageInfo {
          itemCount
        }
      }
      allPeopleJson(
        filter: {
          events_as_speaker: {ne: null}
        }
      ) {
        nodes {
          slug
          new_id
          fields {
            headshot {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  const numItems = results.data.allEventsJson.pageInfo.itemCount
  const itemsPerPage = 10
  const numPages = Math.ceil(numItems / itemsPerPage)

  const headshots = results.data.allPeopleJson.nodes.reduce((people, node) => {    
    people[node.slug] = node.fields ? node.fields.headshot : undefined
    return people
  }, {})

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/digital-dialogues/` : `/digital-dialogues/${i + 1}/`,
      component: path.resolve("./src/templates/dialogue-index.js"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1,
        headshots
      }
    })
  })
}


async function makeDialogues(createPage, graphql) {
  const results = await graphql(`
    query {
      allEventsJson(
        filter: {
          event_type: {eq: "Digital Dialogue"}
        }
        sort: {
          fields: [start_date], order: [DESC]
        }
      ) {
        nodes {
          airtable_id
          fields {
            eventsDescription {
              childMarkdownRemark {
                html
              }
            }
            image {
              childImageSharp {
                gatsbyImageData(width: 1400, quality: 100, backgroundColor: "rgba(255,255,255,0)")
              }
            }
          }
          event_title
          talk_title
          talk_subtitle
          type: event_type
          start: start_date
          end: end_date
          location
          speakers {
            name
            affiliations {
              title
              department
              institution
            }
            website
            twitter
            slug
            new_id
          }
          links {
            id
            title
            url
            type
          }
          video_id: vimeo_id
          video_url: vimeo_url
          livestream: livestream_link
          sponsors {
            name
            website
            type
            slug
          }
          partners {
            name
            website
            type
            slug
          }
          disciplines {
            term: name
            type: method_or_discipline
          }
          methods {
            term: name
            type: method_or_discipline
          }
        }
      }
      allIdentitiesJson(
        filter: {
          person_bio: {ne: null}, 
          fields: {identitiesPerson_bio: {childMarkdownRemark: {html: {ne: ""} } } }
        }
      ) {
        nodes {
          slug
          person_slug
          fields {
            identitiesPerson_bio {
              childMarkdownRemark {
                html
              }
            }
          }
        }
      }
      allPeopleJson(
        filter: {
          events_as_speaker: {ne: null}
        }
      ) {
        nodes {
          slug
          new_id
          fields {
            headshot {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  for (const node of results.data.allEventsJson.nodes) {
    // Attach headshot and speakers bio from people and identities table
    node.speakers.forEach(sp => {
      results.data.allPeopleJson.nodes.map(pers => {
        if (pers.slug === sp.slug) {
          if (pers.fields) {
            sp.headshot = pers.fields.headshot
          }
        }
      })
      results.data.allIdentitiesJson.nodes.map(pers => {
        //console.log(pers)
        if (pers.person_slug === sp.slug) {
          if (pers.fields) {
            sp.bio = pers.fields.identitiesPerson_bio
          }
        }
      })
    })
    createPage({
      path: `/digital-dialogues/${node.airtable_id}/`,
      component: require.resolve(`./src/templates/dialogue.js`),
      context: {
        ...node
      }
    })
  }
}
