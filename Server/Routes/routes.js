const express=require('express');
const mongoose=require('mongoose');
const router= express.Router();
const Student=require('../Model/studentSchema');


router.get('/',async(req,res)=>{
    try{
        const users=await Student.find();
        res.json(users);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.get('/:id',async(req,res)=>{
    try{
        const newStudent=await Student.findById(req.params.id);
        if(!newStudent){
            res.status(500).json("Student not found");
        }
        res.status(201).json(newStudent);
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

router.post('/',async(req,res)=>{
    try{
        const newStudent = new Student(req.body);
        const saveStudent=await newStudent.save();
        res.status(201).json(saveStudent); 
    }catch(err){
        res.status(501).json({error: err.message});
    }
});

router.patch('/:id',async(req,res)=>{
    try{
        const newUser=await Student.findByIdAndUpdate(req.params.id,req.body);
        if(!newUser){
            return res.status(500).json({error:"Student not found"});
        }
        res.status(201).json(newUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const newUser=await Student.findByIdAndDelete(req.params.id);
        if(!newUser){
            return res.status(500).json({error: "Student not found"});
        }
        res.json("Student deleted");
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

module.exports=router;