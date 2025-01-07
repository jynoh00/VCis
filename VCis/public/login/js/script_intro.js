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
}, 2000);

setTimeout(()=>{
    introText.classList.remove("visible");
    subText.classList.remove("visible");
    siteExplain.style.display = "none";
}, 3000);

setTimeout(()=>{
    finalText.classList.add("visible");
}, 4000);

setTimeout(()=>{
    hideIntroScreen();
}, 5000);

function hideIntroScreen() {
    introScreen.classList.add("hidden");
    setTimeout(() => {
        mainContent.classList.add("visible");
        location.href = '/login';
    }, 1000);
}