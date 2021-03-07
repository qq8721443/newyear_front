import React from 'react';
import styled from 'styled-components';
import {TiDelete} from 'react-icons/ti';
import { getCookie } from './cookies';

const Button = styled.div`
    width:100px;
    height:40px;
    background:${props => props.type === 'main'?'mediumaquamarine':'white'};
    border:${props => props.type==='main'?null:'1px solid mediumaquamarine'};
    color:${props => props.type==='main'?'white':'mediumaquamarine'};
    border-radius:5px;
    box-sizing:border-box;
    cursor:pointer;
    margin-left:10px;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Modal = (props) => {
    const [nickname, setNickname] = React.useState(props.nickname)
    // const [email, setEmail] = React.useState(props.email)
    const [description, setDescription] = React.useState(props.description)

    const submit = () => {
        fetch('https://qq8721443.pythonanywhere.com/main/change_user/', {
            method:'PATCH',
            headers:{
                'X-CSRFToken':getCookie('csrftoken'),
                'access-token':getCookie('accesstoken')
            },
            body:JSON.stringify({
                nickname:nickname,
                // email:email,
                description:description
            }),
            credentials:'include'
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            // document.getElementsByClassName('container')[0].classList.add('hidden')
            window.location.reload()
        })
    }

    return(
        <div className='container hidden'>
            <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(0,0,0,0.5)'}}>
                
            </div>
            <div style={{position:'fixed', display:'flex', justifyContent:'center',alignItems:'center', flexDirection:'column', width:'500px', height:'300px', background:'white', top:'50vh', left:'50vw', boxSizing:'border-box', marginLeft:'-250px', marginTop:'-150px', borderRadius:'5px', padding:'10px'}}>
                
                <input style={{all:'unset', borderBottom:'1px solid #dddddd', outline:'none', width:'250px', height:'30px', marginBottom:'10px', fontSize:'25'}} onChange={e => {setNickname(e.target.value);console.log(nickname)}} value={nickname} type='text'/>
                {/* <input style={{all:'unset', borderBottom:'1px solid #dddddd', outline:'none', width:'250px', height:'30px', marginBottom:'10px', fontSize:'25'}} onChange={e => setEmail(e.target.value)} value={email} type='text'/> */}
                <input style={{all:'unset', borderBottom:'1px solid #dddddd', outline:'none', width:'250px', height:'30px', marginBottom:'10px', fontSize:'25'}} onChange={e => setDescription(e.target.value)} value={description} type='text'/>
                
                <TiDelete style={{position:'absolute', top:10, right:10, cursor:'pointer'}} size={25} onClick={() => document.getElementsByClassName('container')[0].classList.add('hidden')}/>
                <div style={{display:'flex', flexDirection:'row', position:'absolute', right:20, bottom:20}}>
                    <Button type='sub' onClick={() => document.getElementsByClassName('container')[0].classList.add('hidden')}>취소</Button>
                    <Button type='main' onClick={submit}>적용</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal;