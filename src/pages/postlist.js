import React from 'react';
import LoginModal from '../components/loginModal';
import '../css/testcss.css'

const PostList = ({history}) => {
    const [isLoading, setLoading] = React.useState(true)
    const [isData, setData] = React.useState(false)
    const [post, setPost] = React.useState()

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
        if(isLoading)
            getPost()
    })

    return(
        <div>
            <div id='content'>
                <div className='ad-section'>
                    1
                </div>
                <div id='con-section'>
                    {/* <div id='banner'>
                        <p style={{all:'unset', fontSize:22}}>전체글 보기</p>
                        <br/>
                        다양한 글을 마음껏 둘러보세요!
                    </div> */}
                    <div id='thumb' style={{backgroundColor:'white', flexDirection:'column'}}>
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
                                        {JSON.stringify(element)}
                                    </div>
                                )
                            })
                            :
                            'nothing'
                        }
                        </div>
                    </div>
                </div>
                <div className='ad-section'>
                    3
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