const mainContent = document.getElementById("mainContent");
const introScreen = document.getElementById("introScreen");

hideIntroScreen();

function hideIntroScreen() {
    introScreen.classList.add("hidden");
    setTimeout(() => {
        mainContent.classList.add("visible");
    }, 1000);
}