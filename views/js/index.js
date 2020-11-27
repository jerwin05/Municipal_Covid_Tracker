//module imports
import {getAnnouncements} from './common.js';

const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-index' : 'https://barangay-covid-map.herokuapp.com/authenticate-index';
const memberIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/member-profile.html' : 'https://barangay-covid-map.herokuapp.com/member-profile.html';
const adminIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin-profile.html' : 'https://barangay-covid-map.herokuapp.com/admin-profile.html';

getAnnouncements();

fetch(authenticateAPI_URL,{
}).then(response=>{
  response.text().then(result=>{
    if (result==='admin'){
      window.location.replace(adminIndexUrl);
    }else if(result==='index'){
        
    }
    else{
      window.location.replace(memberIndexUrl);   
    }
  })
})