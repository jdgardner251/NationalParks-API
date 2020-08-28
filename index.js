'use strict';

const apiKey = "api_key=OkOQUQ0aDFRTckhyJViYwzlNRlb2B7Yrcu9dwGhC";

const searchURL = "https://developer.nps.gov/api/v1/parks"

function displayResults(responseJson) {
    console.log(responseJson);
    // remove previous results if there were any
    $('#results-list').empty();
    console.log(responseJson.data.length)
    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].fullName}</h3>
                <p>${responseJson.data[i].description}</p>
                <p><a href=${responseJson.data[i].url}>Visit Site</a></p>
            </li>`
        )};
}


function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${key}=${(params[key])}`)
    console.log(queryItems.join('&'));
    return queryItems.join('&');
}


function getParks(stateCodes, maxResults){
    const params = {
        stateCode: stateCodes,
        limit: maxResults,
    }

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString + "&" + apiKey

    console.log(url)

    fetch(url)
        .then(response => response.json()
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`something went wrong: ${err.message}`);
        }))
}


function watchForm() {
    // event listener on the form waiting for a submit
    $('form').submit(event => {
        // have to prevent default behavior
        event.preventDefault();
        // find value of the user input
        const stateCodes = $('#js-state-input').val().split(",");
        console.log(stateCodes);  
        const maxResults = $('#js-max-results').val();
        console.log(maxResults);
        
        getParks(stateCodes, maxResults);
    })
}

$(watchForm);

