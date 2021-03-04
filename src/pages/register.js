import React from 'react';
import { getCookie, setCookie } from '../components/cookies';

const Register = ({location, history}) => {
    const [email, setEmail] = React.useState('')
    const [nickname, setNickname] = React.useState('')

    const register_done = () => {
        console.log(location.state.kakao_user_id)
        fetch('http://qq8721443.pythonanywhere.com/main/signup/', {
            method:'POST',
            headers:{
                'X-CSRFToken':getCookie('csrftoken')
            },
            body:JSON.stringify({
                kakao_login:true,
                exist_check:false,
                email:email,
                nickname:nickname,
                kakao_user_id:location.state.kakao_user_id
            }),
            credentials:'include'
        })
        .then(res => res.json())
        .then(json => {
            if(json.success === true){
                alert(email + nickname + location.state.kakao_user_id)
                setCookie('accesstoken', json.access_token)
                setCookie('refreshtoken', json.refresh_token)
                localStorage.setItem('USER_INFO', JSON.stringify({'nickname':json.nickname, 'email':json.email, 'is_login':true}))
                history.push('/')
            } else {
                alert('이메일이 중복됩니다.')
            }
        })
    }

    return(
        <div>
            <div id='header' style={{textAlign:'center'}}>
                    계정 설정 및 서비스 약관 동의
            </div>
            <div id='content'>
                <div style={{flex:1, display:'flex', justifyContent:'center'}}>
                    <div style={{position:'relative', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'500px', height:'600px', backgroundColor:'white'}}>
                        <input type='text' placeholder='이메일을 입력해주세요' onChange={(e) => setEmail(e.target.value)} style={{all:'unset', width:'200px', height:'40px', borderBottom:'2px solid #f2f2f2'}}/>
                        <input type='text' placeholder='닉네임을 입력해주세요' onChange={(e) => setNickname(e.target.value)} style={{all:'unset', width:'200px', height:'40px', borderBottom:'2px solid #f2f2f2'}}/>
                        <input type='button' value='회원가입 완료' onClick={() => register_done()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;