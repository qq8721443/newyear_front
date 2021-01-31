import {getCookie} from '../components/cookies';

const tokenCheck = () => {
    if(getCookie('accesstoken') === null){
        localStorage.setItem('USER_INFO', JSON.stringify({'is_login':false}))
    } else {
        fetch('http://localhost:8000/main/expired_check/',{
            method:'GET',
            headers:{
                'access-token':getCookie('accesstoken'),
                'refresh-token':getCookie('refreshtoken')
            },
            credentials:'include'
        })
        .then(res => res.json())
        .then(json => {
            console.log(json.message)
        })
        .catch(e => console.log(e))
    }
}

export default tokenCheck;