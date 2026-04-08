const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

toggle.onclick = () => {
  nav.classList.toggle("active");
};
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        nav.classList.remove("active");
    }
});
const closeBtn = document.getElementById("close-menu");

toggle.onclick = () => {
    nav.classList.add("active");
};

closeBtn.onclick = () => {
    nav.classList.remove("active");
};

let slides = document.querySelectorAll(".slide");
let heroIndex = 0;


function showSlide(){
    slides.forEach(slide => slide.classList.remove("active"));

    heroIndex++;
    if(heroIndex >= slides.length){
        heroIndex = 0;
    }

    slides[heroIndex].classList.add("active");
}

setInterval(showSlide, 3000); // change every 3 sec
const track = document.getElementById("track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;
const totalCards = document.querySelectorAll(".product-card").length;

// 👉 detect visible cards based on screen
function getVisible(){
    if (window.innerWidth < 600) return 1;
    if (window.innerWidth < 900) return 2;
    if (window.innerWidth < 1200) return 3;
    return 4;
}

// 👉 get single card width (WITH GAP)
function getCardWidth(){
    const card = document.querySelector(".product-card");
    const gap = 20; // same as CSS
    return card.offsetWidth + gap;
}

// 👉 update slider position
function updateSlider(){
    const visible = getVisible();
    const maxIndex = totalCards - visible;

    const moveX = index * getCardWidth();

    track.style.transform = `translateX(-${moveX}px)`;

    // ✅ FIXED BUTTON LOGIC
    if(index >= maxIndex){
        nextBtn.style.display = "none";
    } else {
        nextBtn.style.display = "block";
    }

    if(index <= 0){
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "block";
    }
}

// 👉 next
function nextSlide(){
    const visible = getVisible();
    const maxIndex = totalCards - visible;

    index++;
    if(index > maxIndex) index = maxIndex;

    updateSlider();
}

// 👉 prev
function prevSlide(){
    index--;
    if(index < 0) index = 0;

    updateSlider();
}

nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

// 👉 reset on resize
window.addEventListener("resize", () => {
    index = 0;
    updateSlider();
});

// 👉 init
window.addEventListener("load", updateSlider);
const tracks = document.getElementById("reviewTrack");
const cards = document.querySelectorAll(".review-card");



function getVisible(){
    return window.innerWidth < 768 ? 1 : 2;
}

function slide(){
    const visible = getVisible();
    const total = cards.length;
    const maxIndex = total - visible;

    index++;
    if(index > maxIndex) index = 0;

    const cardWidth = cards[0].offsetWidth;   // 👈 FIXED
    const gap = 20; // same as CSS

    tracks.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
}

setInterval(slide, 3000);