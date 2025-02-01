const { where } = require("sequelize");
const {OrderDetail}=require("../models")



const getOrder=async(req,res)=>{
    try {
        const productget=await OrderDetail.findAll()
        res.status(200).json({message:"Products Listed Sucessfully",data:productget})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error to list out the prodruct",error:error.message})
    }
}

const createOrder=async(req,res)=>{
    try {
        const productCreate=await OrderDetail.create(req.body)
        res.status(200).json({message:"created the producted sucessfully",data:productCreate})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"error to create a Order",error:error.message})
    }
}

const updateOrder=async(req,res)=>{
    try {
        const{id,...updatedRow}=req.body
        const productupdate=await OrderDetail.update(updatedRow,{where:{id}})
        res.status(200).json({message:"updated the product data",data:productupdate})
    } catch (error) {
        res.status(400).json({message:"error to update a product",error:error.message})
    }
}

const deleteOrder=async(req,res)=>{
    try {
        const {id}=req.body
        const deleteProduct=await OrderDetail.destroy({where:{id}})
        res.status(200).json({message:"delete the product sucessfully",data:deleteProduct})
    } catch (error) {
        res.status(400).json({message:"error to delete the product",error:error.message})
    }
}

module.exports={deleteOrder,createOrder,updateOrder,getOrder}