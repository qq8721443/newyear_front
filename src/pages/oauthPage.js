import React, { useEffect } from 'react';
import queryString from 'query-string';
import {getCookie, setCookie} from '../components/cookies';

const Oauth = ({location, history}) => {
    const query = queryString.parse(location.search)

    useEffect(() => {
        fetch('http://localhost:8000/main/oauth/', {
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
            if(getCookie('accesstoken') === null || getCookie('accesstoken') === 'undefined'){
                setCookie("accesstoken", json.res.access_token)
            }
            if(getCookie('refreshtoken') === null || getCookie('refreshtoken') === 'undefined'){
                setCookie("refreshtoken", json.res.refresh_token)
            }
            fetch('http://localhost:8000/main/user_info/',{
                method:'POST',
                headers:{
                    'X-CSRFToken':`${getCookie('csrftoken')}`
                },
                body:JSON.stringify({
                    access_token:getCookie("accesstoken")
                }),
                credentials:'include'
            })
            .then(res => res.json())
            .then(json => {
                alert(JSON.stringify(json))
                console.log(JSON.stringify(json))
                localStorage.setItem('USER_INFO', JSON.stringify({'user_id':json.id, 'nickname':json.properties.nickname, 'is_login':true}))
                history.push('/')
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
            액세스 토큰 : {getCookie("accesstoken")}
        </div>
        </>
    )
}

export default Oauth;