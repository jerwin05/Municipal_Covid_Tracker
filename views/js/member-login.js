//module imports here
import {errorMessage} from './common.js';

//grab elements here
const errorElement = document.getElementById('error-message');
const form =document.getElementById('form');

//API URLS here
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/member/login' : 'https://barangay-covid-map.herokuapp.com/member/login';
const memberIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/member-profile.html' : 'https://barangay-covid-map.herokuapp.com/member-profile.html';

//if the user sends the form, execute event listener
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const formData = new FormData(form);//get user username and password
    const user_name = formData.get('user_name');
    const password = formData.get('password');

    if (password.trim()&&user_name.trim()) {//execute if password and username are not null
 
      const user = {//put user credentials to object
        password,
        user_name
      }; 

      fetch(API_URL, {//send object as json
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'content-type': 'application/json'
        }
      }).then((response)=>{
        response.text().then((result)=>{
          if(result=='true'){//if login is successful redirect to member home page
            window.location.replace(memberIndexUrl);
          }else{//else send error message 
            errorMessage(errorElement,"Wrong username or password");
          }
        });
          
      });
    } else {
      //send error if user missed filling a form field
      errorMessage(errorElement,'Fill the missing fields');
    }
});