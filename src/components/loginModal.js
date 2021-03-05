import React from 'react';
import checkEmail from '../components/checkEmail';
import {getCookie, setCookie} from '../components/cookies';
import {change_design_1, change_design_2} from '../components/log_design_change'

const LoginModal = () => {

    const [registerEmail, setEmail] = React.useState('')
    const [registerPassword, setPassword] = React.useState('')
    const [registerNickname, setNickname] = React.useState('')
    const [toggle, setToggle] = React.useState(true)

    const sendRegister = () => {
        if(checkEmail()){
            alert('이메일 형식이 잘못되었습니다.')
        } else {
            fetch('http://qq8721443.pythonanywhere.com/main/signup/', {
                method:'POST',
                headers:{
                    'X-CSRFToken':getCookie('csrftoken')
                },
                body:JSON.stringify({
                    email:registerEmail,
                    password:registerPassword,
                    nickname:registerNickname,
                    exist_check:false,
                    kakao_login:false
                }),
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    alert('회원가입 완료')
                    let parent = document.getElementById('login_modal_left')
                    for(let item of parent.getElementsByClassName('input_text')){
                        item.value = '';
                    }
                    let test = document.getElementById('login_modal_right')
                    let ins = test.getElementsByClassName('input_text')
                    ins[0].value = registerEmail
                    ins[1].value = registerPassword
                    change_design_2();
                } else {
                    alert('중복된 이메일 있음')
                }
            })
            .catch(e => console.log(e))
        }
    }

    const sendLogin = () => {
        let test = document.getElementById('login_modal_right')
        let ins = test.getElementsByClassName('input_text')
        if(!checkEmail(ins[0].value)){
            alert('이메일 형식이 잘못되었습니다.')
        } else {
            fetch('http://qq8721443.pythonanywhere.com/main/signin/', {
                method:'POST',
                headers:{
                    'X-CSRFToken':getCookie('csrftoken')
                },
                body:JSON.stringify({
                    email:ins[0].value,
                    password:ins[1].value,
                }),
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                if(json.success){
                    alert('로그인 성공')
                    document.getElementById('login_modal').classList.add('hidden')
                    // 토큰 할당 및 로그인 완료
                    localStorage.setItem('USER_INFO', JSON.stringify({'email':json.email, 'nickname':json.nickname, 'is_login':true}))
                    setCookie('accesstoken', json.access_token)
                    setCookie('refreshtoken', json.refresh_token)
                    setToggle(!toggle)
                    window.location.reload() // 리액트 생명주기 이해가 필요할듯
                } else {
                    alert('로그인 실패')
                    // 알람 구체화
                }
            })
        }
    }

    return(
        <div id='login_modal' className='hidden'>
                <div id='login_modal_content'>
                    <div id='login_modal_left' style={{overflow:'hidden'}}>
                        <input className='input_text' type='text' placeholder='이메일을 입력하세요' onChange={e => setEmail(e.target.value)} style={{all:'unset', width:'0', height:'40px', paddingTop:'10px', borderBottom:'2px solid #f2f2f2'}} />
                        <input className='input_text' type='password' placeholder='비밀번호를 입력하세요' onChange={e => setPassword(e.target.value)} style={{all:'unset', width:'0', height:'40px', paddingTop:'10px', borderBottom:'2px solid #f2f2f2'}}/>
                        <input className='input_text' type='text' placeholder='닉네임을 입력하세요' onChange={e => setNickname(e.target.value)} style={{all:'unset', width:'0', height:'40px', paddingTop:'10px', borderBottom:'2px solid #f2f2f2'}}/>
                        <input type='button' value='회원가입' style={{all:'unset', width:'0', height:'40px', backgroundColor:'mediumaquamarine', marginTop:'10px', borderRadius:'5px', textAlign:'center', color:'white', cursor:'pointer', fontWeight:'bold'}} onClick={() => sendRegister()}/>
                        <div className='hidden' style={{position:'relative', bottom:'-50px', overflow:'hidden', color:'gray'}}>이미 계정이 있으신가요?<span onClick={() => change_design_2()} style={{color:'mediumaquamarine', fontWeight:'bold'}}>로그인</span></div>
                    </div>
                    <div id='login_modal_right'>
                        <input className='input_text' type='text' placeholder='이메일을 입력하세요' style={{all:'unset', width:'300px', height:'40px', paddingTop:'10px', borderBottom:'2px solid #f2f2f2'}} />
                        <input className='input_text' type='password' placeholder='비밀번호를 입력하세요' style={{all:'unset', width:'300px', height:'40px', paddingTop:'10px', borderBottom:'2px solid #f2f2f2'}}/>
                        <input type='button' value='로그인' onClick={() => sendLogin()} style={{all:'unset', width:'300px', height:'40px', backgroundColor:'mediumaquamarine', marginTop:'10px', borderRadius:'5px', textAlign:'center', color:'white', cursor:'pointer', fontWeight:'bold'}}/>
                        <div style={{width:'300px', marginTop:'30px', color:'gray', overflow:'hidden'}}>소셜 로그인</div>
                        <input type='button' value='카카오계정으로 로그인' style={{all:'unset', width:'300px', height:'40px', backgroundColor:'white', borderRadius:'5px', textAlign:'center', color:'mediumaquamarine', cursor:'pointer', fontWeight:'bold', border:'2px solid mediumaquamarine', boxSizing:'border-box'}} onClick={() => window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=20887ce0003dfa62635c435e177fee15&redirect_uri=http://todowith.codes/oauth&response_type=code'}/>
                        <div style={{position:'relative', textAlign:'right', width:'300px', bottom:'-50px', right:'5px', color:'gray', overflow:'hidden'}}>아이디가 없으신가요?<span style={{color:'mediumaquamarine', fontWeight:'bold', cursor:'pointer'}} onClick={() => change_design_1()}>회원가입</span></div>
                    </div>
                    <span style={{position:'absolute', top:'10px', right:'15px', fontSize:'22px', color:'gray', cursor:'pointer'}} onClick={() => document.getElementById('login_modal').classList.add('hidden')}>ⅹ</span>
                </div>
            </div>
    )
}

export default LoginModal;