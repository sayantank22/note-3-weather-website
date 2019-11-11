// Here we are using 'then' method on the return value from the fetch and we provide to it the callback function we wanna run and we get access to the response as
// the first and only arg up above and then inside that we can use the response to do whatever we want to do like exract the data and render it 
// to the browser or just dump it to the console.So we are saying fetch data from the URL and then run this function.'then' method is part of a much bigger API and we'll be
// exploring laterin the class known as promises,we are going to explore promises and its companion async wait in detail in upcoming sections when we learn how to connect node
// js to a database.Now we have access to the response and our goal is to just get the data to get that string puzzle and do something simple with it like render it to the browser
// or dump it to the console.We have acess to that via response.json() and this is also designed to work with 'then' followed by a callback function.This function i going to run
// when the json data has arrived and has been parsed.Then we have acces to the parsed data and a javascript object is the one and only arg passed in and we are call that data and use it.


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// Goal: Fetch weather!
// 1. setup to call fetch to fetch weather for Kolkata
// 2. Get the parse JSON response
//    - If error property, print error
//    - If no error property print location and forecast
// Refresh the browser and test your work


// fetch('http://localhost:3000/weather?address=Kolkata').then((response) => {
//     response.json().then((data)=> {
//         if(data.error){
//             return console.log(data.error)
//         }
//         console.log(data.location)
//         console.log(data.forecast)
        
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')  // now we have access to search and we can extract its value right here after the user submits the form 
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// Goal: Use the input value to get weather
// 2. Migrate fetch call into the sumit callback
// 3. Use the search text as the address query string value
// 3. Submit the form with a valid and an invalid value to test

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()    // this is going to prevent that default behavior which is to refresh the browser allowing the server to render a new page instead its going to do nothing  allowing us to do whatever we want by letting the function run
    // console.log('testing')
    const location = search.value   // value extracts the input value which is whatever we typed in and here we are just storing it in the variable
    // console.log(location)

    messageOne.textContent ='Loading...'
    messageTwo.textContent = ''

    // The problem with this line is when the url below runs on heroku it's still gonna access localhost which is not gonna exist which will pervent us from fetching the weather 
    // fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    // To adrress this we wanna remove the domain completely that means if we are on localhost we would want to make the request to localhost or if we're on our heroku app url we wanna make the request to that url similar to what we did with header.hbs(/the thing we wanna visit) 
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
               // return console.log(data.error)
               return messageOne.textContent = data.error
            }
            // console.log(data.location)
            // console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})