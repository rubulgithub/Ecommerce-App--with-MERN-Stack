import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

//  const JWT_SECRET="lagusangkha12345";

export const registerController=async(req,res)=>{
    try {
        const {name,email,password,phone,address,answer}=req.body;
        //validation
        if(!name){
            return res.send({message:"Name is Required"})
        };
        if(!email){
            return res.send({message:"Email is Required"})
        };
        if(!password){
            return res.send({message:"password is Required"})
        };
        if(!answer){
            return res.send({message:"Answer is Required"})
        };
        if(!phone){
            return res.send({message:"phone is Required"})
        };
        if(!address){
            return res.send({message:"Address is Required"})
        };

        //check user
        const existingUser=await userModels.findOne({email});

        //Existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"User is already registered"
            })
        }

        // Register
        const hashedPassword=await hashPassword(password);
        //save
        const user=await new userModels({name,email,phone,address,password:hashedPassword,answer}).save();

        res.status(201).send({
            success:true,
            message:'use register successfully',
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Registration",
            error
        })
    }
};

//POST Login 
export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        //Validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'invalid email or password'
            })
        }
        //check user
        const user=await userModels.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"email is not registered",
            })
        }
        const match= await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }
        //token
        const token=await JWT.sign({ _id: user._id },process.env.JWT_SECRET, {expiresIn:"7d"})
        res.status(200).send({
            success:true,
            message:"login Successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role
            },token,
        });
    } catch (error) {
      console.log(error);  
      res.status(500).send({
        success:false,
        message:"Error in login",
        error
    })
    }
};

//forgot password

export const forgotPasswordController=async(req,res)=>{
    try {
        const {email,answer,newPassword}=req.body;
        if(!email){
            res.status(400).send({message:"Email is required"});
        }
        if(!answer){
            res.status(400).send({message:"Answer is required"});
        }
        if(!newPassword){
            res.status(400).send({message:"New Password is required"});
        }
        
        //check
        const user=await userModels.findOne({email,answer});
        //Validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer",
            })
        }
        const hashed=await hashPassword(newPassword)
        await userModels.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Something went wrong",
            error
        })
    }
};

//test controller
export const testController=(req,res)=>{
    try {
        res.send("protected Route");
    } catch (error) {
        console.log(error)
        res.send({error})
    }
}

//update prfole
export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModels.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModels.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };