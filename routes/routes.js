const express=require("express")
const router=express.Router()
const customerController=require("../controller/customerController")
const productController=require("../controller/productController")

router.get('/getcustomer',customerController.getCustomer)
router.post('/postcustomer',customerController.register)
router.put('/updatecustomer',customerController.updateCustomer)
router.delete('/deletecustomer',customerController.deleteCustomer)
router.post('/logincustomer',customerController.Login)

router.get('/getProduct',productController.getProduct)
router.post('postProduct',productController.createProduct)
router.put('/updateProduct',productController.updateProduct)
router.delete('/deleteProduct',productController.deleteProduct)



module.exports=router;