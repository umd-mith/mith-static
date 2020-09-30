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
    `gatsby-transformer-remark`,
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
            tableLinks: ['staff_group'],
            queryName: 'PeopleTable',
            createSeparateNodeType: true,
            separateMapType: true,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Staff Groups`,
            queryName: 'StaffGroupsTable',
            tableLinks: ['linked_people'],
            createSeparateNodeType: true,
            separateMapType: true,
          }
        ]
      }
    }
  ],
}
