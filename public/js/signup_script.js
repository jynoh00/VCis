const inputID = document.getElementById('user_id');
const inputPW = document.getElementById('user_pw');
const inputPWConfirm = document.getElementById('user_pw_confirm');

inputID.addEventListener('input', () => {
    if (inputID.value.length > 0) inputID.style.caretColor = 'auto';
    else{
        inputID.style.caretColor = '#ffffff';
        inputID.style.caretColor = 'transparent';
    }
});

inputPW.addEventListener('input', () => {
    if (inputPW.value.length > 0) inputPW.style.caretColor = 'auto';
    else{
        inputPW.style.caretColor = '#ffffff';
        inputPW.style.caretColor = 'transparent';
    }
});

inputPWConfirm.addEventListener('input', () => {
    if (inputPWConfirm.value.length > 0) inputPWConfirm.style.caretColor = 'auto';
    else{
        inputPWConfirm.style.caretColor = '#ffffff';
        inputPWConfirm.style.caretColor = 'transparent';
    }
});


document.getElementById('signupForm').addEventListener('submit', async(event) => {
    event.preventDefault(); 

    const userId = document.getElementById('user_id').value;
    const userPw = document.getElementById('user_pw').value;
    const userPwCheck = document.getElementById('user_pw_confirm').value;

    const response = await fetch('/users/signup', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({userId, userPw, userPwCheck}),
    });

    const data = await response.json(); 

    if (data.redirect){ 
        location.href = data.redirect;
    }

    document.getElementById('result_message').textContent = data.result_message || '';
    document.getElementById('pw_message').textContent = data.pw_message || '';


});