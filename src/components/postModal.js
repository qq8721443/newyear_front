import React from 'react';

const PostModal = (props) => {
    const closePostModal = () => {
        document.getElementById('post_modal').classList.add('hidden')
    }

    return (
        <div id='post_modal' className='hidden' style={{position:'fixed', width:'100vw', height:'100vh', top:0, left:0, background:'rgba(240,240,240, 0.7)'}}>
            <div id='post_modal_item' style={{position:'relative', width:'400px', height:'600px', background:'white', marginLeft:'50vw', marginTop:'50vh', left:'-200px', top:'-300px', borderRadius:'10px', boxSizing:'border-box', padding:'20px'}}>
                <div style={{position:'relative', width:'100%', height:'100%', overflow:'auto'}}>
                    <div style={{position:'relative', width:'100%', height:'150px'}}>
                        <span>전체 목표</span>
                        <div>list</div>
                    </div>
                    <div style={{position:'relative', width:'100%', height:'150px'}}>
                        <span>성공한 목표</span>
                        <div>list</div>
                    </div>
                    <div style={{position:'relative', width:'100%', height:'150px'}}>
                        <span>진행중인 목표</span>
                        <div>list</div>
                    </div>
                    <div style={{position:'relative', width:'100%', height:'150px'}}>
                        <span>나의 응원</span>
                        <div>list</div>
                    </div>
                </div>
                <div id='post_modal_close' style={{position:'absolute', top:0, right:0, width:'20px', height:'20px', background:'#f2f2f2', textAlign:'center', borderRadius:'10px', cursor:'pointer'}} onClick={() => closePostModal()}>
                    x
                </div>
            </div>
        </div>
    )
}

export default PostModal;