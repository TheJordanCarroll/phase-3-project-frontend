// Query Selector //
countryPage = document.querySelector("#country")
seasonAllQueens = document.querySelector(".queenContentwrapper")
countryId = 1
seasonId = 1

// Event Listener //
countryPage.addEventListener("click", e => {selectCountry(e.target.dataset.id)})

// Fetch //

function showCountries () {
    fetch("http://localhost:3000/countries") 
    .then(response => response.json())
    .then(data => data.forEach(element => showAllCountries(element)))
}

function selectCountry (countryId) {
    fetch(`http://localhost:3000/countries/${countryId}`) 
    .then(response => response.json())
    .then(data => compareCountryId(data))
    
}

function showSeasonQueens() {
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => seasonQueens)
}
// Function //

function compareCountryId(e) {
    return e.id
}
function showAllCountries(e) {
    let span = document.createElement("img")
    span.src = e.image
    span.dataset.id = e.id
    countryId = 1
    countryPage.append(span)
}

function seasonQueens(e) {
    console.log(e)
//  e.country_id === compareCountryId(e.id) ? console.log(e.image) : console.log(e.name)
}



showCountries()