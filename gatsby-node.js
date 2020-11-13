const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makePeople(createPage, graphql, pathPrefix)
  await makePosts(createPage, graphql, pathPrefix)
  await makePostIndex(createPage, graphql, pathPrefix)
  await makeResearch(createPage, graphql, pathPrefix)
  await makeResearchIndex(createPage, graphql, pathPrefix)
  await makeEvents(createPage, graphql, pathPrefix)
  // await makeEventIndex(createPage, graphql, pathPrefix)
}

async function makePeople(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtable(filter: {table: {eq: "People"}}) {
        nodes {
          data {
            new_id
            bio {
              childMarkdownRemark {
                html
              }
            }
            website
            twitter
            title
            staff_group {
              data {
                group_name
              }
            }
            research_interests
            phone
            name
            links
            email
            date_spans {
              data {
                date_span
              }
            }
            bio_external
            slug
            headshot {
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 500, maxHeight:500, fit: COVER, background: "rgba(255,255,255,0)" ) {
                    src
                    srcSet
                    aspectRatio
                    sizes
                    base64
                  }
                }
              }
            }
          }
        }
      }
    }  
  `)

  for (const node of results.data.allAirtable.nodes) {
    const person = node.data
    createPage({
      path: `/people/${person.slug}/`,
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
      allMarkdownRemark(filter: {fields: {sourceName: {eq: "news"}}}) {
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
      allMarkdownRemark(filter: {fields: {sourceName: {eq: "news"}}}) {
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
      allAirtable(filter: {table: {eq: "Projects"}}) {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allAirtable.pageInfo.itemCount
  const itemsPerPage = 25
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/research` : `/research/${i + 1}`,
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

async function makeResearch(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtable(
        filter: {table: {eq: "Projects"}}
      ) {
        nodes {
          data {
            title
            slug
            description_excerpt
            year_start
            month_start
            year_end
            month_end
            project_directors
            participants
            active
          }
        }
      }
    }  
  `)

  for (const node of results.data.allAirtable.nodes) {
    const item = node.data
    createPage({
      path: `/research/${item.slug}/`,
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
      allAirtable(filter: {table: {eq: "Events"}}) {
        pageInfo {
          itemCount
        }
      }
    }  
  `)

  const numItems = results.data.allAirtable.pageInfo.itemCount
  const itemsPerPage = 25
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/research` : `/research/${i + 1}`,
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
      allAirtable(
        filter: {table: {eq: "Events"}}
      ) {
        nodes {
          data {
            id
            slug
            title
            description
          }
        }
      }
    }  
  `)

  for (const node of results.data.allAirtable.nodes) {
    const event = node.data
    createPage({
      path: `/events/${item.slug}/`,
      component: require.resolve(`./src/templates/event.js`),
      context: {
        ...event
      }
    })
  }
}