import React from 'react';

const Header = ({history}) => {

    return(
        <div id='header'>
                <div id='logo' onClick={() => history.push('/')} style={{cursor:'pointer'}}>
                    LOGO
                </div>
                <div id='userinfo'>
                {JSON.parse(localStorage.getItem('USER_INFO')).is_login===true?
                <div>
                    <p>{JSON.parse(localStorage.getItem('USER_INFO')).nickname}</p>
                    <ul id='menu' style={{position:'absolute', top:'0px', right:0, width:'100px', height:'30px'}}>
                            <li className='menu_item' style={{listStyle:'none'}} onClick={() => history.push('/create')}>글쓰기</li>
                            <li className='menu_item' style={{listStyle:'none'}} onClick={() => history.push('/user_info')}>내정보</li>
                            <li className='menu_item' style={{listStyle:'none'}} onClick={() => window.location.href='https://kauth.kakao.com/oauth/logout?client_id=20887ce0003dfa62635c435e177fee15&logout_redirect_uri=http://localhost:3000/logout'}>로그아웃</li>
                    </ul>
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
    )
}

export default Header;