// Query Selectors //
countryPage = document.querySelector("#country")
seasonAllQueens = document.querySelector(".queenContentwrapper")
let countryId = 1

// Event Listener //
// countryPage.addEventListener("click", e => {selectCountry(e.target.dataset.id)})
countryPage.addEventListener("click", handleClick)

// Fetch //

function showCountries () {
    fetch("http://localhost:3000/countries") 
    .then(response => response.json())
    .then(data => data.forEach(element => showAllCountries(element)))
}

function handleClick(e){
    if (e.target.id === "rendered-country"){
      selectCountry(e.target.dataset.id)
    } else if (e.target.id === "rendered-queen"){
        console.log(hello)
    }
}
// handleClick()

function selectCountry (countryId) {
    fetch(`http://localhost:3000/countries/${countryId}`) 
    .then(response => response.json())
    .then(data => accessSelectedCountryQueens(data))
}

function showSeasonQueens() {
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => seasonQueens(element)))
}
// Function //

function accessSelectedCountryQueens(e) {
    countryId = e.id
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => element.country_id === countryId ? showAllQueens(element) : ""))
}

function showAllQueens(e) {
    let span = document.createElement("img")
    span.id = "rendered-queen"
    span.src = e.gif
    span.dataset.id = e.id
    countryPage.append(span)
}

function showAllCountries(e) {
    let span = document.createElement("img")
    span.id = "rendered-country"
    span.src = e.image
    span.dataset.id = e.id
    countryPage.append(span)
}

// function seasonQueens(e) {
// //  e.country_id === countryId ? console.log(e.image) : console.log(e.name)
// }



showCountries()
