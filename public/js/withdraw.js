const confirmBtn = document.querySelector('.button-26');
const checkBox = document.querySelector('.inp-cbx');
const withdrawContainer = document.querySelector('.withdraw_container');
const withdrawExplainContainer = document.querySelector('.withdraw_explain_container');

confirmBtn.addEventListener('click', () => {
    if (checkBox.checked){
        withdrawContainer.style.display = 'block';
        withdrawContainer.style.animationName = 'pw_show';
        withdrawExplainContainer.style.display = 'none';
    }else alert('안내 사항을 확인해주세요.');
});

document.getElementById('withdrawForm').addEventListener('submit', async(event) => {
    event.preventDefault(); 
    const userPw = document.getElementById('user_pw').value;

    const response = await fetch('/users/withdraw', { 
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({userPw}),
    });

    const data = await response.json(); 

    if (data.redirect){ 
        location.href = data.redirect;
    }

    document.getElementById('pw_message').textContent = data.pw_message || '';
});