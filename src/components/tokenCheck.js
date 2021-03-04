import {deleteCookie, getCookie, setCookie} from '../components/cookies';

const tokenCheck = () => {
    if(getCookie('accesstoken') === null || getCookie('accesstoken') === 'undefined'){
        deleteCookie('accesstoken')
        deleteCookie('refreshtoken')
        localStorage.setItem('USER_INFO', JSON.stringify({'is_login':false}))
    } else {
        fetch('http://http://qq8721443.pythonanywhere.com/main/expired_check/',{
            method:'GET',
            headers:{
                'access-token':getCookie('accesstoken'),
                'refresh-token':getCookie('refreshtoken')
            },
            credentials:'include'
        })
        .then(res => res.json())
        .then(json => {
            console.log("토큰 확인 결과 :" + json.message)
            if (json.message === "access/refresh"){
                setCookie('accesstoken', json.access_token)
                setCookie('refreshtoken',json.refresh_token)
            } else if (json.message === "access"){
                setCookie('accesstoken', json.access_token)
            }
        })
        .catch(e => console.log(e))
    }
}

export default tokenCheck;