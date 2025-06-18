import { Routes, Route } from "react-router-dom"
import { ChatInterface } from "./components/chat/chat-interface"
import "./App.css"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto h-screen">
        <Routes>
          <Route path="/" element={<ChatInterface />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
