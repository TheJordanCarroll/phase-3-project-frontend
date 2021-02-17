// Grab DOM Elements //
const container = document.querySelector(".container")
const countriesPage = document.querySelector(".countries")
const queensPage = document.querySelector(".queens")
const queenContainer = document.querySelector(".queen-container")
const teamPage = document.querySelector(".team-page")
const landingPage = document.querySelector(".landing-page")
const loginForm = document.getElementById("login-form")
const loginButton = document.getElementById("login-form-submit")
const loginErrorMsg = document.getElementById("login-error-msg")
const loginHeader = document.getElementById("login-header")
const errorMessage = document.querySelector(".error-message")
const SignupButton = document.getElementById("signup-form-submit")
let countryId = 1
let currentUser

// Event Handling //
countriesPage.addEventListener("click", e => {selectCountry(e.target.dataset.id)})
// queensPage.addEventListener("click", e => {getSingleQueen(e.target.dataset.id)})
// queensPage.addEventListener("click", handleClick)

function queenGifClick(e){
    console.log(e.target.class)
    if (e.target.class === "rendered-queen"){
        const queenId = e.target.dataset.id
        getSingleQueen(queenId)
    }
}

loginButton.addEventListener("click", validateUsername)

function validateUsername(e) {
    e.preventDefault();
    const username = loginForm.username.value;

    fetch("http://localhost:3000/users") 
    .then(response => response.json())
    .then(data => data.forEach(element => element.username === username ? retrieveCurrentUser(element) : showErrorMessage()))
}

SignupButton.addEventListener("click", signupUsername)

function signupUsername(e) {
    e.preventDefault();
    const newUsername = loginForm.username.value;

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername})
    })
        .then(response => response.json())
        .then(data => console.log(data))
}

function retrieveCurrentUser(element) {
    currentUser = element
    console.log(currentUser)
}

function showErrorMessage() {
    errorMessage.innerText = "Invalid Username. Please attempt to login again or sign up."
}

// Fetch/Network Requests //
function showTeams() {
    fetch("http://localhost:3000/teams") 
    .then(response => response.json())
    .then(data => data.forEach(element => showAllTeams(element)))
}

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
    .then(data => addQueenShowSection(data))
}

function getContract(teamId){
    fetch(`http://localhost:3000/contracts`)
    .then(res => res.json())
    .then(data => data.forEach(element => showTeamInfo(element, teamId)))
}

function showTeamInfo(element, teamId){
    if (parseInt(element.team_id) === parseInt(teamId)){
let teamInfo = document.createElement("div")
let teamGif = document.createElement("img")
let teamPar = document.createElement("p")
teamGif.class = "rendered-queen"
teamPar.innerText = element.queen.name
teamGif.src = element.queen.gif
teamGif.dataset.id = element.queen.id
teamInfo.append(teamGif)
teamInfo.append(teamPar)
teamPage.append(teamInfo)
teamGif.addEventListener('click', queenGifClick)
console.log(teamGif)
countriesPage.innerHTML = ""
queensPage.innerHTML = ""
landingPage.innerHTML = ""
}}

// Manipulating the DOM //
function showAllQueens(e) {
    let span = document.createElement("img")
    let gifDiv = document.createElement("div")
    span.class = "rendered-queen"
    span.src = e.gif
    span.dataset.id = e.id
    gifDiv.addEventListener('click', queenGifClick)
    countriesPage.remove()
    gifDiv.append(span)
    queensPage.append(gifDiv)
    landingPage.innerHTML = ""
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
    <img class="queen-image" src=${singleQueen.grid_image} alt=${singleQueen.name} />
    <h3 class="country-name">Show: ${singleQueen.country.name}</h3>
    <h3 class="season-name">Season: ${singleQueen.season}</h3>
    <a class="queen-instagram" href="${singleQueen.instagram}">Instagram</a>
    <a class="queen-twitter" href="${singleQueen.twitter}">Twitter</a>
    `
    countriesPage.innerHTML = ""
    queensPage.innerHTML = ""
    teamPage.innerHTML = ""
    landingPage.innerHTML = ""
}

function showAllTeams(e) {
    let teamDiv = document.createElement("div")
    teamDiv.className = "card"
    let imgDiv = document.createElement("img")
    imgDiv.className = "card-img-top"
    imgDiv.src = e.image
    let bodyDiv = document.createElement("div")
    bodyDiv.className = "card-body"
    let headingDiv = document.createElement("h5")
    headingDiv.className = "card-title"
    headingDiv.textContent = e.name
    let buttonDiv = document.createElement("button")
    buttonDiv.className = "btn btn-primary team-button" 
    buttonDiv.textContent = "View Team"
    buttonDiv.dataset.id = e.id
    buttonDiv.addEventListener('click', teamButtonClick)
    bodyDiv.append(headingDiv, buttonDiv)
    teamDiv.append(imgDiv, bodyDiv)
    landingPage.append(teamDiv)
}

function teamButtonClick(e) {
    console.log("teamButtonClick")
    getContract(e.target.dataset.id)
}

function queenGifClick(e){
    // console.log(e.target.class)
    if (e.target.class === "rendered-queen"){
        const queenId = e.target.dataset.id
        getSingleQueen(queenId)
    }
}
// document.ready(function(){
//     const button = document.querySelector(".team-button")
//     button.bind("click", function(e){
//         getContract(e.id)
//     })
// })
// showTeams()
// showCountries()
