import { useState } from "react";
import "./App.css";
import imslogo from "./assets/inventory.png";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  // --- ADDED MISSING STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([
    // Example initial data to see the table working
    {
      name: "Sample Item",
      sku: "SKU-001",
      category: "Hardware",
      quantity: 2,
      reorderLevel: 5,
      price: "100",
      description: "Test",
    },
  ]);

  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: 0,
    reorderLevel: 5,
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // --- UPDATED SUBMIT (Event: Add New Product / Refresh List) ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, product]); // Adds form data to the list
    setProduct({
      name: "",
      sku: "",
      category: "",
      quantity: 0,
      reorderLevel: 5,
      price: "",
      description: "",
    }); // Reset form
    alert("Product added to inventory!");
  };

  // --- UPDATED STOCK (Event: Update Stock Quantity) ---
  const handleUpdateStock = (sku, amount) => {
    setProducts(
      products.map((p) =>
        p.sku === sku
          ? { ...p, quantity: Math.max(0, parseInt(p.quantity) + amount) }
          : p,
      ),
    );
  };

  // --- UPDATED DELETE (Event: Delete Product) ---
  const handleDelete = (sku) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.sku !== sku));
    }
  };

  const handleCategorySelect = (cat) => {
    setProduct((prev) => ({ ...prev, category: cat }));
    setIsOpen(false);
  };

  const categories = [
    "Hardware",
    "Software",
    "Electronics",
    "Office Supplies",
    "Consumables",
  ];

  // Logic: Detect Low Stock (Event)
  const isLowStock = (item) =>
    parseInt(item.quantity) <= parseInt(item.reorderLevel);

  // Logic: Search filtering (Event)
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  );
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
          <img
            src={imslogo}
            className="logo"
            alt="Inventory Monitoring System Logo"
          />
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
            <p>
              Select "Product" to register new items or view your inventory.
            </p>
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
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="e.g. Wireless Mouse"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>SKU / ID</label>
                    <input
                      type="text"
                      name="sku"
                      value={product.sku}
                      onChange={handleChange}
                      placeholder="SKU-1001"
                    />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <div className="custom-dropdown">
                      <div
                        className="dropdown-header"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {/* This now correctly displays the state */}
                        <span>{product.category || "Select Category"}</span>
                        <span className={`arrow ${isOpen ? "open" : ""}`}>
                          ▼
                        </span>
                      </div>

                      {isOpen && (
                        <ul className="dropdown-list">
                          {categories.map((cat) => (
                            <li
                              key={cat}
                              onClick={() => handleCategorySelect(cat)}
                            >
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
                    <input
                      type="number"
                      name="quantity"
                      value={product.quantity}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Low-Stock Threshold</label>
                    <input
                      type="number"
                      name="reorderLevel"
                      value={product.reorderLevel}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      placeholder="Short details..."
                    />
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  Register Product
                </button>
              </form>
            </div>

            <div className="dashboard-wrapper">
 <header className="inventory-header">
  <div className="search-group">
    <input
      type="text"
      placeholder="Search SKU or Name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <button 
    className="add-product-btn" 
    onClick={() => setModalOpen(true)} // Example trigger
  >
    <span>+</span> Add Product
  </button>
</header>

  <div className="list-container">
    <table className="product-table">
      <thead>
        <tr>
          <th>Product Info</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock Level</th>
          <th>Status</th>
          <th>Description</th>
          <th className="action-cell">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((p) => (
          <tr key={p.sku} className={isLowStock(p) ? "low-stock-row" : ""}>
            <td>
              <div className="prod-info">
                <strong className="name">{p.name}</strong>
                <span className="sku">{p.sku}</span>
              </div>
            </td>
            <td>{p.category}</td>
            <td style={{ fontWeight: "600" }}>${p.price}</td>
            <td>
              <div className="stock-adjust">
                <button onClick={() => handleUpdateStock(p.sku, -1)}>-</button>
                <span style={{ minWidth: "24px", textAlign: "center" }}>
                  {p.quantity}
                </span>
                <button onClick={() => handleUpdateStock(p.sku, 1)}>+</button>
              </div>
            </td>
            <td>
              <span className={`badge ${isLowStock(p) ? "warning" : "success"}`}>
                {isLowStock(p) ? "Low Stock" : "Healthy"}
              </span>
            </td>
            <td className="desc-cell">
              <div style={{ 
                whiteSpace: 'nowrap', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis' 
              }}>
                {p.description || "—"}
              </div>
            </td>
            <td className="action-cell">
              <button className="delete-btn" onClick={() => handleDelete(p.sku)}>
                🗑️
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
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
