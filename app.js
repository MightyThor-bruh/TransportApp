import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './constants/constants.js';
import router from './routes/router.js';
import { join } from 'path';
import { engine } from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import 'dotenv/config'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create app
const app = express();

//middleware for parsing http-responses

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// handlebars engine init

app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');

//using public folder for css

app.use(express.static(join(__dirname, 'public')));

//session setup

app.use(session({
    secret: 'tangerine',
    resave: false,
    saveUninitialized: false
}));
  
//passport setup

app.use(passport.initialize());
app.use(passport.session());

//using router for specified routes
app.use(router);

//app initialization

async function init() {

    // try{
    //     await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`);
    // }
    // catch(e) {
    //     console.log(`Database connection error`, e);
    // }

    const server = app.listen(PORT, () => {
        console.log(`Server has been started at http://localhost:${PORT}`);
    });
}

init();