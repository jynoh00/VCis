function showSection(sectionId) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelector(`.tab[onclick="showSection('${sectionId}')"]`).classList.add('active');
    
    document.getElementById(sectionId).classList.add('active');
}

function cancelOrder(orderId) {
    console.log(`주문 ${orderId} 취소 요청`);
    alert(`주문이 취소되었습니다. (${orderId})`);
}

document.querySelectorAll('.price').forEach(element => {
    const value = element.innerText;
    if (value === '-') return; 
    
    if (!value.startsWith('+') && !value.startsWith('-')) {
        element.innerText = parseInt(value.replace(/,/g, '')).toLocaleString();
    } else {
        const sign = value.charAt(0);
        const numValue = parseInt(value.substring(1).replace(/,/g, ''));
        element.innerText = sign + numValue.toLocaleString();
    }
});