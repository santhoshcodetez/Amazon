const { where } = require("sequelize");
// const {OrderDetail}=require("../models")



const { Customer, Order, OrderDetail, Product } = require("../models");
const getAllDetails = async (req, res) => {
    try {
        const details = await Customer.findAll({
            include: [
                {
                    model: Order,
                    as: "OrderValue",
                    include: [
                        {
                            model: OrderDetail,
                            as: "OrderDetails",
                            include: [
                                {
                                    model: Product,
                                    as: "ProductValue"
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.status(200).json({
            message: "Data fetched successfully",
            data: details
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching data",
            error: error.message
        });
    }
};




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

module.exports={deleteOrder,createOrder,updateOrder,getAllDetails}