let loadTimer;
let unitSet = '1';
let isLoading = false;

const onLoad = async (market = 'KRW-BTC', unit = unitSet, name = '비트코인') => {
    if (isLoading) return;

    try{
        isLoading = true;
        let res = await getBitPrice({count: 200, market, unit, name});
        drawChart(res.trace, res.info);

        isLoading = false;
        loadTimer = setTimeout(() => onLoad(market, unit, name), 1000);
    }catch(error){
        console.error("API 요청 오류:", error);
        isLoading = false;
        loadTimer = setTimeout(() => onLoad(market, unit, name), 5000);
    }
};

const getBitPrice = async ({count, market, unit, name}) => {
    let url = `https://api.upbit.com/v1/candles/minutes/${unit}?market=${market}&count=${count}`;
    
    try{
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`API 응답 오류: ${response.status}`);
        }
        const prices = await response.json();

        if (!prices || prices.length === 0){
            throw new Error("데이터가 없습니다");
        }

        let pricesSorted = prices.sort((a, b) => a.timestamp - b.timestamp);

        let x = [];
        let high = [];
        let low = [];
        let open = [];
        let close = [];

        let info = {};

        let lowest_price = pricesSorted[0].low_price;
        let highest_price = pricesSorted[0].high_price;

        pricesSorted.forEach(p => {
            x.push(p.candle_date_time_kst);
            high.push(p.high_price);
            low.push(p.low_price);
            open.push(p.opening_price);
            close.push(p.trade_price);

            lowest_price = lowest_price > p.low_price ? p.low_price : lowest_price;
            highest_price = highest_price < p.high_price ? p.high_price : highest_price;
        });

        info = {
            lowest_price,
            highest_price,
            market,
            name
        };

        let trace = {
            x,
            high,
            low,
            open,
            close,
            decreasing: {line: {color: '#0066ff'}},
            increasing: {line: {color: '#ef3e3e'}},
            line: {color: 'rgba(31,119,180,1)'},
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
        };

        return {trace, info};
    }catch(error){
        console.error(`getBitPrice 오류(${market}): ${error.message}`);
        throw error;
    }
};

const drawChart = async (trace, info) => {
    try{
        trace.decreasing.line.color = '#ff4d4d';  
        trace.increasing.line.color = '#26df8b';  
        trace.decreasing.fillcolor = '#ff4d4d';   
        trace.increasing.fillcolor = '#26df8b';   
        
        let data = [trace];
    
        let yaxisFormat = ',d'; 
        let scaleFactor = 1;
        
        if (info.highest_price > 100000) {
            scaleFactor = 1000;
            yaxisFormat = ',.0f 천';
        
            if (info.highest_price > 1000000) {
                scaleFactor = 10000;
                yaxisFormat = ',.1f 만'; 
            }
            
            if (info.highest_price > 10000000) {
                scaleFactor = 1000000;
                yaxisFormat = ',.2f 백만';  
            }
        }
        
        const scaledLow = info.lowest_price / scaleFactor;
        const scaledHigh = info.highest_price / scaleFactor;
        
        let layout = {
            paper_bgcolor: 'rgb(32, 38, 50)',
            plot_bgcolor: 'rgb(32, 38, 50)',
            dragmode: 'zoom',
            margin: {
                r: 50,
                t: 40,
                b: 40,
                l: 50,
            },
            showlegend: false,
            xaxis: {
                autorange: true,
                domain: [0, 1],
                range: [trace.x[0], trace.x[trace.x.length-1]],
                
                type: 'date',
                rangeslider: { visible: false },
                gridcolor: '#2a2a3b',
                linecolor: '#2a2a3b',
                tickfont: { color: '#e1e1e1' },
                tickformat: '%H:%M' 
            },
            yaxis: {
                autorange: true,
                domain: [0, 1],
                range: [scaledLow * 0.995, scaledHigh * 1.005],
                type: 'linear',
                gridcolor: '#2a2a3b',
                linecolor: '#2a2a3b',
                tickfont: { color: '#e1e1e1' },
                tickformat: yaxisFormat,
                side: 'left'  
            }
        };
        
        if (scaleFactor > 1) {
            trace.high = trace.high.map(price => price / scaleFactor);
            trace.low = trace.low.map(price => price / scaleFactor);
            trace.open = trace.open.map(price => price / scaleFactor);
            trace.close = trace.close.map(price => price / scaleFactor);
        }
        
        const config = {
            responsive: true,
            displayModeBar: false  
        };
    
        Plotly.newPlot('chartDiv', data, layout, config);
    }catch(error){
        console.error('차트 그리기 에러', error);
    }
};

let updatePriceRunning = false;
let lastUpdate = {};

