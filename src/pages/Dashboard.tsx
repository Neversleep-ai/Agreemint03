import React from 'react'
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export function Dashboard() {
  const stats = [
    {
      name: 'Total Contracts',
      value: '24',
      icon: FileText,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Pending Review',
      value: '3',
      icon: Clock,
      change: '-2%',
      changeType: 'negative',
    },
    {
      name: 'Completed',
      value: '18',
      icon: CheckCircle,
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Expiring Soon',
      value: '2',
      icon: AlertCircle,
      change: '0%',
      changeType: 'neutral',
    },
  ]

  const recentContracts = [
    {
      id: 1,
      name: 'Software License Agreement',
      client: 'TechCorp Inc.',
      status: 'pending',
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'Service Agreement',
      client: 'StartupXYZ',
      status: 'completed',
      date: '2024-01-12',
    },
    {
      id: 3,
      name: 'NDA Agreement',
      client: 'Enterprise Solutions',
      status: 'review',
      date: '2024-01-10',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your contract management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : stat.changeType === 'negative'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Contracts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Contracts</h2>
        </div>
        <div className="divide-y">
          {recentContracts.map((contract) => (
            <div key={contract.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{contract.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{contract.client}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      contract.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : contract.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {contract.status}
                  </span>
                  <span className="text-sm text-gray-500">{contract.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}