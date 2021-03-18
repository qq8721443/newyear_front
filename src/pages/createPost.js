import React from 'react';
import { getCookie } from '../components/cookies';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CreatePost = ({history}) => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [dateDiff, setDateDiff] = React.useState()
    const [finDate, setFinDate] = React.useState()

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
        const res = await fetch('https://qq8721443.pythonanywhere.com/main/posts/', {
            method:'POST',
            headers:{
                'X-CSRFToken':getCookie('csrftoken'),
                'access-token':getCookie('accesstoken')
            },
            body:JSON.stringify({
                title:title,
                content:content,
                // author:JSON.parse(localStorage.getItem('USER_INFO')).nickname, //액세스 토큰 받아서 조회 가능함
                // author_email:JSON.parse(localStorage.getItem('USER_INFO')).email, // 이것도
                date_difference:dateDiff
            }),
            credentials:'include'
        })
        const data = await res.json()
        console.log(finDate)
        console.log(data)
        history.push(`/posts/${data.res[data.res.length - 1].post_id}`)
    }

    const checkDate = (chosenDate) => {
        const now = new Date()
        const diff = chosenDate.getTime()+86400000 - now.getTime()
        console.log(`now : ${now}/${now.getTime()}\nchosen : ${chosenDate.getTime()+86400000}\ndifference : ${diff}`)
        if (diff > 86400000){
            setDateDiff(diff)
            setFinDate(chosenDate)
        } else {
            alert('기간이 너무 짧습니다.')
        }
        
    }

    return(
        <div>
            <div id='content' style={{justifyContent:'center'}}>
                <div id='create_post' style={{backgroundColor:'#fff', position:'relative', width:'800px', textAlign:'center'}}>
                    <input type='text' onChange={(e) => setTitle(e.target.value)} placeholder='제목을 입력해주세요' style={{all:'unset', position:'relative', width:'90%', height:'100px', borderBottom:'1px solid #f2f2f2', fontSize:'30px', textAlign:'start'}}/>
                    <textarea onChange={(e) => setContent(e.target.value)} placeholder='내용을 입력해주세요' style={{all:'unset', position:'relative', width:'90%', height:'400px', marginTop:'20px', textAlign:'start'}}/>
                    <Calendar onChange={(value, event)=>{alert(value);checkDate(value)}}/>
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