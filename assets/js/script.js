https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,alerts&units=imperial&appid=dfd0fa54b8ca7bb6ab4b97c29d03aacb'


var searchBtn = document.getElementById('searchBtn');
var currentDateCity = document.querySelector('#cityDate')
var currentdDateInfo = document.querySelector('#cityDateInfo')


function findCity() {
   var city = document.getElementById('cityName').value;
   var searchHistory = document.querySelector('#searchHistory')
   var cityArr = JSON.parse(window.localStorage.getItem("cityNameInput")) || [];
    cityArr.push(city)

    clear()
    console.log(city)
    // var displayCity = document.getElementById('cityDate');
    // displayCity.innerHTML = city

   
    window.localStorage.setItem("cityNameInput", JSON.stringify(cityArr));
    localStorage.clear()
    
    var cityHistory = document.createElement("BUTTON")
    cityHistory.textContent = cityArr
    searchHistory.append(cityHistory)
    cityHistory.className = "searchBtnHistory";
    

}

//info needed - City, (Date), and icon -  Temp, wind, humidity, uv index (with color -if else statement)
var city = document.getElementById('cityName').value;

async function currentWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + 'charlotte' + '&exclude=minutely,hourly,alerts&units=imperial&appid=dfd0fa54b8ca7bb6ab4b97c29d03aacb')
    .then(response => response.json())
    .then(data => {
        var clearText = document.getElementById('cityDate');
        clearText.innerHTML = ''
  
        //Creating a route to specific API info
        var displayName = data.name
        var displaydate = data.dt

        //creating an element for each route
        var displayNameEl = document.createElement('p').innerText = displayName + ' (' + displaydate + ')'



        //append to html
        currentDateCity.append(displayNameEl);
        // currentdDateInfo
        console.log(data)
    }).catch;

}


//info needed - Date, icon, temp, wind speed, and humidity
// function fiveDayWeather() {
//     fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&exclude=minutely,hourly,alerts&units=imperial&appid=dfd0fa54b8ca7bb6ab4b97c29d03aacb').then(function (response) {
//         return response.json();
//         }).then(function (data) {
//         for(i=0; i<5; i++) {
            
//         }

//     }).catch;

// }

searchBtn.addEventListener('click', findCity);
searchBtn.addEventListener('click', currentWeather);


//function to clear out the input box
function clear() {
    cityName.value = ''
}