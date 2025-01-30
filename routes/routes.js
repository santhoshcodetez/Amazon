const express=require("express")
const router=express.Router()
const customerController=require("../controller/customerController")

router.get('/getcustomer',customerController.getCustomer)
router.post('/postcustomer',customerController.register)
router.put('/updatecustomer',customerController.updateCustomer)
router.delete('/deletecustomer',customerController.deleteCustomer)
router.post('/logincustomer',customerController.Login)

module.exports=router;