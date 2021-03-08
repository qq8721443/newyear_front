import React from 'react';
import '../css/maincss.css';
import { getCookie } from '../components/cookies';
import LoginModal from '../components/loginModal';
import styled from 'styled-components';
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {HiOutlinePencilAlt} from 'react-icons/hi';
import {RiDeleteBack2Line, RiDeleteBinLine, RiCheckboxCircleLine} from 'react-icons/ri';
import Skeleton from 'react-loading-skeleton';

const SideBtn = styled.div`
        position:fixed;
        top:30vh;
        left:10vw;
        width:100px;
        height:100px;
        background:white;
        border-radius:50px;
        display:flex;
        justify-content:center;
        align-items:center;
        cursor:pointer;
    `

const CommentInput = styled.textarea`
        position:relative;
        height:100px;
        width:100%;
        background:white;
        border:1px solid #dddddd;
        resize:none;
        outline:none;
        font-family:"Spoqa Han Sans Neo";
        box-sizing:border-box;
`

const Button = styled.div`
        position:relative;
        width:100px;
        height:50px;
        background:mediumaquamarine;
        border-radius:5px;
        float:right;
        display:flex;
        justify-content:center;
        align-items:center;
        color:white;
        font-size:18px;
        cursor:pointer;
`






const DetailPage = ({history, match}) => {
    const [comment_input, setComInput] = React.useState('')
    const [comment, setComment] = React.useState('')
    const [post, setPost] = React.useState('')
    const [isCommentLoading, setCommentLoading] = React.useState(true)
    const [isPostComment, setPostComment] = React.useState(true)
    const [isPostChange, setPostChange] = React.useState(false)
    const [isPostLoading, setPostLoading] = React.useState(false)
    // const [isPostLoading, setPostLoading] = React.useState(true)
    // const [isLoading, setLoading] = React.useState(true)
    const [isAuthor, setAuthor] = React.useState('')

    const MainButton = ({text}) => {
        return( <Button onClick={() => {postComment();setCommentLoading(!isCommentLoading);document.getElementById('comment_input').childNodes[0].value = ''}}>{text}</Button>)
    }

    React.useEffect(() => {
        console.log("useEffect 실행")
        function getComment(){
            console.log('comment')
            fetch(`https://qq8721443.pythonanywhere.com/main/comments/${match.params.post_id}/`, {
                credentials:'include',
                headers:{
                    'access-token':getCookie('accesstoken')
                }
            })
            .then(res => res.json())
            .then(json => {
                setComment(json)
                console.log(json)
                console.log('comment 끝')
            })
            .catch(e=>console.log(e))
        }
        getComment()
    
    }, [isCommentLoading, match.params.post_id, isPostComment])

    function postComment() {
        console.log('post comment 시작')
        setComment('')
        // const valid_check = document.getElementById('_commentinput').value
        const valid_check = document.getElementById('comment_input').childNodes[0].value
        if(valid_check === ''){
            alert('댓글을 입력해주세요')
        } else {
            fetch(`https://qq8721443.pythonanywhere.com/main/comments/${match.params.post_id}/`, {
                method:'POST',
                headers:{
                    'X-CSRFToken':getCookie('csrftoken'),
                    'access-token':getCookie('accesstoken')
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
                setPostComment(!isPostComment)
            })
        }
    }

    React.useLayoutEffect(() => {
        function getAuth(){
            fetch('https://qq8721443.pythonanywhere.com/main/user_check/', {
                method:'POST',
                headers:{
                    'X-CSRFToken':getCookie('csrftoken'),
                    'access-token':getCookie('accesstoken')
                },
                body:JSON.stringify({
                    post_id:match.params.post_id
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

        function getPost(){
            fetch(`https://qq8721443.pythonanywhere.com/main/posts/${match.params.post_id}/`, {
                credentials:'include',
                headers:{
                    'access-token':getCookie('accesstoken')
                }
            })
            .then(res => res.json())
            .then(json => {
                setPost(json)
                // console.log(post)
                console.log(json)
                console.log(json.res[0].content)
                setPostLoading(false)
            })
        }


        getPost()
        getAuth()
        

        setPostChange(false)
    }, [ isPostLoading, match.params.post_id, isPostChange])

    function deletePost(){
        const answer = window.confirm("정말 삭제하시겠습니까?")
        if(answer){
            fetch(`https://qq8721443.pythonanywhere.com/main/posts/${match.params.post_id}/`, {
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
        fetch(`https://qq8721443.pythonanywhere.com/main/change_success/${match.params.post_id}/`,{
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
        fetch(`https://qq8721443.pythonanywhere.com/main/change_fail/${match.params.post_id}/`, {
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

    const likePost = () => {
        fetch(`https://qq8721443.pythonanywhere.com/main/like_post/${match.params.post_id}/`, {
            method:'GET',
            headers:{
                'X-CSRFToken':getCookie('csrftoken'),
                'access-token':getCookie('accesstoken')
            },
            credentials:'include'
        })
        .then(res => res.json())
        .then(json => {
            console.log(json.message)
        })
        .catch(e => console.log(e))
    }

    const deleteComment = (commentId) => {
        fetch(`https://qq8721443.pythonanywhere.com/main/comments/delete/${commentId}/`, {
            method:'delete',
            headers:{
                'X-CSRFToken':getCookie('csrftoken'),
                'access-token':getCookie('accesstoken')
            }
        })
        .then(res => res.json())
        .then(json => {
            alert(json.message)
            setCommentLoading(!isCommentLoading)
        })
    }

    const PostControlBox = () => {
        return(
            <div style={{position:'absolute', top:0, right:0}}>
                <HiOutlinePencilAlt title="수정하기" style={{cursor:'pointer', marginRight:5}} size={25} onClick={() => history.push({
                                    pathname:'/modify',
                                    state:{test:post.res[0]},
                                })}/>
                <RiDeleteBinLine title="삭제하기" style={{cursor:'pointer', marginRight:5}} size={25} onClick={() => deletePost()}/>
                <RiCheckboxCircleLine title="성공" style={{cursor:'pointer', marginRight:5}} size={25} onClick={() => changeToSuccess()}/>
                <RiDeleteBack2Line title="실패" style={{cursor:'pointer'}} size={25} onClick={() => changeToFail()}/>
            </div>
        )
    }

    return(
        <div>
            <div id='content'>
                <div id='post' style={{backgroundColor:'#fff', position:'relative', width:'800px', padding:'20px', boxSizing:'border-box'}}>
                    <SideBtn onClick={() => {likePost();setPostChange(!isPostChange)}}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <div>{post===''?null:(post.is_liked?<AiFillHeart size={48} color="gray"/>:<AiOutlineHeart size={48} color="gray"/>)}</div>
                            <div style={{color:'#808080'}}>{post===''?null:post.res[0].claps_count}</div>
                        </div>
                    </SideBtn>
                    <div id='post_title' style={{position:'relative', fontWeight:'bold', fontSize:'44px', marginTop:'10px', color:'gray', marginLeft:'10px',  boxSizing:'border-box'}}>
                        {post ===''?
                        <Skeleton height={44}/>
                        :
                        post.res[0].title}
                        <div id='post_info' style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:'10px', paddingBottom:'10px', borderBottom:'2px solid #f2f2f2'}}>
                            {post===''?
                            <Skeleton width={150}/>
                            :
                            <>
                            <div style={{ width:'50px', height:'50px', background:'gray', borderRadius:'25px', display:'inline-block'}}></div>
                            <div style={{display:'inline-block', marginLeft:'5px'}}>
                            <div style={{fontSize:'18px', fontWeight:'normal'}}>{post.res[0].author}</div>
                            <div style={{fontSize:'18px', fontWeight:'normal'}}>{post.res[0].created_dt.split('T')[0]}</div>
                            </div>
                            </>
                            }
                        </div>
                        {isAuthor?<PostControlBox/>:null}
                    </div>
                    <div id='post_content' style={{padding:'10px', marginTop:'10px', width:'100%', textAlign:'start', minHeight:'300px', boxSizing:'border-box'}}>
                        <div style={{fontSize:25, fontWeight:'bold'}}>{post===''?<Skeleton/>:post.res[0].goal}</div><br/>
                        {post===''?
                        <Skeleton height={100}/>
                        :
                        
                        post.res[0].content.split('\n').map((line, index) => {
                            return (<span key={index}>{line}<br/></span>)
                        })}
                    
                    </div>
                    <div id='post_comment' style={{position:'relative', width:'800px', paddingLeft:0, boxSizing:'border-box'}}>
                    <div style={{position:'relative', top:'-10px', padding:'10px'}}>{comment===''?<Skeleton width={100}/>:comment.res === undefined?'0개의 댓글':`${comment.res.length}개의 댓글`}</div>
                        <div id='comment_input' style={{position:'relative',marginRight:'40px', minHeight:'170px', alignItems:'center', padding:'10px', textAlign:'right'}}>
                            {JSON.parse(localStorage.getItem('USER_INFO')).is_login?
                            <>
                            {/* <input id='_commentinput' autoComplete="off" type='text' placeholder='댓글' style={{flex:4}} onChange={(e) => setComInput(e.target.value)}/>
                            <input type='button' style={{flex:1}} value='등록' onClick={() => {postComment(); document.getElementById('_commentinput').value = ''; setCommentLoading(!isCommentLoading)}}/> */}
                            <CommentInput onChange={(e) => setComInput(e.target.value)} placeholder="댓글을 입력해주세요"/>
                            <MainButton text='작성하기'/>
                            </>
                            :
                            <>
                            <CommentInput onChange={(e) => setComInput(e.target.value)} placeholder="로그인이 필요합니다." disabled={true}/>
                            </>
                            }
                        </div>
                        <div id='comment_list' test={isCommentLoading.toString()} style={{backgroundColor:'white', minHeight:'100px',marginRight:'40px', boxSizing:'border-box', paddingLeft:'10px'}}>
                            {comment===''?
                            <div className='comment_item'>
                                <div>
                                    <Skeleton width={100} height={30}/>
                                </div>
                                <div style={{margin:'10px', boxSizing:'border-box'}}>
                                    <Skeleton height={60}/>
                                </div>
                                <div style={{position:'absolute', bottom:10, right:10, color:'gray'}}>
                                    <Skeleton/>
                                </div>
                            </div>
                            :
                            comment.res === undefined?
                            '댓글이 없습니다.'
                            :
                            comment.res.map((element) => {
                                return(
                                    <div className='comment_item' key={element.id}>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <span style={{display:'inline-block', width:'50px', height:'50px', background:'gray', borderRadius:'30px', marginRight:'10px'}}></span>
                                            <span>{element.author}</span>
                                            {element.author_email === comment.request_email?<div onClick={() => window.confirm("정말 삭제하시겠습니까?")?deleteComment(element.id):null} style={{width:'80px', height:'40px', display:'flex', justifyContent:'center', alignItems:'center', position:'absolute', right:10, border:'1px solid #dddddd', borderRadius:'5px', boxSizing:'border-box', cursor:'pointer'}}>삭제</div>:null}
                                        </div>
                                        <div style={{margin:'10px', boxSizing:'border-box'}}>
                                            {element.content}
                                        </div>
                                        <div style={{position:'absolute', bottom:10, right:10, color:'gray'}}>
                                            {element.created_dt.split('T')[0]}
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