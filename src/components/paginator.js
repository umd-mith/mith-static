import { Link } from 'gatsby'
import React from 'react'

import paginatorStyles from './paginator.module.css'

const Paginator = ({count}) => {
    return(
        <div className={`pagination ${paginatorStyles.pagination}`}>
          <span className={paginatorStyles.label}>Pages:</span>
          {Array.from({ length: count }, (_, i) => (
            <Link
              activeClassName={paginatorStyles.active} 
              className={paginatorStyles.pageLink}
              key={`pagination-number${i + 1}`}
              to={`/news/${i === 0 ? "" : i + 1}`}>
              {i + 1}
            </Link>
          ))}
        </div>
    )
}

export default Paginator;