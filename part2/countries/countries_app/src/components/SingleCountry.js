import { useEffect } from "react";
import axios from "axios";
import { isCompositeComponent } from "react-dom/test-utils";

const SingleCountryView = ({country, weather, setWeather, search, api_key}) => {
    let [lat, lon] = country.latlng;

    useEffect(() => {
        //console.log("MAKING REQUEST!");
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`)
        .then((response) => {
            setWeather(response.data);
        });
    }, [search]);

    if (weather.length === 0 || lat != weather.coord.lat || lon != weather.coord.lon) {

        return <></>;
    }

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages).map((language) => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} />
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {weather.main.temp} Fahrenheit</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <p>wind {weather.wind.speed} m/s</p>
        </>
    );
};

export default SingleCountryView;