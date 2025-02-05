const { where } = require("sequelize");
const { Payment } = require("../models")

const getPayment = async (req, res) => {
    try {
        const productget = await Payment.findAll()
        const productCount = await Payment.count()
        res.status(200).json({ message: "Products Listed Sucessfully", totalproducts: productCount, data: productget })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error to list out the prodruct", error: error.message })
    }
}


const createPayment = async (req, res) => {
    const { orderId, orderAmount, voucher, paymentType } = req.body
    try {
        const totalAmount = orderAmount - voucher;

        const paymentDescription = paymentType === 1 ? "Online Payment" : paymentType === 2 ? "Cash Payment" : "Unknown Payment Type";

        const productcreate = await Payment.create({
            orderId,
            orderAmount,
            voucher,
            totalAmount,
            paymentType,
            paymentDescription

        })
        console.log(paymentDescription);

        res.status(200).json({ message: "created the producted sucessfully", data: productcreate })
    } catch (error) {
        res.status(400).json({ message: "error to create a product", error: error.message })
    }
}



const updatePayment = async (req, res) => {
    try {
        const { id, ...updatedRow } = req.body
        const productupdate = await Payment.update(updatedRow, { where: { id } })
        res.status(200).json({ message: "updated the product data", data: productupdate })
    } catch (error) {
        res.status(400).json({ message: "error to update a product", error: error.message })
    }
}

const deletePayment = async (req, res) => {
    try {
        const { id } = req.body
        const deleteProduct = await Payment.destroy({ where: { id } })
        res.status(200).json({ message: "delete the product sucessfully", data: deleteProduct })
    } catch (error) {
        res.status(400).json({ message: "error to delete the product", error: error.message })
    }
}

module.exports = { deletePayment, createPayment, updatePayment, getPayment }