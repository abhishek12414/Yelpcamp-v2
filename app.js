const express       = require('express'),
      app           = express(),
      mongoose      = require('mongoose'),
      bodyParser    = require('body-parser');


mongoose.connect('mongodb://localhost:27017/yelp_camp');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))

//SCHEMA SETUP
const CmapgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model('Campground', CmapgroundSchema);

//Create a campground
// Campground.create(
//     {
//         name: 'Salmon Creek', 
//         image: 'http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx'
//     }, (err, campground)=>{
//         if(err) {
//             console.log('Error Occurs');
//             console.log(err);
//         } else {
//             console.log('Data Inserted');
//             console.log(campground);
//         }
//     });

// let campgrounds = [
    
//     {name: 'Granite Hill', image: 'http://www.nationalparks.nsw.gov.au/~/media/0C7C17503AAA45ECBE28979DDB954468.ashx'},
//     {name: "Mountain Goat's Rest", image: 'http://www.nationalparks.nsw.gov.au/~/media/1772ABCFF6644EE5A4C966E987F987BD.ashx'}
// ];

app.get("/", (req, res)=>{
    // res.send('This will be the landing page soon!')
    res.render('landing', {msg : 'Welcome to the landing page'});
})

app.post('/campgrounds', (req, res)=>{

    const newCampground = {
        name: req.body.camp_name,
        image: req.body.camp_image
    }

    //Create a new campground and save to database
    Campground.create(newCampground, (err, campground)=>{
        if(err)
            console.log(err);
        else
            res.redirect('/campgrounds');
    });
});


app.get('/campgrounds', (req, res)=> {
    // res.render('campgrounds', {campgrounds: campgrounds});
    
    // Get all campgrounds from the database
    Campground.find({}, (err, allCampgrounds)=> {
        if(err)
            console.log(err);
        else {
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    });
});


app.get('/campgrounds/new', (req, res)=>{
    res.render('new');
});

app.listen(3002, ()=>{
    console.log('Server started at http://localhost:3002');
})