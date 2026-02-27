"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange, Calendar } from "./calendar"
import { cn } from "@/lib/utils"

interface DateRangePickerProps {
  value?: { start: string; end: string }
  onChange?: (range: { start: string; end: string }) => void
  label?: string
  className?: string
}

export function DateRangePicker({
  value,
  onChange,
  label,
  className
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(() => {
    if (value?.start && value?.end) {
      return {
        from: new Date(value.start),
        to: new Date(value.end)
      }
    }
    return undefined
  })
  const [isOpen, setIsOpen] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    if (selectedDate?.from && selectedDate?.to && onChange) {
      onChange({
        start: format(selectedDate.from, 'yyyy-MM-dd'),
        end: format(selectedDate.to, 'yyyy-MM-dd')
      })
    }
  }

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="text-gray-700 dark:text-gray-300 text-xs font-medium mb-1 block">
          {label}
        </label>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-start text-left font-normal border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:border-gray-400 px-3 py-2 text-sm",
          !date && "text-gray-500 dark:text-gray-400"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date?.from ? (
          date.to ? (
            <>
              {format(date.from, "LLL dd, y")} -{" "}
              {format(date.to, "LLL dd, y")}
            </>
          ) : (
            format(date.from, "LLL dd, y")
          )
        ) : (
          <span>Pick a date range</span>
        )}
      </button>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 w-full max-w-[350px]"
          style={{ padding: '20px' }}
        >
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={1}
            className="rounded-2xl"
          />
        </div>
      )}
    </div>
  )
}
