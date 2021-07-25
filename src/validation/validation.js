
const validation =(values) =>{
    let errors ={};

    if(!values.fullname){
        errors.fullname='Name is required.'
    }
    if(!values.email){
        errors.email="Email is required."
    }else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email= "Email is invalid"
    }
    if(!values.password){
        errors.password="Password is required."
    }else if(values.password.length < 6){
       errors.password = "Password must be more than five characters.";
    }
    if(!values.confirmpassword){
        errors.confirmpassword = 'Password is required'        
    }else if (values.confirmpassword !== values.password){
        errors.confirmpassword = "Passwords do not match"
    }

 return errors;   
}
export default validation;
