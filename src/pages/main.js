import React from 'react';
import '../css/maincss.css';
import {deleteCookie, getCookie} from '../components/cookies';
import tokenCheck from '../components/tokenCheck';
// import {Link} from 'react-router-dom';

const Main = ({history}) => {
    const [isHopeLoading, setHopeLoading] = React.useState(true)
    const [isPostLoading, setPostLoading] = React.useState(true)
    const [hope, setHope] = React.useState('')
    const [post, setPost] = React.useState('')


    const tokenState = tokenCheck();
    if(JSON.parse(localStorage.getItem('USER_INFO')) === null || tokenState === false){
        localStorage.setItem('USER_INFO', JSON.stringify({'is_login':false}))
        deleteCookie('refreshtoken')
    }
        

    React.useEffect(() => {
        
        async function getHope() {
            const res = await fetch('http://localhost:8000/main/hopes/', {
                credentials: 'include'
            });
            const hope_res = await res.json()
            console.log(JSON.stringify(hope_res.res))
            setHope(hope_res.res)
            setHopeLoading(false)
        }
        getHope()

        async function getPost() {
            const res = await fetch('http://localhost:8000/main/posts/', {
                credentials:'include'
            })
            const post_res = await res.json()
            setPost(post_res)
            setPostLoading(false)
        }
        getPost()

        if(getCookie('csrftoken') === null){
          async function getCsrfToken() {
              const response = await fetch(`http://localhost:8000/main/get_csrf/`, {
                credentials: 'include',
              });
              const data = await response.json();
            document.cookie = `csrftoken=${data.csrfToken}`
          }
          getCsrfToken()
        }
      }, [])

    return(
        <div>
            <div id='header'>
                <div id='logo'>
                    LOGO
                </div>
                <div id='userinfo'>
                {JSON.parse(localStorage.getItem('USER_INFO')).is_login===true?
                <div>
                    <p>{JSON.parse(localStorage.getItem('USER_INFO')).nickname}</p>
                    <a href='https://kauth.kakao.com/oauth/logout?client_id=20887ce0003dfa62635c435e177fee15&logout_redirect_uri=http://localhost:3000/logout'>
                        <div id='login-btn'>
                            로그아웃        
                        </div>
                    </a>
                </div>
                :
                // <a href='https://kauth.kakao.com/oauth/authorize?client_id=20887ce0003dfa62635c435e177fee15&redirect_uri=http://localhost:3000/oauth&response_type=code'>
                //     <div id='login-btn'>
                //         로그인        
                //     </div>
                // </a>
                    <div id='login-btn' onClick={() => document.getElementById('login_modal').classList.remove('hidden')}>
                        로그인        
                    </div>
                }
                    
                </div>
            </div>
            <div id='content'>
                <div className='ad-section'>
                    1
                </div>
                <div id='con-section'>
                    <div id='banner'>
                        banner
                    </div>
                    <div id='thumb'>
                        <div className='thumb-item1'>
                            <p className='thumb-title'>인기있는 목표</p>
                            <div id='hope-container'>
                                {isHopeLoading?
                                'loading'
                            :
                            hope.map((element, index) => {
                                return(
                                    <div key={index} className='hope-list'>
                                        <div className='hope-list-item1'>
                                            {element.title}
                                        </div>
                                        <div className='hope-list-item2'>
                                            {element.likes}
                                        </div>
                                    </div>
                                )
                            })
                            }
                            </div>
                        </div>
                        <div className='thumb-item2'>
                            <p className='thumb-title'>최신 글</p>
                            <p className='more-btn' onClick={() => history.push('/posts')}>+더보기</p>
                            {isPostLoading?
                            'loading'
                            :
                            post.slice(0,5).map((element, index) => {
                                return(
                                    <div key={index} onClick={() => history.push(`/posts/${element.post_id}`)} className='post-list'>
                                        <span className='post-list-title'><p className='emp'>{element.title}</p>|{element.author}</span>
                                        <span className='post-list-content'>{element.content.length > 40? element.content.slice(0,40)+'...':element.content}</span>
                                    </div>    
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className='ad-section'>
                    3
                </div>
            </div>
            <div id='footer'>
                footer
            </div>
            <div id='login_modal' className='hidden'>
                <div id='login_modal_content'>
                    <div id='login_modal_left'>
                    </div>
                    <div id='login_modal_right'>
                        <input type='text' placeholder='이메일을 입력하세요' style={{all:'unset', width:'300px', height:'40px', paddingTop:'10px', borderBottom:'2px solid #f2f2f2'}} />
                        <input type='password' placeholder='비밀번호를 입력하세요' style={{all:'unset', width:'300px', height:'40px', paddingTop:'10px', borderBottom:'2px solid #f2f2f2'}}/>
                        <input type='button' value='로그인' style={{all:'unset', width:'300px', height:'40px', backgroundColor:'mediumaquamarine', marginTop:'10px', borderRadius:'5px', textAlign:'center', color:'white', cursor:'pointer', fontWeight:'bold'}}/>
                        <div style={{marginTop:'30px', color:'gray'}}>소셜 로그인</div>
                        <input type='button' value='카카오계정으로 로그인' style={{all:'unset', width:'300px', height:'40px', backgroundColor:'white', borderRadius:'5px', textAlign:'center', color:'mediumaquamarine', cursor:'pointer', fontWeight:'bold', border:'2px solid mediumaquamarine'}} onClick={() => window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=20887ce0003dfa62635c435e177fee15&redirect_uri=http://localhost:3000/oauth&response_type=code'}/>
                        <span style={{position:'absolute', top:'10px', right:'15px', fontSize:'22px', color:'gray', cursor:'pointer'}} onClick={() => document.getElementById('login_modal').classList.add('hidden')}>ⅹ</span>
                        <div style={{position:'absolute', bottom:0, right:'5px', color:'gray'}}>아이디가 없으신가요?<span style={{color:'mediumaquamarine', fontWeight:'bold', cursor:'pointer'}}>회원가입</span></div>
                        <div onClick={() => window.open('http://localhost:3000/register', '_blank')}>test</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;