import React from "react"

interface TaxonomyListProps {
  terms: { term: string }[]
  type: string
}

const TaxonomyList = ({ terms, type }: TaxonomyListProps) => {
  const tax_title = type ? (
    <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
  ) : (
    ""
  )

  return (
    <div className={`taxonomy ${type}`}>
      <h2>{tax_title}</h2>
      <ul className="terms">
        {terms.map(t => {
          return <li className="term">{t.term}</li>
        })}
      </ul>
    </div>
  )
}

export default TaxonomyList

