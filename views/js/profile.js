// function preventBack(){window.history.forward();}
// setTimeout("preventBack()", 0);
// window.onunload=function(){null};

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

    // Declare all variables
    // var i, tabcontent, tablinks;

    // Get all elements with class="tab--contents" and hide them
    // tabcontent = document.getElementsByClassName("tab--contents");
    // for (i = 0; i < tabcontent.length; i++) {
    //     tabcontent[i].style.display = "none";
    // }

    // Get all elements with class="tablinks" and remove the class "active"
    // tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //     tablinks[i].className = tablinks[i].className.replace(" active", "");
    // }

    // Show the current tab, and add an "active" class to the button that opened the tab
    // document.getElementById(pageName).style.display = "block";
    // evt.currentTarget.className += " active";
}
openTab('ProfileTab');