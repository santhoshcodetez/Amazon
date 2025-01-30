const { Where } = require('sequelize/lib/utils')
const { where } = require('sequelize')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {Customer}=require('../models')


const getCustomer = async (req, res) => {
    try {
        const getcustomer = await Customer.findAll()
        res.status(200).json({ message: "Fetched the customer sucessfully", Data: getcustomer })
    } catch (error) {
        res.status(400).json({ message: "error to get the customer" })
    }
}

const register = async (req, res) => {
    const { Username, Password, email, contact  } = req.body
    try {
        const existingcustomer = await Customer.findOne({ where: { email } })
        if (existingcustomer) {
            return res.status(400).json({ message: "Email is already in use" })
        }
        const hashedpassword = await bcrypt.hash(Password, 10)

        const newCustomer = await Customer.create({ Username, Password: hashedpassword, email,contact  })
        // const token = jwt.sign({ id: newCustomer.id, Username: newCustomer.Username }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(201).json({ message: "User Registed Sucessfully",newCustomer })
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: "Error registering User", error: error.message })
    }
}

const Login = async (req, res) => {
    const { Username, Password, email } = req.body;
    try {
     
        const existCustomer = await Customer.findOne({ where: { email } });
        if (!existCustomer) {
            return res.status(404).json({ message: "User not found. Please register first." });
        }


        if (existCustomer.Username !== Username) {
            return res.status(400).json({ message: "Invalid username. Please check your credentials." });
        }

        const isPasswordValid = await bcrypt.compare(Password, existCustomer.Password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password. Please try again." });
        }

 
        const token = jwt.sign(
            { id: existCustomer.id, Username: existCustomer.Username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: existCustomer.id,
                Username: existCustomer.Username,
                email: existCustomer.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id, ...rowsUpdate } = req.body;
        const updatecustomer = await Customer.update(rowsUpdate, { where: { id } })
        if (updatecustomer[0] > 0) {
            res.status(200).json({ message: "updated the customer data sucessfully", Data: updatecustomer })
        } else {
            res.status(404).json({ message: "ID not found" })
        }

    } catch (error) {
        console.log(error);

        res.status(400).json({ message: "error to update a customer data", error: error.message })
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.body;
        const deletecustomer = await Customer.destroy({ where: { id } })
        res.status(200).json({ message: "delete the customer data sucessfully", Data: deletecustomer })
    } catch (error) {
        res.status(400).json({ message: "error to delete the customer data", error: error.message })
    }
}

module.exports = { deleteCustomer, updateCustomer, getCustomer, Login, register }