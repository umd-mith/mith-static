import React from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const ResearchTime = ({start, end}) => {
  const format = ['YYYY', 'YYYY-M']
  start = dayjs(start, format)
  end = dayjs(end, format)

  const startEl = <time itemProp="startDate" dateTime={start.format('YYYY-MM')}>{start.format('MMMM YYYY')}</time>
  const endEl = <time itemProp="endDate" dateTime={end.format('YYYY-MM')}>{end.format('MMMM YYYY')}</time>

  if (startEl && endEl) {
    return <span>{startEl} - {endEl}</span>
  } else {
    return <span>{startEl}</span>
  }

}

export default ResearchTime

