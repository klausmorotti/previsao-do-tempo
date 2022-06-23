// Variáveis globais
let APIkey = 'c302d2723056561752910f12ca543461';
let form = document.querySelector('form');
let buttonSearch = document.querySelector('form img');
let input = document.querySelector('form input');

// Evento de clique ao enviar formulário e ao clicar no botão da lupa
form.addEventListener('submit', (e) => {
    getValueInput(e);
})
buttonSearch.addEventListener('click', (e) => {
    getValueInput(e);
})
// função que pega o valor do input e faz requisição
let getValueInput = (e) => {
    // Prevenindo evento de submit do formulário
    e.preventDefault();

    //Pegando valor do input e verificando se está vazio
    let inputValue = input.value;
    if( inputValue !== '') {
        // Se o campo conter um valor, fazer a requisição
        getInfoWeather(inputValue);
    } else {
        input.classList.add('animation');

        setTimeout(() => {
            input.classList.remove('animation');
        }, 500)
    }
}
    
    

// Função que faz a requisição
let getInfoWeather = async (city) => {
    let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${APIkey}&lang=pt_br&units=metric`);
    let json = await request.json();
    
    if( json.cod == 200 ) {
        document.querySelector('.infoMain .info .local').style.display = 'flex';
        document.querySelector('.error').style.display = 'none';

        document.querySelector('.infoAdditional .info').style.display = 'flex';
        document.querySelector('.minionError').style.display = 'none';

        setInfoDevice(json);;
    } else {
        showError('Desculpe, Localização não encontrada..');
    }
}

// FUNÇÕES EXTRERNAS 
// Função que joga os dados na tela
let setInfoDevice = json => {
    document.querySelector('.infoMain .info .local h1').innerHTML = json.name;
    document.querySelector('.infoMain .info .local h4').innerHTML = json.sys.country;
    document.querySelector('.infoAdditional .info .infoTemperature .statusWeather img').src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
    document.querySelector('.infoAdditional .info .infoTemperature .statusWeather .descriptionImage').innerHTML = json.weather[0].description;
    document.querySelector('.infoTemperature .temperatures .tempMin h1').innerHTML = `${json.main.temp_min.toFixed(1)}°C`;
    document.querySelector('.infoTemperature .temperatures .tempMax h1').innerHTML = `${json.main.temp_max.toFixed(1)}°C`;
    document.querySelector('.infoAdditional .info .humidity .valueInfo').innerHTML = `${json.main.humidity}%`;
    document.querySelector('.infoAdditional .info .visibility .valueInfo').innerHTML = `${(json.visibility / 1000).toFixed(1)}Km`;
    document.querySelector('.infoAdditional .info .windSpeed .valueInfo').innerHTML = `${json.wind.speed.toFixed(0)}Km/h`;
}

// Função de exibir erro ao buscar localização inexistente
let showError = (msg) => {
    document.querySelector('.infoMain .info .local').style.display = 'none';
    document.querySelector('.infoAdditional .info').style.display = 'none'

    document.querySelector('.minionError').style.display = 'flex';

    document.querySelector('.error').innerHTML = msg;
    document.querySelector('.error').style.display = 'block';
}


