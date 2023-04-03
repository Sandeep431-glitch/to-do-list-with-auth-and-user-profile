const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')
// importng the Schema For tasks
const  Task  = require('../models/task');

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

//------------ Dashboard Route ------------//
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    Task.find({}, function(err, task){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

    return res.render('dash', {
    name: req.user.name,
    userId: req.user.id,
    tittle: "Home",
    task: task
    });
})});


// creating tasks
router.post('/create-task', function(req, res){
    
    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        userId: req.user.id
        }, function(err, newtask){
    
            if(err)
            {
                console.log('error in creating task', err); 
                return;
            }
        
        return res.redirect('back');//to go back to previous page

    });
});


// deleting Tasks
router.get('/delete-task', function(req, res){
    
    // get the id from query
    var id = req.query;

    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        Task.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err)
        {
            console.log('error in deleting task');
            }
        });
    }
    return res.redirect('back'); 
});

module.exports = router;

