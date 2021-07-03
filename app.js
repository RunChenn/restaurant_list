const express = require('express');

const app = express();

// require express-handlebars here
const exphbs = require('express-handlebars');

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// setting static files
app.use(express.static('public'));

const restaurantsList = require('./restaurants.json');

const port = 3000;

app.get('/', (req, res) => {
    res.render('index', {
        restaurants: restaurantsList.results,
        isFindRestaurant: true
    });
});

app.get('/search', (req, res) => {
    const keyword = req.query.keyword.trim();
    
    const restaurants = restaurantsList.results.filter( restaurant => (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())));

    const isFindRestaurant = (restaurants.length !== 0) ? true : false;

    res.render('index', { restaurants, keyword, isFindRestaurant });
});

app.get('/restaurants/:restaurant_id', (req, res) => {
    const restaurantsOne = restaurantsList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id);
    res.render('show', { restaurant: restaurantsOne });
});

app.listen(port, () => console.log(`Express is listening on localhost: ${port}.`));