"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const ALL_STATES = [
  // States
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // Union Territories
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep', 'Ladakh', 'Delhi', 'Jammu and Kashmir', 'Puducherry'
]

interface StateSelectionProps {
  selectedStates: string[]
  onStateChange: (states: string[]) => void
  maxSelect?: number
  mode?: 'single' | 'multiple'
}

export function StateSelector({ selectedStates, onStateChange, maxSelect = 5, mode = 'single' }: StateSelectionProps) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const filteredStates = ALL_STATES.filter(state => 
    state.toLowerCase().includes(search.toLowerCase())
  )

  const handleStateClick = (state: string) => {
    if (mode === 'single') {
      onStateChange([state])
      setIsOpen(false)
      setSearch('')
    } else {
      if (selectedStates.includes(state)) {
        onStateChange(selectedStates.filter(s => s !== state))
      } else if (selectedStates.length < maxSelect) {
        onStateChange([...selectedStates, state])
      }
    }
  }

  const handleClear = () => {
    onStateChange([])
    setSearch('')
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Input
          placeholder="Search states..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="pr-10"
        />
        {search && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && filteredStates.length > 0 && (
        <Card className="absolute z-50 w-full shadow-lg max-h-64 overflow-y-auto">
          <div className="divide-y">
            {filteredStates.map(state => (
              <button
                key={state}
                onClick={() => handleStateClick(state)}
                className={`w-full px-4 py-2 text-left hover:bg-muted transition-colors ${
                  selectedStates.includes(state) ? 'bg-blue-50 dark:bg-blue-900 font-semibold' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedStates.includes(state) && <span className="text-blue-600">✓</span>}
                  <span>{state}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>
      )}

      {selectedStates.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedStates.map(state => (
            <div
              key={state}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
            >
              {state}
              <button
                onClick={() => onStateChange(selectedStates.filter(s => s !== state))}
                className="hover:text-blue-600 dark:hover:text-blue-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
