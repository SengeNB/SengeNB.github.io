let currentLayer = 0;
const layers = document.querySelectorAll(".layer");
const totalLayers = layers.length;
let isScrolling = false;
const scrollIndicator = document.querySelector(".scroll-down");

// 初始化时检查 "Scroll Down" 是否需要显示
updateScrollIndicator();

window.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    isScrolling = true;

    if (event.deltaY > 0 && currentLayer < totalLayers - 1) {
        currentLayer++;
    } else if (event.deltaY < 0 && currentLayer > 0) {
        currentLayer--;
    }

    document.getElementById("main-container").style.transform = `translateY(-${currentLayer * 100}vh)`;

    updateScrollIndicator();

    setTimeout(() => {
        isScrolling = false;
    }, 900);
});

// 更新 "Scroll Down" 指示器的可见性
function updateScrollIndicator() {
    if (currentLayer === totalLayers - 1) {
        scrollIndicator.style.display = "none";
    } else {
        scrollIndicator.style.display = "block";
    }
}
