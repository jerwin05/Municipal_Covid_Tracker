
const body=document.querySelector('body');
const borderBottom=document.getElementById('border--bottom');
const main=document.getElementById('main');
const block3=document.getElementById('block3');

var scrollTop=0;

function openTab(pageName) {
    borderBottom.className = borderBottom.className.replace(" tab--slide", "");
    main.className = main.className.replace(" page--slide", "");
    block3.style.display='';

    //update tab button border
    if(pageName=='ProfileTab'){
        borderBottom.className += " tab--slide";
        main.className += " page--slide";
        block3.style.display='none';
        scrollTop=body.scrollTop;
        body.scrollTop=0;
    }else{
        body.scrollTop=scrollTop;
    }
}

openTab('HomeTab');