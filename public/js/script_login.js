const mainContent = document.getElementById("mainContent");
const introScreen = document.getElementById("introScreen");
const inputPW = document.getElementById('user_pw');
const inputID = document.getElementById('user_id');

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

introScreen.classList.add("hidden");
mainContent.classList.add("visible");