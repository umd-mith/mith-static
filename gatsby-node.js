const path = require('path')
const {createRemoteFileNode} = require('gatsby-source-filesystem')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  // await makePeople(createPage, graphql, pathPrefix)
  // await makePosts(createPage, graphql, pathPrefix)
  // await makePostIndex(createPage, graphql, pathPrefix)
  // await makeResearch(createPage, graphql, pathPrefix)
  // await makeResearchIndex(createPage, graphql, pathPrefix)
  // await makeEvents(createPage, graphql, pathPrefix)
  // await makeEventIndex(createPage, graphql, pathPrefix)
  await makeDialogues(createPage, graphql, pathPrefix)
  await makeDialogueIndex(createPage, graphql, pathPrefix)
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
        ...item
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
      allAirtableEvents {
        nodes {
          data {
            id
            description {
              childMarkdownRemark {
                html
              }
            }
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    width: 1400
                    quality: 100
                    backgroundColor: "rgba(255,255,255,0)"
                  )
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
              data {
                name
                slug
                new_id
                group_type
              }
            }
            sponsors {
              data {
                name
                website
                type
                slug
              }
            }
            partners {
              data {
                name
                website
                type
                slug
              }
            }
            disciplines {
              data {
                term: name
                type: method_or_discipline
              }
            }
            methods {
              data {
                term: name
                type: method_or_discipline
              }
            }
            speaker_affiliations {
              data {
                linked_person {
                  data {
                    id
                    slug
                  }
                }
                department
                institution
                title
              }
            }
            linked_participant_affiliations {
              data {
                linked_person {
                  data {
                    id
                  }
                }
                end
                institution
                department
                start
                title
                person_group
              }
            }
            linked_participants {
              data {
                id
              }
            }
            linked_links {
              data {
                title
                url
                type
              }
            }
            linked_research_item {
              data {
                id
                title
                image {
                  localFiles {
                    childImageSharp {
                      gatsbyImageData(
                        width: 1400
                        quality: 100
                        backgroundColor: "rgba(255,255,255,0)"
                      )
                    }
                  }
                }
              }
            }
            linked_posts {
              data {
                author
                author_name
                post_date(formatString: "MMMM D, YYYY")
                slug
                record_id
                post_title
              }
            }
          }
        }
      }
      allAirtableIdentities(
        filter: {data: {person_bio: {childMarkdownRemark: {html: {ne: "null"}}}}}
      ) {
        nodes {
          data {
            slug
            linked_person {
              data {
                slug
                id
                bio {
                  childMarkdownRemark {
                    html
                  }
                }
              }
            }
          }
        }
      }
      allAirtablePeople(
        filter: {data: {events_as_speaker: {elemMatch: {data: {id: {ne: "null"}}}}}}
      ) {
        nodes {
          data {
            id
            new_id
            slug
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
      allAirtableResearchItems(
        filter: {data: {linked_events: {elemMatch: {data: {id: {ne: "null"}}}}, image: {localFiles: {elemMatch: {url: {ne: "null"}}}}}}
      ) {
        nodes {
          data {
            id
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  for (const node of results.data.allAirtableEvents.nodes) {
    const item = node.data
    // Attach linked participant affiliations
    if (item.linked_participants) {
      item.participants = item.linked_participants.map(p => {
        const new_p = Object.assign({}, p);
        const id = p.data.id
        // Lookup staff members in internal participants
        if (item.linked_participant_affiliations) {
          for (const aff of item.linked_participant_affiliations) {
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
        return new_p;
      })
    }

    // Attach headshot and speakers bio from people and identities table
    if (item.speakers) {
      item.speakers.forEach(sp => {
        results.data.allAirtablePeople.nodes.map(_pers => {
          const pers = _pers.data
          if (pers.slug === sp.data.slug) {
            if (pers.headshot) {
              sp.data.headshot = pers.headshot
            }
          }
        })
        results.data.allAirtableIdentities.nodes.map(_pers => {
          const pers = _pers.data
          if (pers.linked_person[0].data.slug === sp.data.slug) {
            if (pers.linked_person[0].data.bio) {
              sp.data.bio = pers.linked_person[0].data.bio
            }
          }
        })
        // Lookup speaker affiliation
        if (item.speaker_affiliations) {
          for (const aff of item.speaker_affiliations) {
            if (!aff.data.linked_person[0].data) continue;
            if (aff.data.linked_person[0].data.slug === sp.data.slug) {
              if (sp.data.affiliations) {
                sp.data.affiliations.push(aff)
              } else {
                sp.data.affiliations = [aff] 
              }
              break;
            }
          }
        }
      })
    }
    if (item.linked_research_item) {
      item.linked_research_item.forEach(ri => {
        results.data.allAirtableResearchItems.nodes.map(_r => {
          const r = _r.data
          if (ri.data.id === r.id) {
            ri.data.image = r.image
          }
        })
      })
    }
    createPage({
      path: `/events/${item.id}/`,
      component: require.resolve(`./src/templates/event.js`),
      context: {
        ...item
      }
    })
  }
}


async function makeDialogueIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtableEvents {
        pageInfo {
          itemCount
        }
      }
      allAirtablePeople(
        filter: {data: {events_as_speaker: {elemMatch: {data: {id: {ne: "null"}}}}}}
      ) {
        nodes {
          data {
            slug
            new_id
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  const numItems = results.data.allAirtableEvents.pageInfo.itemCount
  const itemsPerPage = 10
  const numPages = Math.ceil(numItems / itemsPerPage)

  const headshots = results.data.allAirtablePeople.nodes.reduce((people, node) => {    
    people[node.data.slug] = node.data.headshot ? node.data.headshot : undefined
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
      allAirtableEvents(
        filter: {data: {event_type: {eq: "Digital Dialogue"}}}
        sort: {data: {start_date: DESC}}
      ) {
        nodes {
          data {
            id
            description {
              childMarkdownRemark {
                html
              }
            }
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    width: 1400
                    quality: 100
                    backgroundColor: "rgba(255,255,255,0)"
                  )
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
              data {
                name
                website
                twitter
                slug
                new_id
              }
            }
            linked_links {
              data {
                id
                title
                url
                type
              }
            }
            video_id: vimeo_id
            video_url: vimeo_url
            livestream: livestream_link
            sponsors {
              data {
                name
                website
                type
                slug
              }
            }
            partners {
              data {
                name
                website
                type
                slug
              }
            }
            disciplines {
              data {
                term: name
                type: method_or_discipline
              }
            }
            methods {
              data {
                term: name
                type: method_or_discipline
              }
            }
            speaker_affiliations {
              data {
                department
                institution
                title
                linked_person {
                  data {
                    bio {
                      childMarkdownRemark {
                        html
                      }
                    }
                    slug
                  }
                }
              }
            }
          }
        }
      }
      allAirtableIdentities(
        filter: {data: {person_bio: {childMarkdownRemark: {html: {ne: "null"}}}}}
      ) {
        nodes {
          data {
            slug
            linked_person {
              data {
                bio {
                  childMarkdownRemark {
                    html
                  }
                }
                slug
              }
            }
          }
        }
      }
      allAirtablePeople(
        filter: {data: {events_as_speaker: {elemMatch: {data: {id: {ne: "null"}}}}}}
      ) {
        nodes {
          data {
            slug
            new_id
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  for (const node of results.data.allAirtableEvents.nodes) {
    const item = node.data
    if (item.speakers) {
      // Attach headshot and speakers bio from people and identities table
      item.speakers.forEach(sp => {
        results.data.allAirtablePeople.nodes.map(_pers => {
          const pers = _pers.data
          if (pers.slug === sp.data.slug) {
            if (pers.headshot) {
              sp.data.headshot = pers.headshot
            }
          }
        })
        results.data.allAirtableIdentities.nodes.map(_pers => {
          const pers = _pers.data
          if (pers.linked_person[0].data.slug === sp.data.slug) {
            if (pers.linked_person[0].data.bio) {
              sp.data.bio = pers.linked_person[0].data.bio
            }
          }
        })
        // Lookup speaker affiliation
        if (item.speaker_affiliations) {
          for (const aff of item.speaker_affiliations) {
            if (!aff.data.linked_person[0].data) continue;
            if (aff.data.linked_person[0].data.slug === sp.data.slug) {
              if (sp.data.affiliations) {
                sp.data.affiliations.push(aff)
              } else {
                sp.data.affiliations = [aff] 
              }
              break;
            }
          }
        }
      })
    }
    createPage({
      path: `/digital-dialogues/${item.id}/`,
      component: require.resolve(`./src/templates/dialogue.js`),
      context: {
        ...item
      }
    })
  }
}
