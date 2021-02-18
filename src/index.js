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
const signupButton = document.getElementById("signup-form-submit")
const mainHolder = document.getElementById("main-holder")
const navBar = document.querySelector(".nav-wrapper")
const queensNav = document.querySelector(".queens-nav")
const threeFormContainer = document.querySelector(".top-three-form-container")
const countrySelector = document.querySelector(".country-selector")
const firstQueen = document.querySelector("#firstqueen")
const secondQueen = document.querySelector("#secondqueen")
const thirdQueen = document.querySelector("#thirdqueen")
const topThreesubmit = document.querySelector(".top-3-form")
let countryId = 1
let currentUser
let currentUserId
let newUser
let newteamId

// Event Handling //
countriesPage.addEventListener("click", e => {selectCountry(e.target.dataset.id)})
loginButton.addEventListener("click", validateUsername)
signupButton.addEventListener("click", signupUsername)
countrySelector.addEventListener("click", e => {selectCountryTwo(e.target.dataset.id)})


// Fetch/Network Requests //

function showTeams() {
    fetch("http://localhost:3000/teams") 
    .then(response => response.json())
    .then(data => data.forEach(element => showAllTeams(element)))
}

function queensIndex() {
    if (!threeFormContainer.classList.contains("hidden")) {
        threeFormContainer.classList.toggle("hidden")
    }
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => showAllQueens(element)))
}

function showCountries() {
    if (!threeFormContainer.classList.contains("hidden")) {
        threeFormContainer.classList.toggle("hidden")
    }
    fetch("http://localhost:3000/countries") 
    .then(response => response.json())
    .then(data => {
        countrySelector.innerHTML = ""
        data.forEach(element => {
        showAllCountries(element)
    })
})
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
countriesPage.innerHTML = ""
queensPage.innerHTML = ""
landingPage.innerHTML = ""
}}

function validateUsername(e) {
    e.preventDefault();
    const username = loginForm.username.value;
    fetch("http://localhost:3000/users") 
    .then(response => response.json())
    .then(data => data.forEach(element => element.username === username ? retrieveCurrentUser(element) : showErrorMessage()))
}

function signupUsername(e) {
    e.preventDefault();
    const newUser = loginForm.username.value;

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUser })
    })
        .then(response => response.json())
        .then(data => retrieveCurrentUser(data))
}

function selectCountryTwo(countryId) {
    fetch(`http://localhost:3000/countries/${countryId}`) 
    .then(response => response.json())
    .then(data => accessSelectedCountryQueens2(data))
}

function accessSelectedCountryQueens2(e) {
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => {
        threeFormContainer.classList.toggle("hidden")
        data.forEach(element => element.country_id === e.id ? showAllQueensTwo(element) : "")})
}


// Manipulating the DOM //
function showAllQueens(e) {
    let span = document.createElement("img")
    let gifDiv = document.createElement("div")
    span.class = "rendered-queen"
    span.src = e.gif
    span.dataset.id = e.id
    gifDiv.addEventListener('click', queenGifClick)
    countriesPage.innerHTML = ""
    gifDiv.append(span)
    queensPage.append(gifDiv)
    landingPage.innerHTML = ""
    queenContainer.innerHTML = ""
}

function showAllCountries(e) {
    let span = document.createElement("img")
    span.src = e.image
    span.dataset.id = e.id
    countriesPage.append(span)
    queenContainer.innerHTML = ""
    queensPage.innerHTML = ""
    landingPage.innerHTML = ""
}

function addQueenShowSection(singleQueen) {
    queenContainer.innerHTML = `
    <h2 class="queen-name">Name: ${singleQueen.name}</h2>
    <img class="queen-image" src=${singleQueen.grid_image} alt=${singleQueen} data-id=${singleQueen.id}/>
    <h3 class="country-name">Show: ${singleQueen.country.name}</h3>
    <h3 class="season-name">Season: ${singleQueen.season}</h3>
    <a class="queen-instagram" href="${singleQueen.instagram}">Instagram</a>
    <a class="queen-twitter" href="${singleQueen.twitter}">Twitter</a>
    <h3>Comments</h3>
    <div class="queen-comments" ></div>
    <form id="comment-form" >
        <textarea placeholder='Add Your Comment'></textarea>
        <div class="btn">
            <input type="submit" value='Post'>
        </div>
    </form>
    `
    let queenCommentsDiv = document.querySelector(".queen-comments")
    
    let queenComments = singleQueen.comments.forEach(comment => {
        const p = document.createElement('p')
        p.textContent = comment.content
        p.className = "queen-comment"
        queenCommentsDiv.append(p)
    })
    countriesPage.innerHTML = ""
    queensPage.innerHTML = ""
    teamPage.innerHTML = ""
    landingPage.innerHTML = ""

    const commentForm = document.querySelector("#comment-form")
    commentForm.addEventListener("submit", handleCommentForm)
    console.log(singleQueen.id, "queen id")
    console.log(currentUser.id, "user")
    function handleCommentForm(e) {
        e.preventDefault()
        const newComment = e.target[0].value
        const commentP = document.createElement("p")
        commentP.textContent = newComment
        queenCommentsDiv.append(commentP)
        e.target.reset()
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ content: newComment, queen_id: parseInt(singleQueen.id), user_id: parseInt(currentUser.id)})
        })
            .then(response => response.json())
            .then(data => console.log(data))
    }
}


