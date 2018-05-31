const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
    {
        name: 'Salmon Creek', 
        image: 'http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx',
        description: 'Velit veniam officia velit est aute fugiat. Irure sint nostrud aliquip nulla commodo enim fugiat consectetur laboris dolor Lorem proident tempor non. Cillum Lorem tempor eiusmod et excepteur laboris exercitation eu excepteur ad quis. Id cillum consectetur aliquip qui id aliqua ex magna mollit consequat sunt quis.'
    },{
        name: 'Ford Garden', 
        image: 'https://www.nps.gov/yell/planyourvisit/images/ndh-yell-7210_2.jpg',
        description: 'Cillum Lorem tempor eiusmod et excepteur laboris exercitation eu excepteur ad quis. Id cillum consectetur aliquip qui id aliqua ex magna mollit consequat sunt quis. Velit veniam officia velit est aute fugiat. Irure sint nostrud aliquip nulla commodo enim fugiat consectetur laboris dolor Lorem proident tempor non. '
    },{
        name: 'Dew Park', 
        image: 'http://www.rockyspringscampground.com/ESW/Images/DSCN7086.JPG',
        description: 'Irure sint nostrud aliquip nulla commodo enim fugiat consectetur laboris dolor Lorem proident tempor non. Cillum Lorem tempor eiusmod et excepteur laboris exercitation eu excepteur ad quis. Id cillum consectetur aliquip qui id aliqua ex magna mollit consequat sunt quis.'
    }
]

function seedDB() {
    Campground.remove({}, (err)=> {
        if(err) {
            console.log(err);
        }
        console.log('removed campgrounds!');
        data.forEach((seed)=>{
            Campground.create(seed, (err, campground)=>{
                if(err)
                    console.log(err)
                else{
                    console.log('added a campground');
                    // console.log(data);
                    Comment.create({
                            text: 'lorem ipsum text is very awesome here in this campground',
                            author: 'Mark Tom'
                        }, (err, comment)=> {
                            if(err)
                                console.log(err)
                            else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log('Campground commented successfully.');
                            }
                        });
    
                }
            });
        });
    });

   
}

module.exports = seedDB;