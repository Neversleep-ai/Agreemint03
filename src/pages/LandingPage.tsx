export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Agreemint</h1>
        <p className="text-xl text-gray-600 mb-8">AI-assisted contract negotiation rooms</p>
        <div className="space-y-4">
          <a
            href="/create-contract"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 mr-4"
          >
            Start Your First Contract
          </a>
          <a
            href="/contracts"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View Existing Contracts
          </a>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          <p>🤝 AI-mediated negotiation • ⚖️ Personal AI lawyers • ✍️ Sign in one session</p>
        </div>
      </div>
    </div>
  )
}
