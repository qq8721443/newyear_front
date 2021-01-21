import React from 'react';
import { getCookie } from '../components/cookies';

const CreatePost = ({history}) => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')

    const inputCheck = () => {
        if(title === ''){
            if(content === ''){
                return false
            }
            return false
        } else {
            if(content === ''){
                return false
            }
            return true
        }
    }

    async function postPost(){
        const res = await fetch('http://localhost:8000/main/posts/', {
            method:'POST',
            headers:{
                'X-CSRFToken':getCookie('csrftoken')
            },
            body:JSON.stringify({
                title:title,
                content:content,
                author:JSON.parse(localStorage.getItem('USER_INFO')).nickname,
                author_email:JSON.parse(localStorage.getItem('USER_INFO')).email
            }),
            credentials:'include'
        })
        const data = await res.json()
        console.log(data)
        history.push(`/posts/${data.res[data.res.length - 1].post_id}`)
    }

    return(
        <div>
            <div id='content' style={{justifyContent:'center'}}>
                <div id='create_post' style={{backgroundColor:'#fff', position:'relative', width:'800px', textAlign:'center'}}>
                    <input type='text' onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력해주세요' style={{all:'unset', position:'relative', width:'90%', height:'100px', borderBottom:'1px solid #f2f2f2', fontSize:'30px', textAlign:'start'}}/>
                    <textarea onChange={(e) => setContent(e.target.value)} placeholder='내용을 입력해주세요' style={{all:'unset', position:'relative', width:'90%', height:'400px', marginTop:'20px', textAlign:'start'}}/>
                    <div id='submit_area' style={{position:'relative', width:'100%', height:'50px', backgroundColor:'white'}}>
                        <input type='button' value='저장하기' onClick={() => {
                            if(inputCheck() === true){
                                postPost()
                                console.log(inputCheck())
                            } else {
                                console.log(inputCheck())
                                alert('내용을 채워주세요')
                            }
                        }}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default CreatePost;