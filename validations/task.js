const Validator = require('validator'),
      isEmpty = require('./is-empty');

module.exports = function validateTaskInput(data){
    let errors ={};
    
    data.name = !isEmpty(data.name) ? data.name : '';
    data.application = !isEmpty(data.application) ? data.application : '';    
    data.from = !isEmpty(data.from) ? data.from : '';    
    data.to = !isEmpty(data.to) ? data.to : '';    
    data.dependencies = !isEmpty(data.dependencies) ? data.dependencies : '';    

    if(Validator.isEmpty(data.name)){
        errors.name = "task name is required";
    }

    if(Validator.isEmpty(data.application)){
        errors.application = "application is required";
    }

    if(Validator.isEmpty(data.from)){
        errors.from = "task from date is required";
    }

    if(Validator.isEmpty(data.to)){
        errors.to = "task to date is required";
    }

    if(Validator.isEmpty(data.dependencies)){
        errors.dependencies = "task dependencies is required";
    }
   
    return {
        errors, 
        isValid : isEmpty(errors)
    }
}
