document.addEventListener('DOMContentLoaded', function() {
    const inputCoinPrice = document.getElementById('inputCoinPrice');
    
    inputCoinPrice.addEventListener('input', function(e) {
        let value = this.value.replace(/[^\d]/g, '');

        if (value === '') {
            this.value = '';
            return;
        }
        const number = parseInt(value);
        this.value = number.toLocaleString('ko-KR');
    });
    
    inputCoinPrice.addEventListener('focus', function() {
        this.value = this.value.replace(/,/g, '');
    });
    
    inputCoinPrice.addEventListener('blur', function() {
        if (this.value) {
            const number = parseInt(this.value.replace(/[^\d]/g, ''));
            this.value = number.toLocaleString('ko-KR');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const inputOrderPrice = document.getElementById('inputOrderPrice');
    
    inputOrderPrice.addEventListener('input', function(e) {
        let value = this.value.replace(/[^\d]/g, '');

        if (value === '') {
            this.value = '';
            return;
        }
        const number = parseInt(value);
        this.value = number.toLocaleString('ko-KR');
    });
    
    inputOrderPrice.addEventListener('focus', function() {
        this.value = this.value.replace(/,/g, '');
    });
    
    inputOrderPrice.addEventListener('blur', function() {
        if (this.value) {
            const number = parseInt(this.value.replace(/[^\d]/g, ''));
            this.value = number.toLocaleString('ko-KR');
        }
    });
});


