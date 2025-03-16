const readMoreBtn = document.querySelector('.read_more');
const readLessBtn = document.querySelector('.read_less');
const infoDiv = document.querySelector('.info');
const dailyMoneyDiv = document.querySelector('.dailymoney_container');
const dailyButton = document.getElementById('daily_button');
let isOpen = false, clockCheck = false;

const change = () => {
    dailyMoneyDiv.style.animationName = '';
    infoDiv.style.animationName = '';
    
    if (!isOpen){
        readMoreBtn.style.display = 'none';
        infoDiv.style.animationName = 'info_show';
        infoDiv.style.display = 'block';
        dailyMoneyDiv.style.animationName = 'dailymoney_change';

        isOpen = true;
    }else{
        readMoreBtn.style.display = 'block';
        infoDiv.style.animationName = 'info_show_reverse';
        dailyMoneyDiv.style.animationName = 'dailymoney_change_reverse';
        
        isOpen = false;
    }
};

const dailyClock = () => {
    if (clockCheck){
        const time = new Date();

        const hours = (time.getHours() > 9) ? (24 - (time.getHours() - 10)) : 8 - time.getHours();
        const minutes = 59 - time.getMinutes();
        const seconds = 59 - time.getSeconds();

        const waitTime = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
        dailyButton.textContent = waitTime;
    }
};

const fetchDailyMoneyStatus = () => {
    fetch('/money/getmoney', {method: 'GET'})
        .then(response => response.json())
        .then(data => {
            if (data.redirect){
                location.href = data.redirect;
            }

            if (data.daily === true){
                dailyButton.disabled = false;
                dailyButton.textContent = '100만원 받기';
            }else{
                clockCheck = true;
                dailyButton.disabled = true;
            }
        })
        .catch(error => {
            console.error('Error fetchDailyMoneyStatus: ', error);
        });
};


document.addEventListener('DOMContentLoaded', fetchDailyMoneyStatus);
readMoreBtn.addEventListener('click', change);
readLessBtn.addEventListener('click', change);
dailyClock();
setInterval(dailyClock, 1000);