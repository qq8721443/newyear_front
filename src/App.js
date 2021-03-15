import React from 'react';
// import './App.css';
import {Route} from 'react-router-dom';
import Main from './pages/main';
import Oauth from './pages/oauthPage';
import Logout from './components/logout';
import PostList from './pages/postlist';
import DetailPage from './pages/detailpage';
import CreatePost from './pages/createPost';
import Register from './pages/register';
import Header from './components/header';
import UserInfo from './pages/userInfoPage';
import Modify from './pages/modifypost';
import {getCookie} from './components/cookies';
import tokenCheck from './components/tokenCheck';

function App() {

  React.useLayoutEffect(() => {
    console.log('app.js useLayoutEffect 시작')
    // 토큰 체크
    tokenCheck()
    // 
    if(getCookie('csrftoken') === null){
      async function getCsrfToken() {
          const response = await fetch(`https://qq8721443.pythonanywhere.com/main/get_csrf/`, {
            credentials: 'include',
          });
          const data = await response.json();
        document.cookie = `csrftoken=${data.csrfToken}`
      }
      getCsrfToken()
    }

  }, [])
  
  return(
    <>
      <Route path='/' component={Header}/>
      <Route path='/' exact component={Main}/>
      <Route path='/oauth' component={Oauth}/>
      <Route path='/logout' exact component={Logout}/>
      <Route path='/posts' exact component={PostList}/>
      <Route path='/posts/:post_id' exact component={DetailPage}/>
      <Route path='/create' exact component={CreatePost}/>
      <Route path='/register' exact component={Register}/>
      <Route path='/user_info' exact component={UserInfo}/>
      <Route path='/modify' exact component={Modify}/>
    </>
  )
}

export default App;