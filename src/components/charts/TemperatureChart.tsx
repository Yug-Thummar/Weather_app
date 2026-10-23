import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '@/components/ui/card'
import type { TemperatureUnit } from '@/types/location'
import type { HourlyForecastItem } from '@/types/weather'
import { formatHourLabel } from '@/utils/dateTime'
import { convertTemperature, temperatureUnitLabel } from '@/utils/temperature'

type TemperatureChartProps = {
  items: HourlyForecastItem[]
  unit: TemperatureUnit
}

type ChartPoint = {
  time: string
  temperature: number
}

export function TemperatureChart({ items, unit }: TemperatureChartProps) {
  const data: ChartPoint[] = items.flatMap((item) => {
    if (item.temperatureC === null) {
      return []
    }

    return [
      {
        time: formatHourLabel(item.time),
        temperature: Number(convertTemperature(item.temperatureC, unit).toFixed(1)),
      },
    ]
  })

  if (data.length === 0) {
    return (
      <Card className="p-5">
        <h2 className="text-base font-semibold text-white">Temperature trend</h2>
        <p className="mt-2 text-sm text-slate-300">
          A temperature chart is unavailable because hourly temperature values are missing.
        </p>
      </Card>
    )
  }

  const unitLabel = temperatureUnitLabel(unit)

  return (
    <Card className="p-5">
      <h2 className="text-base font-semibold text-white">Temperature trend</h2>
      <p className="mt-1 text-sm text-slate-400">
        Hourly temperatures for the selected location, shown in {unitLabel}.
      </p>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="time"
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              unit={unitLabel}
              width={48}
            />
            <Tooltip
              cursor={{ stroke: 'rgba(56,189,248,0.35)' }}
              contentStyle={{
                background: '#121a2e',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#e8eefc',
              }}
              formatter={(value) => {
                const display =
                  typeof value === 'number' || typeof value === 'string'
                    ? `${value}${unitLabel}`
                    : 'Unavailable'
                return [display, 'Temperature']
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#38bdf8"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default TemperatureChart
