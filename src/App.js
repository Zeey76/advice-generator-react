import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [advice, setAdvice] = useState({});
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  
  async function fetchAdvice() {
    setLoading(true);
    setError(null);
    
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) throw new Error('Failed to fetch advice');
      const data = await response.json();
      setAdvice(data.slip);
      
    } catch(err) {
      setError(err)
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdvice()
  }, [])

  return (
    <div class="advice-generator">
      {!isLoading && !error && <p className="heading">Advice #<span className="id-number">{advice.id}</span></p>}
      {!isLoading && !error && <p className="quote">{advice.advice}</p>}
      {isLoading && <p className="quote">Loading...</p>}
      {error && <p className="quote">Oops! Something went wrong. Try again!</p>}
      <img src="./images/pattern-divider-desktop.svg" className="desktop-image divider" alt="" />
      <img src="./images/pattern-divider-mobile.svg" className="mobile-image divider" alt="" />
      <button className="dice" onClick={fetchAdvice}>
        <img src="./images/icon-dice.svg" alt=""/>
      </button>
    </div>
  )
}

export default App;
