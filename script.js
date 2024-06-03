document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const countriesContainer = document.getElementById('countries-container');
    console.log("Hi loaded")
    const fetchCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            const countries = await response.json();
            console.log(countries)
            displayCountries(countries);
            return countries
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const displayCountries = (countries) => {
        countriesContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');

            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="${country.name.common} Flag" class="country-flag">
                <div class="country-info">
                    <h2>${country.name.common}</h2>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            `;
            countriesContainer.appendChild(countryCard);
        });
    };

    const filterCountries = (countries, searchTerm, region) => {
        console.log("trying filter")
        return countries.filter(country => {
            const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRegion = region === '' || country.region === region;
            return matchesSearch && matchesRegion;
        });
    };

    const handleSearchAndFilter = (countries) => {
        const searchTerm = searchInput.value;
        const region = regionFilter.value;
        const filteredCountries = filterCountries(countries, searchTerm, region);
        displayCountries(filteredCountries);
    };

    fetchCountries().then(countries => {
        searchInput.addEventListener('input', () => handleSearchAndFilter(countries));
        regionFilter.addEventListener('change', () => handleSearchAndFilter(countries));
    });
});
