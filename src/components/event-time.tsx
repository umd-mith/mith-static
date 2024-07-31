import React from "react"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

dayjs.extend(localizedFormat)

interface EventTimeProps {
  start: number
  end?: number
  icon?: string
}

const EventTime = ({ start, end, icon }: EventTimeProps) => {
  const iconCalendar = icon ? <FontAwesomeIcon icon="calendar-alt" /> : ""
  const iconClock = icon ? <FontAwesomeIcon icon="clock" /> : ""

  const startDate = dayjs(start)

  let startEl: JSX.Element | undefined
  if (startDate.hour() === 0) {
    startEl = (
      <time
        itemProp="startDate"
        className="start"
        dateTime={startDate.format("YYYY-MM-DD")}
      >
        <span className="date">
          {iconCalendar} {startDate.format("LL")}
        </span>
      </time>
    )
  } else {
    startEl = (
      <time
        itemProp="startDate"
        className="start"
        dateTime={startDate.format()}
      >
        <span className="date">
          {iconCalendar} {startDate.format("LL")}
        </span>
        <span className="time">
          {iconClock} {startDate.format("LT")}
        </span>
      </time>
    )
  }

  let endEl: JSX.Element | undefined
  if (end) {
    const endDate = dayjs(end)
    if (endDate.hour() === 0) {
      endEl = (
        <time
          itemProp="endDate"
          className="end"
          dateTime={endDate.format("YYYY-MM-DD")}
        >
          <span className="date">{endDate.format("LL")}</span>
        </time>
      )
    } else {
      endEl = (
        <time itemProp="endDate" className="end" dateTime={endDate.format()}>
          <span className="time">{endDate.format("LT")}</span>
        </time>
      )
    }
  }

  if (startEl && endEl) {
    return (
      <span className="event-date">
        {startEl}
        {endEl}
      </span>
    )
  } else {
    return <span className="event-date">{startEl}</span>
  }
}

export default EventTime
