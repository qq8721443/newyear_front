import React from 'react';
import '../css/maincss.css'
import { getCookie } from '../components/cookies';
import LoginModal from '../components/loginModal';

const DetailPage = ({history, match}) => {
    const [comment_input, setComInput] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [post, setPost] = React.useState('')
    // const [isPostLoading, setPostLoading] = React.useState(true)
    // const [isLoading, setLoading] = React.useState(true)
    const [isAuthor, setAuthor] = React.useState('')


    React.useEffect(() => {
        console.log("useEffect 실행")
    
    }, [comment])

    function postComment() {
        console.log('post comment 시작')
        setComment('')
        const valid_check = document.getElementById('_commentinput').value
        if(valid_check === ''){
            alert('댓글을 입력해주세요')
        } else {
            fetch(`http://localhost:8000/main/comments/${match.params.post_id}/`, {
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
            .then(res => res.json())
            .then(json => {
                setComInput('')
                console.log(json)
                console.log('post comment 종료')
            })
        }
    }

    React.useLayoutEffect(() => {
        function getAuth(){
            fetch('http://localhost:8000/main/user_check/', {
                method:'POST',
                headers:{
                    'X-CSRFToken':getCookie('csrftoken')
                },
                body:JSON.stringify({
                    post_id:match.params.post_id,
                    access_token:getCookie('accesstoken')
                }),
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                if(json.error === 'Signature has expired'){
                    alert('Signature has expired')
                    // refresh token 확인 후 유효하면 access token 재발급
                }
                if(json.is_author){
                    setAuthor(true)
                } else {
                    setAuthor(false)
                }
            })
        }

        function getComment(){
            console.log('comment')
            fetch(`http://localhost:8000/main/comments/${match.params.post_id}/`, {
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                setComment(json)
            })
        }

        function getPost(){
            fetch(`http://localhost:8000/main/posts/${match.params.post_id}/`, {
                credentials:'include',
                headers:{
                    'access-token':getCookie('accesstoken')
                }
            })
            .then(res => res.json())
            .then(json => {
                setPost(json)
                console.log(post)
            })
        }
        if(post===''){
            getPost()
        }
        if(comment===''){
            getComment()
        }
        if(isAuthor===''){
            getAuth()
        }
    }, [comment, match.params.post_id, post, isAuthor])

    function deletePost(){
        const answer = window.confirm("정말 삭제하시겠습니까?")
        if(answer){
            fetch(`http://localhost:8000/main/posts/${match.params.post_id}/`, {
                method:'DELETE',
                headers:{
                    'X-CSRFToken':getCookie('csrftoken')
                },
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                alert(JSON.stringify(json))
                history.push('/')
            })
            .catch(e => console.log(e))
        }
    }

    function changeToSuccess(){
        fetch(`http://localhost:8000/main/change_success/${match.params.post_id}/`,{
            method:'PATCH',
            headers:{
                'X-CSRFToken':getCookie('csrftoken')
            },
            credentials:'include'
        })
        .then(res => res.json())
        .then(json => {
            alert(JSON.stringify(json))
        })
        .catch(e => console.log(e))
    }
    
    function changeToFail(){
        fetch(`http://localhost:8000/main/change_fail/${match.params.post_id}/`, {
            method:'PATCH',
            headers:{
                'X-CSRFToken':getCookie('csrftoken')
            },
            credentials:'include'
        })
        .then( res => res.json())
        .then(json => {
            alert(JSON.stringify(json))
        })
        .catch(e => console.log(e))
    }

    return(
        <div>
            <div id='content' style={{justifyContent:'center'}}>
                <div id='post' style={{backgroundColor:'#fff', position:'relative', width:'800px', textAlign:'center'}}>
                    <div id='post_title' style={{position:'relative', height:'100px', fontWeight:'bold', fontSize:'44px', borderBottom:'2px solid #f2f2f2', marginTop:'10px', color:'gray'}}>
                        {post ===''?
                        'loading'
                        :
                        post.res[0].title}
                        <span style={{position:'absolute', left:0, bottom:0, fontSize:'18px', fontWeight:'normal'}}>{post===''?'loading':post.res[0].author}</span>
                        <span style={{position:'absolute', right:0, bottom:0, fontSize:'18px', fontWeight:'normal'}}>{post===''?'loading':post.res[0].created_dt.split('T')[0]}</span>
                        <span>{post===''?'loading':post.res[0].views}</span>
                    </div>
                    {isAuthor?
                        <div id='options' style={{position:'relative', width:'100%', height:'30px', background:'orange', textAlign:'right'}}>
                            <span onClick={() => history.push({
                                pathname:'/modify',
                                state:{test:post.res[0]},
                            })}>수정</span>
                            <span onClick={() => deletePost()}>삭제</span>
                            {post!==''?post.res[0].is_success === true || post.res[0].is_fail === true?
                            null
                            :
                            <>
                            <span onClick={() => changeToSuccess()}>성공</span>
                            <span onClick={() => changeToFail()}>실패</span>
                            </>
                            :
                            null
                        }
                            
                        </div>
                    :
                        null
                    }
                    
                    <div id='post_content' style={{marginTop:'10px', width:'100%', textAlign:'start', minHeight:'300px'}}>
                        {post===''?
                        'loading'
                        :
                        post.res[0].content}
                        {isAuthor?
                        'author'
                    :
                    'not author'}
                    <span style={{position:'absolute'}}>{post===''?'loading':(post.is_liked===true?'좋아요 누름':'좋아요 안누름')}</span>
                    </div>
                    <div id='post_comment'>
                        <div id='comment_input' style={{position:'relative', width:'100%', height:'50px', backgroundColor:'thistle', display:'flex', alignItems:'center'}}>
                            <span>{JSON.parse(localStorage.getItem('USER_INFO')).nickname}</span>
                            {JSON.parse(localStorage.getItem('USER_INFO')).is_login?
                            <>
                            <input id='_commentinput' type='text' placeholder='댓글' style={{width:'80%'}} onChange={(e) => setComInput(e.target.value)}/>
                            <input type='button' value='등록' onClick={() => {postComment(); document.getElementById('_commentinput').value = '';}}/>
                            </>
                            :
                            <>
                            <input id='_commentinput' type='text' placeholder='로그인이 필요합니다.' disabled style={{width:'80%'}}/>
                            <input type='button' value='등록' disabled/>
                            </>
                            }
                        </div>
                        <div id='comment_list' style={{backgroundColor:'white'}}>
                            <div style={{position:'relative', width:'100%', textAlign:'left', paddingLeft:'10px'}}>댓글</div>
                            {comment===''?
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
            <LoginModal/>
        </div>
    )
}

export default DetailPage;