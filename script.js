/* ================= MENU ================= */
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");
const closeMenu = document.getElementById("close-menu");

if (toggle && nav) {
  toggle.onclick = () => nav.classList.add("active");
}

if (closeMenu && nav) {
  closeMenu.onclick = () => nav.classList.remove("active");
}


/* ================= CART ================= */
const openCart = document.getElementById("open-cart");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCart = document.getElementById("close-cart");

if (openCart && cartSidebar) {
  openCart.onclick = () => {
    cartSidebar.classList.add("active");
    loadCart();
  };
}

if (closeCart && cartSidebar) {
  closeCart.onclick = () => {
    cartSidebar.classList.remove("active");
  };
}


/* ================= LOAD CART ================= */
function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!cartItems || !totalEl) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" class="cart-img">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price}</p>

          <div class="qty-controls">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  });

  totalEl.innerText = total;
}


/* ================= CHANGE QTY ================= */
function changeQty(index, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!cart[index]) return;

  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}


/* ================= PRODUCT PAGE ================= */
const addBtn = document.getElementById("add-to-cart");

if (addBtn) {
  const params = new URLSearchParams(window.location.search);

  const product = {
    name: params.get("name"),
    price: Number(params.get("price")),
    img: params.get("img"),
    qty: 1
  };

  document.getElementById("product-name").innerText = product.name;
  document.getElementById("product-price").innerText = "$" + product.price;
  document.getElementById("product-img").src = product.img;

  addBtn.onclick = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === product.name);

    if (existing) {
      existing.qty++;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart ");
    loadCart();
  };
}


/* ================= CHECKOUT ================= */
const checkoutBtn = document.getElementById("checkout-btn");

if (checkoutBtn) {
  checkoutBtn.onclick = () => {
    alert("Order placed successfully ");
    localStorage.removeItem("cart");
    loadCart();
  };
}


/* ================= FEATURE PRODUCT SLIDER ================= */
const track = document.getElementById("track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (track && nextBtn && prevBtn) {

  let index = 0;
  const cards = document.querySelectorAll(".product-card");

  function getVisible() {
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
  }

  function getCardWidth() {
    const card = cards[0];
    return card.offsetWidth + 20;
  }

  function updateSlider() {
    const visible = getVisible();
    const maxIndex = Math.max(cards.length - visible, 0);

    if (index > maxIndex) index = maxIndex;

    track.style.transform = `translateX(-${index * getCardWidth()}px)`;

    nextBtn.style.display = index >= maxIndex ? "none" : "block";
    prevBtn.style.display = index <= 0 ? "none" : "block";
  }

  nextBtn.onclick = () => {
    index++;
    updateSlider();
  };

  prevBtn.onclick = () => {
    index--;
    if (index < 0) index = 0;
    updateSlider();
  };

  window.addEventListener("resize", () => {
    index = 0;
    updateSlider();
  });

  window.addEventListener("load", updateSlider);
}


/* ================= REVIEW SLIDER ================= */
const reviewTrack = document.getElementById("reviewTrack");
const reviewCards = document.querySelectorAll(".review-card");

if (reviewTrack && reviewCards.length > 0) {

  let reviewIndex = 0;

  function getReviewVisible() {
    if (window.innerWidth <= 430) return 1;
    if (window.innerWidth <= 1023) return 2;
    return 3;
  }

  function slideReviews() {
    const visible = getReviewVisible();
    const maxIndex = reviewCards.length - visible;

    reviewIndex++;
    if (reviewIndex > maxIndex) reviewIndex = 0;

    const width = reviewCards[0].offsetWidth + 20;

    reviewTrack.style.transform =
      `translateX(-${reviewIndex * width}px)`;
  }

  setInterval(slideReviews, 3000);
}


/* ================= AUTO LOAD ================= */
window.addEventListener("load", loadCart);