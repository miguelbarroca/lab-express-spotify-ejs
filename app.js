require('dotenv').config()
// acess .env 
// process.env.PORT
// process.env.SOME_PASSWORD
// process.env.SPOTIFY_KEY

const express = require('express')
const expressLayouts = require('express-ejs-layouts')


// require spotify-web-api-node package here:

const app = express()

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

// setting the spotify-api goes here:
const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })
  spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error))
// Our routes go here:

app.get('/', (req, res) => {
    res.render('index')
  })

  app.get('/artist-search-results', (req, res) => {
    res.render('artist-search-results')
  })
let allArtists

app.get('/artist-search', async (req, res) => {
    const ourQueries = req.query
    await spotifyApi
    .searchArtists(ourQueries.searchTerm)
    .then((data) =>{
        console.log(data.body.artists.items[0])
        allArtists = data.body.artists.items
    })
    .catch((error) => {
    console.log(error)
    })
    res.render('artist-search-results', {allArtists})
  });
  






































app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'))
