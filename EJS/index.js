const express = require('express');
const app = express();
const PORT = 3001;
const Contenedor = require('./components/products/index');
let archivo = new Contenedor('productos.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/products', async (req, res, next) => {
    const products = await archivo.getAll();
    res.render('index-prod', {products})
})

app.get('/', (req, res, next) => {
    res.render('index-form', {})
}) 

app.post('/products', async (req, res, next) => {
    const addProd = req.body;
    await archivo.save(addProd);
    res.redirect('/')
}) 


let connected_server = app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
connected_server.on('error', error => console.log(error));
