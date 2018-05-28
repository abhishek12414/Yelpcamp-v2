const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

let campgrounds = [
    {name: 'Salmon Creek', image: 'http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx'},
    {name: 'Granite Hill', image: 'http://www.nationalparks.nsw.gov.au/~/media/0C7C17503AAA45ECBE28979DDB954468.ashx'},
    {name: "Mountain Goat's Rest", image: 'http://www.nationalparks.nsw.gov.au/~/media/1772ABCFF6644EE5A4C966E987F987BD.ashx'}
];

app.get("/", (req, res)=>{
    // res.send('This will be the landing page soon!')
    res.render('landing', {msg : 'Welcome to the landing page'});
})

app.post('/campgrounds', (req, res)=>{

    const newCampground = {
        name: req.body.camp_name,
        image: req.body.camp_image
    }

    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});


app.get('/campgrounds', (req, res)=> {
    res.render('campgrounds', {campgrounds: campgrounds});
});


app.get('/campgrounds/new', (req, res)=>{
    res.render('new');
});

app.listen(3002, ()=>{
    console.log('Server started at http://localhost:3002');
})