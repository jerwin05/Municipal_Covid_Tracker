//module imports
import {getAnnouncements} from './common.js';

const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-index' : 'https://meower-api.now.sh/v2/mews';
const memberIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/member-profile.html' : 'https://meower-api.now.sh/v2/mews';
const adminIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin-profile.html' : 'https://meower-api.now.sh/v2/mews';

getAnnouncements();

fetch(authenticateAPI_URL,{
}).then(response=>{
    response.text().then(result=>{
      console.log(result);
      if (result==='true'){
        window.location.replace(adminIndexUrl);
      }else{
        window.location.replace(memberIndexUrl);   
      }
  })
})