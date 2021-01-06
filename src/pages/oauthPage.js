import React, { useEffect } from 'react';
import queryString from 'query-string';

const Oauth = ({location, match}) => {
    const query = queryString.parse(location.search)
    const [accessToken, setAccessToken] = React.useState('')
    const [refreshToken, setRefreshToken] = React.useState('')

    useEffect(() => {
        fetch('http://localhost:8000/main/oauth/', {
            method:'POST',
            body:JSON.stringify({
                code:query.code
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(JSON.stringify(json))
            if(accessToken == ''){
                setAccessToken(json['res']['access_token'])
            }
        })
        .then(
            fetch('http://localhost:8000/main/user_info/',{
                method:'POST',
                body:JSON.stringify({
                    access_token:accessToken
                })
            })
            .then(res => res.json())
            .then(json => alert(JSON.stringify(json)))
            //.catch(e => console.log(e))
        )
    })

    

    return(
        <>
        <div>
            코드 : {query.code}
        </div>
        <div>
            액세스 토큰 : {accessToken}
        </div>
        </>
    )
}

export default Oauth;