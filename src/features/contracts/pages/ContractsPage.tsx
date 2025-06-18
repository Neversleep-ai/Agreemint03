import { useContracts } from "../hooks/useContractQueries"
import { useContractFilters } from "../store/useContractUIStore"

export default function ContractsPage() {
  const filters = useContractFilters()
  const { data, isLoading, error } = useContracts(filters)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Failed to load contracts</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contracts</h1>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {data?.content.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No contracts found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {data?.content.map((contract) => (
                    <div key={contract.id} className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900">{contract.title}</h3>
                      <p className="text-sm text-gray-500">
                        Status: {contract.status} | Type: {contract.type}
                      </p>
                      <p className="text-sm text-gray-500">Created: {contract.createdAt.toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
