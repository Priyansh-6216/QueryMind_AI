import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ResultChartProps {
  columns: string[];
  rows: any[][];
  suggestedChartType?: string;
}

const COLORS = ['#6875f5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

const ResultChart: React.FC<ResultChartProps> = ({ columns, rows, suggestedChartType = 'NONE' }) => {
  // Try to find the best axes automatically
  const { chartData, xAxis, yAxis, valid } = useMemo(() => {
    if (!columns || !rows || rows.length === 0 || columns.length < 2) {
      return { chartData: [], xAxis: '', yAxis: '', valid: false };
    }

    // Heuristics:
    // xAxis is usually a string, date, or ID (often the first column)
    // yAxis is usually a number (often the second column)
    let xColIdx = -1;
    let yColIdx = -1;

    // Check row types to determine numeric vs string
    for (let i = 0; i < columns.length; i++) {
      const val = rows[0][i];
      if (typeof val === 'number') {
        if (yColIdx === -1) yColIdx = i; // First number is Y
      } else {
        if (xColIdx === -1) xColIdx = i; // First string is X
      }
    }

    // Fallbacks
    if (xColIdx === -1) xColIdx = 0;
    if (yColIdx === -1) yColIdx = columns.length > 1 && xColIdx === 0 ? 1 : 0;

    // If both resolve to the same or invalid, we can't chart
    if (xColIdx === yColIdx || xColIdx >= columns.length || yColIdx >= columns.length) {
      return { chartData: [], xAxis: '', yAxis: '', valid: false };
    }

    const xAxisName = columns[xColIdx];
    const yAxisName = columns[yColIdx];

    // Build Recharts data format (array of objects)
    // Limit to 100 rows to prevent performance issues
    const chartData = rows.slice(0, 100).map((row) => {
      const item: any = {};
      item[xAxisName] = row[xColIdx];
      item[yAxisName] = typeof row[yColIdx] === 'number' ? row[yColIdx] : Number(row[yColIdx]) || 0;
      return item;
    });

    return { chartData, xAxis: xAxisName, yAxis: yAxisName, valid: true };
  }, [columns, rows]);

  if (!valid || suggestedChartType === 'NONE') {
    return null;
  }

  const renderChart = () => {
    // Default to BAR if suggestedChartType is missing or unrecognized, but valid is true
    const type = (suggestedChartType && ['BAR', 'LINE', 'PIE'].includes(suggestedChartType.toUpperCase()))
      ? suggestedChartType.toUpperCase()
      : 'BAR';

    switch (type) {
      case 'LINE':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey={xAxis} tick={{ fill: '#6b7280' }} />
              <YAxis tick={{ fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke={COLORS[0]} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'PIE':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={yAxis}
                nameKey={xAxis}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill={COLORS[0]}
                label={({ name, percent = 0 }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'BAR':
      default:
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey={xAxis} tick={{ fill: '#6b7280' }} />
              <YAxis tick={{ fill: '#6b7280' }} />
              <Tooltip
                cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend />
              <Bar dataKey={yAxis} fill={COLORS[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg mt-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center">
        <svg className="w-5 h-5 mr-2 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Data Visualization
      </h3>
      {renderChart()}
    </div>
  );
};

export default ResultChart;