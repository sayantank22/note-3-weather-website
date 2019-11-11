// We will require our core modules before we require our npm modules just as a convention
const path = require('path')
const express = require('express')  // express is actually a single function as opposed to something like an object and we call it to create a new express application
const hbs = require('hbs')

// console.log(__dirname)  // conatins a path to the directory the current script lives in(app.js script lives in the src dir of web-server folder)
// console.log(__filename) // contains a complete path from the root of my hard drive all the way to the src folder

// Define paths for Express config
const publicDirectoryPath = (path.join(__dirname, '../public'))
// Customizing the views directory
const viewsPath = path.join(__dirname, '../templates/views')   // originally express was looking for views folder by defualt, now we have customized that to templates or any other folder you may name 
const partialsPath  =path.join(__dirname, '../templates/partials')

const app = express()   // does'nt take in any args instead we configure our server by using various application methods provided on the application itself

// Setup handlebars engine and views location
app.set('view engine' ,'hbs')   // settiing up the handlebars for dynamic content
app.set('views', viewsPath)     // we are pointing express to our custom directory
hbs.registerPartials(partialsPath)  // takes a path to thr directory where our partials live, the partialsPath variable contaions the path that the handlebar module needs

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)))   // express.static() is a function, we're calling it and passing its return value into use which takes the path to the folder we want to serve up which we have in line no.7

app.get('', (req, res) => {
    res.render('index', {   // with render we can render on of our templates
        title: 'Weather',
        name: 'Sayantan Karmakar'
    })    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sayantan Karmakar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Sayantan Karmakar"
    })
})


// Suppose we owned the following domain 'app.com' and when someone visits app.com we wanna show home page or something and other pages like :
// app.com/help
// app.com/about
// So here we have one domain app.com and all of ots gonna run on single express server.What we have setup are multiple routes(root route,/about,/help) and we could add others

// So how to setup our server to send a response when someone tries to get something at a specific route?
// We set that up by using a method called get()
// this lets us configure what the server should do when someone tries to get the resource at a specific U.R.L maybe we shuld be sending back HTML or maybe we should be sending back JSON

// Syntax -> (route(the partial url like /help or /about or nothing at all like the first example), function(this is where we wanna describe what we wanna do/send back when someone visits this particular route))

// app.get('route', () => {(The first is an obejct conatining info about the incomming request to the server -> this is commonly called 'req' short for request), (response -> this conatins a bunch of methods allowing us to customize what we're going to send back to the requester -> coomonly called 'res' in short)})

// app.get('', (req, res) => {
//     // vey basic text response displaying some text onto the browser
//     // res.send('Hello express!')  // this allows us to send somethong back to the requester.So is soemone's making a request from code using something like the npm request library they're are going to get this back or if they're making the request from the browser this is what's going to display in the browser window
//     res.send('<h1>Weather</h1>')    // we can put some HTML inside the if we wanna render some HTML
// })

// a new route for the help page.We are gonna need to restart the server for the changes to take effect 
// app.get('/help/', (req, res) => {
//     // res.send('Help page')
//     // when we visit this page we're gonna get a JSON response back.Express gonna detect we've provided an object automatically stringify the JSON object for us and gonna get sent to the requester directly
// //     res.send({ // how to send back JSON which could be an object or an array of objects 
// //     name: 'Sayantan',
// //     age: 24,

// // })
//     res.send([
//         {
//             name: 'Anurup',
//         },
//         {
//             age: 25
//         }
//     ])
// })

// Challange:

// Goal: Setup two new routes
// 1. Setup an about route and render a page title
// 2. Setup a weather route and render a page title
// 3. Test your work by visting both in the server

// Goal: Update routes  
// 1. Setup about route to render a title with HTML
// 2. Setup a weather route to send back JSON
//   - Object with forecast and location strings
// 3. Test your work by visiting both in the browser


// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

// Goal: Update the weather end point to accept address
// 1. No address? Send back an error message
// 2. Address? Send back the static JSON
//   - Add address property onto JSON which returns the provided address
// 3. Test /weather and /weather?address=philadelphia

// Goal: Wire up /weather
// 1. Require geocode/forecast into app.js
// 2. Use the addess to geocode
// 3. Use the coordinates to get the forecast
// 4. Send back the real forecast and location

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.get('/weather', (req, res) => {

    const address = req.query.address

// We could've also done it using if else statement but its more conventional to use return statement since it looks clean and also involves less line of code 

    if(!address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address,
                location,
                forecast: forecastData
            })
        })    
    })
    // res.send({
    //     location: 'United Kingdom',
    //     forecast: 'Heavy rain',
    //     address: req.query.address
    // })

})

// query string format -> url followed by key value pair ->url?key=value -> if we wanna provide  more than one query string we would just separate them using & followed by another key value pair
// Exapmple: localhost -> localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    // info about the query string lives on 'req'
    console.log(req.query)
    res.send({
        products: []
    })
})

// Goal: Create and render a 404 page with handlebars
// 1. Setup template to render the header and footer
// 2. Setup a template to render an error message in a paragraph
// 3. Render the templates for both 404 routes
//     - Page not found
//     - Help article not found
// 4. Test your work. Visit /what and /help/units

// This is going to match any page that hasn't been matched so far and that starts with '/help/'
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found!',
        name: 'Sayantan Karmakar'
    })
})

// to match everything else other those(routes/urls) provided above i.e. match anything that hasn't been matched so far
app.get('*', (req, res) => {    // with the * the wild card character we're saying that everything is a match and as a result /me is considered a match and the 404 page gets sent back
    // res.send('My 404 page')
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found!',
        name: 'Sayantan Karmakar'
    })
})
// Why does app.get nedeed to get last after all other routes are setup?
// -> This has to do with how express is going to end up matching the incoming request with the correct route handler.When Express gets an incoming request it starts to look for a match.
// So as an example Way up at the top it's going to look through how you have setup the application in order.So first it's going to look for a match in the public folder and since there is no /help it needs to continue looking for a match.
// Next up it looks at handler for the route from top to bottom and when is finds the correct route that means the help page gets rendered and it stops looking for any other routes below as ot already found its match.

// Now we need to start the server up we need to use one more method on app which we will only ever use a single time in our app
// this is not the default port. When we visit the website we don't provide the port cause there are default ports for exmaple for like an http based website it is port 80 which we will learn later how to use those ports
// for now inour local development environment as we're viewing on our local machine port 3000 will do just fine
// another optional arg we can pass to this listen method is a callback function which runs when the server is up and  running
app.listen(3000, () => {
    console.log('Server is up on port 3000')    // this message is never gonna display to someone in the browser, for that message on line no. 20 is for, this is just gonna display as an useful piece of info  when runnig the app
})

// when we visited that url in the browser it went off to our server.The Express server found the matching route for the root and it processed the request using our handler which in turn using the res.send() send back a text response which is printed inside the browser
