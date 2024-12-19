const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");

const introText = document.getElementById("introText");
const subText = document.getElementById("subText");
const finalText = document.getElementById("finalText");

const siteExplain = document.getElementById("explainContainer");

let step = 0;

function showNextText() {
    if (step === 0) {
        introText.classList.add("visible");
        step++;
    } else if (step === 1) {
        subText.classList.add("visible");
        step++;
    } else if (step === 2) {
        introText.classList.remove("visible");
        subText.classList.remove("visible");
        setTimeout(()=>{
            siteExplain.style.display = "none";
            finalText.classList.add("visible");
        }, 1000);
        step++;
    } else if (step === 3) {
        hideIntroScreen();
    }
}

function hideIntroScreen() {
    introScreen.classList.add("hidden");
    setTimeout(() => {
        mainContent.classList.add("visible");
    }, 1000);
}

window.addEventListener("scroll", showNextText, { passive: true });
window.addEventListener("click", showNextText);