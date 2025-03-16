const introLogoTxt = document.getElementById('intro_logo_txt');
const introLogoContainer = document.querySelector('.intro_logo_container');

setTimeout(()=>{
    introLogoTxt.style.display = 'block';
    introLogoContainer.style.animationName = 'logo_to_top';

    setTimeout(()=>{
        location.href = '/login';
    }, 2000);
}, 1000);