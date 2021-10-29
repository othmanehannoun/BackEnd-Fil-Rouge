const Admin = require('../models/AdminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')


// const validation = require('../middleware/validation')
const { model } = require('mongoose')

const AdminCtrl = {

    register: async (req, res) =>{
        try {
            console.log(req.body);
            // const { error } = validation.registerValidation(req.body);
            // if (error) return res.status(400).send(error.details[0].message);

            const {Username, email, password} = req.body

            const admin = await Admin.findOne({email})
            if(admin) return res.json({msg: "The email already exists."})

           
            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newAdmin = new Admin({
                Username, 
                email, 
                password : passwordHash
            })

            // Save mongodb
            await newAdmin.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newAdmin._id})
           
            res.json({msg: 'successfully', 'Client' : newAdmin, accesstoken})


        } catch (err) {
            return res.json({message: err.message})
        }
    },

    
    login: async(req, res) =>{

        try {
            const {email, password} = req.body;

            const admin = await Admin.findOne({email})
            if(!admin) return res.json({msg: "Admin does not exist."})

            const isMatch = await bcrypt.compare(password, admin.password)
            if(!isMatch) return res.json({msg: "Incorrect password."})

            // If login success , create access token 
             const accesstoken = createAccessToken({id: admin._id})
           
            res.json({msg:"successfully", admin, accesstoken})

        } catch (err) {
            return res.json({msg: err.message})
        }

    },

    ContactUs : (req, res) => {

        const {nom, email, message} =  req.body
         // Send Email 
         const transport = nodemailer.createTransport({
            service: "gmail",
                auth: {
                    user: process.env.EMAIL,  // TODO: your gmail account
                    pass: process.env.PASSWORD // TODO: your gmail password
                }
            })
          
            let info =  transport.sendMail({
                from: email,
                to: process.env.EMAIL,
                subject: "message from contact us ",
                html: `
                <div id="mailsub" class="notification">
                <div> From: ${nom} </div>
                 <div> ${message} </div> 
                </div>
                
            `
            })

        res.json('Send Email Success');
    }

}



const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

module.exports = AdminCtrl