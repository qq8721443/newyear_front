import React from 'react';
import styled from 'styled-components';
import {IoIosArrowDown} from 'react-icons/io';
import LOGO from '../img/그린거ㅋㅋㅋ.png';

const HHeader = styled.div`
    height:100px;
    background: linear-gradient(to right, #050A30, #794BB5);
    margin-bottom: 10px;
    display:flex;
    align-items:center;
    justify-content:space-around;
`

const Header = ({history}) => {

    return(
        <HHeader>
                <div id='logo' onClick={() => history.push('/')} style={{cursor:'pointer'}}>
                    <img src={LOGO}  alt='logo' style={{height:'100%', objectFit:'cover'}}/>
                </div>
                <div id='userinfo'>
                    {JSON.parse(localStorage.getItem('USER_INFO')).is_login===true?
                <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <p style={{display:'flex', alignItems:'center'}}><span style={{display:'inline-block', width:30, height:30, borderRadius:15, marginRight:10, background:'#f2f2f2'}}></span>{JSON.parse(localStorage.getItem('USER_INFO')).nickname}</p>
                    <span style={{position:'absolute', bottom:0}}><IoIosArrowDown></IoIosArrowDown></span>
                    <ul id='menu' style={{position:'absolute', top:60, margin:0, padding:0, zIndex:30, width:'150px'}}>
                            <li className='menu_item' style={{display:'flex', alignItems:'center', listStyle:'none', paddingLeft:5, width:'150px', height:'30px', background:'#fff', borderTopLeftRadius:10, borderTopRightRadius:10}} onClick={() => history.push('/create')}>글쓰기</li>
                            <li className='menu_item' style={{display:'flex', alignItems:'center', listStyle:'none', paddingLeft:5, width:'150px', height:'30px', background:'#fff'}} onClick={() => history.push('/user_info')}>내정보</li>
                            <li className='menu_item' style={{display:'flex', alignItems:'center', listStyle:'none', paddingLeft:5, width:'150px', height:'30px', background:'#fff', borderBottomLeftRadius:10, borderBottomRightRadius:10}} onClick={() => window.location.href='https://kauth.kakao.com/oauth/logout?client_id=20887ce0003dfa62635c435e177fee15&logout_redirect_uri=https://todowith.codes/logout'}>로그아웃</li>{/* 카카오/일반 분기 필요*/}
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
            </HHeader>
    )
}

export default Header;