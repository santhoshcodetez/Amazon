const { where } = require("sequelize");
const {Product}=require("../models")

//CRUD OPERATION

const getProduct=async(req,res)=>{
    try {
        const productget=await Product.findAll()
        res.status(200).json({message:"Products Listed Sucessfully",productget})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error to list out the prodruct",error:error.message})
    }
}

const createProduct=async(req,res)=>{
    try {
        const productcreate=await Product.create(req.body)
        res.status(200).json({message:"created the producted sucessfully",data:productcreate})
    } catch (error) {
        res.status(400).json({message:"error to create a product",error:error.message})
    }
}

const updateProduct=async(req,res)=>{
    try {
        const{id,...updatedRow}=req.body
        const productupdate=await Product.update(updatedRow,{where:{id}})
        res.status(200).json({message:"updated the product data",data:productupdate})
    } catch (error) {
        res.status(400).json({message:"error to update a product",error:error.message})
    }
}

const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.body
        const deleteProduct=await Product.destroy({where:{id}})
        res.status(200).json({message:"delete the product sucessfully",data:deleteProduct})
    } catch (error) {
        res.status(400).json({message:"error to delete the product",error:error.message})
    }
}

module.exports={deleteProduct,createProduct,updateProduct,getProduct}