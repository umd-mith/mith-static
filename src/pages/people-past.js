import React from 'react'
import { graphql } from 'gatsby';

import Layout from '../components/layout'
import SEO from '../components/seo'
import './people.css'

const PeoplePastPage = ({ data }) => {
  // return (
	// 	<Layout>
  //     <SEO title="Past People" />
  //     <div className="page-people">
  //       <section className="leader hidden">
  //         <h1 className="page-title text-hidden">Past People</h1>
  //       </section>
  //       {data.people.nodes.map(group => {
  //         return (
  //           <section key={`g-${group.data.id}`} className={`people-group ${group.data.slug}`} role="group">
  //             <h2>{group.data.group_name}</h2>
  //             <> {
  //               group.data.linked_people ?
  //                 group.data.linked_people.map(person => (
  //                   <article className="person" id={person.data.id}>
  //                     <strong className="name" key={`p-${person.data.id}`}>{person.data.name}</strong>
  //                     <div className="details">{
  //                       person.data.date_spans ? 
  //                       person.data.date_spans.map(dates => (
  //                         <span key={`d-${dates.data.id}`}>{dates.data.date_span}</span>
  //                       ))
  //                       : ''
  //                     }</div>
  //                   </article>
  //                 ))
  //               : ''
  //             } </>
  //           </section>
  //         )
  //       })}
  //     </div>
  //   </Layout>
  // )
}

// export const query = graphql`
//   query PeoplePastQuery {
//     people: allAirtableGroupsTable(
//       filter: {
//         table: {eq: "Groups"},
//         data: {group_name: {regex: "/Past/"}}
//       }, 
//       sort: {
//         fields: data___sort
//       }
//     ) {
//       nodes {
//         data {
//           id
//           sort
//           slug
//           group_name
//           linked_people {
//             data {
//               new_id
//               name
//               slug
//               date_spans {
//                 data {
//                   date_span
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
 
export default PeoplePastPage