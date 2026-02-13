import React from "react";
import "./App.css";

import headphones from "./images/headphones.jpeg";
import keyboard from "./images/keyboard.jpeg";
import watch from "./images/watch.jpeg";

function ProductCard({ name, price, inStock, image }) {
  return (
    <div className="card">
      <img src={image} alt={name} className="product-img" />

      <h3>{name}</h3>
      <p className="price">${price}</p>

      {inStock ? (
        <span className="stock in">In Stock</span>
      ) : (
        <span className="stock out">Out of Stock</span>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="container">
      <ProductCard
        name="Wireless Headphones"
        price="129.99"
        inStock={true}
        image={headphones}
      />

      <ProductCard
        name="Mechanical Keyboard"
        price="89.99"
        inStock={false}
        image={keyboard}
      />

      <ProductCard
        name="Smart Watch"
        price="199.99"
        inStock={true}
        image={watch}
      />
    </div>
  );
}

export default App;
