https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=minutely,hourly,alerts&units=imperial&appid=dfd0fa54b8ca7bb6ab4b97c29d03aacb'
var inputBox = document.getElementById('cityName');


var searchBtn = document.getElementById('searchBtn');


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



            // 5 - Day forecast 
            //info needed - Date, icon, temp, wind speed, and humidity
            for (i = 0; i < 5; i++) {
                var weekTime = moment().add(i + 1, 'days').format('L')
                var weekTemp = data.daily[i].temp.day
                var weekWind = data.daily[i].wind_speed
                var weekHumidity = data.daily[i].humidity
                var weekIcon = data.daily[i].weather[0].icon

                var weekIconUrl = 'http://openweathermap.org/img/wn/' + weekIcon + '@2x.png'

                
                // creating an element for each route
                var displayWeekTime = document.createElement('h3').innerText = weekTime
                var displayWeekTempEl = document.createElement('p').innerText = 'Temp: ' + weekTemp + ' °F';
                var displayWeekWindEl = document.createElement('p').innerText = 'Wind: ' + weekWind + ' MPH';
                var displayWeekHumidityEl = document.createElement('p').innerText = 'Humidity: ' + weekHumidity + ' %';
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekIconUrl)


                var first = document.querySelector('#dayOne')
                first.append(displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)

        

                // var second = document.querySelector('#dayTwo')
                // second.append([2], displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)

            }
            // var first = document.querySelector('#dayOne')
            // first.append(displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)
            var one = i === 0
            var two = i === 1
            var three = i === 2
            var four = i === 3
            var five = i === 4





            // if(one) {
            //     var first = document.querySelector('#dayOne')
            //     first.append(displayWeekTime, iconImgWeek, displayWeekTempEl, displayWeekWindEl, displayWeekHumidityEl)
            // }



                
    

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

