import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FileUploader from './assets/componentes/FileUpload'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FileUploader />
    </>
  )
}

export default App
