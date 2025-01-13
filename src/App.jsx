import { useState } from 'react'
import './App.css'
import ParentFeature from "./components/ParentFeature";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <ParentFeature /> {/* Use ParentFeature to encapsulate the feature-specific components */}
      </div>
    </>
  )
}

export default App
