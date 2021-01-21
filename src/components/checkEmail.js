function CheckEmail(str)
{                                                 
    var reg_email = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(.[0-9a-zA-Z_-]+){1,2}$/;
    if(!reg_email.test(str)) {                            
        return false;         
    } else {                       
        return true;         
    }                            
}                   

export default CheckEmail