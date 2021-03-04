import React, { useEffect } from 'react';
import queryString from 'query-string';
import {getCookie, setCookie} from '../components/cookies';

const Oauth = ({location, history}) => {
    const query = queryString.parse(location.search)

    useEffect(() => {
        fetch('http://qq8721443.pythonanywhere.com/main/oauth/', {
            method:'POST',
            headers:{
                'X-CSRFToken':`${getCookie('csrftoken')}`
            },
            body:JSON.stringify({
                code:query.code
            }),
            credentials:'include'
        })
        .then(res => res.json())
        .then(json => {
            console.log(JSON.stringify(json))
            
            fetch('http://qq8721443.pythonanywhere.com/main/user_info/',{
                method:'POST',
                headers:{
                    'X-CSRFToken':`${getCookie('csrftoken')}`
                },
                body:JSON.stringify({
                    access_token:json.res.access_token
                }),
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                alert(JSON.stringify(json))
                console.log(JSON.stringify(json))
                console.log(json.id)
                fetch('http://qq8721443.pythonanywhere.com/main/signup/', {
                    method:'POST',
                    headers:{
                        'X-CSRFToken':getCookie('csrftoken')
                    },
                    body:JSON.stringify({
                        exist_check:true,
                        kakao_user_id:json.id
                    }),
                    credentials:'include'
                })
                .then(res => res.json())
                .then(json => {
                    if(json.already){
                        //토큰 저장
                        setCookie('accesstoken', json.access_token)
                        setCookie('refreshtoken', json.refresh_token)
                        localStorage.setItem('USER_INFO',JSON.stringify({'nickname':json.nickname, 'email':json.email, 'is_login':true}))
                        history.push('/')
                    } else {
                        history.push({
                            pathname:'/register',
                            state:{kakao_user_id:json.id},
                        })
                    }
                })
            })
            .catch(e => console.log(e))
        })
        .catch(e => console.log(e))
    })

    

    return(
        <>
        <div>
            코드 : {query.code}
        </div>
        <div>
            액세스 토큰 : {}
        </div>
        </>
    )
}

export default Oauth;