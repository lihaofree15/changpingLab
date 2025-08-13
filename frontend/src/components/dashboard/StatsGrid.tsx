import React from 'react';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

export function StatsGrid() {
  const stats = [
    {
      label: 'Samples in Pipeline',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Activity,
      color: 'blue'
    },
    {
      label: 'Average TAT',
      value: '14.2 days',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'green'
    },
    {
      label: 'Active Projects',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: TrendingUp,
      color: 'teal'
    },
    {
      label: 'System Utilization',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = {
          blue: 'bg-blue-500 text-blue-600',
          green: 'bg-green-500 text-green-600',
          teal: 'bg-teal-500 text-teal-600',
          orange: 'bg-orange-500 text-orange-600'
        };

        return (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg bg-opacity-10 flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <Icon className={`w-6 h-6 ${stat.color === 'blue' ? 'text-blue-600' : stat.color === 'green' ? 'text-green-600' : stat.color === 'teal' ? 'text-teal-600' : 'text-orange-600'}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}