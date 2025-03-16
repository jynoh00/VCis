const handle = document.getElementById('handle');
const container = document.querySelector('.leverage_container');
const leverageValue = document.getElementById('leverageValue');
let isDragging = false;

function calculateLeverage(position) {
  const leverage = Math.round(((position * 123) + 2));
  return Math.min(125, Math.max(1, leverage));
}

function updateHandlePosition(e) {
  const rect = container.getBoundingClientRect();
  const x = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
  const position = x / rect.width;
  
  handle.style.left = `${x}px`;
  const leverage = calculateLeverage(position);
  leverageValue.textContent = `${leverage}배`;
}

handle.addEventListener('mousedown', (e) => {
  isDragging = true;
  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('mouseup', stopDrag);
});

function handleDrag(e) {
  if (isDragging) {
    updateHandlePosition(e);
  }
}

function stopDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', handleDrag);
  document.removeEventListener('mouseup', stopDrag);
}

handle.style.left = '15.6%';

let isFuture = true, isLimit = true, isIsol = true;

const futureModeContainer = document.querySelector('.future_mode');
const transactionModeContainer = document.querySelector('.transaction_mode');
const transactionSecondContainer = document.querySelector('.transaction_second');
const buttonLong = document.getElementById('buttonLong');
const buttonShort = document.getElementById('buttonShort');
const coinPriceContainer = document.querySelector('.coinPrice_container');
const orderPriceContainer = document.querySelector('.orderPrice_container');
const orderTypeContainer = document.querySelector('.order_type');

const changeControllerView = () => {
  if (isFuture && isLimit){ // 선물 지정가
    container.style.display = 'block';
    leverageValue.style.display = 'block';
    futureModeContainer.style.display = 'block';  
    transactionModeContainer.style.marginLeft = '0';  
    transactionSecondContainer.style.marginLeft = '0';
    buttonLong.innerText = '공매수';
    buttonShort.innerText = '공매도';
    coinPriceContainer.style.display = 'block';

    transactionModeContainer.lastElementChild.style.backgroundColor = '#4283fc';
    transactionModeContainer.firstElementChild.style.backgroundColor = '#A9A9A9';

    orderTypeContainer.firstElementChild.style.backgroundColor = '#4283fc';
    orderTypeContainer.lastElementChild.style.backgroundColor = '#A9A9A9';
  }

  if (isFuture && !(isLimit)){ // 선물 시장가
    container.style.display = 'block';
    leverageValue.style.display = 'block';
    futureModeContainer.style.display = 'block';  
    transactionModeContainer.style.marginLeft = '0';  
    transactionSecondContainer.style.marginLeft = '0';
    buttonLong.innerText = '공매수';
    buttonShort.innerText = '공매도';
    coinPriceContainer.style.display = 'none';

    transactionModeContainer.lastElementChild.style.backgroundColor = '#4283fc';
    transactionModeContainer.firstElementChild.style.backgroundColor = '#A9A9A9';

    orderTypeContainer.firstElementChild.style.backgroundColor = '#A9A9A9';
    orderTypeContainer.lastElementChild.style.backgroundColor = '#4283fc';
  }

  if (!(isFuture) && isLimit){ // 현물 지정가
    container.style.display = 'none';
    leverageValue.style.display = 'none';
    futureModeContainer.style.display = 'none';
    transactionModeContainer.style.marginLeft = '15px';
    transactionModeContainer.style.animationName = 'heightCenter';
    transactionSecondContainer.style.marginLeft = '15px';
    buttonLong.innerText = '매수';
    buttonShort.innerText = '매도';
    coinPriceContainer.style.display = 'block';

    transactionModeContainer.lastElementChild.style.backgroundColor = '#A9A9A9';
    transactionModeContainer.firstElementChild.style.backgroundColor = '#4283fc';

    orderTypeContainer.firstElementChild.style.backgroundColor = '#4283fc';
    orderTypeContainer.lastElementChild.style.backgroundColor = '#A9A9A9';
  }

  if (!(isFuture) && !(isLimit)){ // 현물 시장가
    container.style.display = 'none';
    leverageValue.style.display = 'none';
    futureModeContainer.style.display = 'none';
    transactionModeContainer.style.marginLeft = '15px';
    transactionModeContainer.style.animationName = 'heightCenter';
    transactionSecondContainer.style.marginLeft = '15px';
    buttonLong.innerText = '매수';
    buttonShort.innerText = '매도';
    coinPriceContainer.style.display = 'none';

    transactionModeContainer.lastElementChild.style.backgroundColor = '#A9A9A9';
    transactionModeContainer.firstElementChild.style.backgroundColor = '#4283fc';

    orderTypeContainer.firstElementChild.style.backgroundColor = '#A9A9A9';
    orderTypeContainer.lastElementChild.style.backgroundColor = '#4283fc';
  }
}
const limitMode = () => {
    isLimit = true;
    changeControllerView();
};

const marketMode = () => {
    isLimit = false;
    changeControllerView();
};

const spotMode = () => {
    isFuture = false;
    changeControllerView();
};
const futureMode = () => {
    isFuture = true;
    changeControllerView();
};

const inputCoinPrice = document.getElementById('inputCoinPrice');
const inputOrderPrice = document.getElementById('inputOrderPrice');

function parseNumberWithCommas(value) {
  return parseFloat(value.replace(/,/g, ''));
}

function processOrder(isLong) {
  const leverage = parseInt(leverageValue.textContent.replace('배', ''));
  const coinPrice = isLimit ? parseNumberWithCommas(inputCoinPrice.value) : null;
  const orderPrice = parseNumberWithCommas(inputOrderPrice.value);
  
  console.log(coinPrice, ' ', orderPrice);

  if (isFuture && (leverage < 1 || leverage > 125)) {
    alert('레버리지는 1에서 125 사이여야 합니다.');
    return;
  }
  
  if (isLimit && (isNaN(coinPrice) || coinPrice <= 0)) {
    alert('유효한 매수 가격을 입력하세요.');
    return;
  }
  
  if (isNaN(orderPrice) || orderPrice < 5000) {
    alert('주문 수량은 5000 이상이어야 합니다.');
    return;
  }
  
  const orderData = {
    coinName: `${document.querySelector('.coin-name').innerText.split(' ')[1].split('/')[0]}`,
    isFuture: isFuture,
    leverage: isFuture ? leverage : null,
    coinPrice: isLimit ? coinPrice : null,
    orderPrice: orderPrice,
    isMarket: !isLimit,
    isLong: isLong
  };
  
  let orderTypeMsg = '';
  
  if (isFuture) {
    orderTypeMsg = isLong ? '공매수' : '공매도';
  } else {
    orderTypeMsg = isLong ? '매수' : '매도';
  }
  
  const priceTypeMsg = isLimit ? '지정가' : '시장가';
  
  console.log(`${isFuture ? '선물' : '현물'} ${orderTypeMsg} ${priceTypeMsg} 주문 전송:`, orderData);
  
  sendOrderToServer(orderData);
}

function sendOrderToServer(orderData) {
  fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('주문 전송 실패');
    }
    return response.json();
  })
  .then(data => {
    alert('주문이 성공적으로 제출되었습니다.');
    console.log('서버 응답:', data);
  })
  .catch(error => {
    alert('주문 제출 중 오류가 발생했습니다: ' + error.message);
    console.error('오류:', error);
  });
}

buttonLong.addEventListener('click', () => {
  processOrder(true); 
});

buttonShort.addEventListener('click', () => {
  processOrder(false);
});