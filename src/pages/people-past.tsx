import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "./people.css"

interface PeoplePastProps {
  data: Queries.PeoplePastQuery
}

type Person = NonNullable<
  Queries.PeoplePastQuery["people"]["group"][number]["nodes"][number]["data"]
>

type LinkedIdentity = NonNullable<Person["linked_identities"]>[number]

type MutablePerson = {
  -readonly [P in keyof Person]: Person[P];
};

const PeoplePastPage = ({ data }: PeoplePastProps) => {
  function makePerson(person: Person) {
    let identities = (person.linked_identities || []).filter(
      i => i?.data?.start,
    )
    return (
      <article
        className="person"
        id={person.new_id?.toString() || ""}
        title={person.name || ""}
        key={`p-${person.new_id}`}
      >
        <h3 className="name">{person.name}</h3>
        <div className="details">
          {identities
            .sort((a, b) => a!.data!.start! - b!.data!.start!)
            .map(identity => {
              const end =
                identity?.data?.start === identity?.data?.end ? (
                  ""
                ) : (
                  <span className="end">{identity?.data?.end}</span>
                )
              return (
                <article
                  className="identity"
                  id={identity?.data?.id?.toString() || ""}
                  key={`i-${identity?.data?.id || ""}`}
                >
                  <span className="title">{identity?.data?.title}</span>
                  <span className="date-span">
                    <span className="start">{identity?.data?.start}</span>
                    {end}
                  </span>
                </article>
              )
            })}
        </div>
      </article>
    )
  }

  const handlePeople = (people: readonly { data: Person | null}[]): JSX.Element[] => {
    
    // dedupe identities
    const filteredPeople: {data: MutablePerson}[] = people.map((p: {data: Person | null}) => {
      const seen = new Set();
      const filteredIdentities = p.data?.linked_identities?.filter((identity: LinkedIdentity) => {
        const data = identity!.data!
        const identifier = `${data.title}-${data.start}-${data.end}`;
        if (seen.has(identifier)) {
          return false;
        } else {
          if (data.end && data.start) {
            seen.add(identifier);
            return true;
          }
          return false;
        }
      }) ?? [];

      // Sort them by end date
      filteredIdentities.sort((a, b) => b!.data!.end! - a!.data!.end!)

      const mutablePerson: MutablePerson = { ...p.data! } as MutablePerson;
      mutablePerson.linked_identities = filteredIdentities;
      return { data: mutablePerson };
    })

    // sort by end date
    filteredPeople.sort((a, b) => {
      const aMaxEnd = Math.max(...a!.data.linked_identities!.map(identity => identity!.data!.end || 0));
      const bMaxEnd = Math.max(...b!.data.linked_identities!.map(identity => identity!.data!.end || 0));
      return bMaxEnd - aMaxEnd;
    })
    
    console.log(filteredPeople)
    return filteredPeople.map(p => {
      return makePerson(p.data!)
    })
  }

  return (
    <Layout>
      <SEO title="Past People" />
      <div className="page-past-people">
        <section className="leader hidden">
          <h1 className="page-title text-hidden">Past People</h1>
        </section>
        {
          // Sort the people groups in the order specified by the `sort` field in the `allAirtableGroups` data.
          data.people.group
            .filter(g => g.fieldValue?.startsWith("Past"))
            .sort((a, b) => {
              const groupsA =
                data.groups.nodes.filter(
                  g => g.data?.group_name === a.fieldValue,
                )[0].data?.sort || 1
              const groupsB =
                data.groups.nodes.filter(
                  g => g.data?.group_name === b.fieldValue,
                )[0].data?.sort || 1

              return groupsA - groupsB
            })
            .map(people => {
              return (
                <section
                  id={people.fieldValue?.toLowerCase().replace(" ", "_")}
                  className="people-group"
                  key={people.fieldValue}
                >
                  <h2>{people.fieldValue}</h2>
                  {handlePeople(people.nodes)}
                </section>
              )
            })
        }
      </div>
    </Layout>
  )
}
export const query = graphql`
  query PeoplePast {
    people: allAirtablePeople(
      filter: { data: { group_type: { regex: "/Past/" } } }
      sort: { data: { name: ASC } }
    ) {
      group(
        field: { data: { people_groups: { data: { group_name: SELECT } } } }
      ) {
        fieldValue
        nodes {
          data {
            name
            linked_identities {
              data {
                title
                start
                end
                id
              }
            }
            id
            new_id
            people_groups {
              data {
                group_name
              }
            }
          }
        }
      }
    }
    groups: allAirtableGroups {
      nodes {
        data {
          sort
          group_name
        }
      }
    }
  }
`

export default PeoplePastPage

