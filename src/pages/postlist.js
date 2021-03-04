import React from 'react';
import { getCookie } from '../components/cookies';
import LoginModal from '../components/loginModal';
import '../css/testcss.css'

const PostList = ({history}) => {
    const [isLoading, setLoading] = React.useState(true)
    const [isData, setData] = React.useState(false)
    const [post, setPost] = React.useState()
    const [isFetching, setFetching] = React.useState(false)
    const [page, setPage] = React.useState(1)

    async function getPost() {
        const res = await fetch('http://localhost:8000/main/posts/', {
            credentials:'include'
        })
        const post_res = await res.json()
        if(post_res.res === "there's no data"){
            setLoading(false)
        } else {
            setPost(post_res)
            setLoading(false)
            setData(true)
        }
    }

    
      

    React.useEffect(() => {
        const FetchOtherPost = () => {
            setFetching(true)

            fetch(`http://localhost:8000/main/posts/extra/${page+1}/`, {
                method:'GET',
                headers:{
                    'X-CSRFToken':getCookie('csrftoken')
                },
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                if (json.message !== "there's no extra data"){
                    console.log(json)
                    let mergedData = post.concat(json)
                    setPost(mergedData)
                    setPage(page+1)
                    console.log(post)
                    setFetching(false)
                } else {
                    document.getElementsByClassName('scroll_status')[0].innerText = '더 이상 데이터가 없습니다.'
                }                
            })
        }

        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
            if (scrollTop + clientHeight >= scrollHeight &&isFetching === false) {
                // 페이지 끝에 도달하면 추가 데이터를 받아온다
                // 지금은 그냥 alert 테스트
                FetchOtherPost()
            }
        };

        

        if(isLoading)
            getPost()
        else{
            window.addEventListener("scroll", handleScroll)
            console.log("이벤트 핸들러 생성")
        }

        return() => {
            window.removeEventListener("scroll", handleScroll)
            console.log("이벤트 핸들러 삭제")
        }
    }, [isLoading, isFetching, page, post])

    return(
        <div>
            <div id='content'>
                <div id='con-section'>
                    <div id='thumb' style={{ flexDirection:'column', minHeight:'500px'}}>
                        <div style={{all:'unset', width:'100%', backgroundColor:'#f2f2f2'}}>
                            <p style={{all:'unset', width:'100%', backgroundColor:'#f2f2f2', fontSize:22}}>전체글 보기</p>
                            <br/>
                            다양한 글을 마음껏 둘러보세요!
                        </div>
                        <div id='post_list'>
                            {isLoading?
                            'loading'
                            :
                            isData?
                                post.map((element, index) => {
                                    return(
                                        <div key={element.post_id} onClick={() => history.push(`/posts/${element.post_id}`)} className='post_list_item'>
                                            <div>{element.title}</div>
                                            <div style={{ fontSize:'14px' }}>{element.content.length > 120?element.content.slice(0,120)+'...':element.content}</div>
                                            <div style={{position:'absolute', width:'100%', height:'30px', padding:15, paddingTop:0, left:0, bottom:0, boxSizing:'border-box', display:'flex', justifyContent:'space-between'}}>
                                                <span style={{ height:'20px'}}>
                                                    <span style={{display:'inline-block', width:'20px', height:'20px', borderRadius:'10px', background:'#f2f2f2', top:0}}></span>
                                                    <span style={{display:'inline-block', height:'20px', position:'absolute', marginLeft:'10px', minWidth:'150px'}}>{element.author}</span>
                                                </span>
                                                <span style={{fontSize:'14px'}}>
                                                    {element.created_dt.split('T')[0]}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })

                            :
                            'nothing'
                            }
                        </div>
                        <div className="scroll_status">
                            스크롤해서 로딩하기
                        </div>
                    </div>
                </div>
            </div>
            {JSON.parse(localStorage.getItem('USER_INFO')).is_login === true?
            <div onClick={() => history.push('/create')} style={{position:'fixed', bottom:'10px', right:'10px', width:'100px', height:'100px', borderRadius:'50px', backgroundColor:'#6CB319', display:'table', textAlign:'center', cursor:'pointer'}}>
                <p style={{display:'table-cell', verticalAlign:'middle'}}>글쓰기</p>
            </div>
            :
            null
            }
            <LoginModal/>
        </div>
    )
}

export default PostList