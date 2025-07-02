// --- 1. Variables Globales y Selectores del DOM ---
// Almacena selectores comunes para evitar consultas repetidas al DOM
const DOMElements = {
    // Navegación
    navTabs: document.querySelectorAll('.nav-tab'),
    calculatorSections: document.querySelectorAll('.calculator-section'),

    // Ticker en vivo
    liveTicker: document.getElementById('liveTicker'),
    btcPrice: document.getElementById('btc-price'),
    ethPrice: document.getElementById('eth-price'),
    usdArs: document.getElementById('usd-ars'),
    inflationArg: document.getElementById('inflation-arg'),
    sp500: document.getElementById('sp500'),
    oilPrice: document.getElementById('oil-price'),
    goldPrice: document.getElementById('gold-price'),

    // Dashboard
    dashboardSection: document.getElementById('dashboard'),
    dashboardGrid: document.querySelector('.dashboard-grid'),
    dashboardChartCtx: document.getElementById('dashboardChart') ? document.getElementById('dashboardChart').getContext('2d') : null,
    // Métricas del Dashboard
    dashBtcPrice: document.getElementById('dash-btc-price'),
    dashBtcChange: document.getElementById('dash-btc-change'),
    dashEthPrice: document.getElementById('dash-eth-price'),
    dashEthChange: document.getElementById('dash-eth-change'),
    dashUsdArs: document.getElementById('dash-usd-ars'),
    dashUsdChange: document.getElementById('dash-usd-change'),
    dashInflation: document.getElementById('dash-inflation'),
    dashInflationChange: document.getElementById('dash-inflation-change'),
    dashSp500: document.getElementById('dash-sp500'),
    dashSp500Change: document.getElementById('dash-sp500-change'),
    dashGold: document.getElementById('dash-gold'),
    dashGoldChange: document.getElementById('dash-gold-change'),

    // Basic Calculator
    display: document.getElementById('display'),

    // Crypto Calculator
    cryptoAmount: document.getElementById('cryptoAmount'),
    cryptoCurrency: document.getElementById('cryptoCurrency'),
    targetCurrency: document.getElementById('targetCurrency'),
    cryptoCurrentPrice: document.getElementById('cryptoCurrentPrice'),
    cryptoResults: document.getElementById('cryptoResults'),
    cryptoResultsContent: document.getElementById('cryptoResultsContent'),

    // Forex Converter
    forexAmount: document.getElementById('forexAmount'),
    fromCurrency: document.getElementById('fromCurrency'),
    toCurrency: document.getElementById('toCurrency'),
    toCurrencyPrice: document.getElementById('toCurrencyPrice'),
    forexResults: document.getElementById('forexResults'),
    forexResultsContent: document.getElementById('forexResultsContent'),

    // Inflation Calculator
    initialAmountInflation: document.getElementById('initialAmountInflation'),
    yearsInflation: document.getElementById('yearsInflation'),
    inflationRate: document.getElementById('inflationRate'),
    countryInflation: document.getElementById('countryInflation'),
    inflationResults: document.getElementById('inflationResults'),
    inflationResultsContent: document.getElementById('inflationResultsContent'),
    inflationChartCtx: document.getElementById('inflationChart') ? document.getElementById('inflationChart').getContext('2d') : null,

    // Interest Calculator
    principalInterest: document.getElementById('principalInterest'),
    rateInterest: document.getElementById('rateInterest'),
    timeInterest: document.getElementById('timeInterest'),
    timeUnitInterest: document.getElementById('timeUnitInterest'),
    compoundFrequency: document.getElementById('compoundFrequency'),
    interestResults: document.getElementById('interestResults'),
    interestResultsContent: document.getElementById('interestResultsContent'),
    interestChartCtx: document.getElementById('interestChart') ? document.getElementById('interestChart').getContext('2d') : null,

    // Loan Calculator
    loanAmount: document.getElementById('loanAmount'),
    loanInterestRate: document.getElementById('loanInterestRate'),
    loanTermYears: document.getElementById('loanTermYears'),
    loanResults: document.getElementById('loanResults'),
    loanResultsContent: document.getElementById('loanResultsContent'),
    loanChartCtx: document.getElementById('loanChart') ? document.getElementById('loanChart').getContext('2d') : null,
    amortizationTableBody: document.querySelector('#amortizationTable tbody'),

    // Investment Calculator
    initialInvestment: document.getElementById('initialInvestment'),
    monthlyContribution: document.getElementById('monthlyContribution'),
    investmentRate: document.getElementById('investmentRate'),
    investmentYears: document.getElementById('investmentYears'),
    investmentResults: document.getElementById('investmentResults'),
    investmentResultsContent: document.getElementById('investmentResultsContent'),
    investmentChartCtx: document.getElementById('investmentChart') ? document.getElementById('investmentChart').getContext('2d') : null,

    // Stocks (Pro)
    stockSymbol: document.getElementById('stockSymbol'),
    stockRange: document.getElementById('stockRange'),
    stockResults: document.getElementById('stockResults'),
    stockResultsContent: document.getElementById('stockResultsContent'),
    stockChartCtx: document.getElementById('stockChart') ? document.getElementById('stockChart').getContext('2d') : null,
    stockSymbolsDatalist: document.getElementById('stockSymbols'),

    // Commodities (Pro)
    commodityType: document.getElementById('commodityType'),
    commodityRange: document.getElementById('commodityRange'),
    commoditiesResults: document.getElementById('commoditiesResults'),
    commoditiesResultsContent: document.getElementById('commoditiesResultsContent'),
    commoditiesChartCtx: document.getElementById('commoditiesChart') ? document.getElementById('commoditiesChart').getContext('2d') : null,

    // News & Tips
    newsCategory: document.getElementById('newsCategory'),
    newsFeed: document.getElementById('newsFeed'),
    investmentTips: document.getElementById('investmentTips'),

    // Education
    educationCategoryBtns: document.querySelectorAll('.education-category-btn'),
    educationArticlesContainer: document.getElementById('educationArticles'),
    educationArticles: document.querySelectorAll('.education-article') // Para control local
};

// Instancias de Chart.js
let dashboardChartInstance = null;
let inflationChartInstance = null;
let interestChartInstance = null;
let loanChartInstance = null;
let investmentChartInstance = null;
let stockChartInstance = null;
let commoditiesChartInstance = null;

// --- 2. Utilidades y Helpers ---

/**
 * Formatea un número como moneda.
 * @param {number} amount
 * @param {string} currencyCode - Ej. 'USD', 'ARS'
 * @param {string} locale - Ej. 'en-US', 'es-AR'
 * @returns {string} Formatted string
 */
function formatCurrency(amount, currencyCode = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Formatea un número como porcentaje.
 * @param {number} value
 * @returns {string} Formatted string
 */
function formatPercentage(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value / 100);
}

/**
 * Muestra u oculta un panel de resultados con animación.
 * @param {HTMLElement} panelElement - El elemento del panel de resultados.
 * @param {string} contentHtml - El contenido HTML a insertar en el panel.
 * @param {HTMLElement} [contentTarget=panelElement] - El elemento donde se insertará el HTML (por defecto el panel).
 */
