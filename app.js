const path = require('path');
const fs = require('fs');

const express = require('express');
const res = require('express/lib/response');

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
   res.render('index');
});


app.get('/restaurant-title', (req, res) =>{
    const filePath = path.join(__dirname, 'data', 'restaurant.json');

    const FileData = fs.readFileSync(filePath);
    const storeData = JSON.parse(FileData);
    res.render('restaurant-title', { numberOfRestaurant: storeData.length, Restaurants: storeData });
})



app.get('/about', (req, res) =>{
    res.render('about');
})


app.get('/confirm', (req, res) =>{
    res.render('confirm');
})

app.get('/shared', (req, res) =>{
    res.render('shared');
})
app.post('/user', (req, res) =>{
    const userDetail = req.body;
    const filePath = path.join(__dirname, 'data', 'restaurant.json');

    const FileData = fs.readFileSync(filePath);
    const storeData = JSON.parse(FileData);

    storeData.push(userDetail);

    fs.writeFileSync(filePath, JSON.stringify(storeData));

    res.redirect('/confirm')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Connected sucessfully with Server ${PORT}`);
})