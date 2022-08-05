export const valid=(input,type)=>{
    const error={};

    if(type==="sign"){

        if(!input.name.trim()){
            error.name="name is requird"
            
        }else{
            delete error.name
        }
    
        if(!input.email){
            error.email="email is requird"
        }
        else if (!/(?=.*\d)(?=.*[a-z]).{8,}/.test(input.email)) {
            error.email="invalid email"
            
        }else{
            delete error.email
        }

        if(!input.password.length){
            error.password="password is requird"
        }
        else if(!/^(?=.*[A-z])(?=.*[0-9])\S{6,12}$/.test(input.password)){
            error.password="invalid password"
    
        }else{
            delete error.password
        }
    
    
        if(!input.confirmPassword){
            error.confirmPassword="confirmPassword is requird"
        }
        else if(input.confirmPassword.length < 6){
            error.confirmPassword="Enter at least 6 characters"
        }
    
       
        else if(input.confirmPassword !==input.password){
            error.confirmPassword="password is not mutch"
    
        }
        else{
            delete error.confirmPassword
        }


    }
 

   

    if(type==="login"){

        
    if(!input.email){
        error.email="email is requird"
    }
    else if (!/(?=.*\d)(?=.*[a-z]).{8,}/.test(input.email)) {
        error.email="invalid email"
        
    }else{
        delete error.email
    }
    if(!input.password.length){
        error.password="password is requird"
    }
    else if(!/^(?=.*[A-z])(?=.*[0-9])\S{6,12}$/.test(input.password)){
        error.password="invalid password"

    }else{
        delete error.password
    }


    }
    if(type==="changepassword"){
        const Cpassword=localStorage.getItem('password') ? JSON.parse(localStorage.getItem('password')) : ' '


        if(!input.password.length){
            error.password="password is requird"
        }
        else if(!/^(?=.*[A-z])(?=.*[0-9])\S{6,12}$/.test(input.password)){
            error.password="invalid password"
    
        }
        else if(input.password===Cpassword){
            error.password="Enter a new password"
        }
        else{
            delete error.password
        }
    
    
        if(!input.confirmPassword){
            error.confirmPassword="confirmPassword is requird"
        }
        else if(input.confirmPassword.length < 6){
            error.confirmPassword="Enter at least 6 characters"
        }
    
       
        else if(input.confirmPassword !==input.password){
            error.confirmPassword="password is not mutch"
    
        }
        else{
            delete error.confirmPassword
        }


    }
   


    return error

}