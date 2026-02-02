const products = [
    { name: "Wireless Headphones", price: "$129.99", category: "electronics" },
    { name: "Cotton T-Shirt", price: "$24.99", category: "clothing" },
    { name: "Bluetooth Speaker", price: "$89.99", category: "electronics" },
    { name: "Denim Jeans", price: "$59.99", category: "clothing" }
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");

function displayProducts(category) {
    productList.innerHTML = "";

    const filtered = category === "all"
        ? products
        : products.filter(p => p.category === category);

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h2>${product.name}</h2>
            <p>${product.price}</p>
            <span class="tag ${product.category}">
                ${product.category}
            </span>
        `;

        productList.appendChild(card);
    });
}

categoryFilter.addEventListener("change", () => {
    displayProducts(categoryFilter.value);
});

// Initial load
displayProducts("all");
