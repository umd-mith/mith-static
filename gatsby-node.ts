import type { Actions, CreatePagesArgs, GatsbyNode } from "gatsby";
import path from "path";

interface IMakePages {
  createPage: Actions["createPage"]
  graphql: CreatePagesArgs["graphql"]
}

type PeopleImage = NonNullable<Queries.PageEventQuery["allAirtablePeople"]["nodes"][number]["data"]>["headshot"]

export const createPages: GatsbyNode["createPages"] = async ({ actions: { createPage }, graphql }) => {

  const utils: IMakePages = {createPage, graphql};

  await makePeople(utils)
  await makePosts(utils)
  await makePostIndex(utils)
  await makeResearch(utils)
  await makeResearchIndex(utils)
  await makeEvents(utils)
  await makeEventIndex(utils)
  await makeDialogues(utils)
  await makeDialogueIndex(utils)
}

async function makePeople({createPage, graphql}: IMakePages) {
  const results = await graphql(`
    query PagePeople {
      allAirtablePeople(filter: {data: {group_type: {eq: "Staff"}}}) {
        nodes {
          data {
            name
            id
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    width: 500
                    height: 500
                    transformOptions: {fit: COVER}
                    quality: 100
                    backgroundColor: "rgba(255,255,255,0)"
                  )
                }
                publicURL
              }
            }
            bio {
              childMarkdownRemark {
                html
              }
            }
            title
            website
            twitter
            phone
            email
            bio_external
            research_interests
            people_groups {
              data {
                group_name
              }
            }
            new_id
          }
        }
      }
    }
  `)

  const {nodes} = (results.data as Queries.PagePeopleQuery).allAirtablePeople;

  for (const node of nodes) {
    const person = node.data
    createPage({
      path: `/people/${person?.id}/`,
      component: path.resolve(`./src/templates/person.tsx`),
      context: {
        ...person
      }
    })
  }
}

async function makePosts({createPage, graphql}: IMakePages) {
  const results = await graphql(`
    query PagePosts {
      allFile(filter: {sourceInstanceName: {eq: "news"}}) {
        nodes {
          childMarkdownRemark {
            html
            fileAbsolutePath
          }
        }
      }
    }
  `)

  const {nodes} = (results.data as Queries.PagePostsQuery).allFile;
  
  for (const _post of nodes) {
    const post = _post.childMarkdownRemark
    if (!post?.fileAbsolutePath) {
      console.error(`No markdown path for post.`)
    }
    const slug = path.basename(post?.fileAbsolutePath || "", '.md')
    createPage({
      path: `/news/${slug}/`,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        slug,
        ...post
      }
    })
  }
}