function animateResultsPanel(panelElement, contentHtml, contentTarget = panelElement) {
    if (!panelElement) return;

    // Si el panel ya está visible, ocúltalo primero con fade-out
    if (panelElement.style.display !== 'none' && panelElement.classList.contains('fade-in-up')) {
        panelElement.classList.remove('fade-in-up');
        panelElement.classList.add('fade-out-down'); // Clase CSS para animar salida
        panelElement.addEventListener('animationend', function handler() {
            panelElement.classList.remove('fade-out-down');
            panelElement.style.display = 'none'; // Ocultar después de la animación de salida
            
            // Insertar nuevo contenido y animar entrada
            if (contentTarget) { // Asegurarse de que contentTarget exista
                contentTarget.innerHTML = contentHtml;
            } else { // Fallback si contentTarget es nulo o indefinido
                panelElement.innerHTML = contentHtml;
            }

            panelElement.style.display = 'block'; // Mostrar para animar entrada
            panelElement.classList.add('fade-in-up');
            panelElement.removeEventListener('animationend', handler); // Limpiar listener
        }, { once: true });
    } else {
        // Si el panel no estaba visible, simplemente inserta contenido y anima entrada
        if (contentTarget) {
            contentTarget.innerHTML = contentHtml;
        } else {
            panelElement.innerHTML = contentHtml;
        }
        panelElement.style.display = 'block';
        panelElement.classList.remove('fade-out-down'); // Asegurarse de que no tenga la clase de salida
        panelElement.classList.add('fade-in-up');
        panelElement.addEventListener('animationend', function handler() {
            panelElement.classList.remove('fade-in-up');
            panelElement.removeEventListener('animationend', handler);
        }, { once: true });
    }
}


/**
 * Muestra un mensaje de carga o error.
 * @param {HTMLElement} targetElement - El contenedor donde se mostrará el mensaje.
 * @param {string} type - 'loading' o 'error'.
 * @param {string} message - El texto del mensaje.
 */
