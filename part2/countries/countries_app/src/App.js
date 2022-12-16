import {useState, useEffect} from "react";
import axios from "axios";
import CountryList from "./components/CountryList";
import SingleCountry from "./components/SingleCountry";

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setCountries(response.data);
                console.log(response.data)
            });
    }, []);

    //33dcc4a66dd8ff633f8d3a4633e94227
    //b6808c4b44a76dc72b6e9112014386c7
    //const api_key_test = "33dcc4a66dd8ff633f8d3a4633e94227"
    //const api_key_test = "b6808c4b44a76dc72b6e9112014386c7"
    const api_key = process.env.REACT_APP_API_KEY

    const getToShow = () => {

        const toShow = countries.reduce((list, country) => {
            if (country.name.common.toLowerCase().includes(search.toLowerCase())){
                return list.concat(country);
            }
            return list;
        }, []);

        if (toShow.length > 10) {
            return "Too many matches, specify another filter";
        } else if (toShow.length > 1) {
            return <CountryList countries={toShow} setSearch={setSearch}/>
        } else if (toShow.length === 1){
            return <SingleCountry 
                        country={toShow[0]} 
                        weather={weather}
                        setWeather={setWeather}
                        search={search}
                        api_key={api_key}
                    />
        } else{
            return "No matches, specify another filter";
        }
    };

    const handleSearchChange = (e) => setSearch(e.target.value);

    return (
        <>
            find countries &nbsp;
            <input value={search} onChange={handleSearchChange} />
            <div>{getToShow()}</div>
        </>
    );
};

export default App;