async function makePostIndex({createPage, graphql}: IMakePages) {
  console.log(`making post index`)
  const results = await graphql(`
    query PagePostIndex {
      allFile(filter: {sourceInstanceName: {eq: "news"}}) {
        pageInfo {
          itemCount
        }
      }
    }
  `)

  const numPosts = (results.data as Queries.PagePostIndexQuery).allFile.pageInfo.itemCount
  const postsPerPage = 25
  const numPages = Math.ceil(numPosts / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/news` : `/news/${i + 1}`,
      component: path.resolve("./src/templates/post-index.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeResearchIndex({createPage, graphql}: IMakePages) {
  const results = await graphql(`
    query PageResearchIndex {
      allAirtableResearchItems {
        pageInfo {
          itemCount
        }
      }
    }
  `)

  const numItems = (results.data as Queries.PageResearchIndexQuery).allAirtableResearchItems.pageInfo.itemCount
  const itemsPerPage = 30
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/research` : `/research/${i + 1}/`,
      component: path.resolve("./src/templates/research-index.tsx"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}

async function makeResearch({createPage, graphql}: IMakePages) {
  const results = await graphql(`
    query PageResearch {
      allAirtableResearchItems {
        nodes {
          data {
            id
            description {
              childMarkdownRemark {
                html
              }
            }
            excerpt {
              childMarkdownRemark {
                html
              }
            }
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(width: 1400, quality: 0, backgroundColor: "rgba(255,255,255,0)")
                }
              }
            }
            active
            title
            twitter_account
            year_end
            year_start
            month_start
            month_end
            linked_participants {
              data {
                name
                slug
                new_id
                group_type
                id
              }
            }
            linked_internal_participant_affiliations {
              data {
                title
                institution
                department
                end
                start
                person_name
                linked_person {
                  data {
                    id
                  }
                }
              }
            }
            linked_external_participant_affiliations {
                data {
                  department
                  end
                  institution
                  start
                  title
                  person_name
                  linked_person {
                    data {
                      id
                    }
                  }
              }
              id
            }
            linked_directors {
              data {
                name
                group_type
                slug
                new_id
                id
              }
            }
            linked_director_affiliations {
              data {
                title
                department
                institution
                start
                end
                linked_person {
                  data {
                    id
                  }
                }
              }
            }
            linked_links {
              data {
                type
                url
                title
              }
            }
            linked_sponsors {
              data {
                name
                website
                type
                slug
              }
            }
            linked_partners {
              data {
                name
                website
                type
                slug
              }
            }
            linked_events {
              data {
                id
                event_title
                talk_title
                talk_subtitle
                location
                event_type
                start_date
                end_date
              }
            }
            linked_posts {
              data {
                post_title
                author
                author_name
                post_date(formatString: "MMMM D, YYYY")
                slug
              }
            }
            disciplines {
              data {
                name
                method_or_discipline
              }
            }
            methods {
              data {
                name
                method_or_discipline
              }
            }
          }
        }
      }
    }
  `)

  for (const node of (results.data as Queries.PageResearchQuery).allAirtableResearchItems.nodes) {

    // These extended types are defined to accommodate the data merging below that brings together participants with their affiliations.
    // TODO: Can these types be simplified?
    type Affiliation = 
      NonNullable<NonNullable<Queries.PageResearchQuery["allAirtableResearchItems"]["nodes"][number]["data"]>["linked_internal_participant_affiliations"]>[number]
      | NonNullable<NonNullable<Queries.PageResearchQuery["allAirtableResearchItems"]["nodes"][number]["data"]>["linked_external_participant_affiliations"]>[number]
    type ExtendedLinkedParticipant = NonNullable<NonNullable<Queries.PageResearchQuery["allAirtableResearchItems"]["nodes"][number]["data"]>["linked_participants"]>[number] &{
      affiliations?: Affiliation[]
    }
    type ExtendedPageResearchQuery = Queries.PageResearchQuery["allAirtableResearchItems"]["nodes"][number]["data"] & {
      participants?: ExtendedLinkedParticipant[]
      directors?: ExtendedLinkedParticipant[]
    }

    const item = node.data as ExtendedPageResearchQuery

    if (item.linked_participants) {
      item.participants = item.linked_participants.map(p => {
        const new_p: ExtendedLinkedParticipant = Object.assign({}, p);
        const id = p?.data?.id

        if (p?.data?.group_type?.includes("Staff") || p?.data?.group_type?.includes("Past")) {
          // Lookup staff members in internal participants
          if (item.linked_internal_participant_affiliations) {
            for (const aff of item.linked_internal_participant_affiliations) {
              if (!aff?.data?.linked_person?.[0]) continue;
              if (aff?.data?.linked_person[0].data?.id === id) {
                if (new_p.affiliations) {
                  new_p.affiliations.push(aff)
                } else {
                  new_p.affiliations = [aff] 
                }
                break;
              }
            }
          }
        } else {
          // Lookup other people in external participants
          if (item.linked_external_participant_affiliations) {
            for (const aff of item.linked_external_participant_affiliations) {
              if (!aff?.data?.linked_person?.[0]?.data) continue;
              if (aff?.data?.linked_person[0].data?.id === id) {
                if (new_p.affiliations) {
                  new_p.affiliations.push(aff)
                } else {
                  new_p.affiliations = [aff] 
                }
                break;
              }
            }
          }
        }
        return new_p;
      })
    }
    if (item.linked_directors) {
      item.directors = item.linked_directors.map(p => {
        const new_p: ExtendedLinkedParticipant = Object.assign({}, p);
        const id = p?.data?.id
        if (item.linked_director_affiliations) {
          for (const aff of item.linked_director_affiliations) {
            if (!aff?.data?.linked_person?.[0]?.data) continue;
            if (aff.data.linked_person[0].data.id === id) {
              if (new_p.affiliations) {
                new_p.affiliations.push(aff as unknown as Affiliation)
              } else {
                new_p.affiliations = [aff as unknown as Affiliation] 
              }
              break;
            }
          }
        }
        return new_p;
      })
    }

    createPage({
      path: `/research/${item.id}/`,
      component: path.resolve(`./src/templates/research.tsx`),
      context: {
        ...item
      }
    })
  }
}


async function makeEventIndex({createPage, graphql}: IMakePages) {
  const results = await graphql(`
    query PageEventIndex {
      allAirtableEvents {
        pageInfo {
          itemCount
        }
      }
    }  
  `)


  const numItems = (results.data as Queries.PageEventIndexQuery).allAirtableEvents.pageInfo.itemCount
  const itemsPerPage = 30
  const numPages = Math.ceil(numItems / itemsPerPage)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/events/` : `/events/${i + 1}/`,
      component: path.resolve("./src/templates/event-index.tsx"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
}


async function makeEvents({createPage, graphql}: IMakePages) {
  const results = await graphql(`
    query PageEvent {
      allAirtableEvents {
        nodes {
          data {
            id
            description {
              childMarkdownRemark {
                html
              }
            }
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    width: 1400
                    quality: 100
                    backgroundColor: "rgba(255,255,255,0)"
                  )
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
              data {
                name
                slug
                new_id
                group_type
              }
            }
            sponsors {
              data {
                name
                website
                type
                slug
              }
            }
            partners {
              data {
                name
                website
                type
                slug
              }
            }
            disciplines {
              data {
                term: name
                type: method_or_discipline
              }
            }
            methods {
              data {
                term: name
                type: method_or_discipline
              }
            }
            speaker_affiliations {
              data {
                linked_person {
                  data {
                    id
                    slug
                  }
                }
                department
                institution
                title
              }
            }
            linked_participant_affiliations {
              data {
                linked_person {
                  data {
                    id
                  }
                }
                end
                institution
                department
                start
                title
                person_group
              }
            }
            linked_participants {
              data {
                id
              }
            }
            linked_links {
              data {
                title
                url
                type
              }
            }
            linked_research_item {
              data {
                id
                title
                image {
                  localFiles {
                    childImageSharp {
                      gatsbyImageData(
                        width: 1400
                        quality: 100
                        backgroundColor: "rgba(255,255,255,0)"
                      )
                    }
                    publicURL
                  }
                }
              }
            }
            linked_posts {
              data {
                author
                author_name
                post_date(formatString: "MMMM D, YYYY")
                slug
                record_id
                post_title
              }
            }
          }
        }
      }
      allAirtableIdentities(
        filter: {data: {person_bio: {childMarkdownRemark: {html: {ne: "null"}}}}}
      ) {
        nodes {
          data {
            slug
            linked_person {
              data {
                slug
                id
                bio {
                  childMarkdownRemark {
                    html
                  }
                }
              }
            }
          }
        }
      }
      allAirtablePeople(
        filter: {data: {events_as_speaker: {elemMatch: {data: {id: {ne: "null"}}}}}}
      ) {
        nodes {
          data {
            id
            new_id
            slug
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
      allAirtableResearchItems(
        filter: {data: {linked_events: {elemMatch: {data: {id: {ne: "null"}}}}, image: {localFiles: {elemMatch: {url: {ne: "null"}}}}}}
      ) {
        nodes {
          data {
            id
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  // These extended types are defined to accommodate the data merging below that brings together participants with their affiliations.
  // TODO: Can these types be simplified?
  type Affiliation = 
    NonNullable<NonNullable<Queries.PageEventQuery["allAirtableEvents"]["nodes"][number]["data"]>["linked_participant_affiliations"]>[number]
  type ExtendedLinkedParticipantEvent = NonNullable<NonNullable<Queries.PageEventQuery["allAirtableEvents"]["nodes"][number]["data"]>["linked_participants"]>[number] & {
    affiliations?: Affiliation[]
  }
  type ExtendedPageEventQuery = Queries.PageEventQuery["allAirtableEvents"]["nodes"][number]["data"] & {
    participants?: ExtendedLinkedParticipantEvent[]
    directors?: ExtendedLinkedParticipantEvent[]
  }

  for (const node of (results.data as Queries.PageEventQuery).allAirtableEvents.nodes) {
    const item = node.data as ExtendedPageEventQuery
    // Attach linked participant affiliations
    if (item.linked_participants) {
      item.participants = item.linked_participants.map(p => {
        const new_p: ExtendedLinkedParticipantEvent = Object.assign({}, p);
        const id = p?.data?.id
        // Lookup staff members in internal participants
        if (item.linked_participant_affiliations) {
          for (const aff of item.linked_participant_affiliations) {
            if (!aff?.data?.linked_person?.[0]) continue;
            if (aff.data.linked_person?.[0]?.data?.id === id) {
              if (new_p.affiliations) {
                new_p.affiliations.push(aff)
              } else {
                new_p.affiliations = [aff] 
              }
              break;
            }
          }
        }
        return new_p;
      })
    }

    type ExtendedSpeakerData = NonNullable<NonNullable<Queries.PageEventQuery["allAirtableEvents"]["nodes"][number]["data"]>["speakers"]>[number] & {
      headshot: PeopleImage
      bio: NonNullable<NonNullable<NonNullable<NonNullable<Queries.PageEventQuery["allAirtableIdentities"]["nodes"][number]["data"]>["linked_person"]>[number]>["data"]>["bio"]
    }

    // Attach headshot and speakers bio from people and identities table
    if (item.speakers) {
      item.speakers.forEach(sp => {
        (results.data as Queries.PageEventQuery).allAirtablePeople.nodes.map(_pers => {
          const pers = _pers.data
          if (pers?.slug === sp?.data?.slug) {
            if (pers?.headshot && sp?.data) {
              (sp.data as unknown as ExtendedSpeakerData).headshot = pers?.headshot
            }
          }
        });
        
        (results.data as Queries.PageEventQuery).allAirtableIdentities.nodes.map(_pers => {
          const pers = _pers.data
          if (pers?.linked_person?.[0]?.data?.slug === sp?.data?.slug) {
            if (pers?.linked_person?.[0]?.data?.bio && sp?.data) {
              (sp.data as unknown as ExtendedSpeakerData).bio = pers.linked_person[0].data.bio
            }
          }
        })
        // Lookup speaker affiliation
        // TODO: typing here is a little fudged.
        if (item.speaker_affiliations) {
          for (const aff of item.speaker_affiliations) {
            if (!aff?.data?.linked_person?.[0]?.data) continue;
            if (aff.data.linked_person[0].data.slug === sp?.data?.slug) {
              const spData = sp.data as unknown as ExtendedLinkedParticipantEvent
              if (spData.affiliations) {
                spData.affiliations.push(aff as Affiliation)
              } else {
                spData.affiliations = [aff as Affiliation] 
              }
              break;
            }
          }
        }
      })
    }

    type ExtendedResearchItem = NonNullable<Queries.PageEventQuery["allAirtableResearchItems"]["nodes"][number]["data"]> & {
      image?: PeopleImage
    }

    if (item.linked_research_item) {
      item.linked_research_item.forEach(ri => {
        (results.data as Queries.PageEventQuery).allAirtableResearchItems.nodes.map(_r => {
          const r = _r.data
          if (ri?.data?.id === r?.id && ri?.data && r) {
            (ri.data as unknown as ExtendedResearchItem).image = r.image
          }
        })
      })
    }
    createPage({
      path: `/events/${item.id}/`,
      component: path.resolve(`./src/templates/event.tsx`),
      context: {
        ...item
      }
    })
  }
}


async function makeDialogueIndex({createPage, graphql}: IMakePages) {
  const results = await graphql(`
    query PageDialogueIndex {
      allAirtableEvents {
        pageInfo {
          itemCount
        }
      }
      allAirtablePeople(
        filter: {data: {events_as_speaker: {elemMatch: {data: {id: {ne: "null"}}}}}}
      ) {
        nodes {
          data {
            slug
            new_id
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  const numItems = (results.data as Queries.PageDialogueIndexQuery).allAirtableEvents.pageInfo.itemCount
  const itemsPerPage = 10
  const numPages = Math.ceil(numItems / itemsPerPage)

  const peopleAccumulator: {[key: string]: PeopleImage | undefined} = {}

  const headshots = (results.data as Queries.PageDialogueIndexQuery).allAirtablePeople.nodes.reduce((people, node) => {   
    if (node?.data?.slug) {
      people[node.data.slug] = node.data.headshot ? node.data.headshot : undefined
    } 
    return people
  }, peopleAccumulator)

  Array.from({ length: numItems }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/digital-dialogues/` : `/digital-dialogues/${i + 1}/`,
      component: path.resolve("./src/templates/dialogue-index.tsx"),
      context: {
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        numPages,
        currentPage: i + 1,
        headshots
      }
    })
  })
}


async function makeDialogues({createPage, graphql}: IMakePages) {
  const results = await graphql(`
    query PageDialogue {
      allAirtableEvents(
        filter: {data: {event_type: {eq: "Digital Dialogue"}}}
        sort: {data: {start_date: DESC}}
      ) {
        nodes {
          data {
            id
            description {
              childMarkdownRemark {
                html
              }
            }
            image {
              localFiles {
                childImageSharp {
                  gatsbyImageData(
                    width: 1400
                    quality: 100
                    backgroundColor: "rgba(255,255,255,0)"
                  )
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
              data {
                name
                website
                twitter
                slug
                new_id
              }
            }
            linked_links {
              data {
                id
                title
                url
                type
              }
            }
            video_id: vimeo_id
            video_url: vimeo_url
            livestream: livestream_link
            sponsors {
              data {
                name
                website
                type
                slug
              }
            }
            partners {
              data {
                name
                website
                type
                slug
              }
            }
            disciplines {
              data {
                term: name
                type: method_or_discipline
              }
            }
            methods {
              data {
                term: name
                type: method_or_discipline
              }
            }
            speaker_affiliations {
              data {
                department
                institution
                title
                linked_person {
                  data {
                    bio {
                      childMarkdownRemark {
                        html
                      }
                    }
                    slug
                  }
                }
              }
            }
          }
        }
      }
      allAirtableIdentities(
        filter: {data: {person_bio: {childMarkdownRemark: {html: {ne: "null"}}}}}
      ) {
        nodes {
          data {
            slug
            linked_person {
              data {
                bio {
                  childMarkdownRemark {
                    html
                  }
                }
                slug
              }
            }
          }
        }
      }
      allAirtablePeople(
        filter: {data: {events_as_speaker: {elemMatch: {data: {id: {ne: "null"}}}}}}
      ) {
        nodes {
          data {
            slug
            new_id
            headshot {
              localFiles {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

type ExtendedSpeakerData = NonNullable<NonNullable<NonNullable<Queries.PageDialogueQuery["allAirtableEvents"]["nodes"][number]["data"]>["speakers"]>[number]> & {
  headshot: PeopleImage
  bio: NonNullable<NonNullable<NonNullable<NonNullable<Queries.PageDialogueQuery["allAirtableIdentities"]["nodes"][number]["data"]>["linked_person"]>[number]>["data"]>["bio"]
}

type Affiliation = 
    NonNullable<NonNullable<Queries.PageDialogueQuery["allAirtableEvents"]["nodes"][number]["data"]>["speaker_affiliations"]>[number]
type ExtendedSpeakers = NonNullable<NonNullable<Queries.PageDialogueQuery["allAirtableEvents"]["nodes"][number]["data"]>["speakers"]>[number] & {
  affiliations?: Affiliation[]
}

  for (const node of (results.data as Queries.PageDialogueQuery).allAirtableEvents.nodes) {
    const item = node.data
    if (item?.speakers) {
      // Attach headshot and speakers bio from people and identities table
      item.speakers.forEach(sp => {
        (results.data as Queries.PageDialogueQuery).allAirtablePeople.nodes.map(_pers => {
          const pers = _pers.data
          if (pers?.slug === sp?.data?.slug) {
            if (pers?.headshot && sp?.data) {
              (sp.data as unknown as ExtendedSpeakerData).headshot = pers?.headshot
            }
          }
        });
        (results.data as Queries.PageDialogueQuery).allAirtableIdentities.nodes.map(_pers => {
          const pers = _pers.data
          if (pers?.linked_person?.[0]?.data?.slug === sp?.data?.slug) {
            if (pers?.linked_person?.[0]?.data?.bio && sp?.data) {
              (sp.data as unknown as ExtendedSpeakerData).bio = pers.linked_person[0].data.bio
            }
          }
        })
        // Lookup speaker affiliation
        // TODO: typing here is a little fudged.
        if (item.speaker_affiliations) {
          for (const aff of item.speaker_affiliations) {
            if (!aff?.data?.linked_person?.[0]?.data) continue;
            if (aff.data.linked_person[0].data.slug === sp?.data?.slug) {
              const spData = sp.data as unknown as ExtendedSpeakers
              if (spData.affiliations) {
                spData.affiliations.push(aff as Affiliation)
              } else {
                spData.affiliations = [aff as Affiliation] 
              }
              break;
            }
          }
        }
        
      })
    }
    createPage({
      path: `/digital-dialogues/${item?.id}/`,
      component: path.resolve(`./src/templates/dialogue.tsx`),
      context: {
        ...item
      }
    })
  }
}