function showStatusMessage(targetElement, type, message) {
    if (!targetElement) return;
    targetElement.innerHTML = ''; // Limpiar contenido existente

    const messageDiv = document.createElement('div');
    messageDiv.classList.add(`${type}-message`);
    if (type === 'loading') {
        messageDiv.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${message}`;
    } else if (type === 'error') {
        messageDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    }
    targetElement.appendChild(messageDiv);
}

/**
 * Inicializa o actualiza un gráfico de Chart.js
 * @param {HTMLCanvasElement} ctx - Contexto del canvas.
 * @param {string} type - Tipo de gráfico (line, bar, pie, etc.).
 * @param {Object} data - Objeto de datos para Chart.js.
 * @param {Object} options - Opciones para Chart.js.
 * @param {Chart} [chartInstance=null] - Instancia existente del gráfico.
 * @returns {Chart} La nueva o actualizada instancia del gráfico.
 */
function updateChart(ctx, type, data, options, chartInstance = null) {
    if (!ctx) {
        console.warn('Canvas context not found for chart.');
        return null;
    }
    if (chartInstance) {
        chartInstance.data = data;
        chartInstance.options = options;
        chartInstance.update();
        return chartInstance;
    } else {
        return new Chart(ctx, { type, data, options });
    }
}

// --- 3. Animaciones en Botones y Elementos (Integradas en la inicialización) ---

/**
 * Añade el efecto de "ripple" (onda) al click de un botón.
 * @param {Event} event - El evento click.
 */
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    
    circle.classList.add("ripple");

    // Remover ripples anteriores antes de añadir uno nuevo
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
        ripple.remove();
    }
    button.appendChild(circle);

    // Opcional: Remover el ripple después de la animación
    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}

/**
 * Añade efectos de hover/focus a elementos interactivos.
 */
function addInteractiveEffects() {
    // Ripple effect para todos los botones
    document.querySelectorAll(".btn, .nav-tab, .calc-btn, .education-category-btn").forEach(button => {
        button.addEventListener("click", createRipple);
    });

    // Efecto de elevación al hover para botones y tarjetas
    document.querySelectorAll(".btn, .nav-tab, .metric-card, .news-article, .education-article, .calc-btn").forEach(el => {
        el.addEventListener("mouseenter", () => el.classList.add("hover-effect"));
        el.addEventListener("mouseleave", () => el.classList.remove("hover-effect"));
    });

    // Borde interactivo para inputs al foco
    document.querySelectorAll("input, select, textarea").forEach(input => {
        input.addEventListener("focus", () => input.classList.add("focused-input"));
        input.addEventListener("blur", () => input.classList.remove("focused-input"));
    });
}


// --- 4. Lógica de Navegación de Secciones ---

function setupNavigation() {
    DOMElements.navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Eliminar clase 'active' de la pestaña y sección actuales
            const currentActiveTab = document.querySelector('.nav-tab.active');
            const currentActiveSection = document.querySelector('.calculator-section.active');

            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
            }

            if (currentActiveSection) {
                currentActiveSection.classList.remove('active'); // Remover active para iniciar fade-out si está activo
                currentActiveSection.classList.add('fade-out'); // Añadir clase de fade-out
                currentActiveSection.addEventListener('animationend', function handler() {
                    this.classList.remove('fade-out'); // Limpiar clase de fade-out
                    this.style.display = 'none'; // Ocultar completamente

                    // Mostrar la nueva sección después de la transición de salida
                    const targetSectionId = tab.dataset.section;
                    const newActiveSection = document.getElementById(targetSectionId);
                    if (newActiveSection) {
                        newActiveSection.style.display = 'block'; // Mostrar antes de añadir active para que la animación funcione
                        newActiveSection.classList.add('active'); // Añadir active para animar entrada
                    }
                    this.removeEventListener('animationend', handler); // Limpiar el listener
                }, { once: true }); // El listener se ejecuta una sola vez
            } else {
                // Si no hay sección activa al inicio, simplemente activa la nueva
                const targetSectionId = this.dataset.section;
                const newActiveSection = document.getElementById(targetSectionId);
                if (newActiveSection) {
                    newActiveSection.style.display = 'block'; // Mostrar antes de añadir active
                    newActiveSection.classList.add('active');
                }
            }

            // Añadir 'active' a la pestaña clicada
            this.classList.add('active');

            // Lógica específica al cambiar de sección (ej. cargar datos si es necesario)
            if (tab.dataset.section === 'dashboard') {
                fetchDashboardData();
            } else if (tab.dataset.section === 'news') {
                fetchNews();
            } else if (tab.dataset.section === 'education') {
                filterEducationArticles('basics'); // Muestra los básicos por defecto al entrar
            }
            // Agrega lógica para otras secciones que necesiten inicialización al activarse
        });
    });

    // Activa la pestaña del dashboard al cargar la página
    const initialTab = document.querySelector('.nav-tab[data-section="dashboard"]');
    if (initialTab) {
        initialTab.click(); // Simula un click para activar la sección inicial y sus animaciones
    }
}


// --- 5. Lógica de Calculadoras y APIs ---

// 5.1 Ticker y Dashboard (Datos en Tiempo Real)
let lastDashboardData = {}; // Para comparar cambios

async function fetchDashboardData() {
    showStatusMessage(DOMElements.dashboardGrid, 'loading', 'Loading real-time data...');
    try {
        // APIs de ejemplo - Usar las tuyas reales si tienes claves
        // Crypto (CoinGecko)
        const cryptoResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true');
        const cryptoData = await cryptoResponse.json();

        // USD/ARS (Ejemplo de API ficticia o de un proveedor real si tienes)
        // const forexResponse = await fetch('https://api.example.com/forex/USDARS');
        // const forexData = await forexResponse.json();
        // Simulamos datos de USD/ARS y su cambio (Argentina time, so ARS makes sense)
        const usdArsValue = (Math.random() * (1200 - 900) + 900).toFixed(2);
        const usdArsChange = (Math.random() * 5 - 2.5).toFixed(2); // +/- 2.5%

        // Inflación (Ejemplo de API o datos simulados)
        // const inflationResponse = await fetch('https://api.example.com/inflation/ARG');
        // const inflationData = await inflationResponse.json();
        // Simulamos datos de inflación (Argentina)
        const currentYearInflation = (Math.random() * (250 - 150) + 150).toFixed(2); // Anual
        const currentMonthInflation = (Math.random() * (20 - 5) + 5).toFixed(2); // Mensual

        // S&P 500 (Ejemplo de API)
        // const sp500Response = await fetch('https://api.example.com/sp500');
        // const sp500Data = await sp500Response.json();
        // Simulamos S&P 500
        const sp500Value = (Math.random() * (5500 - 4500) + 4500).toFixed(2);
        const sp500Change = (Math.random() * 2 - 1).toFixed(2); // +/- 1%

        // Oil (WTI)
        // const oilResponse = await fetch('https://api.example.com/oil');
        // const oilData = await oilResponse.json();
        const oilValue = (Math.random() * (85 - 70) + 70).toFixed(2);
        const oilChange = (Math.random() * 3 - 1.5).toFixed(2);

        // Gold (oz)
        // const goldResponse = await fetch('https://api.example.com/gold');
        // const goldData = await goldResponse.json();
        const goldValue = (Math.random() * (2400 - 2000) + 2000).toFixed(2);
        const goldChange = (Math.random() * 1.5 - 0.75).toFixed(2);


        // Reconstruye el contenido del dashboardgrid para limpiar mensajes de carga
        DOMElements.dashboardGrid.innerHTML = `
            <div class="metric-card">
                <div class="metric-icon"><i class="fab fa-bitcoin"></i></div>
                <div class="metric-value" id="dash-btc-price">$0</div>
                <div class="metric-label">Bitcoin (BTC)</div>
                <div class="metric-change" id="dash-btc-change">+0.00%</div>
            </div>
            <div class="metric-card">
                <div class="metric-icon"><i class="fab fa-ethereum"></i></div>
                <div class="metric-value" id="dash-eth-price">$0</div>
                <div class="metric-label">Ethereum (ETH)</div>
                <div class="metric-change" id="dash-eth-change">+0.00%</div>
            </div>
            <div class="metric-card">
                <div class="metric-icon"><i class="fas fa-dollar-sign"></i></div>
                <div class="metric-value" id="dash-usd-ars">$0</div>
                <div class="metric-label">USD/ARS</div>
                <div class="metric-change" id="dash-usd-change">+0.00%</div>
            </div>
            <div class="metric-card">
                <div class="metric-icon"><i class="fas fa-percentage"></i></div>
                <div class="metric-value" id="dash-inflation">0%</div>
                <div class="metric-label">ARG Inflation (Annual)</div>
                <div class="metric-change" id="dash-inflation-change">Monthly: 0%</div>
            </div>
            <div class="metric-card">
                <div class="metric-icon"><i class="fas fa-chart-area"></i></div>
                <div class="metric-value" id="dash-sp500">0</div>
                <div class="metric-label">S&P 500</div>
                <div class="metric-change" id="dash-sp500-change">+0.00%</div>
            </div>
            <div class="metric-card">
                <div class="metric-icon"><i class="fas fa-coins"></i></div>
                <div class="metric-value" id="dash-gold">$0</div>
                <div class="metric-label">Gold (oz)</div>
                <div class="metric-change" id="dash-gold-change">+0.00%</div>
            </div>
        `;
        // Vuelve a poblar los DOMElements si el HTML se reconstruyó
        // (Esto es crucial si el DOM se manipula así, si no, los selectores iniciales se hacen nulos)
        Object.assign(DOMElements, {
            dashBtcPrice: document.getElementById('dash-btc-price'),
            dashBtcChange: document.getElementById('dash-btc-change'),
            dashEthPrice: document.getElementById('dash-eth-price'),
            dashEthChange: document.getElementById('dash-eth-change'),
            dashUsdArs: document.getElementById('dash-usd-ars'),
            dashUsdChange: document.getElementById('dash-usd-change'),
            dashInflation: document.getElementById('dash-inflation'),
            dashInflationChange: document.getElementById('dash-inflation-change'),
            dashSp500: document.getElementById('dash-sp500'),
            dashSp500Change: document.getElementById('dash-sp500-change'),
            dashGold: document.getElementById('dash-gold'),
            dashGoldChange: document.getElementById('dash-gold-change'),
        });


        // Datos para actualizar
        const currentData = {
            btc: {
                price: cryptoData.bitcoin.usd,
                change: cryptoData.bitcoin.usd_24h_change
            },
            eth: {
                price: cryptoData.ethereum.usd,
                change: cryptoData.ethereum.usd_24h_change
            },
            usdArs: {
                price: parseFloat(usdArsValue),
                change: parseFloat(usdArsChange)
            },
            inflationArg: {
                annual: parseFloat(currentYearInflation),
                monthly: parseFloat(currentMonthInflation)
            },
            sp500: {
                value: parseFloat(sp500Value),
                change: parseFloat(sp500Change)
            },
            oil: {
                value: parseFloat(oilValue),
                change: parseFloat(oilChange)
            },
            gold: {
                value: parseFloat(goldValue),
                change: parseFloat(goldChange)
            }
        };

        // Actualizar Ticker en vivo
        updateTicker(currentData);

        // Actualizar Dashboard Cards con animación de cambio
        updateDashboardMetrics(currentData);

        // Actualizar Gráfico del Dashboard (ej. S&P 500 histórico simulado)
        const sp500HistoryLabels = Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`);
        const sp500HistoryData = Array.from({ length: 12 }, () => Math.random() * (5500 - 4000) + 4000);
        dashboardChartInstance = updateChart(
            DOMElements.dashboardChartCtx,
            'line',
            {
                labels: sp500HistoryLabels,
                datasets: [{
                    label: 'S&P 500 Performance (Simulated)',
                    data: sp500HistoryData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4,
                    fill: true
                }]
            },
            {
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 1500, easing: 'easeOutQuart' }, // Animación de entrada del gráfico
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: false } }
            },
            dashboardChartInstance
        );

        lastDashboardData = currentData; // Almacenar para la próxima comparación

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        showStatusMessage(DOMElements.dashboardGrid, 'error', 'Failed to load data. Please check your connection.');
        // Limpiar también el ticker si falla la carga
        DOMElements.liveTicker.innerHTML = '<span class="error-message"><i class="fas fa-exclamation-triangle"></i> Data unavailable</span>';
    }
}

