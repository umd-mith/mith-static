require("dotenv").config();

module.exports = {
  pathPrefix: `mith-static`,
  siteMetadata: {
    title: `MITH`,
    siteUrl: 'https://mith.umd.edu',
    description: `Maryland Institute for Technology in the Humanities`,
    author: `@UMD_MITH`,
    navLinks: [
      // {
      //   name: "What We Do",
      //   link: "/what-we-do/"
      // },
      // {
      //   name: "Opportunities For Students",
      //   link: "/students/"
      // },
      // {
      //   name: "Events",
      //   link: "/events/"
      // },
      {
        name: "News",
        link: "/news/"
      },
      {
        name: "People",
        link: "/people/"
      },
      // {
      //   name: "Partner With Us",
      //   link: "/partner-with-us/"
      // }
    ]
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-remark-source-name`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-24127640-1`
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: false,
        defaultQuality: 100,
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        name: `svg`,
        path: `${__dirname}/src/svg/`,
      }
    },    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `news`,
        path: `${__dirname}/src/news/`,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.AIRTABLE_PEOPLE_BASE_ID,
            tableName: `People`,
            tableLinks: [`staff_group`,`date_spans`],
            mapping: { headshot: `fileNode`, bio: 'text/markdown' },
            queryName: 'PeopleTable',
            createSeparateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: process.env.AIRTABLE_PEOPLE_BASE_ID,
            tableName: `Staff Groups`,
            queryName: 'StaffGroupsTable',
            tableLinks: [`linked_people`],
            createSeparateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: process.env.AIRTABLE_PEOPLE_BASE_ID,
            tableName: `Dates`,
            queryName: 'DatesTable',
            tableLinks: [`linked_people`],
            createSeparateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: process.env.AIRTABLE_POSTS_BASE_ID,
            tableName: `Posts`,
            queryName: 'PostsTable',
            createSeparateNodeType: true,
            separateMapType: true,
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            title: `MITH News`,
            output: `/news/feed.xml`,
            serialize: ({query: {site, allAirtable}}) => {
              return allAirtable.nodes.map(node => (
                {
                  url: site.siteMetadata.siteUrl + '/news/' + node.data.slug,
                  title: node.data.title,
                  date: node.data.date,
                }
              ))
            },
            query: `
              {
                allAirtable(
                  filter: {
                    table: {eq: "Posts"}
                    data: {DD_Post: {eq: null}, Event_Post: {eq: null}}
                  }
                  limit: 25
                  sort: {fields: data___post_date, order: DESC}
                ) {
                  nodes {
                    data {
                      slug
                      author: author_name
                      title: post_title
                      date: post_date
                    }
                  }
                }
              }
            `
          }
        ]
      }
    }
  ]
}
