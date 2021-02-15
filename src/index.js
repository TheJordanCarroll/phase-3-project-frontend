// Query Selector //
countryPage = document.querySelector("#country")
seasonAllQueens = document.querySelector(".queenContentwrapper")
countryId = 1

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
    .then(data => showSeasonQueens(data))
}

function showSeasonQueens() {
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => seasonQueens(element)))
}
// Function //

function showAllCountries(e) {
    let span = document.createElement("img")
    span.src = e.image
    span.dataset.id = e.id
    countryId = 1
    countryPage.append(span)
}

function seasonQueens(e) {
    countryId = e.country_id
    console.log(countryId)
}

showCountries()