// Función para actualizar el ticker con animaciones de cambio
function updateTicker(data) {
    const tickerItems = {
        'btc-price': `$${data.btc.price.toFixed(2)}`,
        'eth-price': `$${data.eth.price.toFixed(2)}`,
        'usd-ars': `$${data.usdArs.price.toFixed(2)}`,
        'inflation-arg': `${data.inflationArg.annual.toFixed(2)}% Ann.`,
        'sp500': `${data.sp500.value.toFixed(2)}`,
        'oil-price': `$${data.oil.value.toFixed(2)}`,
        'gold-price': `$${data.gold.value.toFixed(2)}`
    };

    for (const id in tickerItems) {
        const element = document.getElementById(id);
        if (element && element.textContent !== tickerItems[id]) {
            element.classList.add('fade-change'); // Activa la animación de cambio
            element.textContent = tickerItems[id];
            element.addEventListener('animationend', function handler() {
                element.classList.remove('fade-change');
                element.removeEventListener('animationend', handler);
            }, { once: true });
        }
    }
}

// Función para actualizar las métricas del dashboard con animación
function updateDashboardMetrics(data) {
    const metrics = {
        btc: {
            valueEl: DOMElements.dashBtcPrice,
            changeEl: DOMElements.dashBtcChange,
            price: data.btc.price,
            change: data.btc.change
        },
        eth: {
            valueEl: DOMElements.dashEthPrice,
            changeEl: DOMElements.dashEthChange,
            price: data.eth.price,
            change: data.eth.change
        },
        usdArs: {
            valueEl: DOMElements.dashUsdArs,
            changeEl: DOMElements.dashUsdChange,
            price: data.usdArs.price,
            change: data.usdArs.change
        },
        inflationArg: {
            valueEl: DOMElements.dashInflation,
            changeEl: DOMElements.dashInflationChange,
            price: data.inflationArg.annual, // Usamos 'price' para el valor principal
            change: data.inflationArg.monthly // Usamos 'change' para el valor secundario
        },
        sp500: {
            valueEl: DOMElements.dashSp500,
            changeEl: DOMElements.dashSp500Change,
            price: data.sp500.value,
            change: data.sp500.change
        },
        gold: {
            valueEl: DOMElements.dashGold,
            changeEl: DOMElements.dashGoldChange,
            price: data.gold.value,
            change: data.gold.change
        },
    };

    for (const key in metrics) {
        const metric = metrics[key];
        // Comprobar si el valor ha cambiado para animar
        let valueChanged = false;
        if (lastDashboardData[key] && lastDashboardData[key].price !== metric.price) {
            valueChanged = true;
        }

        // Aplicar animación de 'flash' si el valor ha cambiado
        if (valueChanged) {
            metric.valueEl.classList.add('flash-change');
            metric.changeEl.classList.add('flash-change');
            metric.valueEl.addEventListener('animationend', function handler() {
                this.classList.remove('flash-change');
                this.removeEventListener('animationend', handler);
            }, { once: true });
            metric.changeEl.addEventListener('animationend', function handler() {
                this.classList.remove('flash-change');
                this.removeEventListener('animationend', handler);
            }, { once: true });
        }

        // Actualizar valores
        if (key === 'btc' || key === 'eth' || key === 'gold' || key === 'oil') {
            metric.valueEl.textContent = formatCurrency(metric.price);
            metric.changeEl.textContent = `${metric.change > 0 ? '+' : ''}${metric.change.toFixed(2)}%`;
        } else if (key === 'usdArs') {
            metric.valueEl.textContent = formatCurrency(metric.price, 'ARS', 'es-AR');
            metric.changeEl.textContent = `${metric.change > 0 ? '+' : ''}${metric.change.toFixed(2)}%`;
        } else if (key === 'inflationArg') {
            metric.valueEl.textContent = `${metric.price.toFixed(2)}%`;
            metric.changeEl.textContent = `Monthly: ${metric.change.toFixed(2)}%`;
        } else if (key === 'sp500') {
            metric.valueEl.textContent = `${metric.price.toFixed(2)}`;
            metric.changeEl.textContent = `${metric.change > 0 ? '+' : ''}${metric.change.toFixed(2)}%`;
        }

        // Cambiar color de cambio (%)
        metric.changeEl.classList.remove('positive', 'negative');
        if (metric.change > 0) {
            metric.changeEl.classList.add('positive');
        } else if (metric.change < 0) {
            metric.changeEl.classList.add('negative');
        }
    }
}


// 5.2 Basic Calculator
let currentInput = '0';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    DOMElements.display.textContent = currentInput;
}

function appendToDisplay(num) {
    if (waitingForSecondOperand) {
        currentInput = num;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    firstOperand = null;
    waitingForSecondOperand = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

function calculate() {
    if (operator === null || waitingForSecondOperand) return;

    const secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    firstOperand = null;
    waitingForSecondOperand = true;
    updateDisplay();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (firstOperand === null) {
        firstOperand = inputValue;
    } else if (operator) {
        calculate(); // Calculate previous operation before setting new operator
        firstOperand = parseFloat(currentInput); // Update firstOperand with the result
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

// Asigna event listeners para la calculadora básica
document.querySelectorAll('.calc-btn').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (button.classList.contains('operator')) {
            handleOperator(value === '÷' ? '/' : value === '×' ? '*' : value);
        } else if (button.classList.contains('clear')) {
            clearDisplay();
        } else if (button.classList.contains('equals')) {
            calculate();
        } else if (button.textContent === '⌫') { // Backspace
            deleteLast();
        } else {
            appendToDisplay(value);
        }
    });
});


// 5.3 Crypto Calculator
async function updateCryptoCurrentPrice() {
    const cryptoId = DOMElements.cryptoCurrency.value;
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd`);
        const data = await response.json();
        const price = data[cryptoId].usd;
        DOMElements.cryptoCurrentPrice.textContent = `$${price.toFixed(2)} USD`;
    } catch (error) {
        console.error("Error fetching crypto price:", error);
        DOMElements.cryptoCurrentPrice.textContent = "Error";
    }
}

async function calculateCrypto() {
    const amount = parseFloat(DOMElements.cryptoAmount.value);
    const cryptoId = DOMElements.cryptoCurrency.value;
    const target = DOMElements.targetCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        animateResultsPanel(DOMElements.cryptoResults, `<div class="error-message">Please enter a valid amount.</div>`);
        return;
    }

    showStatusMessage(DOMElements.cryptoResultsContent, 'loading', 'Converting...');
    DOMElements.cryptoResults.style.display = 'block'; // Asegura que el panel sea visible para el mensaje de carga

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=${target}`);
        const data = await response.json();
        const conversionRate = data[cryptoId][target];

        if (!conversionRate) {
            throw new Error(`Conversion rate not found for ${cryptoId} to ${target}`);
        }

        const convertedValue = amount * conversionRate;
        const resultHtml = `
            <div class="result-item">
                <span>Converted Value:</span>
                <strong>${formatCurrency(convertedValue, target.toUpperCase())}</strong>
            </div>
            <div class="result-item">
                <span>Rate:</span>
                <strong>1 ${cryptoId.toUpperCase()} = ${formatCurrency(conversionRate, target.toUpperCase())}</strong>
            </div>
        `;
        animateResultsPanel(DOMElements.cryptoResults, resultHtml, DOMElements.cryptoResultsContent);

    } catch (error) {
        console.error("Error calculating crypto:", error);
        animateResultsPanel(DOMElements.cryptoResults, `<div class="error-message">Failed to convert. ${error.message}.</div>`, DOMElements.cryptoResultsContent);
    }
}

