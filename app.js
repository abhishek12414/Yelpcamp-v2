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
    image: String,
    description: String
});

const Campground = mongoose.model('Campground', CmapgroundSchema);

// Campground.create({
//     name: 'Salmon Creek', 
//     image: 'http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx',
//     description: 'Velit veniam officia velit est aute fugiat. Irure sint nostrud aliquip nulla commodo enim fugiat consectetur laboris dolor Lorem proident tempor non. Cillum Lorem tempor eiusmod et excepteur laboris exercitation eu excepteur ad quis. Id cillum consectetur aliquip qui id aliqua ex magna mollit consequat sunt quis.'
// }, (err, campground)=> {
//     if(err)
//         console.log('Error occurs');
//     else
//         console.log(campground);
// });

//SHOW all campgrounds
app.get("/", (req, res)=>{
    // res.send('This will be the landing page soon!')
    res.render('landing', {msg : 'Welcome to the landing page'});
})


//CREATE - add new campground to database
app.post('/campgrounds', (req, res)=>{

    const newCampground = {
        name: req.body.camp_name,
        image: req.body.camp_image,
        description: req.body.camp_description
    }

    //Create a new campground and save to database
    Campground.create(newCampground, (err, campground)=>{
        if(err)
            console.log(err);
        else
            res.redirect('/campgrounds');
    });
});


//INDEX - show all campgrounds
app.get('/campgrounds', (req, res)=> {
    // res.render('campgrounds', {campgrounds: campgrounds});
    
    // Get all campgrounds from the database
    Campground.find({}, (err, allCampgrounds)=> {
        if(err)
            console.log(err);
        else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});


//NEW - show form to create new campground
app.get('/campgrounds/new', (req, res)=>{
    res.render('new');
});


//SHOW - show more info about one campground
app.get('/campgrounds/:id', (req, res)=>{
    // res.send('This will be the show page one day');

    Campground.findById(req.params.id, (err, foundCampground)=> {
        if(err)
            console.log(err);
        else
            res.render('show', {campground: foundCampground});
    });
});


//SERVER - server running details 
app.listen(3002, ()=>{
    console.log('Server started at http://localhost:3002');
})