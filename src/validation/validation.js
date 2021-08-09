
const validation =(values) =>{
    let errors ={};

    // if(!values.fullname){
    //     errors.fullname='Name is required.'
    // }
    if(!values.phone_no){
        errors.phone_no='Phone no. is required.'
    }
   
    if(!values.email){
        errors.email="Email is required."
    }if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email= "Email is invalid"
    }
    if(!values.password){
        errors.password="Password is required."
    }else if(values.password.length < 6){
       errors.password = "Password must be more than five characters.";
    }
    if(!values.confirm_password){
        errors.confirm_password = 'Password is required'        
    }else if (values.confirm_password !== values.password){
        errors.confirm_password = "Passwords do not match"
    }
    if(!values.old_password){
        errors.old_password="Old password is required."
    }else if(values.old_password.length < 6){
       errors.old_password = "Password must be more than five characters.";
    }

    if(!values.new_password){
        errors.new_password="New password is required."
    }else if(values.new_password.length < 6){
       errors.new_password = "Password must be more than five characters.";
    }
    if(!values.confirm_password1){
        errors.confirm_password1 = 'Confirm Password is required'        
    }else if (values.confirm_password1 !== values.new_password){
        errors.confirm_password1 = "Passwords do not match"
    }

 return errors;   
}
export default validation;
