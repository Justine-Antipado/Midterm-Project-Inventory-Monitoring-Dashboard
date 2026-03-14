import { useState } from "react";
import "./App.css";
import imslogo from "./assets/inventory.png";

function App() {
    const [activeTab, setActiveTab] = useState("home");
    const [isOpen, setIsOpen] = useState(false);

    // --- 1: ADD STATE TO CONTROL FORM VISIBILITY ---
    const [showForm, setShowForm] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([
        {
            name: "Sample Item",
            sku: "SKU-001",
            category: "Hardware",
            quantity: 2,
            reorderLevel: 5,
            price: "100",
            description: "Test"
        }
    ]);

    const [product, setProduct] = useState({
        name: "",
        sku: "",
        category: "",
        quantity: 0,
        reorderLevel: 5,
        price: "",
        description: ""
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setProducts([...products, product]);
        setProduct({
            name: "",
            sku: "",
            category: "",
            quantity: 0,
            reorderLevel: 5,
            price: "",
            description: ""
        });

        // --- 2: HIDE FORM AFTER SUBMISSION ---
        setShowForm(false);
    };

    const handleUpdateStock = (sku, amount) => {
        setProducts(products.map(p => (p.sku === sku ? { ...p, quantity: Math.max(0, parseInt(p.quantity) + amount) } : p)));
    };

    const handleDelete = sku => {
        setProducts(products.filter(p => p.sku !== sku));
    };

    const handleCategorySelect = cat => {
        setProduct(prev => ({ ...prev, category: cat }));
        setIsOpen(false);
    };

    const categories = ["Hardware", "Software", "Electronics", "Office Supplies", "Consumables"];

    const isLowStock = item => parseInt(item.quantity) <= parseInt(item.reorderLevel);

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
        <>
            <div className="nav-bar">
                <div className="logo">
                    <img src={imslogo} className="logo" alt="Inventory Monitoring System Logo" />
                    <h1>Inventory Monitoring Dashboard</h1>
                </div>

                <div className="tabs-btn">
                    {/* Change state on click to switch views */}
                    <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}>
                        Home
                    </button>
                    <button
                        className={activeTab === "product" ? "active" : ""}
                        onClick={() => {
                            setActiveTab("product");
                            setShowForm(false);
                        }}
                    >
                        Product
                    </button>
                </div>
            </div>

            {/* Main user interface */}
            <main>
                {activeTab === "home" && (
                    <section className="home-dashboard">
                        <header className="dashboard-intro">
                            <div className="welcome-text">
                                <h2>System Overview</h2>
                                <p>Dashboard / Metrics / {new Date().toLocaleDateString()}</p>
                            </div>
                            <button
                                className="primary-action-btn"
                                onClick={() => {
                                    setActiveTab("product");
                                    setShowForm(false);
                                }}
                            >
                                Manage Inventory
                            </button>
                        </header>

                        <div className="stats-grid">
                            {/* Total Items Card */}
                            <div className="kpi-card">
                                <div className="card-icon">📦</div>
                                <div className="card-info">
                                    <span className="label">Stocked Items</span>
                                    <span className="value">{products.length}</span>
                                    <span className="trend">Total unique SKUs</span>
                                </div>
                            </div>

                            {/* Low Stock Card - Highlights Red if > 0 */}
                            <div className={`kpi-card ${products.filter(p => isLowStock(p)).length > 0 ? "alert" : ""}`}>
                                <div className="card-icon">⚠️</div>
                                <div className="card-info">
                                    <span className="label">Low Stock Alerts</span>
                                    <span className="value">{products.filter(p => isLowStock(p)).length}</span>
                                    <span className="trend">Requires Attention</span>
                                </div>
                            </div>

                            {/* Financial Value Card */}
                            <div className="kpi-card">
                                <div className="card-icon">💰</div>
                                <div className="card-info">
                                    <span className="label">Inventory Value</span>
                                    <span className="value">${products.reduce((acc, p) => acc + parseFloat(p.price || 0) * p.quantity, 0).toLocaleString()}</span>
                                    <span className="trend">Current Asset Total</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Navigation Panel */}
                        <div className="quick-access-panel">
                            <h3>Quick Access</h3>
                            <div className="shortcut-btns">
                                <button
                                    onClick={() => {
                                        setShowForm(true);
                                        setActiveTab("product");
                                    }}
                                >
                                    + Register New Product
                                </button>
                                <button onClick={() => setActiveTab("product")}>🔍 Search Inventory</button>
                            </div>
                        </div>
                    </section>
                )}

                {activeTab === "product" && (
                    // Add product
                    <section className="product-list">
                        {showForm && (
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
                                                    <span>{product.category || "Select Category"}</span>
                                                    <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
                                                </div>

                                                {isOpen && (
                                                    <ul className="dropdown-list">
                                                        {categories.map(cat => (
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

                                    <button type="submit" className="submit-btn">
                                        Register Product
                                    </button>
                                    <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        )}

                        <div className="dashboard-wrapper">
                            <header className="inventory-header">
                                <div className="search-group">
                                    <input type="text" placeholder="Search SKU or Name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                </div>

                                <button className="add-product-btn" onClick={() => setShowForm(true)}>
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
                                        {filteredProducts.map(p => (
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
                                                        <span style={{ minWidth: "24px", textAlign: "center" }}>{p.quantity}</span>
                                                        <button onClick={() => handleUpdateStock(p.sku, 1)}>+</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge ${isLowStock(p) ? "warning" : "success"}`}>{isLowStock(p) ? "Low Stock" : "Healthy"}</span>
                                                </td>
                                                <td className="desc-cell">
                                                    <div
                                                        style={{
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"
                                                        }}
                                                    >
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
        </>
    );
}

export default App;
