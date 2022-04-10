// selecting areas of the HTML to append to later
var inputBox = document.getElementById('cityName');
var first = document.querySelector('#dayOne')
var second = document.querySelector('#dayTwo')
var third = document.querySelector('#dayThree')
var fourth = document.querySelector('#dayFour')
var fifth = document.querySelector('#dayFive')

//grabbing the search btn
var searchBtn = document.getElementById('searchBtn');

//this takes the input that was entered and stores it while also creating a search history button 
function findCity() {
   var city = document.getElementById('cityName').value;
   var searchHistory = document.querySelector('#searchHistory')
   var cityArr = JSON.parse(window.localStorage.getItem("cityNameInput")) || [];
    cityArr.push(city)

    clear()
    console.log(city)
    var displayCity = document.getElementById('cityDate');
    displayCity.innerHTML = city

   
    window.localStorage.setItem("cityNameInput", JSON.stringify(cityArr));
    localStorage.clear()
    
    var cityHistory = document.createElement("BUTTON")
    cityHistory.textContent = cityArr
    searchHistory.append(cityHistory)
    cityHistory.className = "searchBtnHistory";
  

}
  
    first.innerText = "";
    second.innerText = "";
    third.innerText = "";
    fourth.innerText = "";
    fifth.innerText = "";

//info needed - City, (Date), and icon -  Temp, wind, humidity, uv index (with color -if else statement)
var currentIcon = document.querySelector('#cityDate');
var currentCityTemp = document.querySelector('#cityDateTemp')
var currentCityWind = document.querySelector('#cityDateWind')
var currentCityHumidity = document.querySelector('#cityDateHumidity')
var currentCityUv = document.querySelector('#cityDateUv')

var clearText = document.getElementById('cityDate');



