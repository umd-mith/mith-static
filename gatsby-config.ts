import "dotenv/config";
import type { GatsbyConfig } from "gatsby";


const baseId = process.env.AIRTABLE_MITH_BASE_ID;
const basePath = process.env.BASEPATH

const config: GatsbyConfig = {
  pathPrefix: basePath,
  graphqlTypegen: true,
  siteMetadata: {
    title: `MITH`,
    siteUrl: "https://mith.umd.edu",
    description: `Maryland Institute for Technology in the Humanities`,
    author: `@UMD_MITH`,
    navLinks: [
      /*
      {
        name: "What We Do",
        link: "/what-we-do/"
      },
      {
        name: "Opportunities For Students",
        link: "/students/"
      },
      */
      {
        name: "Our Values",
        link: "/values/",
      },
      {
        name: "News",
        link: "/news/",
      },
      {
        name: "People",
        link: "/people/",
      },
      {
        name: "Research",
        link: "/research/",
      },
      {
        name: "Digital Dialogues",
        link: "/digital-dialogues/",
      },
      {
        name: "More Events",
        link: "/events/",
      },
      /*
      {
        name: "Partner With Us",
        link: "/partner-with-us/"
      }
      */
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `./static/data/`,
    //   },
    // },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_TOKEN,
        concurrency: 5, // default, see using markdown and attachments for more information
        tables: [
          {
            baseId,
            tableName: `Research`,
            tableView: `All Research Items`,
            queryName: `ResearchItems`,
            separateNodeType: true,
            mapping: { 
              image: `fileNode`,
              description: `text/markdown`,
              excerpt: `text/markdown`,
            },
            tableLinks: [
              `linked_directors`,
              `linked_director_affiliations`,
              `linked_participants`,
              `linked_internal_participant_affiliations`,
              `linked_external_participant_affiliations`,
              `linked_people_featured_research`,
              `topics`,
              `methods`,
              `disciplines`,
              `tags`,
              `research_types`,
              `linked_links`,
              `linked_partners`,
              `linked_sponsors`,
              `linked_posts`,
              `linked_events`,
              `related_research`
            ]
          },
          {
            baseId,
            tableName: `Events`,
            tableView: `All Events`,
            queryName: `Events`,
            separateNodeType: true,
            mapping: { 
              excerpt: `text/markdown`,
              description: `text/markdown`,
              image: `fileNode`
            },
            tableLinks: [
              `linked_research_item`,
              `speakers`,
              `speaker_affiliations`,
              `linked_participants`,
              `linked_participant_affiliations`,
              `partners`,
              `sponsors`,
              `linked_links`,
              `linked_posts`,
              `topics`,
              `methods`,
              `disciplines`,
              `tags`,
              `event_types`
            ]
          },
          {
            baseId,
            tableName: `Links`,
            tableView: `All Links`,
            queryName: `Links`,
            separateNodeType: true,
            tableLinks: [
              `linked_research_items`,
              `linked_events`
            ]
          },
          {
            baseId,
            tableName: `Partners_Sponsors`,
            tableView: `All Partners & Sponsors`,
            queryName: `PartnersSponsors`,
            separateNodeType: true,
            mapping: { 
              logo: `fileNode`,
            },
            tableLinks: [
              `linked_research_items_as_partner`,
              `linked_events_as_partner`,
              `linked_research_items_as_sponsor`,
              `linked_events_as_sponsor`
            ]
          },
          {
            baseId,
            tableName: `People`,
            tableView: `All People`,
            queryName: `People`, // optionally default is false - makes all records in this table a separate node type, based on your tableView, or if not present, tableName, e.g. a table called "Fruit" would become "allAirtableFruit". Useful when pulling many airtables with similar structures or fields that have different types. See https://github.com/jbolda/gatsby-source-airtable/pull/52.
            mapping: { 
              headshot: `fileNode`,
              bio: `text/markdown`,
            }, // optional, e.g. "text/markdown", "fileNode"
            tableLinks: [
              `linked_identities`,
              `identities_as_current`,
              `people_groups`,
              `linked_featured_research`,
              `linked_research_as_participant`,
              `events_as_participant`,
              `events_as_speaker`
            ], // optional, for deep linking to records across tables.
            separateNodeType: true, // boolean, default is false, see the documentation on naming conflicts for more information
            // separateMapType: false, // boolean, default is false, see the documentation on using markdown and attachments for more information
          },
          {
            baseId,
            tableName: `Identities`,
            tableView: `All Identities`,
            queryName: `Identities`,
            separateNodeType: true,
            mapping: { 
              linked_person_bio: `text/markdown`,
              person_bio: `text/markdown`,
            },
            tableLinks: [
              `linked_person`,
              `group`,
              `linked_people_as_current`,
              `linked_research_as_director`,
              `linked_research_as_internal`,
              `linked_research_as_external`,
              `linked_events_as_speaker`,
              `linked_events_as_participant`
            ]
          },
          {
            baseId,
            tableName: `Groups`,
            tableView: `All Groups`,
            queryName: `Groups`,
            separateNodeType: true,
            tableLinks: [
              `linked_people`,
              `linked_affiliations`
            ]
          },
          {
            baseId,
            tableName: `Topics`,
            tableView: `All Topics`,
            queryName: `Topics`,
            separateNodeType: true,
            tableLinks: [
              `linked_research`,
              `linked_events`,
              `linked_people`,
              `disciplines`,
              `methods`
            ]
          },
          {
            baseId,
            tableName: `Tags`,
            tableView: `All Tags`,
            queryName: `Tags`,
            separateNodeType: true,
            tableLinks: [
              `linked_research`,
              `linked_events`
            ]
          },
          {
            baseId,
            tableName: `Types`,
            tableView: `All Research Types`,
            queryName: `ResearchTypes`,
            separateNodeType: true,
            tableLinks: [
              `linked_research`,
              `linked_events`
            ]
          },
          {
            baseId,
            tableName: `Posts`,
            tableView: `All Posts`,
            queryName: `Posts`,
            separateNodeType: true,
            tableLinks: [
              `linked_research`,
              `linked_events`,
              `methods`,
              `disciplines`
            ]
          },
          {
            baseId,
            tableName: `Taxonomy`,
            tableView: `Taxonomies`,
            queryName: `Taxonomies`,
            separateNodeType: true,
            tableLinks: [
              `linked_research_methods`,
              `linked_research_disciplines`,
              `linked_events_methods`,
              `linked_events_disciplines`,
              `linked_posts_methods`,
              `linked_posts_disciplines`
            ]
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `mith.umd.edu`,
        excludePaths: ["/mith-static/*"]
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-24127640-1`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: false,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        name: `svg`,
        path: `${__dirname}/src/svg/`,
      },
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
            },
          },
        ],
        pedantic: false
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                siteUrl
                description
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          /*
          {
            title: `MITH News`,
            output: `/news/feed.xml`,
            serialize: ({query: {site, allAirtable}}) => {
              return allAirtable.nodes.map(node => (
                {
                  url: site.siteMetadata.siteUrl + '/news/' + node.data.slug + '/',
                  title: node.data.title,
                  date: node.data.date,
                  description: node.data.description ? node.data.description.childMarkdownRemark.excerpt : ''
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
                      description {
                        childMarkdownRemark {
                          excerpt
                        }
                      }
                    }
                  }
                }
              }
            `
          },
          {
            title: `MITH Events`,
            output: `/events/feed.xml`,
            serialize: ({query: {site, allAirtable}}) => {
              return allAirtable.nodes.map(node => (
                {
                  url: site.siteMetadata.siteUrl + '/events/' + node.data.slug + '/',
                  title: node.data.talk_title || node.data.event_title,
                  date: node.data.start_date,
                  description: node.data.description ? node.data.description.childMarkdownRemark.excerpt : ''
                }
              ))
            },
            query: `
              {
                allAirtable(
                  filter: {
                    table: {eq: "Events"}
                  }
                  limit: 25
                  sort: {fields: data___start_date, order: DESC}
                ) {
                  nodes {
                    data {
                      slug
                      event_title
                      talk_title
                      start_date
                      description {
                        childMarkdownRemark {
                          excerpt
                        }
                      }
                    }
                  }
                }
              }
            `
          }*/
        ],
      },
    },
  ],
}

export default config;