const body=document.querySelector('body');
const borderBottom=document.getElementById('border--bottom');
const main=document.getElementById('main');

var homeScrollTop=0;
var profileScrollTop=0;
var counter=0;

function openTab(pageName) {
    borderBottom.className = borderBottom.className.replace(" tab--slide", "");
    main.className = main.className.replace(" page--slide", "");

    //update tab button border
    if(pageName=='ProfileTab'){
        borderBottom.className += " tab--slide";
        main.className += " page--slide";
        homeScrollTop=body.scrollTop;
        if(!counter){
            body.scrollTop=0;
            counter++;
        }else{
            body.scrollTop=profileScrollTop;
        }
    }else{
        profileScrollTop=body.scrollTop;
        body.scrollTop=homeScrollTop;
    }
}

openTab('HomeTab');