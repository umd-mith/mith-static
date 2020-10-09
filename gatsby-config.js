require("dotenv").config();

module.exports = {
  pathPrefix: `mith-static`,
  siteMetadata: {
    title: `MITH`,
    description: `Maryland Institute for Technology in the Humanities`,
    author: `@UMD_MITH`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: false,
        defaultQuality: 100,
        background: `rgba(255,255,255,0)`
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
            mapping: { headshot: `fileNode` },
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
          }
        ]
      }
    },
  ]
}
