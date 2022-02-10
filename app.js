let getRestCountries = async () => {
    let response = await fetch('https://restcountries.com/v2/all')
    let json = await response.json();
    filterByRegion(json)
    filterByPopulation(json)
    printOutDetails(json)
    getTotalPopulation(json)
    countriesThatUsesDollars(json)
}

let filterByRegion = (json) => {
    //Filter to get all countries where region is Asia 
    console.log("Filter to get all countries where region is Asia");
    let countries = json.filter((e) => e['region'] === 'Asia').map((country) => country['name'])
    console.log(countries)
}

let filterByPopulation = (json) => {
    //Filter to get all countries where population is less than 2 lakh
    console.log("Filter to get all countries where population is less than 2 lakh");
    let countries = json.filter((e) => e['population'] < 200000).map((country) => {
        return {
            'name': country['name'],
            'population': country['population']
        }
    });
    console.log(countries)
}

let printOutDetails = (json) => {
    // Console logging details of all countries 
    console.log("Console logging details of all countries");
    let arr = json.map((country) => {
        return {
            'name': country['name'],
            'capital': country['capital'],
            'flag': country['flag'],
        }
    })
    console.log(arr);
}

let getTotalPopulation = (json) => {
    let count = json.reduce((count, country) => count + Number(country['population']), 0)
    console.log(`The total population is ${count}`)
}

let countriesThatUsesDollars = (json) => {
    console.log("Countries that use dollars as their currency");
    let arr = []
    json.forEach(country => {
        if (country['currencies'] !== undefined) {
            if (country['currencies'].find(currency => currency.code === 'USD')) {
                arr.push({
                    'name': country['name'],
                    'currencies': country['currencies']
                })
            }

        }
    })
    console.log(arr)
}

getRestCountries()