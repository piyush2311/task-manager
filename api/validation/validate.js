const Joi = require('joi')

module.exports = {
    validateTask: async function(body,updateStatus = false ,updateId)
    {
        const JoiSchema = Joi.object({
            name: Joi.string()
            .trim(true)
            .required()
            .messages({
                'string.empty': `name can not be empty`
            }),
            completed: Joi.boolean()
           
        }).options({ abortEarly: false });
        
         let err = JoiSchema.validate(body);
         let validateError =  this.filterError(err);
         
         if(!validateError.errorStatus){
            let custom = await this.customUserValidate(body);
            return custom;
         }

         return validateError;
         
    },

    validateLogin: async function(body,updateStatus = false ,updateId)
    {
        const JoiSchema = Joi.object({
            name: Joi.string()
            .trim(true)
            .required()
            .messages({
                'string.empty': `name can not be empty`
            }),
            apiKey: Joi.string()
            .trim(true)
            .required()
            .messages({
                'string.empty': `apiKey can not be empty`
            }),
           
        }).options({ abortEarly: false });
        
         let err = JoiSchema.validate(body);
         let validateError =  this.filterError(err);
         
         if(!validateError.errorStatus){
            let custom = await this.customUserValidate(body);
            return custom;
         }

         return validateError;
         
    },    customUserValidate: async function(body)
    {
        let pushErr = [];
        let returnErr = {};
        returnErr = {
            errorStatus : pushErr && pushErr.length ? true : false,
            errors : pushErr
        }
        return returnErr;

    },
    filterError: function(error)
    {
        let pushErr = [];
        let returnErr = {};
       
        if(error && error.error && error.error.details){
            error.error.details.forEach((v)  => {
                pushErr.push({
                    message: v.message,
                    key: v.context.key
                })
            })
        }
        
        returnErr = {
            errorStatus : pushErr && pushErr.length ? true : false,
            errors : pushErr
        }
        return returnErr;
    }
}