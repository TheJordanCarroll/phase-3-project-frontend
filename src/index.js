// Query Selector //
countryPage = index.html.querySelector("#country")
console.log(countryPage)
// Event Listener //


// Fetch //

function showCountries () {
    fetch("http://localhost:3000/countries") 
    .then(response => response.json())
    .then(data => data.forEach(element => showAllCountries(element)))
}

// Function //

function showAllCountries(e) {
    let span = document.createElement("img")
    span.src = e.image
    span.dataset.id = e.id
    countryPage.append(span)
}

showCountries()