const updatePrice = async () => {
    if (updatePriceRunning) return;
    updatePriceRunning = true;

    const markets = ['BTC', 'ETH', 'XRP', 'SOL', 'ADA', 'HBAR', 'DOGE', 'EOS', 'SAND', 'ETC', 'USDT', 'MOVE', 'QTUM'];
    let coinPrices = {
        'BTC': 0,
        'ETH': 0,
        'XRP': 0,
        'SOL': 0,
        'ADA': 0,
        'HBAR': 0,
        'DOGE': 0,
        'EOS': 0,
        'SAND': 0,
        'ETC': 0,
        'USDT': 0,
        'MOVE': 0,
        'QTUM': 0,
    }

    let coinChanges = {};

    try {
        const marketCodes = markets.map(market => `KRW-${market}`).join(',');
        const url = `https://api.upbit.com/v1/ticker?markets=${marketCodes}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API 응답 오류: ${response.status}`);
        }
        
        const tickerData = await response.json();
        
        tickerData.forEach(ticker => {
            const coinSymbol = ticker.market.split('-')[1]; 
            coinPrices[coinSymbol] = ticker.trade_price;

            const openingPrice = ticker.opening_price;
            const currentPrice = ticker.trade_price;
            const changePercent = ((currentPrice - openingPrice) / openingPrice) * 100;
            
            coinChanges[coinSymbol] = changePercent.toFixed(2);
        });
        
        Object.keys(coinPrices).forEach(coinName => {
            if (coinPrices[coinName] !== 0) {
                const priceElement = document.getElementById(`price${coinName}`);
                if (priceElement) {
                    priceElement.innerText = coinPrices[coinName].toLocaleString();
                    
                    if (lastUpdate[coinName] && lastUpdate[coinName] !== coinPrices[coinName]) {
                        const changeClass = lastUpdate[coinName] < coinPrices[coinName] ? 'price-up' : 'price-down';
                        priceElement.classList.add(changeClass);
                        setTimeout(() => {
                            priceElement.classList.remove(changeClass);
                        }, 1000);
                    }
                    
                    lastUpdate[coinName] = coinPrices[coinName];
                }

                const changeElement = document.getElementById(`change${coinName}`);
                if (changeElement) {
                    const change = parseFloat(coinChanges[coinName]);
                    changeElement.className = change > 0 ? 'price-up' : (change < 0 ? 'price-down' : '');
                    changeElement.innerText = `${change > 0 ? '+' : ''}${change}%`;
                }
            }
        });
    } catch (error) {
        console.error(`가격 업데이트 오류: ${error.message}`);
    }

    const titlePrice = document.querySelector('.coin-price');
    const titleCoin = document.querySelector('.coin-name');
    titlePrice.innerText = coinPrices[`${titleCoin.innerText.split(' ')[1].split('/')[0]}`].toLocaleString();
    
    updatePriceRunning = false;
    setTimeout(updatePrice, 2000); 
}

function changeCoin() {
    const coinInfo = {
        'idBTC': ['비트코인 BTC/KRW', 'BTC'],
        'idETH': ['이더리움 ETH/KRW', 'ETH'],
        'idXRP': ['리플 XRP/KRW', 'XRP'],
        'idSOL': ['솔라나 SOL/KRW', 'SOL'],
        'idADA': ['에이다 ADA/KRW', 'ADA'],
        'idHBAR': ['헤데라 HBAR/KRW', 'HBAR'],
        'idDOGE': ['도지코인 DOGE/KRW', 'DOGE'],
        'idEOS': ['이오스 EOS/KRW', 'EOS'],
        'idSAND': ['샌드박스 SAND/KRW', 'SAND'],
        'idETC': ['이더리움클래식 ETC/KRW', 'ETC'],
        'idUSDT': ['테더 USDT/KRW', 'USDT'],
        'idMOVE': ['무브먼트 MOVE/KRW', 'MOVE'],
        'idQTUM': ['퀀텀 QTUM/KRW', 'QTUM'],
    };
    
    clearTimeout(loadTimer);
    isLoading = false;

    const headerCoinName = document.querySelector('.coin-name');
    const headerCoinPrice = document.querySelector('.coin-price');
    headerCoinName.innerText = `${coinInfo[this.id][0]}`;
    
    setTimeout(() => {
        onLoad(`KRW-${coinInfo[this.id][1]}`, unitSet, `${coinInfo[this.id][0].split(' ')[0]}`);
    }, 500);
};

const changeUnitTime = (newUnit) => {
    const nowCoin = document.querySelector('.coin-name');
    unitSet = newUnit;
    
    clearTimeout(loadTimer);
    isLoading = false;
    
    setTimeout(() => {
        onLoad(`KRW-${nowCoin.innerText.split(' ')[1].split('/')[0]}`, unitSet, `${nowCoin.innerText.split(' ')[0]}`);
    }, 500);    
};


const style = document.createElement('style');
style.textContent = `
.price-up {
    color: #26df8b !important;
    transition: color 0.5s;
}
.price-down {
    color: #ff4d4d !important;
    transition: color 0.5s;
}
`;
document.head.appendChild(style);

updatePrice();