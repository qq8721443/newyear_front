const change_design_1 = () => {
    const modal_left = document.getElementById('login_modal_left');
    const modal_right = document.getElementById('login_modal_right');

    if(document.body.offsetWidth > 600){
        modal_left.style.flex = 1.5;
        modal_right.style.flex = 1;
        modal_right.style.background = 'linear-gradient(to left, mediumaquamarine, rgb(120, 219, 186))';
        modal_left.style.background = 'white';
        modal_right.childNodes[4].style.borderWidth = '0px'
    } else if(document.body.offsetWidth <= 600){
        modal_left.style.flex = 1;
        modal_right.style.flex = 0;
    }
    


    modal_right.childNodes.forEach((e) => {
        e.style.width = 0
    })

    modal_left.childNodes.forEach((e) => {
        e.classList.remove('hidden')
        e.style.width = '300px'
    })
}

const change_design_2 = () => {
    const modal_left = document.getElementById('login_modal_left');
    const modal_right = document.getElementById('login_modal_right');

    if(document.body.offsetWidth > 600){
        modal_left.style.flex = 1;
        modal_right.style.flex = 1.5;
        modal_right.childNodes[4].style.borderWidth = '2px'
    
        modal_left.style.background = 'linear-gradient(to right, mediumaquamarine, rgb(120, 219, 186))'
        modal_right.style.background = 'white'
    } else if (document.body.offsetWidth <= 600){
        modal_left.style.flex = 0;
        modal_right.style.flex = 1;
    }
    

    modal_left.childNodes.forEach((e) => {
        e.style.width = 0;
    })
    modal_right.childNodes.forEach((e) => {
        e.style.width = '300px';
    })
}

export {change_design_1, change_design_2}