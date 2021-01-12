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

function App() {
  return(
    <>
      <Route path='/' exact component={Main}/>
      <Route path='/oauth' exact component={Oauth}/>
      <Route path='/logout' exact component={Logout}/>
      <Route path='/posts' exact component={PostList}/>
      <Route path='/posts/:post_id' exact component={DetailPage}/>
      <Route path='/create' exact component={CreatePost}/>
      <Route path='/register' exact component={Register}/>
    </>
  )
}

export default App;