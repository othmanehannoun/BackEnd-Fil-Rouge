const Epicier = require('../models/EpicierModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validation = require('../middleware/validation')
const nodemailer = require('nodemailer')
const { model } = require('mongoose')
// const {cloudinary} = require('../utils/cloudinary');

// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({limit: '50mb' , extended: true}));


const EpicierCtrl = {

    // -----1 Register-----  
    register: async (req, res) =>{
        try {

            // const fileStr = req.body.data;
            // console.log('uploading Img ...');

            // const uploadedResponse = await cloudinary.uploader.
            // upload(fileStr,{
            //     upload_preset: 'sbiya3'
            // })
            // console.log(uploadedResponse);
            // console.log("----------------------------");
            // console.log("uploadedResponse.secure_url : ",uploadedResponse.secure_url);
            // const urlUmagePublic = uploadedResponse.secure_url;
            // console.log("----------------------------");
            // res.json({msg:"YAYAYAYA"})
        
        
           

            console.log(req.body);
            const { error } = validation.registerValidation(req.body);
            
            if (error) return res.json ({msg: error.details[0].message});

            const {Username, Magazine_Name, email, phone, password, address} = req.body

            const epicier = await Epicier.findOne({email})
            if(epicier) return res.status(400).json({msg: "The email already exists."})

           
            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newEpicier = new Epicier({
                Username,
                Magazine_Name, 
                email, 
                phone,
                address,
                password : passwordHash
            })

            // Save mongodb
            await newEpicier.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newEpicier._id})
           
            res.json({msg: 'You have register in successfully', 'Epicier' : newEpicier, accesstoken})

        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },

    // -----2 Login----- 
    login: async(req, res) =>{

        try {
            const {email, password} = req.body;

            const epicier = await Epicier.findOne({email})
            if(!epicier) return res.json({msg: "Account not found."})

            else{
                if(epicier.isValid == false) return res.json({msg:"The account is invalid"})

                const isMatch = await bcrypt.compare(password, epicier.password)
                if(!isMatch) return res.json({msg: "Incorrect password."})

                // If login success , create access token 
                const accesstoken = createAccessToken({id: epicier._id})
            
                res.json({msg:"You have signed in successfully", epicier, accesstoken})
            }

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

    },

    // -----3 Get Epicier By Id----- 
    getEpicier : async (req, res)=>{

        try {
            const epicier = await Epicier.findById(req.params.id);
            res.json({epicier});
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server Error" });
          } 
    },

    // -----4 Get Epicier Is Invalid----- 
    getEpicierInvalid : async (req, res)=>{

    try {

        const {page,limit} =req.query;
        const Allepicier = await Epicier.find({isValid: false})
        const epicier = await Epicier.find({isValid: false})
        .limit(limit*1)
        .skip((page -1)*limit).exec()

        res.json({Allepicier, epicier});

        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
        } 
    },

    // -----3 Validate Epicier----- 
    validEpicier: async (req, res, next) =>{
        const epicier = await Epicier.findById({ _id: req.params.id });
        console.log(epicier)
        if (!epicier) {
            res.status(404).send({ message: "Epicier not found" });
        } else {
            epicier.isValid = true;
            const validSeller = await epicier.save();

            // Send Email 
            const transport = nodemailer.createTransport({
                service: "gmail",
                    auth: {
                        user: process.env.EMAIL,  // TODO: your gmail account
                        pass: process.env.PASSWORD // TODO: your gmail password
                    }
                })
              
                let info =  transport.sendMail({
                    from: process.env.EMAIL,
                    to: epicier.email,
                    subject: "Email Activated Account",
                    html: `
                    <div id="mailsub" class="notification" align="center">

                    <table width="50%" border="1 solid black" cellspacing="0" cellpadding="0" style="min-width: 320px;"><tr><td align="center" bgcolor="#eff3f8">

                        <tr><td align="center" bgcolor="#fbfcfd">
                            <table width="90%" border="0" cellspacing="0" cellpadding="0">
                                <tr><td align="center">
                                <div style="height: 60px; line-height: 60px; font-size: 10px;"> </div>
                                    <div style="line-height: 44px;">
                                        <font face="Arial, Helvetica, sans-serif" size="5" color="#57697e" style="font-size: 34px;">
                                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 34px; color: #57697e;">
                                            Hello ${epicier.Username}
                                        </span></font>
                                    </div>
                                    <div style="height: 40px; line-height: 40px; font-size: 10px;"> </div>
                                </td></tr>
                                <tr><td align="center">
                                    <div style="line-height: 24px;">
                                        <font face="Arial, Helvetica, sans-serif" size="4" color="#57697e" style="font-size: 15px;">
                                        <span style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; color: #57697e;">
                                          Your account has been approved.
                                        </span></font>
                                    </div>
                                <div style="height: 40px; line-height: 40px; font-size: 10px;"> </div>
                                </td></tr>
                                <tr><td align="center">
                                    <div style="font-size: 50px;">
                                        🥳
                                    </div>
                                <div style="height: 60px; line-height: 60px; font-size: 10px;"> </div>
                                </td></tr>
                            </table>		
                        </td></tr>
                        
                        </table>
                        </div>
                    
                   
                `
                })

            res.status(201).json({message:'Epicier validate'});
        }
    },

      // -----3 Count Total Epicier----- 
    CountEpicier : async(req, res) =>{
        
        try{
            const countEpicierValid = await Epicier.find({isValid: true}).countDocuments();
            const countEpicierInvalid = await Epicier.find({isValid: false}).countDocuments()
            res.json({
                valid : countEpicierValid, 
                Invalid : countEpicierInvalid
            })
        }

        catch(err){
            console.log(err)
        }
      
    },


    // -----3 Upfate Epicier----- 

    UpdateEpicier : async(req, res)=>{

        try{

        const id = req.params.id
        const  items = {
            Username: req.body.Username,
            Magazine_Name: req.body.Magazine_Name,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address
        }
        const option = {new : true}
     
        const result = await Epicier.findByIdAndUpdate(id, items, option)

        res.json({result})
        }
        catch(err){
            console.log(err.message);
        }

    },

    // -----3 Delele Epicier----- 

    deleteEpicier : async (req, res, next) =>{
        try {
          const epicier = await Epicier.findByIdAndDelete({ _id: req.params.id});
    
          if (!epicier) {
            res.json("Admin Not Found");
          }

          else {
            res.send('Epicier deleted')
          }
        } catch (error) {
          console.log(error);
        }
    },

    // ---4 LogOut Epicier --------
    LogOut : (req, res) => {
        res.clearCookie("token")
        res.json({
            message : "User is Signout"
        })
    }
}


const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

module.exports = EpicierCtrl
