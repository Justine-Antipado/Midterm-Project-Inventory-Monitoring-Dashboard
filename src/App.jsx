import { useState } from "react";
import "./App.css";
import imslogo from './assets/inventory.png';

function App() {
  //const [count, setCount] = useState(0)
  // State to track which "page" we are looking at
  const [activeTab, setActiveTab] = useState("home");

  // 1. State for the product form
  const [product, setProduct] = useState({
  name: '',
  sku: '',
  category: '',
  quantity: 0,
  reorderLevel: 5,
  price: '',       
  description: '' 
});

  // 2. Handler to update state when typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Registered:", product);
    alert("Product added to inventory!");
  };

  const handleCategorySelect = (cat) => {
  setProduct((prev) => ({ ...prev, category: cat }));
  setIsOpen(false);
};

  const [isOpen, setIsOpen] = useState(false);
  const categories = ["Hardware", "Software", "Electronics", "Office Supplies", "Consumables"];

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

      {/* Main user interface */}
      <main>
        {activeTab === "home" && (
          <section className="home-stats">
            <h2>Welcome to IMS</h2>
            <p>Select "Product" to register new items or view your inventory.</p>
          </section>
        )}

        {activeTab === "product" && (
          // Add product
          <section className="product-list">
            <div className="product-container">
  <h3>Add New Product</h3>
  <form className="inventory-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Product Name</label>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="e.g. Wireless Mouse" required />
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>SKU / ID</label>
        <input type="text" name="sku" value={product.sku} onChange={handleChange} placeholder="SKU-1001" />
      </div>

      <div className="form-group">
        <label>Category</label>
        <div className="custom-dropdown">
          <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
            {/* This now correctly displays the state */}
            <span>{product.category || "Select Category"}</span>
            <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
          </div>
          
          {isOpen && (
            <ul className="dropdown-list">
              {categories.map((cat) => (
                <li key={cat} onClick={() => handleCategorySelect(cat)}>
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Initial Quantity</label>
        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} min="0" />
      </div>
      <div className="form-group">
        <label>Low-Stock Threshold</label>
        <input type="number" name="reorderLevel" value={product.reorderLevel} onChange={handleChange} />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Price</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="0.00" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Short details..." />
      </div>
    </div>

    <button type="submit" className="submit-btn">Register Product</button>
  </form>
</div>
          </section>
        )}
      </main>
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
