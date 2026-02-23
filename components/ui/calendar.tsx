"use client"

import * as React from "react"
import { DayPicker, DayPickerProps } from 'react-day-picker'
import { cn } from "@/lib/utils"
import 'react-day-picker/dist/style.css'

export type { DateRange } from "react-day-picker"

export function Calendar({
  className,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays={false}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-gray-900 dark:text-white",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 absolute left-1"
        ),
        button_next: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 absolute right-1"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-gray-500 dark:text-gray-400 rounded-md w-9 font-normal text-[0.8rem] uppercase",
        week: "flex w-full mt-2",
        day: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 h-9 w-9 font-normal aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full inline-flex items-center justify-center text-gray-900 dark:text-white"
        ),
        selected: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white rounded-full font-semibold",
        today: "bg-blue-500/10 text-blue-600 font-semibold",
        outside: "text-gray-400 dark:text-gray-600 opacity-50",
        disabled: "text-gray-300 dark:text-gray-700 opacity-50",
        range_middle: "aria-selected:bg-blue-500/10 aria-selected:text-blue-600",
        hidden: "invisible",
      }}
      {...props}
    />
  )
}
