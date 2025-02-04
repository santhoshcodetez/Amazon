const { where } = require("sequelize");
const {Order,OrderDetail}=require("../models")
const {generateOrderNum}=require('../controller/autogenerateFunction')

//CRUD OPERATION

const getOrder=async(req,res)=>{
    try {
        const productget=await Order.findAll()
        res.status(200).json({message:"Order Listed Sucessfully",data:productget})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Error to list out the prodruct",error:error.message})
    }
}

const createOrder=async(req,res)=>{
    const{deliveryDate,orderDate,orderStatus,customerId}=req.body
    try {
        
        const orderNum=generateOrderNum()
        const productCreate=await Order.create({
            orderNum,
            deliveryDate,
            orderDate,
            orderStatus,
            customerId,
        })
        for(const orderdetailuser of req.body.OrderDetail){
            await OrderDetail.create({
                Quantity:orderdetailuser.Quantity,
                Price:orderdetailuser.Price,
                discount:orderdetailuser.discount,
                totalAmount:orderdetailuser.totalAmount,
                status:orderdetailuser.status,
                orderId:productCreate.id,
                productId:orderdetailuser.productId
            })
        }
        res.status(200).json({message:"created the producted sucessfully",data:productCreate})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"error to create a Order",error:error.message})
    }
}



const updateOrder=async(req,res)=>{
    try {
        const{id,...updatedRow}=req.body
        const productupdate=await Order.update(updatedRow,{where:{id}})
        res.status(200).json({message:"updated the product data",data:productupdate})
    } catch (error) {
        res.status(400).json({message:"error to update a product",error:error.message})
    }
}

const deleteOrder=async(req,res)=>{
    try {
        const {id}=req.body
        const deleteProduct=await Order.destroy({where:{id}})
        res.status(200).json({message:"delete the product sucessfully",data:deleteProduct})
    } catch (error) {
        res.status(400).json({message:"error to delete the product",error:error.message})
    }
}

module.exports={deleteOrder,createOrder,updateOrder,getOrder}