const express = require('express');
const path = require('path');
const port = 8000;

//./ for parallel folder
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//middleware

// //middleware 1
// app.use(function(req, res, next){
//     req.myName='Shaurya';
//     console.log('Middleware 1 called');
//     next();
// });

// //middleware 2
// app.use(function(req, res, next){
//     console.log('My name from mw1 ',req.myName);
//     console.log('Middleware 2 called');
//     next();
// });
app.use(express.static('assets'));
var contactList=[
    {
        name: 'Shaurya',
        phone: '1234567891'
    },
    {
        name: 'Natasha Romanoff',
        phone: '1234567111'
    },
    {
        name: 'LNCT',
        phone: '1234543210'        
    }
]


app.get('/', (req, res) =>{
    //console.log(__dirname);
    //res.send('Cool it is running !');
    // console.log('from get route controller',req.myName);
   Contact.find({} ,function(err, contacts){
       if (err){
           console.log('Error in fetching contacts from db');
           return;
       }

       return res.render('home',{
        title : 'Contacts List',
        contact_list : contacts
    });

    // to display all contacts with name db
    // Contact.find({name : 'db'} ,function(err, contacts){
    //     if (err){
    //         console.log('Error in fetching contacts from db');
    //         return;
    //     }
 
    //     return res.render('home',{
    //      title : 'Contacts List',
    //      contact_list : contacts
    //  });

   });
   
    // return res.render('home',{
    //     title:'Contacts List',
    //     contact_list:contactList
    // });
});

app.get('/practice', (req, res) =>{
    return res.render('practice',{
        title : 'Play  with EJS'
    });
});

//form action is /create-contact in index.js
app.post('/create-contact',function(req, res){
    //push data to the database
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){ //callback function
        if(err){
            console.log('Error in creating contact!');
            return;
        }
        console.log('******', newContact);
        return res.redirect('back');
    });
    
    // contactList.push(req.body);
    // return res.redirect('back');


    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    //return res.redirect('practice');
    

    });


// app.get('/delete-contact/:phone', (req, res)=>{
//     console.log(req.params);
//     let phone = req.params.phone;   
// });

app.get('/delete-contact/', (req, res)=>{
    //get the id from query in url
    let id = req.query.id;

    //find the contact in database using id and delete it
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from database'.err);
            return ;
        }

        return res.redirect('back');
    });

    // console.log(req.query);
    // let phone = req.query.phone;   
    // let contactIndex = contactList.findIndex(contact => contact.phone==phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }
    // res.redirect('back');
});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server ',err);
    }
    console.log('Yup! My Express Server is running on Port: ',port);
});