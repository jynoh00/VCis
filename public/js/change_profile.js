const tmpImg = document.getElementById('tmpImg');
const tmpName = document.getElementById('tmpName');
const tmpExplain = document.getElementById('tmpExplain');

const nicknameInput = document.querySelector('.nickname-input');
const characterCount = document.querySelector('.character-count');
const submitButtonName = document.querySelector('.submit-button-name');
const closeButtonName = document.querySelector('.close-button-name');
const modalOverlayName = document.querySelector('.modal-overlay-name');

const explainInput = document.querySelector('.explain-input');
const characterCountExplain = document.querySelector('.character-count-explain');
const submitButtonExplain = document.querySelector('.submit-button-explain');
const closeButtonExplain = document.querySelector('.close-button-explain');
const modalOverlayExplain = document.querySelector('.modal-overlay-explain');

const closeButtonImg = document.querySelector('.close-button-img');
const modalOverlayImg = document.querySelector('.modal-overlay-img');
const imgUploadBt = document.getElementById('img_upload_bt');
const submitButtonImg = document.querySelector('.submit-button-img');


const applyBtn = document.querySelector('.apply_btn');

nicknameInput.addEventListener('input', (e) => {
    const length = e.target.value.length;
    characterCount.textContent = `${length}/12`;
    if (length < 2 || length > 12) {
        submitButtonName.disabled = true;
    }else {
        submitButtonName.disabled = false;
    }
});

explainInput.addEventListener('input', (e) => {
    const length = e.target.value.length;
    characterCountExplain.textContent = `${length}/50`;

    if (length > 50) {
        submitButtonExplain.disabled = true;
    }else {
        submitButtonExplain.disabled = false;
    }
});

const closeModal = () => {
    modalOverlayName.style.display = 'none';
    modalOverlayExplain.style.display = 'none';
    modalOverlayImg.style.display = 'none';
};

closeButtonName.addEventListener('click', closeModal);
closeButtonExplain.addEventListener('click', closeModal);
closeButtonImg.addEventListener('click', closeModal);

modalOverlayName.addEventListener('click', (e) => {
    if (e.target === modalOverlayName) {
        closeModal();
    }
});

modalOverlayExplain.addEventListener('click', (e) => {
    if (e.target === modalOverlayExplain) {
        closeModal();
    }
});

modalOverlayImg.addEventListener('click', (e) => {
    if (e.target === modalOverlayImg){
        closeModal();
    }
});


document.getElementById('changeNameForm').addEventListener('submit', async(event) => {
    event.preventDefault();

    const newNickname = nicknameInput.value;
    const response = await fetch('/users/changename', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({newNickname}),
    });

    const data = await response.json(); 

    document.getElementById('changeNameMsg').textContent = data.message || '';

    if (data.change){
        tmpName.innerText = data.nameData;
        applyBtn.style.color = '#5398ff';
        closeModal();
    }
});

document.getElementById('changeExplainForm').addEventListener('submit', async(event) => {
    event.preventDefault();

    const newExplain = explainInput.value;
    const response = await fetch('/users/changeexplain', { 
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify({newExplain}),
    });

    const data = await response.json(); 

    document.getElementById('changeExplainMsg').textContent = data.message || '';

    if (data.change){ 
        tmpExplain.innerText = data.explainData;
        applyBtn.style.color = '#5398ff';
        closeModal();
    }
});

document.getElementById('img_submit_form').addEventListener('submit', async(event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const response = await fetch('/upload', { 
        method: 'POST',
        body: formData,
    });

    const data = await response.json(); 

    if (data.change){ 
        tmpImg.src = data.url;
        applyBtn.style.color = '#5398ff';
        closeModal();
    }
});

imgUploadBt.addEventListener('change', function(){
    if (this.files.length > 0){
        submitButtonImg.disabled = false;
    }else submitButtonImg.disabled = true;
}); 

const changeName = () => {
    modalOverlayName.style.display = 'flex';
};

const changeExplain = () => {
    modalOverlayExplain.style.display = 'flex';
}

const changeImg = () => {
    modalOverlayImg.style.display = 'flex';
}