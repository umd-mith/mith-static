import React from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const EventTime = ({start, end}) => {
  start = dayjs(start)

  let startEl = ''
  if (start.hour() === 0) {
    startEl = <time itemProp="startDate" dateTime={start.format('YYYY-MM-DD')}>{start.format('LL')}</time>
  } else {
    startEl = <time itemProp="startDate" dateTime={start.format()}>{start.format('LLL')}</time>
  }

  let endEl = ''
  if (end) {
    end = dayjs(end)
    if (end.hour() === 0) {
      endEl = <time itemProp="endDate" dateTime={end.format('YYYY-MM-DD')}>{end.format('LL')}</time>
    } else {
      endEl = <time itemProp="endDate" dateTime={end.format()}>{end.format('LT')}</time>
    }
  }

  if (startEl && endEl) {
    return <span>{startEl} - {endEl}</span>
  } else {
    return <span>{startEl}</span>
  }

}

export default EventTime

