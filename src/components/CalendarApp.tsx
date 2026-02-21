import { useState } from 'react'

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
]

const EVENTS: Record<string, string[]> = {
  '2026-02-14': ['💝 Valentines Day'],
  '2026-02-20': ['📅 Portfolio Update'],
  '2026-03-01': ['🚀 Project Launch'],
  '2026-03-15': ['💼 Interview — TechCorp'],
  '2026-04-10': ['🎓 Graduation Ceremony'],
}

function CalendarApp() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState<string | null>(null)

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const dateKey = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  const isToday = (d: number) => d === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const selectedEvents = selected ? (EVENTS[selected] ?? []) : []

  return (
    <div className="cal-content">
      <div className="cal-header">
        <button className="cal-nav-btn" onClick={prevMonth}>◀</button>
        <div className="cal-month-title">{MONTHS[month]} {year}</div>
        <button className="cal-nav-btn" onClick={nextMonth}>▶</button>
      </div>

      <div className="cal-grid">
        {DAYS.map(d => (
          <div key={d} className="cal-day-header">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`blank-${i}`} className="cal-cell cal-cell--empty" />
          const key = dateKey(day)
          const hasEvent = !!EVENTS[key]
          return (
            <div
              key={key}
              className={`cal-cell ${isToday(day) ? 'cal-cell--today' : ''} ${selected === key ? 'cal-cell--selected' : ''} ${hasEvent ? 'cal-cell--event' : ''}`}
              onClick={() => setSelected(selected === key ? null : key)}
            >
              <span className="cal-date-num">{day}</span>
              {hasEvent && <span className="cal-dot" />}
            </div>
          )
        })}
      </div>

      <div className="cal-events-panel">
        {selected ? (
          <>
            <div className="cal-events-title">📅 {selected}</div>
            {selectedEvents.length ? (
              selectedEvents.map((ev, i) => (
                <div key={i} className="cal-event-item">{ev}</div>
              ))
            ) : (
              <div className="cal-no-events">No events scheduled.</div>
            )}
          </>
        ) : (
          <div className="cal-no-events">Click a date to see events.</div>
        )}
      </div>
    </div>
  )
}

export default CalendarApp
