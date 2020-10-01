const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makePeople(createPage, graphql, pathPrefix)
  await makeNews(createPage, graphql, pathPrefix)
}

async function makePeople(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtable(filter: {table: {eq: "People"}}) {
        nodes {
          data {
            id
            bio
            website
            twitter
            title
            staff_group {
              data {
                group_name
              }
            }
            research_interests
            record_id
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
              thumbnails {
                large {
                  url
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

async function makeNews(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            categories
            description
            image
            published
            redirect_from
            title
            type
          }
          html
          fileAbsolutePath
          timeToRead
        }
      }
    }
  `)
  for (const post of results.data.allMarkdownRemark.nodes) {
    const slug = path.basename(path.dirname(post.fileAbsolutePath))
    createPage({
      path: `/news/${slug}/`,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        ...post
      }
    })
  }
}
