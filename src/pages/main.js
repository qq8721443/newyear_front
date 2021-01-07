import React from 'react';
import '../css/maincss.css'

const Main = () => {
    return(
        <div>
            <div id='header'>
                header
            </div>
            <div id='content'>
                <div className='ad-section'>
                    1
                </div>
                <div id='con-section'>
                    <div id='banner'>
                        banner
                    </div>
                    <div id='thumb'>
                        <div class='thumb-item1'>
                            1
                        </div>
                        <div class='thumb-item2'>
                            2
                        </div>
                    </div>
                </div>
                <div className='ad-section'>
                    3
                </div>
            </div>
            <div id='footer'>
                footer
            </div>
        </div>
    )
}

export default Main;