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
    var displayCity = document.getElementById('cityDate');
    displayCity.innerHTML = city

   
    window.localStorage.setItem("cityNameInput", JSON.stringify(cityArr));
    localStorage.clear()
    
    var cityHistory = document.createElement("BUTTON")
    cityHistory.textContent = cityArr
    searchHistory.append(cityHistory)
    cityHistory.className = "searchBtnHistory";
    
    // cityHistory.append(cityArr)

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


            var weekDataAr = []

            // 5 - Day forecast 
            //info needed - Date, icon, temp, wind speed, and humidity
            for (i = 0; i < 5; i++) {
                var weekTime = moment().add(i + 1, 'days').format('L')
                var weekTemp = data.daily[i].temp.day
                var weekWind = data.daily[i].wind_speed
                var weekHumidity = data.daily[i].humidity
                var weekIcon = data.daily[i].weather[0].icon

                var weekIconUrl = 'http://openweathermap.org/img/wn/' + weekIcon + '@2x.png'
                
                weekDataAr.push(weekTime, weekTemp, weekWind, weekHumidity, weekIconUrl) 
                console.log(weekDataAr)


                
            }

                var first = document.querySelector('#dayOne')
                // creating an element for each route

                //Day 1
                var displayWeekTime = document.createElement('h3').innerText = weekDataAr[0]
                first.append(displayWeekTime)
                var displayWeekTempEl = document.createElement('p').innerText = 'Temp: ' + weekDataAr[1] + ' °F';
                first.append(displayWeekTempEl)
                var displayWeekWindEl = document.createElement('p').innerText = 'Wind: ' + weekDataAr[2] + ' MPH';
                first.append(displayWeekWindEl)
                var displayWeekHumidityEl = document.createElement('p').innerText = 'Humidity: ' + weekDataAr[3] + ' %';
                first.append(displayWeekHumidityEl)
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[4])
                first.append(iconImgWeek)

                //Day 2
                var second = document.querySelector('#dayTwo')
                var displayWeekTime = document.createElement('h3').innerText = weekDataAr[5]
                second.append(displayWeekTime)
                var displayWeekTempEl = document.createElement('p').innerText = 'Temp: ' + weekDataAr[6] + ' °F';
                second.append(displayWeekTempEl)
                var displayWeekWindEl = document.createElement('p').innerText = 'Wind: ' + weekDataAr[7] + ' MPH';
                second.append(displayWeekWindEl)
                var displayWeekHumidityEl = document.createElement('p').innerText = 'Humidity: ' + weekDataAr[8] + ' %';
                second.append(displayWeekHumidityEl)
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[9])
                second.append(iconImgWeek)
                
                //Day 3
                var third = document.querySelector('#dayThree')
                var displayWeekTime = document.createElement('h3').innerText = weekDataAr[10]
                third.append(displayWeekTime)
                var displayWeekTempEl = document.createElement('p').innerText = 'Temp: ' + weekDataAr[11] + ' °F';
                third.append(displayWeekTempEl)
                var displayWeekWindEl = document.createElement('p').innerText = 'Wind: ' + weekDataAr[12] + ' MPH';
                third.append(displayWeekWindEl)
                var displayWeekHumidityEl = document.createElement('p').innerText = 'Humidity: ' + weekDataAr[13] + ' %';
                third.append(displayWeekHumidityEl)
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[14])
                third.append(iconImgWeek)

                //Day 4
                var fourth = document.querySelector('#dayFour')
                var displayWeekTime = document.createElement('h3').innerText = weekDataAr[15]
                fourth.append(displayWeekTime)
                var displayWeekTempEl = document.createElement('p').innerText = 'Temp: ' + weekDataAr[16] + ' °F';
                fourth.append(displayWeekTempEl)
                var displayWeekWindEl = document.createElement('p').innerText = 'Wind: ' + weekDataAr[17] + ' MPH';
                fourth.append(displayWeekWindEl)
                var displayWeekHumidityEl = document.createElement('p').innerText = 'Humidity: ' + weekDataAr[18] + ' %';
                fourth.append(displayWeekHumidityEl)
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[19])
                fourth.append(iconImgWeek)
            
                //Day 5
                var fifth = document.querySelector('#dayFive')
                var displayWeekTime = document.createElement('h3').innerText = weekDataAr[20]
                fifth.append(displayWeekTime)
                var displayWeekTempEl = document.createElement('p').innerText = 'Temp: ' + weekDataAr[21] + ' °F';
                fifth.append(displayWeekTempEl)
                var displayWeekWindEl = document.createElement('p').innerText = 'Wind: ' + weekDataAr[22] + ' MPH';
                fifth.append(displayWeekWindEl)
                var displayWeekHumidityEl = document.createElement('p').innerText = 'Humidity: ' + weekDataAr[23] + ' %';
                fifth.append(displayWeekHumidityEl)
                var iconImgWeek = document.createElement("img")
                iconImgWeek.setAttribute('src', weekDataAr[24])
                fifth.append(iconImgWeek)

                
    

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

