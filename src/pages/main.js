import React from 'react';
import '../css/maincss.css';
import {getCookie} from '../components/cookies';
import LoginModal from '../components/loginModal';
import PostModal from '../components/postModal';
// import {Link} from 'react-router-dom';

const Main = ({history}) => {
    // const [isPostLoading, setPostLoading] = React.useState(true)
    const [post, setPost] = React.useState('')
    const [info, setInfo] = React.useState('')


    React.useEffect(() => {
        console.info('use effect 시작')
        async function getPost() {
            const res = await fetch('http://localhost:8000/main/posts/', {
                credentials:'include'
            })
            const post_res = await res.json()
            if(post_res.res === "there's no data"){
                setPost('none')
            } else {
                setPost(post_res)
                // setPostLoading(false)
            }
        }
        getPost()

        if(getCookie('csrftoken') === null){
          async function getCsrfToken() {
              const response = await fetch(`http://localhost:8000/main/get_csrf/`, {
                credentials: 'include',
              });
              const data = await response.json();
            document.cookie = `csrftoken=${data.csrfToken}`
          }
          getCsrfToken()
        }
        
        return() => {
            console.info('use effect 끝')
        }
      }, [])

      React.useLayoutEffect(() => {
          console.info('use layout effect 시작')
          fetch('http://localhost:8000/main/test/', {
              method:'GET',
              headers:{
                  'X-CSRFToken':getCookie('csrftoken'),
                  'access-token':getCookie('accesstoken')
              },
              credentials:'include'
          })
          .then(res => res.json())
          .then(json => {
            alert(JSON.stringify(json))
            setInfo(json)
          })
          .catch(e => console.log(e))

          return() => {
              console.info('use layout effect 끝')
          }
      }, [])

      const openPostModal = () => {
        document.getElementById('post_modal').classList.remove('hidden')
    }
    
    return(
        <div>
            <div id='content'>
                <div className='ad-section'>
                    1
                </div>
                <div id='con-section'>
                    <div id='banner'>
                        <span style={{fontSize:'20px', fontWeight:'bold'}}>{JSON.parse(localStorage.getItem('USER_INFO')).is_login?JSON.parse(localStorage.getItem('USER_INFO')).nickname+' 님의 목표 달성률':'로그인이 필요합니다'}</span>
                        <div style={{position:'relative', width:'100%', height:'20px', backgroundColor:'#f2f2f2', borderRadius:'10px', marginTop:'10px'}}>
                            <div style={{position:'relative', width:`${info===''?null:info.rate.success+'%'}`, height:'100%', backgroundColor:'mediumaquamarine', borderRadius:'10px', textAlign:'center'}}>
                                {info===''?'loading':info.rate.success+'%'}
                            </div>
                        </div>
                        <div style={{backgroundColor:'white', display:'flex', gap:'10px', marginTop:'10px'}}>
                            <div style={{flex:1, backgroundColor:'#f2f2f2', height:'25vh', boxSizing:'border-box', borderRadius:'10px', padding:'10px'}}>
                                <span style={{fontSize:'16px', fontWeight:'bold', display:'block'}}>진행중인 목표</span>
                                <span style={{position:'relative'}}>{info===''?'loading':info.nowposttitle}</span>
                                <span> | 👏 x {info===''?null:info.claps} </span><br/>
                                <span>남은 시간 |</span>
                                <span> {info===''?null:`${info.remain.days}일 ${info.remain.hours}시간 ${info.remain.minutes}분`}</span>
                                <div style={{position:'relative', width:'100%', height:'20px', backgroundColor:'#fff', borderRadius:'10px'}}>
                                    <div style={{position:'relative', width:`${info===''?null:info.rate.remain+'%'}`, height:'100%', backgroundColor:'skyblue', borderRadius:'10px', textAlign:'center'}}>
                                        {info===''?null:`${info.rate.remain}%`}
                                    </div>
                                </div>
                            </div>
                            <div style={{flex:1, backgroundColor:'#f2f2f2', height:'25vh', boxSizing:'border-box', borderRadius:'10px', padding:'10px', display:'flex', justifyContent:'center', alignItems:'center', position:'relative'}}>
                                <div style={{flex:1, fontSize:'14px', textAlign:'center', borderRight:'1px solid gray'}}>
                                    <span>전체 목표</span>
                                    <span style={{display:'block', fontSize:'36px'}}>{info===''?null:info.count.all}개</span>
                                </div>
                                <div style={{flex:1, fontSize:'14px', textAlign:'center', borderRight:'1px solid gray'}}>
                                    <span>성공 목표</span>
                                    <span style={{display:'block', fontSize:'36px', color:'green'}}>{info===''?null:info.count.success}개</span>
                                </div>
                                <div style={{flex:1, fontSize:'14px', textAlign:'center', borderRight:'1px solid gray'}}>
                                    <span>진행 목표</span>
                                    <span style={{display:'block', fontSize:'36px', color:'red'}}>{info===''?null:info.count.ongoing}개</span>
                                </div>
                                <div style={{flex:1, fontSize:'14px', textAlign:'center'}}>
                                    <span>나의 응원</span>
                                    <span style={{display:'block', fontSize:'36px', color:'orange'}}>17개</span>
                                </div>
                                <div style={{position:'absolute', right:'5px', bottom:'5px', cursor:'pointer'}} onClick={() => openPostModal()}>자세히 보기</div>
                            </div>
                        </div>
                    </div>
                    <div id='thumb'>
                        <div className='thumb-item1'>
                            <p className='thumb-title'>인기있는 목표</p>
                            <div id='hope-container'>
                                
                            </div>
                        </div>
                        <div className='thumb-item2'>
                            <p className='thumb-title'>최신 글</p>
                            <p className='more-btn' onClick={() => history.push('/posts')}>+더보기</p>
                            {post === ''?
                            'loading'
                            :
                            post.map((element, index) => {
                                return(
                                    <div key={index} onClick={() => history.push(`/posts/${element.post_id}`)} className='post-list'>
                                        <span className='post-list-title'><p className='emp'>{element.title}</p>|{element.author}</span>
                                        <span className='post-list-content'>{element.content.length > 40? element.content.slice(0,40)+'...':element.content}</span>
                                    </div>    
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className='ad-section'>
                    3
                </div>
            </div>
            <div id='footer'>
                footer
            </div>
            <LoginModal/>
            <PostModal/>
        </div>
    )
}

export default Main;