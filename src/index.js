import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries'
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const cityName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');




function renderCountries(countries) {
    if (countries.length > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length == 1) {
        countryInfo.innerHTML = `
            <p><img src="${countries[0].flags.svg}" width="30"> <b>${countries[0].name.official}</b></p>
            <p><b>Capital:</b> ${countries[0].capital[0]}</p>
            <p><b>Population:</b> ${countries[0].population}</p>
            <p><b>Languages:</b> ${Object.values(countries[0].languages).join(", ")}</p>
        `;
        countryList.innerHTML = '';
    } else if (countries.length > 1) {
        let markup = '';
        for (let i = 0; i < countries.length; i++) {
            markup += `<li><img src="${countries[i].flags.svg}" width="30"> ${countries[i].name.official}</li>`;
        }
        countryList.innerHTML = markup;
        countryInfo.innerHTML = '';
    }
}

cityName.addEventListener('input', debounce(() => {
    const cityValue = cityName.value.trim();
    if (cityValue.length > 0) {
        fetchCountries(cityValue)
            .then((response) => renderCountries(response))
            .catch((error) => {
                Notiflix.Notify.failure("Oops, there is no country with that name")
            });
    } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    }

}, DEBOUNCE_DELAY))

