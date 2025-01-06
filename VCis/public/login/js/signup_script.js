// 이미 사용 중인 아이디 목록 + (예제 데이터)
const existingIds = JSON.parse(localStorage.getItem("userIds")) || [];
// const existingIds = ["user1", "admin", "guest"];

// DOM 요소 선택
const userIdInput = document.getElementById("user_id");
const resultMessage = document.getElementById("result_message");
const userPwInput = document.getElementById("user_pw");
const userPwConfirmInput = document.getElementById("user_pw_confirm");
const pwMessage = document.getElementById("pw_message");
const signUpButton = document.getElementById("signup_sub");

let idCheck = false, pwCheck = false;

// 아이디 입력 이벤트 처리
userIdInput.addEventListener("input", () => {
    const userId = userIdInput.value.trim(); // 입력값 가져오기

    if (!userId) {
        // 아이디가 비어있을 경우
        resultMessage.textContent = "아이디를 입력해주세요.";
        resultMessage.classList.remove("hidden");
        resultMessage.style.color = "red";
        idCheck = false;
        return;
    }

    if (existingIds.includes(userId)) {
        // 중복된 아이디인 경우
        resultMessage.textContent = "이미 사용 중인 아이디입니다.";
        resultMessage.classList.remove("hidden");
        resultMessage.style.color = "red";
        idCheck = false;
    } else {
        // 사용 가능한 아이디인 경우
        resultMessage.textContent = "사용 가능한 아이디입니다.";
        resultMessage.classList.remove("hidden");
        resultMessage.style.color = "green";
        idCheck = true;
    }
});

// 비밀번호 확인 이벤트 처리
function checkPasswordsMatch() {
    const password = userPwInput.value.trim();
    const confirmPassword = userPwConfirmInput.value.trim();

    if (!password || !confirmPassword) {
        // 비밀번호 입력이 비어있을 경우
        pwMessage.textContent = "비밀번호를 입력해주세요.";
        pwMessage.classList.remove("hidden");
        pwMessage.style.color = "red";
        pwCheck = false;
        return;
    }

    if (password === confirmPassword) {
        // 비밀번호가 일치하는 경우
        pwMessage.textContent = "비밀번호가 일치합니다.";
        pwMessage.classList.remove("hidden");
        pwMessage.style.color = "green";
        pwCheck = true;
    } else {
        // 비밀번호가 일치하지 않는 경우
        pwMessage.textContent = "비밀번호가 일치하지 않습니다.";
        pwMessage.classList.remove("hidden");
        pwMessage.style.color = "red";
        pwCheck = false;
    }
}

// 비밀번호 입력 필드 이벤트 리스너 추가
userPwInput.addEventListener("input", checkPasswordsMatch);
userPwConfirmInput.addEventListener("input", checkPasswordsMatch);


signUpButton.addEventListener("click", () => {
    const userId = userIdInput.value.trim();
    const userPw = userPwInput.value.trim();

    if (!idCheck || !pwCheck){
        alert("아이디와 비밀번호를 입력해주세요.");
        return;
    }
    else{
        existingIds.push(userId);
        localStorage.setItem("userIds", JSON.stringify(existingIds));
        localStorage.setItem(`user_${userId}`, userPw);

        alert("회원가입이 완료되었습니다.");

        userIdInput.value = "";
        userPwInput.value = "";
        userPwConfirmInput.value = "";
        resultMessage.textContent = "";
        pwMessage.textContent = "";
        
        location.href = "/";
    }
});