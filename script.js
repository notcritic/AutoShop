const products = [
    { name: "Тормозные колодки", price: 1800, img: "https://via.placeholder.com/220x140?text=Тормозные+колодки" },
    { name: "Масляный фильтр", price: 450, img: "https://via.placeholder.com/220x140?text=Масляный+фильтр" },
    { name: "Аккумулятор 60Ah", price: 6900, img: "https://via.placeholder.com/220x140?text=Аккумулятор+60Ah" },
    { name: "Воздушный фильтр", price: 600, img: "https://via.placeholder.com/220x140?text=Воздушный+фильтр" },
    { name: "Свечи зажигания", price: 1300, img: "https://via.placeholder.com/220x140?text=Свечи+зажигания" }
];

let cart = [];

function renderProducts(list = products) {
    const box = document.getElementById("products");
    box.innerHTML = "";
    list.forEach((p, i) => {
        const el = document.createElement('div');
        el.className = 'product';
        el.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price} ₽</p>
            <button data-index="${i}">Добавить</button>
        `;
        el.querySelector('button').addEventListener('click', () => addToCart(i));
        box.appendChild(el);
    });
}

renderProducts();

function addToCart(index) {
    const p = products[index];
    cart.push({ ...p });
    document.getElementById("cart-count").textContent = cart.length;
}

document.getElementById("cart-btn").onclick = (e) => {
    e.preventDefault();
    openCart();
};

function openCart() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    const list = document.getElementById("cart-list");
    list.innerHTML = "";

    let total = 0;

    cart.forEach((item, idx) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} — ${item.price} ₽`;
        // add remove button
        const btn = document.createElement('button');
        btn.textContent = 'Удалить';
        btn.style.marginLeft = '10px';
        btn.onclick = () => { removeFromCart(idx); };
        li.appendChild(btn);
        list.appendChild(li);
        total += item.price;
    });

    document.getElementById("cart-total").textContent = total;
}

function closeCart() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    document.getElementById("cart-count").textContent = cart.length;
    openCart();
}

function searchProducts() {
    const q = document.getElementById("search").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(q));
    renderProducts(filtered);
}