// 5.4 Forex Converter
async function updateForexToCurrencyPrice() {
    const from = DOMElements.fromCurrency.value;
    const to = DOMElements.toCurrency.value;

    if (from === to) {
        DOMElements.toCurrencyPrice.textContent = '1:1';
        return;
    }
    // Usaremos Fixer.io o similar para Forex si tuviéramos API Key, por ahora simulado
    try {
        // const response = await fetch(`https://api.example.com/latest?base=${from}&symbols=${to}&access_key=YOUR_API_KEY`);
        // const data = await response.json();
        // const rate = data.rates[to];
        
        // Simulación
        let rate = 1;
        if (from === 'USD' && to === 'ARS') rate = (Math.random() * (1200 - 900) + 900);
        else if (from === 'ARS' && to === 'USD') rate = 1 / (Math.random() * (1200 - 900) + 900);
        else if (from === 'EUR' && to === 'USD') rate = (Math.random() * (1.15 - 1.05) + 1.05);
        else rate = Math.random() * 1.5; // Otras conversiones aleatorias
        
        DOMElements.toCurrencyPrice.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
    } catch (error) {
        console.error("Error fetching forex rate:", error);
        DOMElements.toCurrencyPrice.textContent = "Error";
    }
}

async function calculateForex() {
    const amount = parseFloat(DOMElements.forexAmount.value);
    const from = DOMElements.fromCurrency.value;
    const to = DOMElements.toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
        animateResultsPanel(DOMElements.forexResults, `<div class="error-message">Please enter a valid amount.</div>`);
        return;
    }

    showStatusMessage(DOMElements.forexResultsContent, 'loading', 'Converting...');
    DOMElements.forexResults.style.display = 'block';

    try {
        // Simulamos la llamada a la API y el cálculo
        let rate = 1;
        if (from === to) {
            rate = 1;
        } else if (from === 'USD' && to === 'ARS') rate = (Math.random() * (1200 - 900) + 900);
        else if (from === 'ARS' && to === 'USD') rate = 1 / (Math.random() * (1200 - 900) + 900);
        else if (from === 'EUR' && to === 'USD') rate = (Math.random() * (1.15 - 1.05) + 1.05);
        else rate = Math.random() * 1.5;

        const convertedValue = amount * rate;
        const resultHtml = `
            <div class="result-item">
                <span>${amount.toFixed(2)} ${from} equals:</span>
                <strong>${formatCurrency(convertedValue, to, 'es-AR')}</strong>
            </div>
            <div class="result-item">
                <span>Exchange Rate:</span>
                <strong>1 ${from} = ${rate.toFixed(4)} ${to}</strong>
            </div>
        `;
        animateResultsPanel(DOMElements.forexResults, resultHtml, DOMElements.forexResultsContent);

    } catch (error) {
        console.error("Error calculating forex:", error);
        animateResultsPanel(DOMElements.forexResults, `<div class="error-message">Failed to convert. ${error.message}.</div>`, DOMElements.forexResultsContent);
    }
}


// 5.5 Inflation Calculator
function calculateInflation() {
    const initialAmount = parseFloat(DOMElements.initialAmountInflation.value);
    const years = parseInt(DOMElements.yearsInflation.value);
    const annualRate = parseFloat(DOMElements.inflationRate.value);
    const country = DOMElements.countryInflation.value;

    if (isNaN(initialAmount) || initialAmount <= 0 || isNaN(years) || years <= 0 || isNaN(annualRate)) {
        animateResultsPanel(DOMElements.inflationResults, `<div class="error-message">Please enter valid numbers for all fields.</div>`);
        return;
    }

    showStatusMessage(DOMElements.inflationResultsContent, 'loading', 'Calculating inflation...');
    DOMElements.inflationResults.style.display = 'block';

    // Lógica matemática de la inflación
    const inflationFactor = 1 + (annualRate / 100);
    let futureValue = initialAmount;
    const historyData = [{ year: 0, value: initialAmount, equivalent: initialAmount }];
    
    for (let i = 1; i <= years; i++) {
        futureValue *= inflationFactor;
        const equivalentValue = initialAmount / Math.pow(inflationFactor, i); // Lo que valdría hoy la plata del futuro
        historyData.push({ year: i, value: futureValue, equivalent: equivalentValue });
    }

    const valueLost = initialAmount - historyData[years].equivalent;
    const resultHtml = `
        <div class="result-item">
            <span>Initial Amount:</span>
            <strong>${formatCurrency(initialAmount, 'USD')}</strong>
        </div>
        <div class="result-item">
            <span>Equivalent Value (Future):</span>
            <strong>${formatCurrency(historyData[years].equivalent, 'USD')}</strong>
        </div>
        <div class="result-item">
            <span>Purchasing Power Lost:</span>
            <strong class="negative">${formatCurrency(valueLost, 'USD')}</strong>
        </div>
    `;
    animateResultsPanel(DOMElements.inflationResults, resultHtml, DOMElements.inflationResultsContent);

    // Datos para el gráfico
    const chartLabels = historyData.map(d => `Year ${d.year}`);
    const chartDataInitial = historyData.map(d => initialAmount);
    const chartDataEquivalent = historyData.map(d => d.equivalent);

    inflationChartInstance = updateChart(
        DOMElements.inflationChartCtx,
        'line',
        {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Initial Purchasing Power',
                    data: chartDataInitial,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: false,
                    tension: 0.1
                },
                {
                    label: 'Equivalent Future Purchasing Power',
                    data: chartDataEquivalent,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) label += formatCurrency(context.parsed.y, 'USD');
                            return label;
                        }
                    }
                }
            },
            animation: {
                duration: 1500, // Animación de entrada del gráfico
                easing: 'easeOutQuart'
            }
        },
        inflationChartInstance
    );
}


