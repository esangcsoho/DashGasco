"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface TremorToggleProps {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  description?: string
}

export function TremorToggle({ label, checked, onCheckedChange, description }: TremorToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={label} checked={checked} onCheckedChange={onCheckedChange} />
      <div className="grid gap-1.5 leading-none">
        <Label
          htmlFor={label}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}
