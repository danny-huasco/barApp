const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set Handlebars as the view engine
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing request bodies (optional, but common)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve Bootstrap CSS from node_modules
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
// Serve Bootstrap JS from node_modules
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

//routes
const clientRoutes = require('./routes/clientRoutes');
const bartenderRoutes = require('./routes/bartenderRoutes');

app.use('/client', clientRoutes);
app.use('/bartender', bartenderRoutes);
app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Welcome to the Bar App' });    
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
