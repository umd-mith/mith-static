exports.createPages = async ({ actions: { createPage }, graphql, pathPrefix }) => {
  await makePeople(createPage, graphql, pathPrefix)
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
            dates
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