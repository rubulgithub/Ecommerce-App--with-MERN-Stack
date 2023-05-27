import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        if(!name){
            return res.status(401).send({message:"Name is required"})
        }
        const existingCategory= await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message: 'Category already Exists'
            })
        }
        const category= await new categoryModel({name,slug:slugify(name)}).save();
        res.status(200).send({
            success:true,
            message:'new category created',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"Error in Category"
        })
    }
}

// update category
export const updateCategoryController=async(req,res)=>{
    try {
        const {name}=req.body;
        const {id}=req.params;
        const category= await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated Succcessfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while updating category"
        })
    }
}

// Get category

export const categoryController=async(req,res)=>{
    try {
        const category=await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"All Category List",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in getting All Categories"
        })
    }
}

//Get A single Category

export const singleCategoryController=async(req,res)=>{
    try {
        const category= await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Get a single Category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in getting a single Categories"
        })
    }
}

//Delete Category

export const deleteCategoryController=async(req,res)=>{
    try {
        const {id}=req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully",
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Deleting a single Categories"
        })
    }
}