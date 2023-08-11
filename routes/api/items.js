import express from "express";
import Item from "../../models/Item.js";
import auth from "../../middleware/auth.js";
const router = express.Router();
//Item model
//@ route GET api/items
//@ get all items
router.get('/',(req,res) =>{
  Item.find()
     .sort({date:-1})
     .then(items=>res.json(items))
})
// @ route POST api/items
// @ create a item
router.post('/',auth,(req,res) =>{
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
})
// @ route DELTE api/items
// @ delete a item
router.delete('/:id',auth,(req,res) =>{
   Item.findByIdAndDelete(req.params.id)
     .then(()=>res.status(200).json({success:true}))
     .catch(err=>res.status(500).json({success:false}))
      
})




export default router;
