//module imports
import {errorMessage,capitalize,registerSuccess} from './common.js';

//get elemets here
const errorElement = document.getElementById('error-message');
const successElement = document.getElementById('success-message');
//initial element state
successElement.style.display="none";
errorElement.style.display = 'none';
const form = document.getElementById('form');

//API URLS here
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/signup' : 'https://meower-api.now.sh/v2/mews';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);//store form credentials
  const first_name = capitalize(formData.get('first_name'));
  const middle_name = capitalize(formData.get('middle_name'));
  const last_name = capitalize(formData.get('last_name'));
  const mob_no = formData.get('mob_no');
  const user_name = formData.get('user_name');
  const password = formData.get('password');

  if (first_name.trim() && last_name.trim()//execute if form fields are all filled
    &&password.trim()&&user_name.trim()
    &&mob_no.trim()&&middle_name.trim()) {
  
    const user = {//put admin credentials into object
      first_name,
      middle_name,
      last_name,
      mob_no,
      password,
      user_name
    };

    fetch(API_URL, {//send object to the server
      method: 'POST',
      body: JSON.stringify(user),//make object in json format
      headers: {
        'content-type': 'application/json',
      }
    }).then(response => {
      response.text().then(result=>{//get text response from server
        if(result==='true'){//display success message
          registerSuccess(form,errorElement,successElement,'Regisrered Successfully');
        }
        else{
          errorMessage(errorElement,'Username already taken!');
        }
      });
    });
  } else {
    errorMessage(errorElement,'Fill the missing fields');
  }
});