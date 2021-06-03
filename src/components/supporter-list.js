import React from 'react'

const SupporterList = ({supporters, type}) => {

  const title = supporters.length > 1 
    ? `${type.charAt(0).toUpperCase() + type.slice(1)}s`
    : type.charAt(0).toUpperCase() + type.slice(1)
  const types = `${type}s`

  return(
    <div className={`supporters ${types}`}>
      <h2>{title}</h2>
      <ul>
        {supporters.map(s => {
          const supporter_name = s.website 
            ? s.website.startsWith('http') 
              ? <a href={s.website} title={s.name} target="_blank" rel="noreferrer">{s.name}</a>
              : <a href={`http://${s.website}`} title={s.name} target="_blank" rel="noreferrer">{s.name}</a>
            : s.name
          return <li id={s.slug}>{supporter_name}</li>
        })}
      </ul>
    </div>
  )
}

export default SupporterList