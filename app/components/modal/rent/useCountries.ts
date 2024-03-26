import countries from 'world-countries'

const formatedCountry = countries.map((country) => ({
    value : country.cca2,
    flag  : country.flag,
    label : country.name.common,
    latIng : country.latlng,
    region : country.region
}))

const useContries = () => {
    const getAll = () => formatedCountry
    const getByValue = (value : string) => {
        return formatedCountry.find((item) => item.value === value)
    }

    return {
        getAll,
        getByValue
    }
}

export default useContries