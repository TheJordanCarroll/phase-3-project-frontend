// Grab DOM Elements //
const countriesPage = document.querySelector(".countries")
const queensPage = document.querySelector(".queens")
const queenContainer = document.querySelector(".queen-container")
const teamsPage = document.querySelector(".teams")
let countryId = 1

// Event Handling //
countriesPage.addEventListener("click", e => {selectCountry(e.target.dataset.id)})
// queensPage.addEventListener("click", e => {getSingleQueen(e.target.dataset.id)})
queensPage.addEventListener("click", handleClick)

function handleClick(e){
    if (e.target.class === "rendered-queen"){
      const queenId = e.target.dataset.id
      getSingleQueen(queenId)
    }
}

// Fetch/Network Requests //
// function showTeams() {
//     fetch("http://localhost:3000/teams") 
//     .then(response => response.json())
//     .then(data => data.forEach(element => showAllCountries(element)))
// }

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

function accessSelectedCountryQueens(e) {
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => element.country_id === e.id ? showAllQueens(element) : ""))
}

function getSingleQueen(queenId){
    fetch(`http://localhost:3000/queens/${queenId}`)
    .then(res => res.json())
    .then(data => addQueenShowSection)
}

// Manipulating the DOM //
function showAllQueens(e) {
    let span = document.createElement("img")
    span.class = "rendered-queen"
    span.src = e.gif
    span.dataset.id = e.id
    countriesPage.remove()
    queensPage.append(span)
}

function showAllCountries(e) {
    let span = document.createElement("img")
    span.src = e.image
    span.dataset.id = e.id
    countriesPage.append(span)
}

function addQueenShowSection(singleQueen) {
    queenContainer.innerHTML = `
    <h2 class="queen-name">Name: ${singleQueen.name}</h2>
    <img class="queen-image" src=${singleQueen.gif} alt=${singleQueen.name} />
    <h3 class="country-name">Country: ${singleQueen.country.name}</h3>
    <h3 class="season-name">Season: ${singleQueen.season}</h3>
    <a class="queen-instagram" href="${singleQueen.instagram}">Instagram</a>
    <a class="queen-twitter" href="${singleQueen.twitter}">Twitter</a>
    `
}

showCountries()

