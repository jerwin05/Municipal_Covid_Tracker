
const borderBottom=document.getElementById('border--bottom');
const main=document.getElementById('main');

function openTab(pageName) {
    borderBottom.className = borderBottom.className.replace(" tab--slide", "");
    main.className = main.className.replace(" page--slide", "");

    //update tab button border
    if(pageName=='ProfileTab'){
        borderBottom.className += " tab--slide";
        main.className += " page--slide";
    }
}
openTab('HomeTab');