function getCurrent() {
    var city = inputBox.value.trim(); 
    console.log(city)
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&exclude=minutely,hourly,alerts&units=imperial&appid=dfd0fa54b8ca7bb6ab4b97c29d03aacb').then(function (response) {
        return response.json();
    }).then(data => {
        clearText.innerHTML = ''
        var currentLon = data.coord.lon
        var currentLat = data.coord.lat 
        console.log(currentLon)
        console.log(currentLat)
        // Creating a route to specific API info
        var displayName = data.name
        var displayDate = moment().format('L')
        //routing the icon url
        var displayIcon = data.weather[0].icon
        var iconUrl = 'http://openweathermap.org/img/wn/' + displayIcon + '@2x.png'
        // creating an image element
        var iconImg = document.createElement("img")
        iconImg.setAttribute('src', iconUrl)
        
        // creating an element for each route
        var displayNameEl = document.createElement('p').innerText = displayName + ' (' + displayDate + ')' + ' ' 
        currentIcon.append(displayNameEl, iconImg)

        var clearWeekEl = document.querySelector('.clearLoading');
        clearWeekEl.innerHTML = ''



        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + currentLat + '&lon=' + currentLon + '&exclude=minutely,hourly,alerts&units=imperial&appid=dfd0fa54b8ca7bb6ab4b97c29d03aacb').then(function (response) {
            return response.json();
        }).then(data => {
            //Current Day 
            var displayTemp = data.daily[0].temp.day
            var displayWind = data.current.wind_speed
            var displayHumidity = data.current.humidity
            var displayUv = data.current.uvi

            
            // creating an element for each route
            var displayTempEl = document.createElement('p').innerText = 'Temp: ' + displayTemp + ' °F';
            var displayWindEl = document.createElement('p').innerText = 'Wind: ' + displayWind + ' MPH';
            var displayHumidityEl = document.createElement('p').innerText = 'Humidity: ' + displayHumidity + ' %';
            var displayUvEl = document.createElement('p').innerText = 'UV Index: ' + displayUv;
            
            //Changes the UV element's color 
            if (displayUv <= 2) {
                currentCityUv.classList.add("lowUv")
            } else if (displayUv > 2 && displayUv <= 5) {
                currentCityUv.classList.add("mediumUv")
            } else  {
                currentCityUv.classList.add("highUv")
            };

            // append to html
            currentCityTemp.append(displayTempEl)
            currentCityWind.append(displayWindEl)
            currentCityHumidity.append(displayHumidityEl)
            currentCityUv.append(displayUvEl)

            var weekDataAr = []


            // 5 - Day forecast 
            for (i = 0; i < 5; i++) {
                var weekTime = moment().add(i + 1, 'days').format('L')
                var weekTemp = data.daily[i].temp.day
                var weekWind = data.daily[i].wind_speed
                var weekHumidity = data.daily[i].humidity
                var weekIcon = data.daily[i].weather[0].icon

                var weekIconUrl = 'http://openweathermap.org/img/wn/' + weekIcon + '@2x.png'
                
                weekDataAr.push(weekTime, weekTemp, weekWind, weekHumidity, weekIconUrl) 
            }

                // creating an element for each route

                //Day 1
                var displayWeekTime = document.createElement('h4')
                displayWeekTime.innerText = weekDataAr[0];
                var displayWeekTempEl = document.createElement('p')
                displayWeekTempEl.innerText = 'Temp: ' + weekDataAr[1] + ' °F';
                var displayWeekWindEl = document.createElement('p')
                displayWeekWindEl.innerText = 'Wind: ' + weekDataAr[2] + ' MPH';
                var displayWeekHumidityEl = document.createElement('p')
                displayWeekHumidityEl.innerText = 'Humidity: ' + weekDataAr[3] + ' %';
                var iconImgWeek = document.createElement("img");
                iconImgWeek.setAttribute('src', weekDataAr[4]);
                
                first.append(displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)

                //Day 2
                var displayWeekTime = document.createElement('h4')
                displayWeekTime.innerText = weekDataAr[5];
                var displayWeekTempEl = document.createElement('p')
                displayWeekTempEl.innerText = 'Temp: ' + weekDataAr[6] + ' °F';
                var displayWeekWindEl = document.createElement('p')
                displayWeekWindEl.innerText = 'Wind: ' + weekDataAr[7] + ' MPH';
                var displayWeekHumidityEl = document.createElement('p')
                displayWeekHumidityEl.innerText = 'Humidity: ' + weekDataAr[8] + ' %';
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[9])
                second.append(displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)
                
                //Day 3
                var displayWeekTime = document.createElement('h4')
                displayWeekTime.innerText = weekDataAr[10];
                var displayWeekTempEl = document.createElement('p')
                displayWeekTempEl.innerText = 'Temp: ' + weekDataAr[11] + ' °F';
                var displayWeekWindEl = document.createElement('p')
                displayWeekWindEl.innerText = 'Wind: ' + weekDataAr[12] + ' MPH';
                var displayWeekHumidityEl = document.createElement('p')
                displayWeekHumidityEl.innerText = 'Humidity: ' + weekDataAr[13] + ' %';
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[14])
                third.append(displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)

                //Day 4
                var displayWeekTime = document.createElement('h4')
                displayWeekTime.innerText = weekDataAr[15];
                var displayWeekTempEl = document.createElement('p')
                displayWeekTempEl.innerText = 'Temp: ' + weekDataAr[16] + ' °F';
                var displayWeekWindEl = document.createElement('p')
                displayWeekWindEl.innerText = 'Wind: ' + weekDataAr[17] + ' MPH';
                var displayWeekHumidityEl = document.createElement('p')
                displayWeekHumidityEl.innerText = 'Humidity: ' + weekDataAr[18] + ' %';
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[19])
                fourth.append(displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)
            
                //Day 5
                var displayWeekTime = document.createElement('h4')
                displayWeekTime.innerText = weekDataAr[20];
                var displayWeekTempEl = document.createElement('p')
                displayWeekTempEl.innerText = 'Temp: ' + weekDataAr[21] + ' °F';
                var displayWeekWindEl = document.createElement('p')
                displayWeekWindEl.innerText = 'Wind: ' + weekDataAr[22] + ' MPH';
                var displayWeekHumidityEl = document.createElement('p')
                displayWeekHumidityEl.innerText = 'Humidity: ' + weekDataAr[23] + ' %';
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[24])
                fifth.append(displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)
    
                // allEl = displayWeekTime, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl

    })}).catch;  
    


    currentCityTemp.innerHTML = ''
    currentCityWind.innerHTML = ''
    currentCityHumidity.innerHTML = ''
    currentCityUv.innerHTML = ''


    findCity();
}




searchBtn.addEventListener('click', getCurrent);



//function to clear out the input box
function clear() {
    cityName.value = ''

}

