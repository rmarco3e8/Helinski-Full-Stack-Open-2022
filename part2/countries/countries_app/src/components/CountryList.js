const CountryList = ({countries, setSearch}) => {
    return (
        <>
            {countries.map((country) => {
                return (
                    <p key={country.name.common}>
                        {country.name.common}&nbsp;
                        <button onClick={() => setSearch(country.name.common)}>show</button>
                    </p>
                )
            })}
        </>
    );
};

export default CountryList;