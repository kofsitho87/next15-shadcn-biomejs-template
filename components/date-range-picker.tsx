"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addMonths, format } from "date-fns"
import { type Dispatch, type SetStateAction, useState } from "react"
import type { DateRange } from "react-day-picker"
import { ko } from "date-fns/locale"

type CalendarDateRangePickerProps = React.HTMLAttributes<HTMLDivElement> & {
  dateRange?: DateRange
  setDateRange?: Dispatch<SetStateAction<DateRange | undefined>>
}
export function CalendarDateRangePicker({ dateRange, setDateRange, className }: CalendarDateRangePickerProps) {
  // const today = new Date()
  // const monthAgo = addMonths(today, -1)
  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: monthAgo,
  //   to: today,
  // })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={"outline"}
            className={cn("w-[260px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "yy년 LLL d일", { locale: ko })} -{" "}
                  {format(dateRange.to, "yy년 LLL d일", { locale: ko })}
                </>
              ) : (
                format(dateRange.from, "yy년 LLL d일", { locale: ko })
              )
            ) : (
              <span>날짜 선택</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='end'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            disabled={(date) => date > new Date() || date < new Date("2024-07-08")}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
