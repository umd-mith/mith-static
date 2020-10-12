const path = require('path')

exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makePeople(createPage, graphql, pathPrefix)
  await makePosts(createPage, graphql, pathPrefix)
  await makePostIndex(createPage, graphql, pathPrefix)
}

async function makePeople(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allAirtable(filter: {table: {eq: "People"}}) {
        nodes {
          data {
            id
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
              localFiles {
                childImageSharp {
                  fluid(maxWidth: 500, background: "rgba(255,255,255,0)" ) {
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
      allMarkdownRemark {
        nodes {
          frontmatter {
            author
            categories
            description
            image {
              publicURL
              relativePath
            }
            published(formatString: "MMMM D, YYYY")
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
    console.log(post)
    const slug = path.basename(path.dirname(post.fileAbsolutePath))
    // TEMPORARY:
    const author = post.frontmatter.author === 'trevormunoz' ? 'trevor-munoz' : post.frontmatter.author
    createPage({
      path: `/news/${slug}/`,
      component: require.resolve(`./src/templates/post.js`),
      context: {
        author,
        ...post
      }
    })
  }
}

async function makePostIndex(createPage, graphql, pathPrefix) {
  const results = await graphql(`
    query {
      allMarkdownRemark {
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
