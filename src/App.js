import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [content, setContent] = React.useState('')
  const [btnState, setBtnState] = React.useState(1)
  const [can, setCan] = React.useState(true)

  const popUpCard = () => {
    document.getElementById('itembox').style.top = '0%';
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

  return (
    <div id='container'>
      <div id='header'>
        <div id='icon'>
          test
        </div>
      </div>
      <div style={{textAlign:'center', fontSize:22, paddingTop:15}}>
        새해 목표를 정해보세요
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
        <div id='popupbtn' onClick={
          (can?btnState?() => popUpCard():() => sendCard():undefined)
        }>
          <p>새해소망 작성하기</p>
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

export default App;