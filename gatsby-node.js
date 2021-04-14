const path = require('path')
const {createRemoteFileNode} = require('gatsby-source-filesystem')

// When creating nodes, set the following fields with a markdown mediaType.
const toMarkdown = {
  'People' : ['bio'],
  'Research' : ['description', 'excerpt'],
  //'Events' : ['description']
}

// When creating nodes, set the following fields with an Image type.
const toImage = {
  'People' : ['headshot'],
  'Research' : ['image'],
  'Events' : ['image'],
}

exports.onCreateNode = async ({
    node, actions, store, cache, createContentDigest, createNodeId
  }) => {

  const { createNode, createNodeField } = actions

  for (const table in toImage) {
    if (node.internal.type === `${table}Json`) {
      for (const key of toImage[table]) {
        if (node[key]) {
          let fileNode
          try {
            fileNode = await createRemoteFileNode({
              url: node[key][0].url,
              store,
              cache,
              createNode,
              createNodeId,
            });
          } catch (e) {
            console.error('Error downloading image:', e);
          }
      
          if (fileNode) {
            createNodeField({
              node,
              name: `${key}___NODE`,
              value: fileNode.id,
            })
          }
        }
      }
    }
  }

  for (const table in toMarkdown) {
    if (node.internal.type === `${table}Json`) {
      for (const key of toMarkdown[table]) {
        if (node[key]) {
          const capKey = key.charAt(0).toUpperCase() + key.slice(1)
          const textNode = {
            id: `${node.id}-Markdown${capKey}`,
            parent: node.id,
            dir: path.resolve("./"),
            internal: {
              type: `${node.internal.type}Markdown${capKey}`,
              mediaType: "text/markdown",
              content: node[key],
              contentDigest: createContentDigest(node[key])
            }
          }
          createNode(textNode)
      
          // Create markdownBio___NODE field
          createNodeField({
            node,
            name: `markdown${capKey}___NODE`,
            value: textNode.id,
          })
        }
      }
    }
  }

}

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makePeople(createPage, graphql, pathPrefix)
  await makePosts(createPage, graphql, pathPrefix)
  await makePostIndex(createPage, graphql, pathPrefix)
  await makeResearch(createPage, graphql, pathPrefix)
  await makeResearchIndex(createPage, graphql, pathPrefix)
  await makeEvents(createPage, graphql, pathPrefix)
  //await makeEventIndex(createPage, graphql, pathPrefix)
}

async function makePeople(createPage, graphql) {
  const results = await graphql(`
    query {
      allPeopleJson(filter: {group_type: {eq: "Staff"}}) {
        nodes {
          fields {
            markdownBio {
              childMarkdownRemark {
                html
              }
            }
            headshot {
              childImageSharp {
                fluid(maxWidth: 500, maxHeight: 500, fit: COVER, srcSetBreakpoints: [200, 250, 500], quality: 100, background: "rgba(255,255,255,0)") {
                  src
                  srcSet
                  aspectRatio
                  sizes
                  base64
                }
              }
              publicURL
            }
          }
          website
          twitter
          title
          people_groups
          research_interests
          phone
          name
          email
          bio_external
          id
        }
      }
    }  
  `)

  for (const node of results.data.allPeopleJson.nodes) {
    const person = node
    // Simplify fields
    if (person.fields) {
      person.bio = person.fields.markdownBio ? person.fields.markdownBio.childMarkdownRemark.html : person.bio
      if (person.fields.headshot) {
        person.headshot = person.fields.headshot.childImageSharp ? person.fields.headshot.childImageSharp.fluid : person.fields.headshot.publicURL
      }
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
      allMarkdownRemark(
        filter: {
          fields: {sourceName: {eq: "news"}}
        }
      ) {
        nodes {
          fileAbsolutePath
          html
        }
      }
    }
  `)
  
  for (const post of results.data.allMarkdownRemark.nodes) {
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
  const results = await graphql(`
    query {
      allMarkdownRemark(
        filter: {
          fields: {sourceName: {eq: "news"}}
        }
      ) {
        pageInfo {
          itemCount
        }
      }
    }
  `)

  const numPosts = results.data.allMarkdownRemark.pageInfo.itemCount
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
      allResearchJson {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allResearchJson.pageInfo.itemCount
  const itemsPerPage = 25
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
      allResearchJson {
        nodes {
          id
          fields {
            markdownDescription {
              childMarkdownRemark {
                html
              }
            }
            markdownExcerpt {
              childMarkdownRemark {
                html
              }
            }
            image {
              childImageSharp {
                fluid(maxWidth:1400, srcSetBreakpoints: [1400], quality: 100, background: "rgba(255,255,255,0)") {
                  src
                  srcSet
                  aspectRatio
                  sizes
                  base64
                }
              }
            }
          }
          active
          title
          twitter_account
          twitter_hashtag
          year_start
          month_start
          year_end
          month_end
          participants {
            name
            title
            department
            institution
            start
            end
            person_group
            slug
          }
          directors {
            name
            title
            department
            institution
            start
            end
            person_group
            slug
          }
          links {
            title
            url
          }
          sponsors {
            name
            website
            slug
          }
          partners {
            name
            website
            slug
          }
          events {
            id
            event_title
            talk_title
            talk_subtitle
            type: event_type
            start: start_date
            end: end_date
            location
          }
        }
      } 
    }
  `)

  for (const node of results.data.allResearchJson.nodes) {
    const item = node
    createPage({
      path: `/research/${item.id}/`,
      component: require.resolve(`./src/templates/research.js`),
      context: {
        ...item
      }
    })
  }
}

/*
async function makeEventIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allEventsJson(
        filter: {
          table: {eq: "Events"}
        }
      ) {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allEventsJson.pageInfo.itemCount
  const itemsPerPage = 25
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
*/

async function makeEvents(createPage, graphql) {
  const results = await graphql(`
    query {
      allEventsJson {
        nodes {
          id
          fields {
            image {
              childImageSharp {
                fluid(maxWidth:1400, srcSetBreakpoints: [1400], quality: 100, background: "rgba(255,255,255,0)") {
                  src
                  srcSet
                  aspectRatio
                  sizes
                  base64
                }
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
            title
            department
            institution
            start
            end
            person_group
            slug
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
          }
        }
      }
    }  
  `)

  for (const node of results.data.allEventsJson.nodes) {
    const item = node
    createPage({
      path: `/events/${item.id}/`,
      component: require.resolve(`./src/templates/event.js`),
      context: {
        ...item
      }
    })
  }
}

