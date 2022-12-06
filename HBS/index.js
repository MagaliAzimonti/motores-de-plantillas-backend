const express = require('express');
const app = express();
const PORT = 3003;
const Contenedor = require('./components/products/index');
let archivo = new Contenedor('productos.json');

let hbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('hbs', hbs.engine())
app.set('views', './views');
app.set('view engine', 'hbs');

app.get('/products', async (req, res, next) => {
    const products = await archivo.getAll();
    res.render('prods', {products})
})

app.get('/', (req, res, next) => {
    res.render('formulario', {})
}) 

app.post('/products', async (req, res, next) => {
    const addProd = req.body;
    await archivo.save(addProd);
    res.redirect('/')
}) 


let connected_server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
connected_server.on('error', error => console.log(error));
