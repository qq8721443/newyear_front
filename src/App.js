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
    document.getElementById('popupbtn').innerText = '새해소망 제출하기'
    setBtnState(0)
  }

  const sendCard = () => {
    document.getElementById('itembox').style.left = '100%';
    document.getElementById('popupbtn').innerText = '새해소망 제출완료'
    alert(`${username} ${email} ${content}`)
    setBtnState(1)
    setCan(false)
  }

  const closeCard = () => {
    document.getElementById('itembox').style.top = '100%';
    document.getElementById('popupbtn').innerText = '새해소망 작성하기'
    setBtnState(1)
  }

  return (
    <div id='container'>
      <div id='header'>
        <div id='icon'>
          test
        </div>
      </div>
      <div id='content'>
        <div id='mainCont'>
          <div class='mainContItem'>
            1
          </div>
          <div class='mainContItem'>
            2
          </div>
          <div class='mainContItem'>
            3
          </div>
        </div>
        <div id='itembox'>
          <div id='user'>
            <input type='text' placeholder='nickname' onChange = {e => setUsername(e.target.value)}/>
            <input type='button' value='test' onClick={() => alert(username)}/>
            <input type='text' placeholder='email' onChange={e => setEmail(e.target.value)}/>
            <label><input type='checkbox' value='0'/>private option</label>
            <div>
              <textarea onChange={e => setContent(e.target.value)} style={{all:'unset', width:'97%', height:'100%', padding:'5px', backgroundColor:'white'}}></textarea>
            </div>
          </div>
          <div id='usercont'>
            hope list
          </div>
          <div id='closebtn' onClick={() => closeCard()}>
            <span style={{position:'relative', width:10, height:10, marginTop:10}}>X</span>
          </div>
        </div>
        <div id='popupbtn' onClick={
          (can?btnState?() => popUpCard():() => sendCard():undefined)
        }>
          새해소망 작성하기
        </div>
      </div>
    </div>
  );
}

export default App;
