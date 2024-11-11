"use client"

import { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"

export default function InputCurrency({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  // const [amount, setAmount] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const formatNumber = (num: number): string => {
    return num.toLocaleString('ko-KR')
  }

  const formatToKoreanWords = (num: number): string => {
    if (num === 0) return '0원'
    if (num < 1000) return `${num}원`

    const units = ['', '만', '억', '조']
    let result = ''
    let unitIndex = 0

    while (num > 0) {
      const part = num % 10000
      if (part > 0) {
        const koreanPart = formatKoreanPart(part)
        result = `${koreanPart}${units[unitIndex]} ${result}`
      }
      num = Math.floor(num / 10000)
      unitIndex++
    }

    return result.trim() + '원'
  }

  const formatKoreanPart = (num: number): string => {
    const units = ['', '십', '백', '천']
    let result = ''
    let unitIndex = 0

    while (num > 0) {
      const digit = num % 10
      if (digit > 0) {
        result = `${digit === 1 && unitIndex > 0 ? '' : digit}${units[unitIndex]}${result}`
      }
      num = Math.floor(num / 10)
      unitIndex++
    }

    return result
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    const numberValue = parseInt(value, 10) || 0
    onChange(numberValue)

    const formattedValue = formatNumber(numberValue)
    const cursorPosition = e.target.selectionStart
    const lengthDiff = formattedValue.length - e.target.value.length

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(cursorPosition || 0 + lengthDiff, cursorPosition || 0 + lengthDiff)
      }
    }, 0)
  }

  return (
    <div className="space-y-2">
      <Input
        id="won-input"
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={formatNumber(value)}
        onChange={handleChange}
        placeholder="0"
        aria-describedby="won-description"
      />
      <p id="won-description" className="text-sm text-gray-500">
        입력된 금액: {formatToKoreanWords(value)}
      </p>
    </div>
  )
}