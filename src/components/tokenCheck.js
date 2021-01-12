import {getCookie} from './cookies';

function tokenCheck(){
    const accessToken = getCookie('accesstoken');
    if(accessToken === null){
        return false;
    } else {
        fetch('http://localhost:8000/main/token_check/', {
            method:'POST',
            headers:{
                'X-CSRFToken':getCookie('csrftoken')
            },
            body:JSON.stringify({
                access_token:accessToken
            }),
            credentials:'include'
        })
        .then(res => res.json())
        .then(json => {
            if(json.id === JSON.parse(localStorage.getItem('USER_INFO')).user_id && json.expires_in > 0){
                return true;
            } else {
                if(getCookie('csrftoken') === null){
                    return false;   
                } else {
                    fetch('http://localhost:8000/main/refresh_token/', {
                        method:'POST',
                        headers:{
                            'X-CSRFToken':getCookie('csrftoken')
                        },
                        body:JSON.stringify({
                            refresh_token:getCookie('refreshtoken')
                        }),
                        credentials:'include'
                    })
                    .then(res => res.json())
                    .then(json => {
                        return true;
                    })
                }
            }
        })
    }
}

export default tokenCheck;