// 5.6 Interest Calculator
function calculateInterest() {
    const principal = parseFloat(DOMElements.principalInterest.value);
    const annualRate = parseFloat(DOMElements.rateInterest.value);
    let time = parseFloat(DOMElements.timeInterest.value);
    const timeUnit = DOMElements.timeUnitInterest.value;
    const compoundFreq = DOMElements.compoundFrequency.value;

    if (isNaN(principal) || principal <= 0 || isNaN(annualRate) || isNaN(time) || time <= 0) {
        animateResultsPanel(DOMElements.interestResults, `<div class="error-message">Please enter valid numbers.</div>`);
        return;
    }

    showStatusMessage(DOMElements.interestResultsContent, 'loading', 'Calculating interest...');
    DOMElements.interestResults.style.display = 'block';

    let n; // Number of times interest is compounded per year
    switch (compoundFreq) {
        case 'annually': n = 1; break;
        case 'semiannually': n = 2; break;
        case 'quarterly': n = 4; break;
        case 'monthly': n = 12; break;
        case 'daily': n = 365; break;
        default: n = 1;
    }

    // Convert time to years
    let years;
    if (timeUnit === 'months') years = time / 12;
    else if (timeUnit === 'days') years = time / 365;
    else years = time;

    // Fórmula de interés compuesto: A = P (1 + r/n)^(nt)
    const ratePerPeriod = (annualRate / 100) / n;
    const totalPeriods = n * years;
    
    const futureValue = principal * Math.pow((1 + ratePerPeriod), totalPeriods);
    const totalInterest = futureValue - principal;

    const resultHtml = `
        <div class="result-item">
            <span>Principal Amount:</span>
            <strong>${formatCurrency(principal)}</strong>
        </div>
        <div class="result-item">
            <span>Total Interest Earned:</span>
            <strong>${formatCurrency(totalInterest)}</strong>
        </div>
        <div class="result-item">
            <span>Future Value:</span>
            <strong>${formatCurrency(futureValue)}</strong>
        </div>
    `;
    animateResultsPanel(DOMElements.interestResults, resultHtml, DOMElements.interestResultsContent);

    // Gráfico de crecimiento del interés compuesto
    const chartLabels = [];
    const chartData = [];
    let currentAmount = principal;

    for (let i = 0; i <= years; i++) {
        chartLabels.push(`Year ${i}`);
        if (i === 0) {
            chartData.push(principal);
        } else {
            currentAmount = principal * Math.pow((1 + ratePerPeriod), n * i);
            chartData.push(currentAmount);
        }
    }

    interestChartInstance = updateChart(
        DOMElements.interestChartCtx,
        'line',
        {
            labels: chartLabels,
            datasets: [{
                label: 'Compound Interest Growth',
                data: chartData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) label += formatCurrency(context.parsed.y);
                            return label;
                        }
                    }
                }
            },
            scales: { y: { beginAtZero: true } },
            animation: { duration: 1500, easing: 'easeOutQuart' }
        },
        interestChartInstance
    );
}


// 5.7 Loan Calculator
function calculateLoan() {
    const loanAmount = parseFloat(DOMElements.loanAmount.value);
    const annualRate = parseFloat(DOMElements.loanInterestRate.value);
    const loanTermYears = parseInt(DOMElements.loanTermYears.value);

    if (isNaN(loanAmount) || loanAmount <= 0 || isNaN(annualRate) || isNaN(loanTermYears) || loanTermYears <= 0) {
        animateResultsPanel(DOMElements.loanResults, `<div class="error-message">Please enter valid numbers.</div>`);
        return;
    }

    showStatusMessage(DOMElements.loanResultsContent, 'loading', 'Calculating loan...');
    DOMElements.loanResults.style.display = 'block';

    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = loanTermYears * 12;

    // Fórmula para el pago mensual de un préstamo (amortización)
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    // Donde:
    // M = Pago mensual
    // P = Principal (Monto del préstamo)
    // i = Tasa de interés mensual (tasa anual / 12)
    // n = Número total de pagos (años * 12)
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow((1 + monthlyRate), totalMonths)) / (Math.pow((1 + monthlyRate), totalMonths) - 1);

    const totalPaid = monthlyPayment * totalMonths;
    const totalInterest = totalPaid - loanAmount;

    const resultHtml = `
        <div class="result-item">
            <span>Monthly Payment:</span>
            <strong>${formatCurrency(monthlyPayment)}</strong>
        </div>
        <div class="result-item">
            <span>Total Paid:</span>
            <strong>${formatCurrency(totalPaid)}</strong>
        </div>
        <div class="result-item">
            <span>Total Interest:</span>
            <strong>${formatCurrency(totalInterest)}</strong>
        </div>
    `;
    animateResultsPanel(DOMElements.loanResults, resultHtml, DOMElements.loanResultsContent);

    // Generar tabla de amortización
    let balance = loanAmount;
    let amortizationSchedule = '';
    const chartLabels = [];
    const chartPrincipalData = [];
    const chartInterestData = [];
    const chartBalanceData = [];

    for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;

        amortizationSchedule += `
            <tr>
                <td>${month}</td>
                <td>${formatCurrency(monthlyPayment)}</td>
                <td>${formatCurrency(principalPayment)}</td>
                <td>${formatCurrency(interestPayment)}</td>
                <td>${formatCurrency(Math.max(0, balance))}</td>
            </tr>
        `;
        chartLabels.push(`Month ${month}`);
        chartPrincipalData.push(principalPayment);
        chartInterestData.push(interestPayment);
        chartBalanceData.push(balance);
    }
    DOMElements.amortizationTableBody.innerHTML = amortizationSchedule;

    // Gráfico de amortización (Principal vs. Interés)
    loanChartInstance = updateChart(
        DOMElements.loanChartCtx,
        'bar',
        {
            labels: chartLabels.filter((_, i) => i % (totalMonths > 60 ? 12 : 6) === 0), // Mostrar menos etiquetas para claridad
            datasets: [
                {
                    label: 'Principal Paid',
                    data: chartPrincipalData.filter((_, i) => i % (totalMonths > 60 ? 12 : 6) === 0),
                    backgroundColor: 'rgba(75, 192, 192, 0.8)'
                },
                {
                    label: 'Interest Paid',
                    data: chartInterestData.filter((_, i) => i % (totalMonths > 60 ? 12 : 6) === 0),
                    backgroundColor: 'rgba(255, 99, 132, 0.8)'
                }
            ]
        },
        {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) label += formatCurrency(context.parsed.y);
                            return label;
                        }
                    }
                },
                stacked: true // Las barras se apilan
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            },
            animation: { duration: 1500, easing: 'easeOutQuart' }
        },
        loanChartInstance
    );
}


// 5.8 Investment Calculator
function calculateInvestment() {
    const initialInvestment = parseFloat(DOMElements.initialInvestment.value);
    const monthlyContribution = parseFloat(DOMElements.monthlyContribution.value);
    const annualRate = parseFloat(DOMElements.investmentRate.value);
    const investmentYears = parseInt(DOMElements.investmentYears.value);

    if (isNaN(initialInvestment) || initialInvestment < 0 || isNaN(monthlyContribution) || monthlyContribution < 0 ||
        isNaN(annualRate) || isNaN(investmentYears) || investmentYears <= 0) {
        animateResultsPanel(DOMElements.investmentResults, `<div class="error-message">Please enter valid numbers for all fields.</div>`);
        return;
    }

    showStatusMessage(DOMElements.investmentResultsContent, 'loading', 'Calculating investment...');
    DOMElements.investmentResults.style.display = 'block';

    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = investmentYears * 12;

    let totalInvested = initialInvestment;
    let futureValue = initialInvestment;

    const chartLabels = [];
    const chartFutureValueData = [];
    const chartTotalInvestedData = [];

    // Calcular mes a mes para el gráfico
    for (let i = 0; i <= totalMonths; i++) {
        if (i > 0) {
            futureValue = (futureValue * (1 + monthlyRate)) + monthlyContribution;
            totalInvested += monthlyContribution;
        }
        
        if (i % 12 === 0) { // Guarda datos anualmente
            chartLabels.push(`Year ${i / 12}`);
            chartFutureValueData.push(futureValue);
            chartTotalInvestedData.push(totalInvested);
        }
    }

    const totalInterestGained = futureValue - totalInvested;

    const resultHtml = `
        <div class="result-item">
            <span>Initial Investment:</span>
            <strong>${formatCurrency(initialInvestment)}</strong>
        </div>
        <div class="result-item">
            <span>Total Contributions:</span>
            <strong>${formatCurrency(totalInvested - initialInvestment)}</strong>
        </div>
        <div class="result-item">
            <span>Total Invested (Principal):</span>
            <strong>${formatCurrency(totalInvested)}</strong>
        </div>
        <div class="result-item">
            <span>Total Interest Gained:</span>
            <strong>${formatCurrency(totalInterestGained)}</strong>
        </div>
        <div class="result-item">
            <span>Future Value:</span>
            <strong>${formatCurrency(futureValue)}</strong>
        </div>
    `;
    animateResultsPanel(DOMElements.investmentResults, resultHtml, DOMElements.investmentResultsContent);

    // Gráfico de inversión
    investmentChartInstance = updateChart(
        DOMElements.investmentChartCtx,
        'line',
        {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Total Future Value',
                    data: chartFutureValueData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total Invested (Principal)',
                    data: chartTotalInvestedData,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) label += formatCurrency(context.parsed.y);
                            return label;
                        }
                    }
                }
            },
            scales: { y: { beginAtZero: true } },
            animation: { duration: 1500, easing: 'easeOutQuart' }
        },
        investmentChartInstance
    );
}

// 5.9 Stocks (Pro Feature) - Simulated
async function fetchStockSymbols() {
    // En una aplicación real, esto sería una API de búsqueda de símbolos (ej. Alpha Vantage, Finnhub)
    // Para la demo, simulamos algunos
    const symbols = [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corp.' },
        { symbol: 'GOOGL', name: 'Alphabet Inc. (Class A)' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
        { symbol: 'TSLA', name: 'Tesla Inc.' }
    ];
    DOMElements.stockSymbolsDatalist.innerHTML = symbols.map(s => `<option value="${s.symbol}">${s.name}</option>`).join('');
}

async function fetchStockData() {
    const symbol = DOMElements.stockSymbol.value.toUpperCase();
    const range = DOMElements.stockRange.value;

    if (!symbol) {
        animateResultsPanel(DOMElements.stockResults, `<div class="error-message">Please enter a stock symbol.</div>`);
        return;
    }

    showStatusMessage(DOMElements.stockResultsContent, 'loading', 'Fetching stock data...');
    DOMElements.stockResults.style.display = 'block';

    try {
        // Simulación de datos de stock (ej. para AAPL, MSFT)
        const dummyStockData = {
            'AAPL': {
                currentPrice: 215 + Math.random() * 5,
                change: (Math.random() * 4 - 2).toFixed(2),
                history: Array.from({ length: 30 }, (_, i) => 200 + Math.sin(i / 5) * 10 + Math.random() * 5)
            },
            'MSFT': {
                currentPrice: 450 + Math.random() * 8,
                change: (Math.random() * 3 - 1.5).toFixed(2),
                history: Array.from({ length: 30 }, (_, i) => 400 + Math.cos(i / 5) * 15 + Math.random() * 10)
            },
            // Agrega más símbolos si es necesario para simulación
        };

        const stock = dummyStockData[symbol];
        if (!stock) {
            throw new Error(`Data not found for symbol: ${symbol}`);
        }

        const resultHtml = `
            <div class="result-item">
                <span>Current Price:</span>
                <strong>${formatCurrency(stock.currentPrice)}</strong>
            </div>
            <div class="result-item">
                <span>24h Change:</span>
                <strong class="${stock.change > 0 ? 'positive' : 'negative'}">${stock.change}%</strong>
            </div>
        `;
        animateResultsPanel(DOMElements.stockResults, resultHtml, DOMElements.stockResultsContent);

        const chartLabels = Array.from({ length: stock.history.length }, (_, i) => `Day ${i + 1}`);
        stockChartInstance = updateChart(
            DOMElements.stockChartCtx,
            'line',
            {
                labels: chartLabels,
                datasets: [{
                    label: `${symbol} Price (${range})`,
                    data: stock.history,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: false } },
                animation: { duration: 1500, easing: 'easeOutQuart' }
            },
            stockChartInstance
        );

    } catch (error) {
        console.error("Error fetching stock data:", error);
        animateResultsPanel(DOMElements.stockResults, `<div class="error-message">Failed to load stock data. ${error.message}.</div>`, DOMElements.stockResultsContent);
    }
}

// 5.10 Commodities (Pro Feature) - Simulated
async function fetchCommodityData() {
    const commodityType = DOMElements.commodityType.value;
    const range = DOMElements.commodityRange.value;

    showStatusMessage(DOMElements.commoditiesResultsContent, 'loading', 'Fetching commodity data...');
    DOMElements.commoditiesResults.style.display = 'block';

    try {
        // Simulación de datos de commodities
        const dummyCommodityData = {
            'gold': {
                currentPrice: 2350 + Math.random() * 20,
                change: (Math.random() * 1.5 - 0.75).toFixed(2),
                history: Array.from({ length: 30 }, (_, i) => 2300 + Math.sin(i / 4) * 15 + Math.random() * 10)
            },
            'oil': {
                currentPrice: 80 + Math.random() * 2,
                change: (Math.random() * 2 - 1).toFixed(2),
                history: Array.from({ length: 30 }, (_, i) => 75 + Math.cos(i / 6) * 5 + Math.random() * 3)
            }
            // Agrega más commodities si es necesario
        };

        const commodity = dummyCommodityData[commodityType];
        if (!commodity) {
            throw new Error(`Data not found for commodity: ${commodityType}`);
        }

        const resultHtml = `
            <div class="result-item">
                <span>Current Price:</span>
                <strong>${formatCurrency(commodity.currentPrice, 'USD')}</strong>
            </div>
            <div class="result-item">
                <span>24h Change:</span>
                <strong class="${commodity.change > 0 ? 'positive' : 'negative'}">${commodity.change}%</strong>
            </div>
        `;
        animateResultsPanel(DOMElements.commoditiesResults, resultHtml, DOMElements.commoditiesResultsContent);

        const chartLabels = Array.from({ length: commodity.history.length }, (_, i) => `Day ${i + 1}`);
        commoditiesChartInstance = updateChart(
            DOMElements.commoditiesChartCtx,
            'line',
            {
                labels: chartLabels,
                datasets: [{
                    label: `${commodityType.toUpperCase()} Price (${range})`,
                    data: commodity.history,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: false } },
                animation: { duration: 1500, easing: 'easeOutQuart' }
            },
            commoditiesChartInstance
        );

    } catch (error) {
        console.error("Error fetching commodity data:", error);
        animateResultsPanel(DOMElements.commoditiesResults, `<div class="error-message">Failed to load commodity data. ${error.message}.</div>`, DOMElements.commoditiesResultsContent);
    }
}


// 5.11 News & Tips
async function fetchNews() {
    const category = DOMElements.newsCategory.value;
    showStatusMessage(DOMElements.newsFeed, 'loading', 'Loading financial news...');

    try {
        // En un entorno real, usarías una API de noticias (ej. News API, Alpha Vantage)
        // const response = await fetch(`https://api.example.com/news?category=${category}&apiKey=YOUR_API_KEY`);
        // const data = await response.json();
        
        // Simulación de noticias
        const dummyNews = {
            'cryptocurrency': [
                { title: 'Bitcoin Hits All-Time High Amid ETF Inflows', source: 'CoinDesk', date: 'July 1, 2025', summary: 'BTC price surge continues...' },
                { title: 'Ethereum London Hard Fork Set for Q3', source: 'Decrypt', date: 'June 28, 2025', summary: 'ETH network upgrade to improve...' }
            ],
            'investing': [
                { title: 'Market Sentiment Remains Positive as Q2 Earnings Roll In', source: 'Reuters', date: 'July 1, 2025', summary: 'Strong corporate results boost investor confidence...' },
                { title: 'Diversification Key Amidst Market Volatility', source: 'Bloomberg', date: 'June 29, 2025', summary: 'Financial advisors recommend balanced portfolios...' }
            ],
            'forex': [
                { title: 'USD Strengthens Against EUR on Fed Remarks', source: 'FXStreet', date: 'July 1, 2025', summary: 'Federal Reserve commentary suggests hawkish stance...' },
                { title: 'Argentine Peso Stabilizes After Recent Reforms', source: 'Buenos Aires Times', date: 'June 30, 2025', summary: 'New economic measures show signs of positive impact...' }
            ],
            'stocks': [
                { title: 'Tech Giants Lead Stock Market Rally', source: 'Wall Street Journal', date: 'July 1, 2025', summary: 'AAPL, MSFT, and GOOGL stocks show strong gains...' },
                { title: 'Energy Sector Sees Boost from Oil Price Jump', source: 'CNBC', date: 'June 27, 2025', summary: 'Higher crude oil prices drive energy stocks up...' }
            ],
            'economy': [
                { title: 'Global Inflation Concerns Ease, But Watchful Stance Remains', source: 'IMF', date: 'June 29, 2025', summary: 'Latest economic reports indicate moderating price pressures...' },
                { title: 'Job Growth Exceeds Expectations in June Report', source: 'Dept. of Labor', date: 'July 2, 2025', summary: 'Robust employment figures signal healthy economic activity...' }
            ],
            'all': [
                { title: 'Global Market Update: July 2, 2025', source: 'Global Finance', date: 'July 2, 2025', summary: 'A comprehensive overview of today\'s financial markets...' },
                { title: 'AI Investments Continue to Dominate Headlines', source: 'TechCrunch', date: 'July 1, 2025', summary: 'The race for AI supremacy heats up with new funding rounds...' }
            ]
        };

        const articles = category === 'all' ? dummyNews.all.concat(dummyNews.cryptocurrency, dummyNews.investing).sort(() => 0.5 - Math.random()).slice(0, 5) : dummyNews[category] || [];

        let newsHtml = '';
        if (articles.length === 0) {
            newsHtml = `<p class="empty-message"><i class="fas fa-info-circle"></i> No news available for this category.</p>`;
        } else {
            newsHtml = articles.map(article => `
                <div class="news-article">
                    <h4 class="news-title"><a href="#" target="_blank">${article.title}</a></h4>
                    <p class="news-source">${article.source} - ${article.date}</p>
                    <p class="news-summary">${article.summary}</p>
                </div>
            `).join('');
        }
        DOMElements.newsFeed.innerHTML = newsHtml; // Reemplaza el spinner con el contenido
        // Animación de entrada para los artículos
        document.querySelectorAll('.news-article').forEach((article, index) => {
            article.style.animationDelay = `${index * 0.1}s`; // Staggered animation
            article.classList.add('fade-in-up'); // Asumimos que esta clase está en tu CSS
        });

    } catch (error) {
        console.error("Error fetching news:", error);
        showStatusMessage(DOMElements.newsFeed, 'error', 'Failed to load news. Please try again later.');
    }
}


// 5.12 Financial Education
function filterEducationArticles(category) {
    DOMElements.educationCategoryBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    DOMElements.educationArticles.forEach(article => {
        // Reiniciar animaciones
        article.classList.remove('fade-in-up'); 
        article.style.display = 'none'; // Ocultar por defecto

        if (category === 'all' || article.dataset.category === category) {
            article.style.display = 'block'; // Mostrar el artículo
            // Pequeño retardo para animaciones escalonadas
            setTimeout(() => {
                article.classList.add('fade-in-up');
            }, 50); // Un pequeño retardo para que la transición de display se asiente
        }
    });
}

// Asigna event listeners a los botones de categoría de educación
DOMElements.educationCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterEducationArticles(btn.dataset.category);
    });
});