topThreesubmit.addEventListener("submit", createTeam)

function createTeam(e) {
    e.preventDefault()
    debugger
    let firstChosenQueenId = e.target.firstqueen.value
    let secondChosenQueenId = e.target.secondqueen.value
    let thirdChosenQueenId = e.target.thirdqueen.value
    let newTeamName = e.target.teamname.value
    let newTeamImage = e.target.teamimage.value
    
    fetch('http://localhost:3000/teams', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newTeamName, image: newTeamImage, user_id: currentUser.id, country_id: countryId })
        })
        .then(response => response.json())
        .then(team => {
            fetch('http://localhost:3000/contracts', {
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ team_id: team.id, queen_id: [parseInt(firstChosenQueenId), parseInt(secondChosenQueenId), parseInt(thirdChosenQueenId)]})
            })
            .then(res => res.json())
            .then(contract => getCurrentUserTeams(team.user))
        })
}
    
function showAllTeams(e) {
    let currentTeamId = e.id
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
    getContract(e.target.dataset.id)
}

function queenGifClick(e){
    if (e.target.class === "rendered-queen"){
        const queenId = e.target.dataset.id
        getSingleQueen(queenId)
    }
}

function queenGifClick(e){
    if (e.target.class === "rendered-queen"){
        const queenId = e.target.dataset.id
        getSingleQueen(queenId)
    }
}

function retrieveCurrentUser(element) {
    currentUser = element
    getCurrentUserTeams(currentUser)
}

function getCurrentUserTeams(currentUser) {
    if (!threeFormContainer.classList.contains("hidden")) {
        threeFormContainer.classList.toggle("hidden")
    }
    fetch("http://localhost:3000/teams") 
    .then(response => response.json())
    .then(data => data.forEach(element => element.user_id === currentUser.id ? showAllTeams(element) : ""))
    navBar.innerHTML = ""
    renderNavBar()
    queenContainer.innerHTML = ""
    mainHolder.innerHTML = ""
    queensPage.innerHTML = ""
}

function showErrorMessage() {
    errorMessage.innerText = "Invalid Username. Please attempt to login again or sign up."
}

function displayLogin() {
    navBar.innerHTML = ""
}

function renderNavBar() {
   let homebtn = document.createElement("button")
   let buildTeambtn = document.createElement("button")
   let coutriesbtn = document.createElement("button")
   let queenbtn = document.createElement("button")
   let logoutbtn = document.createElement("button")

   homebtn.className = "home-btn"
   homebtn.textContent = "Home"
   buildTeambtn.className = "buildteam-btn"
   buildTeambtn.textContent = "Build a Team"
   coutriesbtn.className = "countries-btn"
   coutriesbtn.textContent = "Countries"
   queenbtn.className = "queen-btn"
   queenbtn.innerText = "Queens"
   logoutbtn.className = "logout-btn"
   logoutbtn.innerText = "LogOut"

   navBar.append(homebtn)
   navBar.append(buildTeambtn)
   navBar.append(coutriesbtn)
   navBar.append(queenbtn)
   navBar.append(logoutbtn)
   coutriesbtn.addEventListener("click", showCountries)
   queenbtn.addEventListener("click", queensIndex)
   homebtn.addEventListener("click", e => {getCurrentUserTeams(currentUser)})
   buildTeambtn.addEventListener("click", buildATeam)
}

function buildATeam(){
    fetch("http://localhost:3000/countries") 
    .then(response => response.json())
    .then(data => {
        countriesPage.innerHTML = ""
        data.forEach(element => {
        displayAllCountries(element)
        })
    })
}

function displayAllCountries(element) {
    let picture = document.createElement("img")
    picture.src = element.image
    picture.dataset.id = element.id
    countrySelector.append(picture)
    queenContainer.innerHTML = ""
    queensPage.innerHTML = ""
    landingPage.innerHTML = ""
}


function showAllQueensTwo(e) {
    let queenOption1 = document.createElement("option")
    queenOption1.value = e.id
    queenOption1.textContent = e.name
    let queenOption2 = document.createElement("option")
    queenOption2.value = e.id
    queenOption2.textContent = e.name
    let queenOption3 = document.createElement("option")
    queenOption3.value = e.id
    queenOption3.textContent = e.name
    firstQueen.append(queenOption1)
    secondQueen.append(queenOption2)
    thirdQueen.append(queenOption3)

    let span = document.createElement("img")
    let gifDiv = document.createElement("div")
    span.class = "rendered-queen"
    span.src = e.gif
    span.dataset.id = e.id
    gifDiv.addEventListener('click', queenGifClick)
    countriesPage.innerHTML = ""
    gifDiv.append(span)
    queensPage.append(gifDiv)
    landingPage.innerHTML = ""
    queenContainer.innerHTML = ""
    countrySelector.innerHTML = ""
}

displayLogin()


