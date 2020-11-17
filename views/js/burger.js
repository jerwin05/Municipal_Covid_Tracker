const burger=document.getElementById('burger');
const navOptions=document.getElementById('nav-options');

burger.addEventListener('click',()=>{
    const navLinks= document.querySelectorAll('.nav-options li');
    navOptions.classList.toggle('nav-options-active');
    burger.classList.toggle('toggle');

    navLinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation='';
        }
        else{
            link.style.animation=`navLinksFade 0.5s ease forwards ${index/15+0.1}s`
        }
    });
});
