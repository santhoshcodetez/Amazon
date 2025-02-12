const express=require("express")
const router=express.Router()
const customerController=require("../controller/customerController")
const productController=require("../controller/productController")
const Ordercontroller=require("../controller/orderController")
const OrderDetailController=require("../controller/orderDetailController")
const PaymentController=require("../controller/paymentController")

router.get('/getcustomer',customerController.getCustomer)
router.post('/postcustomer',customerController.register)
router.put('/updatecustomer',customerController.updateCustomer)
router.delete('/deletecustomer',customerController.deleteCustomer)
router.post('/logincustomer',customerController.Login)

router.get('/getProduct',productController.getProduct)
router.post('/postProduct',productController.createProduct)
router.put('/updateProduct',productController.updateProduct)
router.delete('/deleteProduct',productController.deleteProduct)

router.get('/getOrder',Ordercontroller.getOrder)
router.post('/postOrder',Ordercontroller.createOrder)
router.put('/updateOrder',Ordercontroller.updateOrder)
router.delete('/deleteOrder',Ordercontroller.deleteOrder)

router.get('/getDetail',OrderDetailController.getAllDetails)
router.get('/getAllDetailsid', OrderDetailController.getAllDetailsid);
router.get('/getDetail/all',OrderDetailController.getAllDetailsCount)
router.post('/postDetail',OrderDetailController.createOrder)
router.put('/updateDetail',OrderDetailController.updateOrder)
router.delete('/deleteDetail',OrderDetailController.deleteOrder)
router.get('/getDetailId',OrderDetailController.getCustomerDetails)

router.get('/getPayment',PaymentController.getPayment)
router.post('/postPayment',PaymentController.createPayment)
router.put('/updatePayment',PaymentController.updatePayment)
router.delete('/deletePayment',PaymentController.deletePayment)

module.exports=router;
