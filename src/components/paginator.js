import { Link } from 'gatsby'
import React from 'react'

import * as paginatorStyles from './paginator.module.css'

const Paginator = ({count, path}) => {
  return(
    <section className={`pagination ${paginatorStyles.pagination}`}>
      <span className={paginatorStyles.label}>Pages:</span>
      {Array.from({ length: count }, (_, i) => (
        <Link
          activeClassName={paginatorStyles.active} 
          className={paginatorStyles.pageLink}
          key={`pagination-number${i + 1}`}
          to={`/${path}/${i === 0 ? "" : i + 1}`}>
          {i + 1}
        </Link>
      ))}
    </section>
  )
}

export default Paginator;