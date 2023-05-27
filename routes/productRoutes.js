import express from "express";
import {isAdmin, requireSignIn} from "../middlewares/authMiddleware.js"
import {brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController,  relatedProductController, searchProductController, updateProductController} from "../controllers/productController.js"
import formidable from "express-formidable"

const router=express.Router();

// routes
// create product routes
router.post("/create-product",requireSignIn, isAdmin, formidable(), createProductController )

//update product
router.put("/update-product/:pid",requireSignIn, isAdmin, formidable(), updateProductController )

// get product
router.get("/get-product", getProductController)

// get a single product
router.get("/get-product/:slug",getSingleProductController)

// get photo

router.get("/product-photo/:pid",productPhotoController)

// DELETE PRODUCT
router.delete("/delete-product/:pid",deleteProductController)

//filter Product
router.post("/product-filters",productFiltersController)

//product count
router.get("/product-count",productCountController)

//product per page
router.get("/product-list/:page",productListController)

//Search Product
router.get("/search/:keyword",searchProductController)

//Similar product

router.get("/related-product/:pid/:cid",relatedProductController);

//category wise product
router.get("/product-category/:slug",productCategoryController)

//payments route
//token
router.get("/braintree/token", braintreeTokenController)

//payment
router.post("/braintree/payment", requireSignIn, brainTreePaymentController)
export default router;