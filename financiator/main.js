// js/main.js

// --- 1. Definición de Constantes y Selectores del DOM ---
const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const CRYPTO_IDS = ['bitcoin', 'ethereum', 'ripple', 'litecoin', 'cardano']; // Cryptos a seguir
const CURRENCY = 'usd'; // Moneda base para los precios
const REFRESH_INTERVAL_MS = 60000; // Intervalo de actualización de datos (60 segundos)
const CHART_UPDATE_INTERVAL_MS = 3000; // Intervalo para el "movimiento" del gráfico (3 segundos)
const CHART_HISTORY_DAYS = 7; // Días de historial para el gráfico de precios

const cryptoPriceElements = {}; // Para almacenar referencias a los elementos de precio
const cryptoChangeElements = {}; // Para almacenar referencias a los elementos de cambio
const cryptoTableBody = document.getElementById('crypto-table-body');
const priceChartCanvas = document.getElementById('priceChart');
let priceChart; // Variable para almacenar la instancia de Chart.js


// --- 2. Funciones de Ayuda ---

/**
 * Formatea un número como moneda.
 * @param {number} value El valor a formatear.
 * @returns {string} El valor formateado como USD.
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 6 // Para mostrar la precisión de cripto
    }).format(value);
}

/**
 * Formatea un porcentaje de cambio.
 * @param {number} value El porcentaje de cambio.
 * @returns {string} El porcentaje formateado con signo y color.
 */
function formatPercentageChange(value) {
    const sign = value >= 0 ? '+' : '';
    const colorClass = value >= 0 ? 'text-success' : 'text-danger'; // Clases CSS definidas en main.css
    return `<span class="${colorClass}">${sign}${value.toFixed(2)}%</span>`;
}

/**
 * Actualiza la interfaz de usuario con los datos de las criptomonedas.
 * @param {object} data Objeto con los datos de las criptomonedas.
 */
