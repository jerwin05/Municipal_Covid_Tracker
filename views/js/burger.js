const burger=document.getElementById('burger');
const navOptions=document.getElementById('nav-options');
const mainContainer=document.getElementById('main-container');

burger.addEventListener('click',()=>{
    navOptions.classList.toggle('nav-options-active');
});
