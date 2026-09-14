<div align="center">

# 🌤️ Previsão do Tempo (Weather App)

Uma aplicação web dinâmica que consome uma API externa para fornecer dados meteorológicos em tempo real de qualquer cidade do mundo.

[Demonstração Online](#-demonstração) • [O Que Aprendi](#-o-que-aprendi-neste-projeto) • [Funcionalidades](#-funcionalidades) • [Tecnologias](#-tecnologias) • [Como Executar](#-como-executar) • [Autor](#-autor)

[![Acessar Projeto](https://img.shields.io/badge/Acessar_Projeto-000?style=for-the-badge&logo=githubpages&logoColor=white)](https://matheus1289.github.io/previsao-tempo/)

</div>

---

## 💻 Demonstração

<p align="center">
  <img src="assets/preview.png" alt="Preview da Previsão do Tempo" width="750">
</p>

---

## 🧠 O Que Aprendi Neste Projeto

A construção deste projeto foi um excelente exercício para integrar o front-end com serviços externos, focando nos seguintes aprendizados:

* **Consumo de APIs RESTful:** Como fazer requisições HTTP para um serviço externo (como a OpenWeatherMap) para buscar dados reais em formato JSON.
* **JavaScript Assíncrono:** Domínio prático de requisições assíncronas utilizando `Fetch API`, `async` e `await`, além do tratamento de *Promises*.
* **Tratamento de Erros (Try/Catch):** Implementação de lógicas para lidar com cenários de falha, como quando o usuário digita o nome de uma cidade que não existe ou quando a API está fora do ar.
* **Manipulação e Desestruturação de JSON:** Como extrair apenas as informações úteis (temperatura, umidade, velocidade do vento) do grande volume de dados retornado pela API.
* **Atualização Dinâmica de Interface:** Modificação do DOM para exibir ícones dinâmicos correspondentes ao clima (sol, chuva, nublado) e injeção de dados na tela de forma fluida.

---

## 🚀 Funcionalidades

* [x] **Busca de cidades:** Permite ao usuário pesquisar o clima de qualquer cidade do mundo em tempo real.
* [x] **Dados detalhados:** Exibe temperatura atual, descrição do clima, porcentagem de umidade e velocidade do vento.
* [x] **Feedback visual:** Ícones ou imagens que se adaptam automaticamente ao clima atual da região pesquisada.
* [x] **Tratamento de exceções:** Alerta amigável caso a cidade não seja encontrada.

---

## 🛠️ Tecnologias Utilizadas

* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
Ter um navegador instalado e, caso tenha utilizado a API do OpenWeatherMap (ou similar), uma **API Key** válida (chave de acesso).

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/matheus1289/previsao-tempo.git](https://github.com/matheus1289/previsao-tempo.git)
