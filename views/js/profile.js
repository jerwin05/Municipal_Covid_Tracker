const borderBottom=document.getElementById('border--bottom');
const main=document.getElementById('main');
const body=document.querySelector('body');

var homeScrollTop=0;
var profileScrollTop=0;
var counter=0;

const mediaQuery = window.matchMedia('(min-width: 735px)');
const handleTabletChange=(media,pageName)=> {
    if (media.matches) {
        if(pageName=='ProfileTab'){
            borderBottom.className += " tab--slide";
            main.className += " page--slide";
            homeScrollTop=body.scrollTop;
            window.scroll(0,0);
        }else{
            body.scrollTop=homeScrollTop;
        }
    }else{
        // update tab button border
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
}

const openTab=(pageName)=> {
    borderBottom.className = borderBottom.className.replace(" tab--slide", "");
    main.className = main.className.replace(" page--slide", "");
    handleTabletChange(mediaQuery,pageName);
}

openTab('HomeTab');