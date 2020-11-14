//module imports here
import {errorMessage} from './common.js';

//get elements here
const errorElement = document.getElementById('error-message');
//initial element sate
errorElement.style.display = 'none';
const form =document.getElementById('form');

//API URLS here
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? '/admin/login' : 'https://meower-api.now.sh/v2/mews';
const adminIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin-profile.html' : 'https://meower-api.now.sh/v2/mews';

//execute event on form submit
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData = new FormData(form);//get user data
    const user_name = formData.get('user_name');//store username and password to variables
    const password = formData.get('password');

    if (password.trim()&&user_name.trim()) {//if username and password are not null

      const user = {//turn admin credentials to object
        password,
        user_name
      }; 

      fetch(API_URL, {
        method: 'POST',//send post request to server
        body: JSON.stringify(user),//make object in json format
        headers: {
          'content-type': 'application/json'
        }
      }).then((response)=>{
        response.text().then((result)=>{
          if(result=='true'){//if login is successful redirect to member home page
            window.location.replace(adminIndexUrl);
          }else{//else send error message 
            errorMessage(errorElement,"Wrong username or password");
          }
        });
      });
    } else {
      errorMessage(errorElement,'Fill the missing fields');
    }
});