function updateUI(data) {
    Object.keys(data).forEach(id => {
        const crypto = data[id];
        if (cryptoPriceElements[id]) {
            cryptoPriceElements[id].textContent = formatCurrency(crypto.current_price);
        }
        if (cryptoChangeElements[id]) {
            cryptoChangeElements[id].innerHTML = formatPercentageChange(crypto.price_change_percentage_24h);
        }
    });

    // Actualizar también la tabla si existe
    if (cryptoTableBody) {
        cryptoTableBody.innerHTML = ''; // Limpiar tabla
        CRYPTO_IDS.forEach(id => {
            const crypto = data[id];
            if (crypto) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${id.charAt(0).toUpperCase() + id.slice(1)}</td>
                    <td>${crypto.symbol.toUpperCase()}</td>
                    <td>${formatCurrency(crypto.current_price)}</td>
                    <td>${formatPercentageChange(crypto.price_change_percentage_24h)}</td>
                    <td>${formatCurrency(crypto.total_volume)}</td>
                    <td>${formatCurrency(crypto.market_cap)}</td>
                `;
                cryptoTableBody.appendChild(row);
            }
        });
    }
}

/**
 * Obtiene los datos actuales de las criptomonedas desde CoinGecko.
 */
async function fetchCryptoPrices() {
    try {
        const ids = CRYPTO_IDS.join(',');
        const response = await fetch(`${API_BASE_URL}/simple/price?ids=${ids}&vs_currencies=${CURRENCY}&include_24hr_change=true`);
        // O: const response = await fetch(`${API_BASE_URL}/coins/markets?vs_currency=${CURRENCY}&ids=${ids}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`);
        const data = await response.json();

        // Si se usa la API de markets, hay que reestructurar los datos un poco
        const formattedData = {};
        CRYPTO_IDS.forEach(id => {
            if (data[id]) {
                 // Si se usa simple/price
                formattedData[id] = {
                    current_price: data[id][CURRENCY],
                    price_change_percentage_24h: data[id][CURRENCY + '_24h_change']
                };
                // Si se usa coins/markets (más completo)
                // const marketData = data.find(item => item.id === id);
                // if (marketData) {
                //     formattedData[id] = {
                //         current_price: marketData.current_price,
                //         price_change_percentage_24h: marketData.price_change_percentage_24h_in_currency,
                //         total_volume: marketData.total_volume,
                //         market_cap: marketData.market_cap
                //     };
                // }
            }
        });

        updateUI(formattedData);
        console.log('Precios de criptomonedas actualizados:', formattedData);

    } catch (error) {
        console.error('Error al obtener los precios de criptomonedas:', error);
    }
}

/**
 * Obtiene el historial de precios para el gráfico.
 * @param {string} cryptoId ID de la criptomoneda.
 * @param {number} days Número de días de historial.
 * @returns {Array<Array<number>>} Array de [timestamp, price].
 */
async function fetchPriceHistory(cryptoId, days) {
    try {
        const response = await fetch(`${API_BASE_URL}/coins/${cryptoId}/market_chart?vs_currency=${CURRENCY}&days=${days}&interval=daily`);
        const data = await response.json();
        return data.prices; // Retorna un array de [timestamp, price]
    } catch (error) {
        console.error(`Error al obtener el historial de precios para ${cryptoId}:`, error);
        return [];
    }
}


// --- 3. Inicialización y Lógica del Gráfico ---

/**
 * Inicializa el gráfico de precios con Chart.js.
 * @param {string} cryptoId ID de la criptomoneda para el gráfico inicial.
 */
async function initializeChart(cryptoId = CRYPTO_IDS[0]) {
    const historicalData = await fetchPriceHistory(cryptoId, CHART_HISTORY_DAYS);
    const labels = historicalData.map(item => new Date(item[0]).toLocaleDateString());
    const dataPoints = historicalData.map(item => item[1]);

    const ctx = priceChartCanvas.getContext('2d');
    priceChart = new Chart(ctx, {
        type: 'line', // Tipo de gráfico de línea
        data: {
            labels: labels,
            datasets: [{
                label: `${cryptoId.charAt(0).toUpperCase() + cryptoId.slice(1)} Price (${CURRENCY.toUpperCase()})`,
                data: dataPoints,
                borderColor: '#00C851', // Color de línea verde para prestigio
                backgroundColor: 'rgba(0, 200, 81, 0.2)', // Fondo suave del área
                fill: true, // Rellenar debajo de la línea
                tension: 0.3, // Suavidad de la línea (0.3 para un aspecto más fluido)
                pointRadius: 0, // Ocultar los puntos para un gráfico más limpio
                pointHitRadius: 10,
                borderWidth: 2,
                pointBorderColor: '#00C851',
                pointBackgroundColor: '#fff',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000, // Duración de la animación inicial en ms
                easing: 'easeInOutQuad',
                onComplete: () => {
                    // Animación de "movimiento" continuo al completar la carga inicial
                    setInterval(updateChartDataContinuously, CHART_UPDATE_INTERVAL_MS);
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false // Ocultar líneas de grid del eje X
                    },
                    ticks: {
                        color: 'var(--color-text-secondary)',
                        autoSkip: true, // Saltar etiquetas si hay muchas
                        maxTicksLimit: 7 // Mostrar un máximo de 7 etiquetas
                    }
                },
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'var(--color-border-light)' // Líneas de grid sutiles en Y
                    },
                    ticks: {
                        color: 'var(--color-text-secondary)',
                        callback: function(value) {
                            return formatCurrency(value); // Formatear los ticks del eje Y como moneda
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Ocultar leyenda
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += formatCurrency(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            hover: {
                mode: 'nearest', // Resaltar el punto más cercano al pasar el ratón
                intersect: false,
                animationDuration: 0 // Evitar animaciones al pasar el ratón
            },
            elements: {
                line: {
                    tension: 0.4 // Para una línea más suave
                }
            }
        }
    });
}

/**
 * Simula un ligero movimiento o actualización suave del gráfico.
 * Esto es para el efecto visual "vivo", no para datos reales continuos.
 */
function updateChartDataContinuously() {
    if (!priceChart) return;

    // Simular un pequeño cambio en los últimos puntos para dar "movimiento"
    // Esto es un truco visual, no una actualización de datos en tiempo real de la API
    const currentData = priceChart.data.datasets[0].data;
    const lastIndex = currentData.length - 1;

    // Ajustar ligeramente el último punto o los últimos puntos para un efecto ondulante
    if (lastIndex > 0) {
        const lastValue = currentData[lastIndex];
        const prevValue = currentData[lastIndex - 1];
        // Pequeña variación basada en el punto anterior o un valor aleatorio muy pequeño
        const randomFluctuation = (Math.random() - 0.5) * (lastValue * 0.005); // +/- 0.5%
        currentData[lastIndex] = lastValue + randomFluctuation;

        // Si quieres un efecto más complejo, podrías mover todos los puntos ligeramente
        // for (let i = 0; i < currentData.length; i++) {
        //     currentData[i] += (Math.random() - 0.5) * (currentData[i] * 0.001);
        // }
    }

    priceChart.update('none'); // 'none' para que no haya animación en esta actualización continua
}


// --- 4. Event Listeners y Inicialización General ---

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar elementos de precios si existen en el HTML
    CRYPTO_IDS.forEach(id => {
        const priceEl = document.getElementById(`${id}-price`);
        const changeEl = document.getElementById(`${id}-24h-change`);
        if (priceEl) cryptoPriceElements[id] = priceEl;
        if (changeEl) cryptoChangeElements[id] = changeEl;
    });

    // Cargar precios iniciales al cargar la página
    fetchCryptoPrices();

    // Actualizar precios periódicamente
    setInterval(fetchCryptoPrices, REFRESH_INTERVAL_MS);

    // Inicializar el gráfico si el canvas existe
    if (priceChartCanvas) {
        initializeChart();
    }
});
