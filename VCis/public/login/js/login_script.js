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
    }, 1000);
}

const loginIdInput = document.getElementById("user_id");
const loginPwInput = document.getElementById("user_pw");
const loginMessage = document.getElementById("message");

function checkLogin() {
    const enteredId = loginIdInput.value.trim();
    const enteredPw = loginPwInput.value.trim();

    if (!enteredId || !enteredPw) {
        loginMessage.textContent = "아이디와 비밀번호를 입력해주세요.";
        loginMessage.style.color = "red";
        return;
    }

    // 로컬 스토리지에서 해당 아이디의 비밀번호 가져오기
    const storedPw = localStorage.getItem(`user_${enteredId}`);

    if (!storedPw) {
        // 아이디가 존재하지 않으면
        loginMessage.textContent = "존재하지 않는 아이디입니다.";
        loginMessage.style.color = "red";
    } else if (storedPw !== enteredPw) {
        // 비밀번호가 틀리면
        loginMessage.textContent = "비밀번호가 일치하지 않습니다.";
        loginMessage.style.color = "red";
    } else {
        // 로그인 성공
        loginMessage.textContent = "로그인 성공!";
        loginMessage.style.color = "green";
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkLogin();
    }
});

window.addEventListener("scroll", showNextText, { passive: true });
window.addEventListener("click", showNextText);