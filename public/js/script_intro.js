const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");

const introText = document.getElementById("introText");
const subText = document.getElementById("subText");
const finalText = document.getElementById("finalText");

const siteExplain = document.getElementById("explainContainer");

setTimeout(()=>{
    introText.classList.add("visible");
}, 1000);

setTimeout(()=>{
    subText.classList.add("visible");
}, 2500);

setTimeout(()=>{
    introText.classList.remove("visible");
    subText.classList.remove("visible");
}, 4000);

setTimeout(()=>{
    siteExplain.style.display = "none";
    finalText.classList.add("visible");
}, 5000);

setTimeout(()=>{
    hideIntroScreen();
}, 7500);

function hideIntroScreen() {
    introScreen.classList.add("hidden");
    setTimeout(() => {
        mainContent.classList.add("visible");
        location.href = '/login';
    }, 1000);
}