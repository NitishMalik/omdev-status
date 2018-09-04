const Validator = require('validator'),
      isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors ={};
    
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';  
    data.skills = !isEmpty(data.skills) ? data.skills : '';    

    if(!Validator.isLength(data.handle, {min:2 , max: 40})){
        errors.handle = "Handle should be between 2 to 40 chars"
    }

    if(Validator.isEmpty(data.handle)){
        errors.handle = "handle field is required";
    }

    if(Validator.isEmpty(data.status)){
        errors.status = "status field is required";
    }

    if(Validator.isEmpty(data.skills)){
        errors.skills = "skills field is required";
    }

    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = "Not a valid linkedin URL"
        }
    }
   
    return {
        errors, 
        isValid : isEmpty(errors)
    }
}
