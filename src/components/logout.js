import React from 'react';
import { deleteCookie } from './cookies';

const Logout = ({history}) => {

    localStorage.setItem('USER_INFO',JSON.stringify({'is_login':false}))
    // 로그아웃할때 수행해야할 것들 - 액세스 토큰 삭제, 리프레시 토큰 삭제
    deleteCookie('accesstoken')
    deleteCookie('refreshtoken')

    history.push('/')

    return(
        <div>
            log out...
        </div>
    )
}

export default Logout