// --- 6. Inicialización de la Aplicación (DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Financiator Pro is loading...");

    // 6.1 Configuración de la navegación y la activación de la primera sección
    setupNavigation();

    // 6.2 Añadir efectos interactivos a todos los elementos
    addInteractiveEffects();

    // 6.3 Event Listeners específicos de calculadoras (si no se asignaron ya por clicks directos)
    if (document.querySelector('.btn[onclick="calculateCrypto()"]')) {
        document.querySelector('.btn[onclick="calculateCrypto()"]').onclick = calculateCrypto;
    }
    if (document.querySelector('.btn[onclick="calculateForex()"]')) {
        document.querySelector('.btn[onclick="calculateForex()"]').onclick = calculateForex;
    }
    if (document.querySelector('.btn[onclick="calculateInflation()"]')) {
        document.querySelector('.btn[onclick="calculateInflation()"]').onclick = calculateInflation;
    }
    if (document.querySelector('.btn[onclick="calculateInterest()"]')) {
        document.querySelector('.btn[onclick="calculateInterest()"]').onclick = calculateInterest;
    }
    if (document.querySelector('.btn[onclick="calculateLoan()"]')) {
        document.querySelector('.btn[onclick="calculateLoan()"]').onclick = calculateLoan;
    }
    if (document.querySelector('.btn[onclick="calculateInvestment()"]')) {
        document.querySelector('.btn[onclick="calculateInvestment()"]').onclick = calculateInvestment;
    }
    if (document.querySelector('.btn[onclick="fetchStockData()"]')) {
        document.querySelector('.btn[onclick="fetchStockData()"]').onclick = fetchStockData;
    }
    if (document.querySelector('.btn[onclick="fetchCommodityData()"]')) {
        document.querySelector('.btn[onclick="fetchCommodityData()"]').onclick = fetchCommodityData;
    }
    if (document.querySelector('.btn[onclick="fetchNews()"]')) {
        document.querySelector('.btn[onclick="fetchNews()"]').onclick = fetchNews;
    }

    // Actualizaciones en tiempo real y precios iniciales
    DOMElements.cryptoCurrency.addEventListener('change', updateCryptoCurrentPrice);
    DOMElements.fromCurrency.addEventListener('change', updateForexToCurrencyPrice);
    DOMElements.toCurrency.addEventListener('change', updateForexToCurrencyPrice);

    // Inicializar precios al cargar
    updateCryptoCurrentPrice();
    updateForexToCurrencyPrice();
    fetchStockSymbols(); // Carga los símbolos de acciones
    fetchNews(); // Carga las noticias iniciales
    
    // Iniciar el polling de datos del dashboard cada 30 segundos
    setInterval(fetchDashboardData, 30000); // Actualiza cada 30 segundos

    // Asegurarse de que el dashboard se cargue la primera vez
    fetchDashboardData(); 
});
