import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import '../App.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
    </>
  )
}

export default Home