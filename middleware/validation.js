
const Joi = require("joi");

// Register validation
const registerValidation = data => {
  const validaionSchema = Joi.object({
    Username: Joi.string().min(6).required(),
    Magazine_Name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(14).required(),
    password: Joi.string().min(10).required(),
    address: Joi.string().min(6).required(),
  });
  return validaionSchema.validate(data);
};

const ClientValidation = data => {
  const validaionSchema = Joi.object({
    last_name: Joi.string().min(6).required(),
    first_name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(14).required(),
    password: Joi.string().min(10).required(),
    address: Joi.string().min(6).required(),
  });
  return validaionSchema.validate(data);
};

// Login validation
const loginValidation = data => {
  const validaionSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
  });
  return validaionSchema.validate(data);
};

const AddCarnet = data => {
  const validaionSchema = Joi.object({
    CarnetName: Joi.string().min(4).required(),
    idClient: Joi.string().required(),
  });
  return validaionSchema.validate(data);
};
module.exports =
{
     registerValidation, 
     loginValidation,
     ClientValidation
};