const pwInput = document.querySelector('.pw-input');
const pwInputNew = document.querySelector('.pw-input-new');
const pwInputConfirm = document.querySelector('.pw-input-new-confirm');
const submitButtonPw = document.querySelector('.submit-button-pw');
const closeButtonPw = document.querySelector('.close-button-pw');
const modalOverlayPw = document.querySelector('.modal-overlay-pw');

const closeModal = () => {
    modalOverlayPw.style.display = 'none';
};

closeButtonPw.addEventListener('click', closeModal);

modalOverlayPw.addEventListener('click', (e) => {
    if (e.target === modalOverlayPw) {
        closeModal();
    }
});

const changePw = () => {
    modalOverlayPw.style.display = 'flex';
};

document.getElementById('changePwForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const beforePw = pwInput.value;
    const afterPw = pwInputNew.value;
    const afterPwConfirm = pwInputConfirm.value;

    const response = await fetch('/users/changepw', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({beforePw, afterPw, afterPwConfirm}),
    });

    const data = await response.json();

    document.getElementById('changePwMsg').textContent = data.message || '';

    if (data.redirect){
        location.href = data.redirect;
    }
});