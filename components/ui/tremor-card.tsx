"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TremorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  decoration?: "top" | "left" | "bottom" | "right"
  decorationColor?: string
}

export function TremorCard({
  children,
  className,
  decoration,
  decorationColor = "blue-500",
  ...props
}: TremorCardProps) {
  return (
    <Card
      className={cn(
        "relative bg-white shadow-sm border border-gray-200",
        decoration === "top" && `border-t-4 border-t-${decorationColor}`,
        decoration === "left" && `border-l-4 border-l-${decorationColor}`,
        decoration === "bottom" && `border-b-4 border-b-${decorationColor}`,
        decoration === "right" && `border-r-4 border-r-${decorationColor}`,
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  )
}

interface TremorMetricProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease" | "neutral"
  }
  target?: number
  tooltip?: string
  onClick?: () => void
}

export function TremorMetric({ title, value, change, target, tooltip, onClick }: TremorMetricProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg bg-white border border-gray-200",
        onClick && "cursor-pointer hover:bg-gray-50 transition-colors",
      )}
      onClick={onClick}
      title={tooltip}
    >
      <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      {change && (
        <div
          className={cn(
            "text-sm font-medium",
            change.type === "increase" && "text-green-600",
            change.type === "decrease" && "text-red-600",
            change.type === "neutral" && "text-gray-600",
          )}
        >
          {change.type === "increase" && "↗"}
          {change.type === "decrease" && "↘"}
          {change.value}%
        </div>
      )}
      {target && (
        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-1">Target: {target}</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min((Number(value) / target) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
