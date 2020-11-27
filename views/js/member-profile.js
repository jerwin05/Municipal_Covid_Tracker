//module imports
import {getAnnouncements} from './common.js';

//get elements here
const overlay=document.getElementById('overlay');
const addedlocationElement=document.getElementById('locationAdded');
const overlayNoButton=document.getElementById('overlayNoButton');
const overlayYesButton=document.getElementById('overlayYesButton');
const deleteAccountButton=document.getElementById('deleteAccount');
const locationButton=document.getElementById('addLocation');
const profileElement=document.getElementById('profile');
const logoutButton=document.getElementById('logout');

//API URLS here
const logoutAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/profile-logout' : 'https://barangay-covid-map.herokuapp.com/profile-logout';
const profileAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/member/profile' : 'https://barangay-covid-map.herokuapp.com/member/profile';
const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-member' : 'https://barangay-covid-map.herokuapp.com/authenticate-member';
const IndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/index.html' : 'https://barangay-covid-map.herokuapp.com/index.html';
const adminIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin-profile.html' : 'https://barangay-covid-map.herokuapp.com/admin-profile.html';

fetch(authenticateAPI_URL,{
}).then(response=>{
    response.text().then(result=>{
      if (result==='admin'){
        window.location.replace(adminIndexUrl);
      }else if(result==='member'){
        
      }
      else{
        window.location.replace(IndexUrl);   
      }
  })
})

function locationAdd(){//update the DOM if location is already added
  addedlocationElement.textContent='Location Added';
  addedlocationElement.style.display='block';
  locationButton.style.display='none';
}

function getProfile(){
  fetch(profileAPI_URL,{
  }).then(response => 
    response.json().then((result)=>{
      if(result.lat){//get only latitude to verify if location is added to the current user
        locationAdd();
      }
      //append user credentials
      const name=document.createElement('h2');
      const number=document.createElement('p');

      name.className='profile--name';
      number.className='profile--details';
      name.textContent=`Name: ${result.fname} ${result.mname} ${result.lname}`;
      number.textContent=`Mobile Number: ${result.mob_no}`;

      profileElement.appendChild(name);
      profileElement.appendChild(number);
    }));
}

getProfile();
getAnnouncements();

locationButton.addEventListener('click',()=>{// if user wants to add location
  navigator.geolocation.getCurrentPosition((position)=>{// get location
    const location={//put location on object
      lat:position.coords.latitude,
      long:position.coords.longitude
    }
    fetch(profileAPI_URL, {//send to server
      method: 'PUT',
      body: JSON.stringify(location),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response=>{
      locationAdd();//update the DOM indicating location is added
    });
  });
});

//execute event on logout
logoutButton.addEventListener('click',()=>{
    fetch(logoutAPI_URL, {//send request to server
        method: 'POST',//logout is a post request
        headers: {
          'content-type': 'application/json'
        }
      }).then((response)=>{
          window.location.href=IndexUrl;//redirect to index page
      });
});

//
deleteAccountButton.addEventListener('click',()=>{
  overlay.style.display='flex';//displays overlay if user wants to delete his account
});
overlayNoButton.addEventListener('click',()=>{
  overlay.style.display='none';//if user cancels delete account process, go back to home
});

//if user really wants to delete accout, send request to server
overlayYesButton.addEventListener('click',()=>{
  fetch(profileAPI_URL,{
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }).then(()=>{
    window.location.href=IndexUrl;//redirect to index page
  });
});
