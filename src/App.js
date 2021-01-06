import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Oauth from './pages/oauthPage';
import { Route } from 'react-router-dom';

const MainPage = () => {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [content, setContent] = React.useState('')
  const [btnState, setBtnState] = React.useState(1)
  const [can, setCan] = React.useState(true)

  let _csrfToken = null

  async function getCsrfToken() {
    if (_csrfToken === null) {
      const response = await fetch(`http://localhost:8000/main/get_csrf/`, {
        credentials: 'include',
      });
      const data = await response.json();
      _csrfToken = data.csrfToken;
    }
    console.log(_csrfToken)
    return _csrfToken;
  }

  const popUpCard = () => {
    document.getElementById('itemback').classList.remove('hidden')
    document.getElementById('itembox').style.top = '120px';
    document.getElementById('popupbtn').firstChild.innerText = '새해소망 제출하기'
    setBtnState(0)
  }

  const sendCard = () => {
    document.getElementById('itembox').style.left = '100%';
    document.getElementById('popupbtn').firstChild.innerText = '새해소망 제출완료'
    alert(`${username} ${email} ${content}`)
    setBtnState(1)
    setCan(false)
  }

  const closeCard = () => {
    document.getElementById('itemback').classList.add('hidden')
    document.getElementById('itembox').style.top = '100%';
    document.getElementById('popupbtn').firstChild.innerText = '새해소망 작성하기'
    setBtnState(1)
  }

  const returnHope = () => {
    console.log(document.getElementsByClassName('hopeitem').length)
  }

  const addHope = () => {
    const addingHope = document.createElement('div')
    const parent = document.getElementById('usercont')
    addingHope.className = 'hopeitem'
    addingHope.innerText = 'added hope'
    parent.appendChild(addingHope)
  }
  
  const openModal = () => {
    const modal = document.getElementById('modal')
    const modalback = document.getElementById('modalback')

    modal.classList.remove('hidden')
    modalback.classList.remove('hidden')
  }

  const removeModal = () => {
    const modal = document.getElementById('modal')
    const modalback = document.getElementById('modalback')

    modal.classList.add('hidden')
    modalback.classList.add('hidden')
  }

  async function csrfTest() {
    const res = await fetch('http://localhost:8000/main/csrf_test/',{
      method:'POST',
      headers:{
        'X-CSRFToken':await getCsrfToken()
      },
      credentials:'include'
    });
    const data = await res.json()
    alert(data.message)
    return data.message
  }

  return (
    <div id='container'>
      <div id='header'>
        <div id='icon'>
          test
        </div>
        <div id='loginbtn'>
           <a href='https://kauth.kakao.com/oauth/authorize?client_id=20887ce0003dfa62635c435e177fee15&redirect_uri=http://localhost:3000/oauth&response_type=code'>카카오 로그인</a>
           <a href='https://kauth.kakao.com/oauth/logout?client_id=20887ce0003dfa62635c435e177fee15&logout_redirect_uri=http://localhost:3000'>카카오 로그아웃</a>
        </div>
      </div>
      <div style={{textAlign:'center', fontSize:22, paddingTop:15}}>
        새해 목표를 정해보세요
        <p onClick={() => csrfTest()}>csrf test</p>
      </div>
      <div id='content'>
        <div id='mainCont'>
          <div className='mainContItem'>
            <div className='listitem'>
              test1
            </div>
            <div className='listitem'>
              test2
            </div>
            <div className='listitem'>
              test3
            </div>
            <div className='listitem'>
              test4
            </div>
            <div className='listitem'>
              test5
            </div>
            <div className='listitem'>
              test6
            </div>
            <div className='listitem'>
              test7
            </div>
          </div>
          <div className='mainContItem'>
            <div className='boardlist'>
              test1
            </div>
            <div className='boardlist'>
              test2
            </div>
          </div>
        </div>
        <div id='popupbtn' onClick={
          (can?btnState?() => popUpCard():() => sendCard():undefined)
        }>
          <p>새해소망 작성하기</p>
        </div>
      </div>
      <div id='itemback' className='hidden'></div>
      <div id='itembox'>
          <div id='user'>
            <input type='text' tabIndex='-1' placeholder='nickname' onChange = {e => setUsername(e.target.value)}/>
            <input type='button' tabIndex='-1' value='test' onClick={() => alert(username)}/>
            <input type='text' tabIndex='-1' placeholder='email' onChange={e => setEmail(e.target.value)}/>
            <label><input type='checkbox' tabIndex='-1' value='0'/>private option</label>
            <div>
              <textarea tabIndex='-1' onChange={e => setContent(e.target.value)} style={{all:'unset', width:'97%', height:'100%', padding:'5px', backgroundColor:'white'}}></textarea>
            </div>
          </div>
          <div id='usercont'>
            <input type='button' value='add hope' onClick={() => openModal()}/>
            <div className='hopeitem'>
              hope1
            </div>
            <div className='hopeitem'>
              hope2
            </div>
            <div className='hopeitem'>
              hope3
            </div>
          </div>
          <div id='closebtn' onClick={() => closeCard()}>
            <span style={{position:'relative', width:10, height:10, marginTop:10}}>X</span>
          </div>
      </div>
      <div id='modalback' class='hidden'>
      </div>
      <div id='modal' class='hidden'>
        test
        <div class='btn-normal' onClick={() => removeModal()}>
          <p>취소</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return(
    <>
    <Route path='/' exact component={MainPage} />
    <Route path='/oauth' exact component={Oauth} />
    </>
  )
}

export default App;