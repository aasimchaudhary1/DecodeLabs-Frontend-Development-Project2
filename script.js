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



const track = document.getElementById("track");
const dotsContainer = document.querySelector(".slider-dots");

if (track && dotsContainer) {

  let index = 0;

  const cards =
    document.querySelectorAll(".product-card");

  // RESPONSIVE CARDS
  function getVisible() {

    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 3;

    return 4;
  }

  // CARD WIDTH
  function getCardWidth() {

    return cards[0].offsetWidth + 20;

  }

  // CREATE DOTS
  function createDots() {

    dotsContainer.innerHTML = "";

    // HIDE DOTS ON MOBILE
    if(window.innerWidth < 600) return;

    cards.forEach((_, i) => {

      const dot =
        document.createElement("span");

      dot.classList.add("dot");

      if(i === 0){
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {

        index = i;

        updateSlider();

      });

      dotsContainer.appendChild(dot);

    });

  }

  // UPDATE SLIDER
  function updateSlider() {

    const visible = getVisible();

    const maxIndex =
      cards.length - visible;

    if(index > maxIndex){
      index = maxIndex;
    }

    if(index < 0){
      index = 0;
    }

    track.style.transform =
      `translateX(-${index * getCardWidth()}px)`;

    const dots =
      document.querySelectorAll(".dot");

    dots.forEach(dot =>
      dot.classList.remove("active")
    );

    if(dots[index]){
      dots[index].classList.add("active");
    }

  }

  // TOUCH SWIPE
  let startX = 0;
  let endX = 0;

  track.addEventListener("touchstart", (e) => {

      startX = e.touches[0].clientX;

  });

  track.addEventListener("touchend", (e) => {

      endX = e.changedTouches[0].clientX;

      handleSwipe();

  });

  function handleSwipe(){

      const visible = getVisible();

      const maxIndex =
        cards.length - visible;

      // SWIPE LEFT
      if(startX - endX > 50){

          index++;

          if(index > maxIndex){
              index = maxIndex;
          }

          updateSlider();

      }

      // SWIPE RIGHT
      else if(endX - startX > 50){

          index--;

          if(index < 0){
              index = 0;
          }

          updateSlider();

      }

  }

  // RESIZE
  window.addEventListener("resize", () => {

    index = 0;

    createDots();

    updateSlider();

  });

  // LOAD
  window.addEventListener("load", () => {

    createDots();

    updateSlider();

  });

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
/* ================= HERO SLIDESHOW ================= */
const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {
  let current = 0;

  function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));

    slides[current].classList.add("active");

    current++;
    if (current >= slides.length) current = 0;
  }

  setInterval(showSlides, 3000); // change every 3 seconds
}