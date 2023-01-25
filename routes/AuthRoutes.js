const express = require('express')
const mongoose = require("mongoose");
const router = express.Router();
const User = mongoose.model('User');
// const Event = mongoose.model('Event')

router.post('/api/signup', async (req,res) => {

  const {nom,email,imageCouverture,textBienvenue,presentation1Image,presentation1Titre,presentation1Description,presentation2Image,presentation2Titre,presentation2Description,presentation3Image,presentation3Titre,presentation3Description,created_at,updated_at} = req.body;
  try{
    const user = new User({nom,email,imageCouverture,textBienvenue,presentation1Image,presentation1Titre,presentation1Description,presentation2Image,presentation2Titre,presentation2Description,presentation3Image,presentation3Titre,presentation3Description,created_at,updated_at});
    await user.save();
    console.log(user)
    res.send({user})
  }catch(err){
    res.status(422).send(err.message)
  }
})

router.get('/api/allUsers', (req,res) => {
  User.find({}, (err,data) =>{
    if (!err) {
      res.send(data)
    }else {
      console.log(err)
    }
  })
})

router.get('/api/singleUsers/:id', (req,res) =>{
  User.findById(req.params.id, (err,data) =>{
    if (!err) {
      res.send(data)
    } else {
      console.log(err)
    }
  })
})

router.get('/cors', (req, res) => {
res.set('Access-Control-Allow-Origin', '*');
res.send({ "msg": "This has CORS enabled" })
})

// get single event 
// router.get('/api/single/event/:id', (req,res) =>{
//   Event.findById(req.params.id, (err,data) =>{
//     if (!err) {
//       res.send(data)
//     } else {
//       console.log(err)
//     }
//   })
// })


module.exports = router