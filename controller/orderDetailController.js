const { where } = require("sequelize");
const { Customer, Order, OrderDetail, Product,Payment } = require("../models");
const paginate = require('../controller/paginationFunction'); // Assuming pagination function is defined


const getAllDetails = async (req, res) => {
    try {
        const details = await Order.findAll({
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


const getAllDetailsid = async (req, res) => {
    const { customerId, paymentType } = req.body;  

    if (!customerId && !paymentType) {
        return res.status(400).json({
            message: "Either customerId or paymentType is required"
        });
    }

    console.log("Received customerId:", customerId);
    console.log("Received paymentType:", paymentType);

    try {
        let whereCondition = {};

        if (customerId) {
            whereCondition.customerId = customerId;
        }

        let wherePaymentCondition = {};

        if (paymentType) {
            wherePaymentCondition.paymentType = paymentType;
        }

        const details = await Order.findAll({
            where: whereCondition,  
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
                },
                {
                    model: Payment,
                    as: "PaymentValue",
                    where: wherePaymentCondition
                }
            ]
        });

        if (details.length === 0) {
            return res.status(404).json({
                message: "No orders found for the given criteria"
            });
        }

        res.status(200).json({
            message: "Data fetched successfully", 
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



const getAllDetailsCount = async (req, res) => {
    try {
        const { page, size, offset } = paginate(req.query.page, req.query.size);

        const details = await Order.findAndCountAll({
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
            totalCustomers: details.count,
            currentPage: page,
            totalPages: Math.ceil(details.count / size),
            data: details.rows
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
    const { id } = req.body;

   
    if (!id) {
        return res.status(400).json({
            message: "Customer ID is required"
        });
    }

    try {
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
        const productCreate = await OrderDetail.create(req.body);
        res.status(200).json({ message: "Created the product successfully", data: productCreate });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating an order", error: error.message });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    try {
        const { id, ...updatedRow } = req.body;
        const productUpdate = await OrderDetail.update(updatedRow, { where: { id } });
        res.status(200).json({ message: "Updated the order data", data: productUpdate });
    } catch (error) {
        res.status(400).json({ message: "Error updating the order", error: error.message });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.body;
        const deleteProduct = await OrderDetail.destroy({ where: { id } });
        res.status(200).json({ message: "Deleted the order successfully", data: deleteProduct });
    } catch (error) {
        res.status(400).json({ message: "Error deleting the order", error: error.message });
    }
};

module.exports = { 
    deleteOrder, 
    createOrder, 
    updateOrder, 
    getAllDetails, 
    getCustomerDetails, 
    getAllDetailsCount,
    getAllDetailsid 
};
