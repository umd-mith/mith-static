import { Link } from 'gatsby'
import React from 'react'

import './paginator.module.css'

const Paginator = ({count, path}) => {
  return(
    <section className="pagination">
      <span className="label">Pages:</span>
      {Array.from({ length: count }, (_, i) => (
        <Link
          activeClassName="active" 
          className="pageLink"
          key={`pagination-number${i + 1}`}
          to={`/${path}/${i === 0 ? "" : i + 1}`}>
          {i + 1}
        </Link>
      ))}
    </section>
  )
}

export default Paginator;