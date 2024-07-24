import { Link } from 'gatsby'
import React from 'react'

import './paginator.css'

interface Props {
  count: number
  path: string
}

const Paginator = ({count, path}: Props) => {
  return(
    <section className="pagination-wrap">
      <ul className="pagination">
        {Array.from({ length: count }, (_, i) => (
          <li className="page-link" key={`pa${i}`}>
            <Link
              activeClassName="active" 
              className="page-link"
              key={`pagination-number${i + 1}`}
              to={`/${path}/${i === 0 ? "" : i + 1}`}>
              {i + 1}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Paginator;