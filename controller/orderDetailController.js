const { where } = require("sequelize");
const { Customer, Order, OrderDetail, Product } = require("../models");

const getAllDetails = async (req, res) => {
    try {

        const page = isNaN(parseInt(req.query.page)) || parseInt(req.query.page) < 1 ? 1 : parseInt(req.query.page);
        const size = isNaN(parseInt(req.query.size)) || parseInt(req.query.size) < 1 ? 10 : parseInt(req.query.size);
        const offset = (page - 1) * size;
        
        const totalCustomers = await Customer.count();

        const details = await Order.findAll({
            limit: size, 
            offset: offset, 
            
            include: [
                {
                    model: Customer, 
                    as: "Customervalue"
                },
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
        });

        res.status(200).json({
            message: "Data fetched successfully",
            totalCustomers: totalCustomers,
            currentPage: page,
            totalPages: Math.ceil(totalCustomers / size),
            data: details 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching data",
            error: error.message
        });
    }
};


const getCustomerDetails = async (req, res) => {
    try {
        const { id } = req.body;

        const customerDetails = await Customer.findOne({
            where: { id },
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

        if (!customerDetails) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({
            message: "Data fetched successfully",
            data: customerDetails
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error fetching data",
            error: error.message
        });
    }
};





const createOrder = async (req, res) => {
    try {
        const productCreate = await OrderDetail.create(req.body)
        res.status(200).json({ message: "created the producted sucessfully", data: productCreate })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "error to create a Order", error: error.message })
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id, ...updatedRow } = req.body
        const productupdate = await OrderDetail.update(updatedRow, { where: { id } })
        res.status(200).json({ message: "updated the product data", data: productupdate })
    } catch (error) {
        res.status(400).json({ message: "error to update a product", error: error.message })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.body
        const deleteProduct = await OrderDetail.destroy({ where: { id } })
        res.status(200).json({ message: "delete the product sucessfully", data: deleteProduct })
    } catch (error) {
        res.status(400).json({ message: "error to delete the product", error: error.message })
    }
}

module.exports = { deleteOrder, createOrder, updateOrder, getAllDetails, getCustomerDetails }