import React from 'react';
import { getCookie } from '../components/cookies';

const ModifyPost = ({history, location}) => {
    console.log(location.state.test.title)
    const [title, setTitle] = React.useState(location.state.test.title)
    const [content, setContent] = React.useState(location.state.test.content)

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

    React.useEffect(() => {

    })

    async function modifyPost(){
        const res = await fetch(`https://qq8721443.pythonanywhere.com/main/posts/${location.state.test.post_id}/`, {
            method:'PATCH',
            headers:{
                'X-CSRFToken':getCookie('csrftoken')
            },
            body:JSON.stringify({
                title:title,
                content:content,
            }),
            credentials:'include'
        })
        const data = await res.json()
        console.log(data)
        history.push(`/posts/${location.state.test.post_id}`)
    }

    return(
        <div>
            <div id='content' style={{justifyContent:'center'}}>
                <div id='modify' style={{backgroundColor:'#fff', position:'relative', width:'800px', textAlign:'center'}}>
                    <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력해주세요' style={{all:'unset', position:'relative', width:'90%', height:'100px', borderBottom:'1px solid #f2f2f2', fontSize:'30px', textAlign:'start'}}/>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder='내용을 입력해주세요' style={{all:'unset', position:'relative', width:'90%', height:'400px', marginTop:'20px', textAlign:'start'}}/>
                    <div id='submit_area' style={{position:'relative', width:'100%', height:'50px', backgroundColor:'white'}}>
                        <input type='button' value='저장하기' onClick={() => {
                            if(inputCheck() === true){
                                modifyPost()
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

export default ModifyPost;