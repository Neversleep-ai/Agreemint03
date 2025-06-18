import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"

// Lazy load pages for performance
const LandingPage = lazy(() => import("./pages/LandingPage"))
const ContractsPage = lazy(() => import("./features/contracts/pages/ContractsPage"))
const ContractCreationPage = lazy(() => import("./features/contracts/pages/contract-creation-page"))
const NegotiationRoomPage = lazy(() => import("./features/contracts/pages/negotiation-room-page"))

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contracts" element={<ContractsPage />} />
          <Route path="/create-contract" element={<ContractCreationPage />} />
          <Route path="/negotiate/:roomId" element={<NegotiationRoomPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
