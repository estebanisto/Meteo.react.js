import React, {useState} from 'react';


const api = {
  key: "4e042e54b52ccf8a41a4227591c477b8",
  base:"https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result =>{
          setWeather(result);
          setQuery('');
          
        }) ;
    }
  }

  const dateBuilder = (d) => {

    let months = ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Août","Septembre",
    "Octobre","Novembre","Decembre"];

    let days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }



  return (
    <div className= {(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') :'app'}>
      <main>
       
        <div className="search-box">
          <input
            type ="text"
            placeholder ="search"
            className ="search-bar"
            onChange ={e => setQuery(e.target.value)}
            value ={query}
            onKeyPress = {search}
          />
        </div>
 {(typeof weather.main != "undefined") ? (

          <div>
            <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>

        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)} °
          </div>
          <div className="weather">
            {weather.weather[0].main}
          </div>
        </div>
          </div>
         ) : ('')}
        

      </main>
      
    </div>
  );
}

export default App;
