import React from 'react'
import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react'

export function Analytics() {
  const metrics = [
    {
      name: 'Total Revenue',
      value: '$250,000',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
    },
    {
      name: 'Avg. Contract Value',
      value: '$41,667',
      change: '+8%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      name: 'Avg. Processing Time',
      value: '5.2 days',
      change: '-12%',
      changeType: 'positive',
      icon: Clock,
    },
    {
      name: 'Active Clients',
      value: '18',
      change: '+22%',
      changeType: 'positive',
      icon: Users,
    },
  ]

  const contractsByType = [
    { type: 'Service Agreements', count: 8, percentage: 33 },
    { type: 'License Agreements', count: 6, percentage: 25 },
    { type: 'Partnership Agreements', count: 4, percentage: 17 },
    { type: 'Consulting Agreements', count: 3, percentage: 13 },
    { type: 'NDA Agreements', count: 3, percentage: 12 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Insights into your contract performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.name} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contract Types Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Contracts by Type</h2>
          <div className="space-y-4">
            {contractsByType.map((item) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-900">{item.type}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Monthly Trends</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">January 2024</p>
                <p className="text-sm text-gray-600">6 contracts completed</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">$85,000</p>
                <p className="text-sm text-green-600">+25%</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">December 2023</p>
                <p className="text-sm text-gray-600">8 contracts completed</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">$95,000</p>
                <p className="text-sm text-green-600">+18%</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">November 2023</p>
                <p className="text-sm text-gray-600">5 contracts completed</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">$70,000</p>
                <p className="text-sm text-green-600">+12%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}