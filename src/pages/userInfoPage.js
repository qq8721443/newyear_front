import React from 'react';
import styled from 'styled-components';
import { getCookie } from '../components/cookies';
import {RiSettings4Fill} from 'react-icons/ri';
import Modal from '../components/changeUserInfo';
import Skeleton from 'react-loading-skeleton';


const Select = styled.div`
    flex:1;
    text-align:center;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;

    &:hover{
        background:#f2f2f2;
    }
    background: ${props => props.num === props.now? '#f2f2f2':'white'};
`

const UserInfo = ({history}) => {
    const [nowSelect, setSelect] = React.useState(0)
    const [info, setInfo] = React.useState(null)
    const [isInfoLoading, setInfoLoading] = React.useState(false)   

    React.useEffect(() => {
            fetch('https://qq8721443.pythonanywhere.com/main/call_user_info/', {
                method:'GET',
                headers:{
                    'X-CSRFToken':getCookie('csrftoken'),
                    'access-token':getCookie('accesstoken')
                },
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setInfo(json)
                setInfoLoading(false)
            })
            .catch(e => console.log(e))
    },[isInfoLoading])

    return(
        <div style={{position:'relative', minHeight:'500px'}}>
            <div id='content' style={{boxSizing:'border-box'}}>
                <div className='problem' style={{backgroundColor:'#fff', position:'relative', width:'800px', minHeight:'800px', padding:'20px', boxSizing:'border-box'}}>
                    <div style={{width:'100%', height:'200px', display:'flex'}}>
                        <div style={{flex:1, display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div style={{width:'150px', height:'150px', borderRadius:'100px', background:'gray'}}>

                            </div>
                        </div>
                        <div style={{flex:2, display:'flex', justifyContent:'center', flexDirection:'column'}}>
                            <div>
                                {info===null?
                                <Skeleton height={30}/>
                                :
                                <>
                                <span style={{fontSize:'24px', fontWeight:'bold'}}>{info.info.nickname}</span>
                                <span style={{marginLeft:'10px'}}>{info.info.email}</span>
                                </>
                                }
                            </div>
                            <div style={{marginTop:'10px', boxSizing:'border-box'}}>{info===null?<Skeleton/>:info.info.description}</div>
                        </div>
                    </div> 
                    <div className='inside' style={{position:'relative'}}>
                        <div style={{display:'flex', width:'100%', height:'50px', alignItems:'center', justifyContent:'center', borderBottom:'1px solid gray'}}>
                            <Select num={0} now={nowSelect} onClick={() => setSelect(0)}>작성한 글</Select>
                            <Select num={1} now={nowSelect} onClick={() => setSelect(1)}>응원한 글</Select>
                            <Select num={2} now={nowSelect} onClick={() => setSelect(2)}>댓글단 글</Select>
                        </div>
                        <div style={{position:'relative', width:'100%', minHeight:'500px', background:'#f2f2f2', marginTop:'20px'}}>
                            {nowSelect===0?info===null?'loading':
                            info.posts.write_post.map((element, index) => {
                                return(
                                    <div key={index} className='post_list_item' onClick={() => history.push(`/posts/${element.post_id}`)}>
                                        <div>{element.title}</div>
                                        <div>{element.content}</div>
                                    </div>
                                )
                            })
                            :
                            nowSelect===1?
                            info===null?'loading':
                            info.posts.clap_post.map((element, index) => {
                                return(
                                    <div key={index} className='post_list_item' onClick={() => history.push(`/posts/${element.post_id}`)}>
                                        <div>{element.title}</div>
                                        <div>{element.content}</div>
                                    </div>
                                )
                            })
                            :
                            info===null?'loading':
                            info.posts.reply_post.map((element, index) => {
                                return(
                                    <div key={index} className='post_list_item' onClick={() => history.push(`/posts/${element[0].post_id}`)}>
                                        <div>{element[0].title}</div>
                                        <div>{element[0].content}</div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                    <div style={{position:'absolute', top:20, right:20}}>
                            <RiSettings4Fill size={22} color="gray" style={{cursor:'pointer'}} onClick={() => {document.getElementsByClassName('hidden')[0].classList.remove('hidden')}}/>
                    </div>   
                </div>
            </div>
            {info===null?null:<Modal nickname={info.info.nickname} email={info.info.email} description={info.info.description}/>}
        </div>        
    )
}

export default UserInfo;