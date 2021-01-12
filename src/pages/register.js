import React from 'react';

const Register = () => {
    return(
        <div style={{position:'relative', width:'100vw', height:'100vh', overflow:'hidden'}}>
            <div style={{position:'relative',marginLeft:'50vw', marginTop:'50vh', left:'-200px', top:'-250px', width:'400px', height:'500px', backgroundColor:'white', borderRadius:'10px'}}>
                <input type='text' placeholder='이메일' />
                <input type='text' placeholder='닉네임' />
            </div>
        </div>
    )
}

export default Register;