//module imports
// import {getAnnouncements} from './common.js';

//api urls here
const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-user' : 'https://barangay-covid-map.herokuapp.com/authenticate-user';
const adminIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin-profile.html' : 'https://barangay-covid-map.herokuapp.com/admin-profile.html';
const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://barangay-covid-map.herokuapp.com/announcement';

fetch(authenticateAPI_URL,{
}).then(response=>{
  response.text().then(result=>{
    if (result==='true'){
      window.location.replace(adminIndexUrl);
    }
  })
})

const getAnnouncements=()=>{
  fetch(announcementAPI_URL,{})
  .then(response=>{
    response.json()
    .then(result=>{
      result.reverse();
      result.forEach(announcement => {
        const div = document.createElement('div');
        const title = document.createElement('h3');
        const body = document.createElement('p');
        const date = document.createElement('small');

        body.textContent = announcement.body;
        title.className = 'announcement--element';
        body.className = 'announcement--element';
        date.className = 'announcement--element';
        title.textContent = announcement.title;
        date.textContent = new Date(announcement.date);

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(date);

        announcementSection.appendChild(div);
      });
    });
  });
}

getAnnouncements();