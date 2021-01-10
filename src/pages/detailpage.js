import React from 'react';
import '../css/maincss.css'
import { getCookie } from '../components/cookies';

const DetailPage = ({history, match}) => {
    const [comment_input, setComInput] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [post, setPost] = React.useState('')
    const [isPostLoading, setPostLoading] = React.useState(true)
    const [isLoading, setLoading] = React.useState(true)

    async function getComment(){
        const response = await fetch(`http://localhost:8000/main/comments/${match.params.post_id}/`,{
            credentials:'include'
        })
        const data = await response.json()
        setComment(data)
        setLoading(false)
    }

    async function getPost(){
        const response = await fetch(`http://localhost:8000/main/posts/${match.params.post_id}/`, {
            credentials:'include'
        })
        const data = await response.json()
        setPost(data)
        console.log(post)
        setPostLoading(false)
    }

    React.useEffect(() => {
        console.log("useEffect 실행") 
        getPost()
        getComment()
    }, [isPostLoading])

    async function postComment() {
        const response = await fetch(`http://localhost:8000/main/comments/${match.params.post_id}/`, {
            method:'POST',
            headers:{
                'X-CSRFToken':getCookie('csrftoken')
            },
            body:JSON.stringify({
                content:comment_input,
                author:JSON.parse(localStorage.getItem('USER_INFO')).nickname
            }),
            credentials:'include'
        })
        const data = await response.json()
        console.log(data)
    }

    return(
        <div>
            <div id='header'>
                <div id='logo' onClick={() => history.push('/')} style={{cursor:'pointer'}}>
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
                <a href='https://kauth.kakao.com/oauth/authorize?client_id=20887ce0003dfa62635c435e177fee15&redirect_uri=http://localhost:3000/oauth&response_type=code'>
                    <div id='login-btn'>
                        로그인        
                    </div>
                </a>
                }
                    
                </div>
            </div>
            <div id='content' style={{justifyContent:'center'}}>
                <div id='post' style={{backgroundColor:'#fff', position:'relative', width:'800px', textAlign:'center'}}>
                    <div id='post_title' style={{position:'relative', height:'100px', fontWeight:'bold', fontSize:'44px', borderBottom:'2px solid #f2f2f2', marginTop:'10px', color:'gray'}}>
                        {isPostLoading?
                        'loading'
                        :
                        post.res[0].title}
                        <span style={{position:'absolute', left:0, bottom:0, fontSize:'18px', fontWeight:'normal'}}>{isPostLoading?'loading':post.res[0].author}</span>
                        <span style={{position:'absolute', right:0, bottom:0, fontSize:'18px', fontWeight:'normal'}}>date</span>
                    </div>
                    <div id='post_content' style={{marginTop:'10px', width:'100%', textAlign:'start'}}>
                        {isPostLoading?
                        'loading'
                        :
                        post.res[0].content}
                    </div>
                    <div id='post_comment'>
                        <div id='comment_input' style={{position:'relative', width:'100%', height:'50px', backgroundColor:'thistle', display:'flex', alignItems:'center'}}>
                            <span>{JSON.parse(localStorage.getItem('USER_INFO')).nickname}</span>
                            {JSON.parse(localStorage.getItem('USER_INFO')).is_login?
                            <>
                            <input id='_commentinput' type='text' placeholder='댓글' style={{width:'80%'}} onChange={(e) => setComInput(e.target.value)}/>
                            <input type='button' value='등록' onClick={() => {postComment(); setPostLoading(true); document.getElementById('_commentinput').value = ''}}/>
                            </>
                            :
                            <>
                            <input id='_commentinput' type='text' placeholder='로그인이 필요합니다.' disabled style={{width:'80%'}}/>
                            <input type='button' value='등록' disabled/>
                            </>
                            }
                        </div>
                        <div id='comment_list'>
                            <div style={{position:'relative', width:'100%', textAlign:'left', paddingLeft:'10px'}}>댓글</div>
                            {isLoading?
                            'loading'
                            :
                            comment.res === undefined?
                            '댓글이 없습니다.'
                            :
                            comment.res.map((element, index) => {
                                return(
                                    <div key={index} className='comment_item'>
                                        <div className='comment_thumbnail' style={{position:'relative', textAlign:'start', width:'10%', float:'left'}}>thumbnail</div>
                                        <div style={{position:'relative', width:'90%', height:'100%', float:'left'}}>
                                            <div className='comment_author' style={{position:'relative', textAlign:'start'}}>{element.author}</div>
                                            <div className='comment_content' style={{position:'relative', textAlign:'start'}}>{element.content}</div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage;