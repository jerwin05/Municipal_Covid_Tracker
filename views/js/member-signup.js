//module imports
import {errorMessage,capitalize,registerSuccess} from './common.js';

//get elements here
const errorElement = document.getElementById('error-message');
const successElement = document.getElementById('success-message');
//initial element state
successElement.style.display="none";
errorElement.style.display = 'none';
const form = document.getElementById('form');

//API URLS here
const API_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/member/signup' : 'https://meower-api.now.sh/v2/mews';

// submit form to server
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);//store data in variables
  const first_name =capitalize(formData.get('first_name'));
  const middle_name =capitalize(formData.get('middle_name'));
  const last_name =capitalize(formData.get('last_name'));
  const mob_no = formData.get('mob_no');
  const user_name = formData.get('user_name');
  const password = formData.get('password');

  if (first_name.trim() && last_name.trim()//if form values aren't empty, submit to server
    &&password.trim()&&user_name.trim()
    &&mob_no.trim()&&middle_name.trim()) {
    
    const user = {//make data in object form
      first_name,
      middle_name,
      last_name,
      mob_no,
      password,
      user_name
    };
    
    fetch(API_URL, {//send data to server
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      response.text().then(result=>{//access the text response
        if(result==='true'){// update DOM if user is resgistered successfully
          registerSuccess(form,errorElement,successElement, 'Regisrered Successfully');
        }
        else{//else send error message
          errorMessage(errorElement,'Username already taken!');
        }
      });
    })

  } else {
    //send error if user missed a field
    errorMessage(errorElement,'Fill the missing fields');
  }
});