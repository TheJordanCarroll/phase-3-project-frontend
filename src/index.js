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
const firstQueen = document.querySelector("#first-queen")
const secondQueen = document.querySelector("#second-queen")
const thirdQueen = document.querySelector("#third-queen")

// const countriesbtn = document.querySelector("#countries-btn")
// console.log(countriesbtn)
let countryId = 1
let currentUser
let currentUserId
let newUser

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
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => showAllQueens(element)))
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
teamPar.innerText = element.Queen
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
        .then(data => console.log(data))
}

function selectCountryTwo(countryId) {
    fetch(`http://localhost:3000/countries/${countryId}`) 
    .then(response => response.json())
    .then(data => accessSelectedCountryQueens2(data))
}

function accessSelectedCountryQueens2(e) {
    fetch(`http://localhost:3000/queens/`) 
    .then(response => response.json())
    .then(data => data.forEach(element => element.country_id === e.id ? showAllQueensTwo(element) : ""))
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

function showAllTeams(e) {
    // if (parseInt(e.user_id) === parseInt(currentUser)) {
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
    // }
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
    console.log(currentUser)
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
    threeFormContainer.innerHTML = ""
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
    .then(data => data.forEach(element => displayAllCountries(element)))
    
    // threeFormContainer.innerHTML = `
    //     <form class="top-3-form" action="http://localhost:3000/teams/:id"> 
    //         <label for="queens">Choose your top three queens:</label>
    //         <select id="first-queen" name="first-queen">
    //             <option value="1">Queen</option>
    //             <option value="2">Queen</option>
    //             <option value="3">Queen</option>
    //         </select>
    //         <select id="second-queen" name="second-queen">
    //             <option value="4">Queen</option>
    //             <option value="5">Queen</option>
    //             <option value="6">Queen</option>
    //         </select>
    //         <select id="third-queen" name="third-queen">
    //             <option value="7">Queen</option>
    //             <option value="8">Queen</option>
    //             <option value="9">Queen</option>
    //         </select>
    //         <input type="submit" value="Submit">
    //     </form>
    //     `
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

 
    // var values = ["dog", "cat", "parrot", "rabbit"];
   
    // var select = document.createElement("select");
    // select.name = "pets";
    // select.id = "pets"
   
    // for (const val of values) {
    //   var option = document.createElement("option");
    //   option.value = val;
    //   option.text = val.charAt(0).toUpperCase() + val.slice(1);
    //   select.appendChild(option);
    // }
   
    // var label = document.createElement("label");
    // label.innerHTML = "Choose your pets: "
    // label.htmlFor = "pets";
   
    // document.getElementById("container").appendChild(label).appendChild(select);
//   }

// const select1 = document.createElement("select")
// select1.name = "first-queen"
// select1.id = "first-queen"
// const select2 = document.createElement("select")
// select2.name = "second-queen"
// select2.id = "second-queen"
// const select3 = document.createElement("select")
// select3.name = "third-queen"
// select3.id = "third-queen"
// const label = document.createElement("label")
// label.innerText = "Choose your top three queens:"
// label.htmlFor = "queens"

function showAllQueensTwo(e) {
    // renderTopThreeForm()
    const select1 = document.createElement("select")
    select1.name = "first-queen"
    select1.id = "first-queen"
    const select2 = document.createElement("select")
    select2.name = "second-queen"
    select2.id = "second-queen"
    const select3 = document.createElement("select")
    select3.name = "third-queen"
    select3.id = "third-queen"
    const label = document.createElement("label")
    label.innerText = "Choose your top three queens:"
    label.htmlFor = "queens"
    let queenOption = document.createElement("option")
    queenOption.value = e.id
    queenOption.textContent = e.name
    select1.appendChild(queenOption)
    select2.appendChild(queenOption)
    select3.appendChild(queenoption)
    threeFormContainer.appendChild(label).appendChild(select1)

    // firstQueen.appendChild(queenOption)
    // secondQueen.appendChild(queenOption)
    // thirdQueen.appendChild(queenOption)
    // threeFormContainer.append(firstQueen)
    // threeFormContainer.append(secondQueen)
    // threeFormContainer.append(thirdQueen)
    // <option value="e.dataset.id">e.name</option>
             
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

// function renderTopThreeForm() {
//     // let queenOption = document.createElement("option")
//     // queenOption.value = e.id
//     // queenOption.textContent = e.name
//     // firstQueen.innerText = queenOption
//     // secondQueen.innerText = queenOption
//     // thirdQueen.innerText = queenOption
//     threeFormContainer.innerHTML = `
//     <form class="top-3-form" action="http://localhost:3000/teams/:id"> 
//         <label for="queens">Choose your top three queens:</label>
//             <select id="first-queen" name="first-queen">
                
//             </select>
//             <select id="second-queen" name="second-queen">

//             </select>
//             <select id="third-queen" name="third-queen">

//             </select>
//         <input type="submit" value="Submit">
//     </form>
//     `
// }
displayLogin()


