// Query Selector //
countryPage = document.querySelector("#country")
seasonAllQueens = document.querySelector(".queenContentwrapper")
let countryId = 1

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
    .then(function(response) {(element => if (element.country_id === countryId ? console.log(e.image) : console.log(e.name)))
}
.then(data => data.forEach(element)
// .then(function(response) {
//     if (element.country_id === countryId {
//        // do something
//      };
//    })
function showAllCountries(e) {
    let span = document.createElement("img")
    span.src = e.image
    span.dataset.id = e.id
    countryPage.append(span)
}

// function seasonQueens(e) {
// //  e.country_id === countryId ? console.log(e.image) : console.log(e.name)
// }



showCountries()
showSeasonQueens()