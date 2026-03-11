import { useState } from "react";
import "./App.css";
import imslogo from './assets/inventory.png';

function App() {
  //const [count, setCount] = useState(0)
  // State to track which "page" we are looking at
  const [activeTab, setActiveTab] = useState("home");

  return (
    <>
      {/* Navigation bar/header 
    <div className='nav-bar'>
      <h1>Inventory Monitoring Dashboard</h1>
      <div className='tabs-btn'>
        <button></button>
        <button>Product</button>
      </div>
    </div>*/}

      <div className="nav-bar">
        <div className="logo">
          <img src={imslogo} className="logo" alt="Inventory Monitoring System Logo" />
          <h1>Inventory Monitoring Dashboard</h1>
        </div>
        
        <div className="tabs-btn">
          {/* Change state on click to switch views */}
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={activeTab === "product" ? "active" : ""}
            onClick={() => setActiveTab("product")}
          >
            Product
          </button>
        </div>
      </div>

      {/*<div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>*/}
    </>
  );
}

export default App;
