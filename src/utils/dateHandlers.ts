import { parse, parseISO, format } from 'date-fns'

export function readableDate(dateStr:string) {
    return format(parseISO(dateStr), 'LLLL d, yyyy') 
}

export function readableDateTime(dateStr:string):string {
    return format(parseISO(dateStr), 'EEEE LLLL d, yyyy | h:m a')
}

function reformat(rawDateStr:string):Date {
    return parse(rawDateStr, 'M/d/yyyy', new Date())
}

export function makeDateRange(dates:string[]):string {
    const [start, end] = dates
    const startStr = format(reformat(start), 'LLLL yyyy')
    const endStr = end ? format(reformat(end), 'LLLL yyyy') : null

    if (endStr) {
        return `${startStr} – ${endStr}`
    } else {
        return `${startStr} – present`
    }
}