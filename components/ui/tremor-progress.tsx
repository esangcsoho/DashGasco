"use client"

import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number
  size?: "sm" | "md" | "lg"
  color?: "blue" | "green" | "orange" | "red"
  showValue?: boolean
  className?: string
}

export function CircularProgress({
  value,
  size = "md",
  color = "blue",
  showValue = true,
  className,
}: CircularProgressProps) {
  const radius = size === "sm" ? 20 : size === "md" ? 30 : 40
  const strokeWidth = size === "sm" ? 3 : size === "md" ? 4 : 5
  const normalizedRadius = radius - strokeWidth * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (value / 100) * circumference

  const colorClasses = {
    blue: "stroke-blue-500",
    green: "stroke-green-500",
    orange: "stroke-orange-500",
    red: "stroke-red-500",
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="text-gray-200"
        />
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={cn(colorClasses[color], "transition-all duration-300 ease-in-out")}
          strokeLinecap="round"
        />
      </svg>
      {showValue && <span className={cn("absolute font-semibold", textSizes[size])}>{value}%</span>}
    </div>
  )
}
