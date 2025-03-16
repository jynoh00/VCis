const pageContainer = document.querySelector('#page_container');
let isNavigating = false;

document.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link || !link.href.startsWith(window.location.origin)) return;

    e.preventDefault();
    if (!isNavigating){
        navigateToPage(link.href);
    }
});

async function navigateToPage(url){
    isNavigating = true;

    pageContainer.style.opacity = '0';
    pageContainer.style.transform = 'translateY(-20px)';
    pageContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    try{
        await new Promise (resolve => setTimeout(resolve, 300));

        const response = await fetch(url);
        const html = await response.next();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newContent = doc.querySelector('#page_container').innerHTML;

        pageContainer.innerHTML = newContent;
        pageContainer.style.opacity = '0';
        pageContainer.style.transform = 'translateY(20px)';

        await new Promise (resolve => setTimeout(resolve, 50));

        pageContainer.style.opacity = '1';
        pageContainer.style.transform = 'translateY(0)';
        history.pushState({}, '', url);

        setTimeout(() => {
            isNavigating = false;
        }, 300);

    }catch(error){
        console.log('Page navigation failed: ', error);
        window.location.href = url;
    }
};

window.addEventListener('popstate', () => {
    if (!isNavigating){
        navigateToPage(window.location.href);
    }
});

const userAssets = document.getElementById('user_assets');
const assetValue = userAssets.innerText.split('원')[0].trim();
const numericValue = parseInt(assetValue, 10);
userAssets.innerText = numericValue.toLocaleString() + '원';