require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `MITH`,
    description: `Maryland Institute for Technology in the Humanities`,
    author: `@UMD_MITH`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
        name: `img`,
        path: `${__dirname}/src/img/`,
      },
    },
		{
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        //icon: `src/img/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `People`,
            tableLinks: [`staff_group`,`date_spans`],
            queryName: 'PeopleTable',
            createSeparateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Staff Groups`,
            queryName: 'StaffGroupsTable',
            tableLinks: [`linked_people`],
            createSeparateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Dates`,
            queryName: 'DatesTable',
            tableLinks: [`linked_people`],
            createSeparateNodeType: true,
            separateMapType: true,
          }
        ]
      }
    }
  ],
}
