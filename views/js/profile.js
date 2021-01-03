const borderBottom=document.getElementById('border--bottom');
const main=document.getElementById('main');
const body=document.querySelector('body');

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
        // main.style.height='100vh';
        homeScrollTop=body.scrollTop;
        if(!counter){
            body.scrollTop=0;
            // window.scrollTo(0, 0);
            counter++;
        }else{
            // window.scrollTo(0, profileScrollTop);
            body.scrollTop=profileScrollTop;
        }
    }else{
        profileScrollTop=body.scrollTop;
        // window.scrollTo(0, hokmeScrollTop);
        // main.style.height='unset';
        body.scrollTop=homeScrollTop;
    }
}

openTab('HomeTab');