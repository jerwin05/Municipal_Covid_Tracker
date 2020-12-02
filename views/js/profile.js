
const borderBottom=document.getElementById('border--bottom');
const main=document.getElementById('main');
const block3=document.getElementById('block3');

function openTab(pageName) {
    borderBottom.className = borderBottom.className.replace(" tab--slide", "");
    main.className = main.className.replace(" page--slide", "");
    block3.style.display='';

    //update tab button border
    if(pageName=='ProfileTab'){
        borderBottom.className += " tab--slide";
        main.className += " page--slide";
        block3.style.display='none';
    }
}
openTab('HomeTab');