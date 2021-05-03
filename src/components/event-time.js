import React from 'react'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

const EventTime = ({start, end}) => {
  start = dayjs(start)

  let startEl = ''
  if (start.hour() === 0) {
    startEl = <time itemProp="startDate" className="start" dateTime={start.format('YYYY-MM-DD')}>
      <span className="date">{start.format('LL')}</span>
    </time>
  } else {
    startEl = <time itemProp="startDate" className="start" dateTime={start.format()}>
      <span className="date">{start.format('LL')}</span>
      <span className="time">{start.format('LT')}</span>
    </time>
  }

  let endEl = ''
  if (end) {
    end = dayjs(end)
    if (end.hour() === 0) {
      endEl = <time itemProp="endDate" className="end" dateTime={end.format('YYYY-MM-DD')}>
        <span class="date">{end.format('LL')}</span>
    </time>
    } else {
      endEl = <time itemProp="endDate" className="end" dateTime={end.format()}>
        <span class="time">{end.format('LT')}</span>
      </time>
    }
  }

  if (startEl && endEl) {
    return <span className="event-date">{startEl} &ndash; {endEl}</span>
  } else {
    return <span className="event-date">{startEl}</span>
  }
}

export default EventTime
