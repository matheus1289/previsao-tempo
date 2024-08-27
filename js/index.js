
const key = "04cf34267eeed444425cb6317beb0665";

function colocarDadosNaTela(dados){
    console.log(dados)
    document.querySelector(".cidade").innerHTML = `Tempo em ${dados.name}`;
    document.querySelector(".temp").innerHTML = `${Math.floor(dados.main.temp)} °C`
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description;
    document.querySelector(".umidade").innerHTML = `Umidade: ${dados.main.humidity}%`;
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}


async function buscarCidade(cidade){
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`)
            .then(resposta => resposta.json());

        if (dados.cod === "404") {
            alert('Cidade não encontrada, Tente novamente');
            
            return;
        }
        mudarVideo()
        hide()
        colocarDadosNaTela(dados);

    } catch (error) {
        alert('Erro ao buscar dados. Por favor, tente novamente.');
        console.error(error);
    }
}


// slide
let contador = 0;
let slide = document.querySelectorAll('.container .video');

function adicionar(index){
    slide[index].classList.add('active'); 
}
function remove(){
    slide.forEach(item => item.classList.remove('active'));
}

function mudarVideo(){
    remove()
    if(contador == slide.length -1) {
        contador = 0
    } else {
        contador++
    }
    adicionar(contador);
}
// fim slide

function hide(){
    const caixa = document.querySelector('.caixa-media');
    caixa.classList.remove('hide');
}

function cliqueiNoBotao(){
    const cidade = document.querySelector(".input-cidade").value;
    if( cidade === ""){
        alert('Campo em branco');
    }else{
        buscarCidade(cidade);
        document.querySelector(".input-cidade").value = "";
        document.querySelector(".input-cidade").focus();

         
    }
    
}