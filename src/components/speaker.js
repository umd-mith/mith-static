import React from 'react'

const Speaker = ({ person }) => {
  const name = person.website ? <a href={person.website} itemProp="name">{person.name}</a> : person.name
  return (
    <span itemProp="performer" itemScope="https://schema.org/Person">
      {name}
      <span>{person.affiliation ? `(${person.affiliation})` : ''}</span>
    </span>
  )
}

export default Speaker