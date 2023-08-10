import express from "express";
//import exphbs from 'express-handlebars'
import path from 'path'
import indexRoutes from './routes/index.routes'
import morgan from 'morgan'

const app = express()
const exphbs = require('express-handlebars').engine

//Indicar a express donde esta la carpeta views
app.set('views', path.join(__dirname, 'views'));

app.engine(".hbs",exphbs({
        layoutsDir: path.join(app.get('views'), 'layouts'),
        deafaultLayout: "main", 
        extname: ".hbs", 
    })
);

//definir motor de plantilla
app.set('view-engine', '.hbs')

// middlwares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false }));


//routes
app.use(indexRoutes)

export default app;