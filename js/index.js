// ============================================
// Previsão do Tempo - JavaScript
// ============================================

const API_KEY = "04cf34267eeed444425cb6317beb0665";
const API_BASE = "https://api.openweathermap.org/data/2.5";
const ICON_BASE = "https://openweathermap.org/img/wn";

// --- DOM Elements ---
const inputCidade = document.querySelector("#input-cidade");
const btnBuscar = document.querySelector("#btn-buscar");
const btnGeo = document.querySelector("#btn-geo");
const resultado = document.querySelector("#resultado");
const loadingEl = document.querySelector("#loading");
const toastContainer = document.querySelector("#toast-container");

// --- Slide / Video Background ---
let contador = 0;
const slides = document.querySelectorAll(".container .video");

function ativarSlide(index) {
    slides[index].classList.add("active");
}

function removerSlides() {
    slides.forEach((item) => item.classList.remove("active"));
}

function mudarVideo() {
    removerSlides();
    contador = contador >= slides.length - 1 ? 0 : contador + 1;
    ativarSlide(contador);
}

// --- Toast Notifications ---
function mostrarToast(mensagem, tipo = "error") {
    const icons = {
        error: "❌",
        success: "✅",
        warning: "⚠️",
    };

    const toast = document.createElement("div");
    toast.className = `toast toast-${tipo}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[tipo] || icons.error}</span>
        <span>${mensagem}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("toast-out");
        toast.addEventListener("animationend", () => toast.remove());
    }, 3500);
}

// --- Loading State ---
function mostrarLoading() {
    loadingEl.classList.add("show");
    resultado.classList.add("hide");
}

function esconderLoading() {
    loadingEl.classList.remove("show");
}

// --- Date Formatting ---
const DIAS_SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function formatarDataAtual() {
    const agora = new Date();
    const dia = DIAS_SEMANA[agora.getDay()];
    const num = agora.getDate();
    const mes = MESES[agora.getMonth()];
    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    return `${dia}, ${num} ${mes} · ${horas}:${minutos}`;
}

function getDiaSemana(timestamp) {
    const data = new Date(timestamp * 1000);
    return DIAS_SEMANA[data.getDay()].slice(0, 3);
}

// --- Display Current Weather ---
function exibirDadosAtuais(dados) {
    document.querySelector(".cidade").textContent = `${dados.name}, ${dados.sys.country}`;
    document.querySelector("#data-atual").textContent = formatarDataAtual();
    document.querySelector(".temp").textContent = `${Math.round(dados.main.temp)}°C`;
    document.querySelector(".texto-previsao").textContent = dados.weather[0].description;
    document.querySelector(".img-previsao").src = `${ICON_BASE}/${dados.weather[0].icon}@2x.png`;
    document.querySelector(".img-previsao").alt = dados.weather[0].description;

    // Extra data
    document.querySelector(".umidade-valor").textContent = `${dados.main.humidity}%`;
    document.querySelector(".vento-valor").textContent = `${Math.round(dados.wind.speed * 3.6)} km/h`;
    document.querySelector(".sensacao-valor").textContent = `${Math.round(dados.main.feels_like)}°C`;
}

// --- Display 5-Day Forecast ---
function exibirPrevisao5Dias(dados) {
    const lista = document.querySelector("#previsao-5dias-lista");
    lista.innerHTML = "";

    // Group by day (take one reading per day, around noon)
    const diasUnicos = {};
    dados.list.forEach((item) => {
        const data = new Date(item.dt * 1000);
        const chave = data.toDateString();
        const hora = data.getHours();

        // Prefer readings around noon (12h), but take any if not available
        if (!diasUnicos[chave] || Math.abs(hora - 12) < Math.abs(new Date(diasUnicos[chave].dt * 1000).getHours() - 12)) {
            diasUnicos[chave] = item;
        }
    });

    // Skip today, take next 5
    const dias = Object.values(diasUnicos).slice(1, 6);

    dias.forEach((dia) => {
        const card = document.createElement("div");
        card.className = "dia-card";
        card.innerHTML = `
            <span class="dia-nome">${getDiaSemana(dia.dt)}</span>
            <img class="dia-icon" src="${ICON_BASE}/${dia.weather[0].icon}@2x.png" alt="${dia.weather[0].description}" width="36" height="36">
            <span class="dia-temp-max">${Math.round(dia.main.temp_max)}°</span>
            <span class="dia-temp-min">${Math.round(dia.main.temp_min)}°</span>
        `;
        lista.appendChild(card);
    });
}

// --- Fetch Current Weather ---
async function buscarClima(cidade) {
    try {
        mostrarLoading();

        const resposta = await fetch(
            `${API_BASE}/weather?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&lang=pt_br&units=metric`
        );
        const dados = await resposta.json();

        if (dados.cod === "404" || dados.cod === 404) {
            esconderLoading();
            mostrarToast("Cidade não encontrada. Verifique o nome e tente novamente.", "error");
            return;
        }

        if (!resposta.ok) {
            throw new Error(dados.message || "Erro na API");
        }

        mudarVideo();
        exibirDadosAtuais(dados);

        // Fetch 5-day forecast
        await buscarPrevisao5Dias(cidade);

        esconderLoading();
        resultado.classList.remove("hide");
        // Re-trigger animation
        resultado.style.animation = "none";
        resultado.offsetHeight; // force reflow
        resultado.style.animation = "";

        mostrarToast(`Previsão carregada para ${dados.name}!`, "success");
    } catch (error) {
        esconderLoading();
        mostrarToast("Erro ao buscar dados. Verifique sua conexão e tente novamente.", "error");
        console.error("Erro na busca:", error);
    }
}

// --- Fetch by Coordinates ---
async function buscarClimaPorCoordenadas(lat, lon) {
    try {
        mostrarLoading();

        const resposta = await fetch(
            `${API_BASE}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`
        );
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.message || "Erro na API");
        }

        mudarVideo();
        exibirDadosAtuais(dados);

        // Fetch 5-day forecast by coordinates
        const respostaForecast = await fetch(
            `${API_BASE}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pt_br&units=metric`
        );
        const dadosForecast = await respostaForecast.json();
        exibirPrevisao5Dias(dadosForecast);

        esconderLoading();
        resultado.classList.remove("hide");
        resultado.style.animation = "none";
        resultado.offsetHeight;
        resultado.style.animation = "";

        mostrarToast(`Previsão carregada para ${dados.name}!`, "success");
    } catch (error) {
        esconderLoading();
        mostrarToast("Erro ao buscar dados da localização.", "error");
        console.error("Erro na busca por coordenadas:", error);
    }
}

// --- Fetch 5-Day Forecast ---
async function buscarPrevisao5Dias(cidade) {
    try {
        const resposta = await fetch(
            `${API_BASE}/forecast?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&lang=pt_br&units=metric`
        );
        const dados = await resposta.json();

        if (resposta.ok) {
            exibirPrevisao5Dias(dados);
        }
    } catch (error) {
        console.error("Erro ao buscar previsão 5 dias:", error);
    }
}

// --- Geolocation ---
function usarGeolocalizacao() {
    if (!navigator.geolocation) {
        mostrarToast("Geolocalização não suportada pelo navegador.", "warning");
        return;
    }

    mostrarToast("Obtendo sua localização...", "warning");

    navigator.geolocation.getCurrentPosition(
        (posicao) => {
            const { latitude, longitude } = posicao.coords;
            buscarClimaPorCoordenadas(latitude, longitude);
        },
        (erro) => {
            const mensagens = {
                1: "Permissão de localização negada.",
                2: "Localização indisponível.",
                3: "Tempo esgotado ao obter localização.",
            };
            mostrarToast(mensagens[erro.code] || "Erro ao obter localização.", "error");
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
}

// --- Search Handler ---
function executarBusca() {
    const cidade = inputCidade.value.trim();
    if (!cidade) {
        mostrarToast("Digite o nome de uma cidade.", "warning");
        inputCidade.focus();
        return;
    }
    buscarClima(cidade);
    inputCidade.value = "";
    inputCidade.focus();
}

// --- Event Listeners ---
btnBuscar.addEventListener("click", executarBusca);

btnGeo.addEventListener("click", usarGeolocalizacao);

inputCidade.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        executarBusca();
    }
});