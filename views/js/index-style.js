const burger=document.getElementById('burger');
const navSide=document.getElementById('navSide');
const navOptions=document.getElementById('nav-options');

burger.addEventListener('click',()=>{
    const navLinks= document.querySelectorAll('.nav-options li');
    navOptions.classList.toggle('navoptions-active');
    burger.classList.toggle('toggle');
    navSide.classList.toggle('nav--side-active');

    navLinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation='';
        }
        else{
            link.style.animation=`navLinksFade 0.5s ease forwards ${index/15+0.1}s`
        }
    });
});

navSide.addEventListener('click',()=>{
    const navLinks= document.querySelectorAll('.nav-options li');
    navOptions.classList.toggle('navoptions-active');
    burger.classList.toggle('toggle');
    navSide.classList.toggle('nav--side-active');

    navLinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation='';
        }
        else{
            link.style.animation=`navLinksFade 0.5s ease forwards ${index/15+0.1}s`
        }
    });
})