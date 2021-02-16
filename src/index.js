// Query Selectors //
countriesPage = document.querySelector("#countries")
queensPage = document.querySelector(".queens")
let countryId = 1

// Event Listeners //
countryPage.addEventListener("click", e => {selectCountry(e.target.dataset.id)})
queensPage.addEventListener("click", handleQueenClick)

// Fetch Requests //
function showCountries() {
    fetch("http://localhost:3000/countries") 
    .then(response => response.json())
    .then(data => data.forEach(element => showAllCountries(element)))
}

function selectCountry(countryId) {
    fetch(`http://localhost:3000/countries/${countryId}`) 
    .then(response => response.json())
    .then(data => accessSelectedCountryQueens(data))
    
}

function showSeasonQueens() {
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => seasonQueens(element)))
}

// Functions //
function accessSelectedCountryQueens(e) {
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => element.country_id === e.id ? showAllQueens(element) : ""))
}

function showAllQueens(e) {
    let span = document.createElement("img")
    span.class = "rendered-queen"
    span.src = e.gif
    span.dataset.id = e.id
    seasonAllQueens.append(span)
}

function showAllCountries(e) {
    let span = document.createElement("img")
    span.src = e.image
    span.dataset.id = e.id
    countryPage.append(span)
}

function handleQueenClick(e){
    if (e.target.className === "rendered-queen"){
      const queenId = e.target.dataset.id
      getSingleQueen(queenId)
    }
}

showCountries()

