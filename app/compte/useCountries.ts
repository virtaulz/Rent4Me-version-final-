import countries from 'world-countries';
import frenchCountryNames from '../pays/fr.json';

interface FrenchCountryNames {
  [key: string]: string;
}

const getContinentName = (country: any) => {
  switch (country.region) {
    case 'Africa':
      return 'Afrique';
    case 'Americas':
      return 'Amériques';
    case 'Asia':
      return 'Asie';
    case 'Europe':
      return 'Europe';
    case 'Oceania':
      return 'Océanie';
    default:
      return 'Autre';
  }
};

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: (frenchCountryNames as FrenchCountryNames)[country.cca2] || country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: getContinentName(country),
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    };

    return {
        getAll,
        getByValue,
    };
};

export default useCountries;
