const app = document.querySelector('.weather-app')
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const namecity = document.querySelector('.name');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const condition = document.querySelector('.condition');
const cloudy = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const countryOutput = document.querySelector('.country');
const temp_f = document.querySelector('.temp_f');
const lupdate = document.querySelector('.lastupdated');
const windir = document.querySelector('.wind_direction');
const timeOutput = document.querySelector('.time');
const btn = document.querySelector('.submit');


let cityInput = 'Ho Chi Minh';

form.addEventListener('submit', (e) => {
        e.preventDefault();
        if(search.value.length == 0){
                alert('Please enter information in the search box.');
        } else {
                cityInput = search.value;
                getapidata();
                search.value = "";
                app.style.opacity = "0";
        }
        
})

let now = new Date()

function dayOfWeek (d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`;
      }

function getapidata() {
        fetch(`http://api.weatherapi.com/v1/current.json?key=e6436b1f28df443891131052230802&q=${cityInput}`)
        .then(respone => respone.json())
        .then(data => {
                console.log(data);
                temp.innerHTML = data.current.temp_c + "&#176" + "C";
                condition.innerHTML = data.current.condition.text;
                const date  = data.location.localtime;
                const time = date.substr(11);
                dateOutput.innerText = dayOfWeek(now)                
                timeOutput.innerHTML = time;
                namecity.innerHTML = data.location.name;
                cloudy.innerHTML = data.current.cloud + "%";
                countryOutput.innerHTML = data.location.country ;
                humidityOutput.innerHTML = data.current.humidity + "%";
                windOutput.innerHTML = data.current.wind_kph + "km/h";
                temp_f.innerHTML = data.current.temp_f + " &#176" + " F";
                lupdate.innerHTML = data.current.last_updated;
                windir.innerHTML = data.current.wind_dir;
                
                
                let timeOfDay = "day";
                const code = data.current.condition.code;

                if(!data.current.is_day) {
                        timeOfDay = "night";
                }
                if(code == 1000) {
                        app.backgroundImage = `url(./Image/${timeOfDay}/clear.jpg)`;
                        btn.style.background = "#e5ba92";
                        if(timeOfDay == "night"){
                                btn.style.background = "#181e27";
                        }
                }
                else if (
                        code == 1003 ||
                        code == 1006 ||
                        code == 1009 ||
                        code == 1030 ||
                        code == 1069 ||
                        code == 1087 ||
                        code == 1135 ||
                        code == 1273 ||
                        code == 1276 ||
                        code == 1279 ||
                        code == 1282
                ) {
                        app.style.backgroundImage = `url(./Image/${timeOfDay}/cloudy.jpg)`;
                        btn.style.background = "#218380";
                        if(timeOfDay == "night"){
                                btn.style.background = "#e18127";
                        }
                }
                else if (
                        code == 1063 ||
                        code == 1069 ||
                        code == 1072 ||
                        code == 1150 ||
                        code == 1153 ||
                        code == 1180 ||
                        code == 1183 ||
                        code == 1186 ||
                        code == 1189 ||
                        code == 1192 ||
                        code == 1195 ||
                        code == 1204 ||
                        code == 1207 ||
                        code == 1240 ||
                        code == 1243 ||
                        code == 1246 ||
                        code == 1249 ||
                        code == 1252
                ) {
                        app.style.backgroundImage = `url(./Image/${timeOfDay}/rain.jpg)`;
                        btn.style.background = "#3e5c76";
                        if(timeOfDay == "night") {
                                btn.style.background = "#325c80";
                        }
                }
                else {
                        app.style.backgroundImage = `url(./Image/${timeOfDay}/snow.jpg)`;
                        btn.style.background = "#4d72aa";
                        if(timeOfDay == "night") {
                                btn.style.background = "#1b1b1b";
                        }
                }
                app.style.opacity = "1";      
        })
        .catch(() =>{
                alert("Information not found. Try again!") ;
                app.style.opacity = "1";
        });
}

getapidata();
app.style.opacity = "1";































