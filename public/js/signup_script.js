document.getElementById('signupForm').addEventListener('submit', async(event) => {
    event.preventDefault(); // 기본 form 제출 동작 제거

    const userId = document.getElementById('user_id').value;
    const userPw = document.getElementById('user_pw').value;
    const userPwCheck = document.getElementById('user_pw_confirm').value;


    // AJAX 요청 (by JSON)
    const response = await fetch('/users/signup', { // json파일로 값들을 POST방식으로 전송 (/users/signup)
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({userId, userPw, userPwCheck}),
    });

    const data = await response.json(); // 앞서 전송 이후, 받은 req의 json파일을 data에 저장

    if (data.redirect){ // 기본 form 제출 방식을 제거하고 작성하였기에, JSON으로 redirect 받아와 location 처리
        // GET
        location.href = data.redirect;
    }

    document.getElementById('result_message').textContent = data.result_message || '';
    document.getElementById('pw_message').textContent = data.pw_message || '';


});