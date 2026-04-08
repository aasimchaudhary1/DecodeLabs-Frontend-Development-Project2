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