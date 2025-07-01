"use client"

interface DonutChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
  className?: string
}

export function DonutChart({ data, className }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 42 42" className="w-full h-full">
        <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e5e7eb" strokeWidth="3" />
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100
          const strokeDasharray = `${percentage} ${100 - percentage}`
          const strokeDashoffset = -cumulativePercentage
          cumulativePercentage += percentage

          return (
            <circle
              key={index}
              cx="21"
              cy="21"
              r="15.915"
              fill="transparent"
              stroke={item.color}
              strokeWidth="3"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 21 21)"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">{total.toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total</div>
        </div>
      </div>
    </div>
  )
}
