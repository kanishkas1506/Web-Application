const categories = ["All", "Mobiles", "Laptops", "Furniture", "Books", "Fashion"];
let selectedCategory = "All";
let nextId = 7;
let products = [
    { id: 1, name: "iPhone 12 64GB", category: "Mobiles", price: 18000, location: "Chennai, Tamil Nadu", description: "Used iPhone in good condition", image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=700&q=80" },
    { id: 2, name: "Dell Inspiron Laptop", category: "Laptops", price: 24500, location: "Coimbatore, Tamil Nadu", description: "Used Dell laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=80" },
    { id: 3, name: "2 Seater Sofa", category: "Furniture", price: 6500, location: "Madurai, Tamil Nadu", description: "Comfortable sofa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80" },
    { id: 4, name: "Engineering Books Set", category: "Books", price: 900, location: "Salem, Tamil Nadu", description: "Engineering study books", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=700&q=80" },
    { id: 5, name: "Travel Backpack", category: "Fashion", price: 1200, location: "Trichy, Tamil Nadu", description: "Travel backpack", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80" },
    { id: 6, name: "Samsung Galaxy Phone", category: "Mobiles", price: 9500, location: "Chennai, Tamil Nadu", description: "Used Samsung smartphone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80" }
];
categories.forEach(category => {
    document.getElementById("categoryButtons").innerHTML +=
        `<button onclick="filterProducts('${category}')">${category}</button>`;
    if (category !== "All") {
        document.getElementById("newCategory").innerHTML +=
            `<option>${category}</option>`;
    }
});
function showProducts() {
    const search = document.getElementById("search").value.toLowerCase().trim();
    const sort = document.getElementById("sort").value;
    let list = products.filter(p =>
        (selectedCategory === "All" || p.category === selectedCategory) &&
        (p.name + " " + p.category + " " + p.location).toLowerCase().includes(search)
    );
    if (sort === "low") list.sort((a, b) => a.price - b.price);
    if (sort === "high") list.sort((a, b) => b.price - a.price);
    document.getElementById("productGrid").innerHTML = list.map(p => `
        <div class="product-card">
            <div class="image">
                <img src="${p.image}" alt="${p.name}">
                <button class="favorite" onclick="favorite(this)">♡</button>
            </div>
            <div class="info">
                <p class="category">${p.category}</p>
                <h3>${p.name}</h3>
                <h4>₹${p.price.toLocaleString("en-IN")}</h4>
                <p class="location">${p.location}</p>
                <div class="actions">
                    <button class="view" onclick="viewProduct(${p.id})">View Details</button>
                    <button onclick="buyProduct(${p.id})">Buy Now</button>
                </div>
            </div>
        </div>
    `).join("");
}
document.getElementById("search").addEventListener("input", showProducts);
function filterProducts(category) {
    selectedCategory = category;
    showProducts();
}
function favorite(button) {
    const liked = button.innerHTML === "♡";
    button.innerHTML = liked ? "♥" : "♡";
    button.style.color = liked ? "#d13b3b" : "#222";
}
function viewProduct(id) {
    const p = products.find(item => item.id === id);
    alert(`Product: ${p.name}\nPrice: ₹${p.price}\nLocation: ${p.location}\nDescription: ${p.description}`);
}
function openSell() {
    document.getElementById("sellModal").style.display = "flex";
}
function closeModal(id) {
    document.getElementById(id).style.display = "none";
}
function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById("newName").value.trim();
    const category = document.getElementById("newCategory").value;
    const price = Number(document.getElementById("newPrice").value);
    const location = document.getElementById("newLocation").value.trim();
    const description = document.getElementById("newDescription").value.trim();
    if (!name || !category || price <= 0 || !location) {
        alert("Please enter valid product details.");
        return;
    }
    products.unshift({
        id: nextId++,
        name, category, price, location,
        description: description || "No description provided",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&q=80"
    });
    event.target.reset();
    closeModal("sellModal");
    selectedCategory = "All";
    document.getElementById("search").value = "";
    document.getElementById("sort").value = "default";
    showProducts();
    alert("Your product has been listed successfully!");
}
function buyProduct(id) {
    const p = products.find(item => item.id === id);
    document.getElementById("selectedProduct").textContent =
        `${p.name} - ₹${p.price.toLocaleString("en-IN")}`;
    document.getElementById("buyModal").style.display = "flex";
}
function placeOrder(event) {
    event.preventDefault();
    const phone = document.getElementById("buyerPhone").value.trim();
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Enter a valid 10-digit phone number.");
        return;
    }
    const name = document.getElementById("buyerName").value.trim();
    alert(`Order placed successfully!\nThank you, ${name}!`);
    event.target.reset();
    closeModal("buyModal");
}
showProducts();