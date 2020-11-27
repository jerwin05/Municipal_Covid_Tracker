//get elements here
const overlay=document.getElementById('overlay');
const successMessage=document.getElementById('successMessage');
const errorMessage=document.getElementById('errorMessage');
const profileElement=document.getElementById('profile');
const announcementSection=document.getElementById('announcementSection');
const announcementForm=document.getElementById('announcementForm');
const deleteAccountButton=document.getElementById('deleteAccount');
const overlayNoButton=document.getElementById('overlayNoButton');
const overlayYesButton=document.getElementById('overlayYesButton');
const logoutButton=document.getElementById('logout');

//API URLS here
const logoutAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/profile-logout' : 'https://barangay-covid-map.herokuapp.com/profile-logout';
const profileAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/profile' : 'https://barangay-covid-map.herokuapp.com/admin/profile';
const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://barangay-covid-map.herokuapp.com/announcement';
const IndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/index.html' : 'https://barangay-covid-map.herokuapp.com/index.html';
const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-admin' : 'https://barangay-covid-map.herokuapp.com/authenticate-admin';
const memberIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/member-profile.html' : 'https://barangay-covid-map.herokuapp.com/member-profile.html';

fetch(authenticateAPI_URL,{
}).then(response=>{
    response.text().then(result=>{
      if (result==='member'){
        window.location.replace(memberIndexUrl);
      }else if(result==='admin'){
        
      }
      else{
        window.location.replace(IndexUrl);   
      }
  })
})

//gets admin profile from server
function getProfile(){
  fetch(profileAPI_URL,{
  }).then(response => 
    response.json().then((result)=>{//get results from server
      
      //append user credentials
      const name=document.createElement('h2');
      const number=document.createElement('p');
      
      name.textContent=`Name: ${result.fname} ${result.mname} ${result.lname}`;
      name.className='profile--name';
      number.className='profile--details';
      number.textContent=`Mobile Number: ${result.mob_no}`;
      profileElement.appendChild(name);
      profileElement.appendChild(number);
    })
  );
}

//get announcements from db
const getAnnouncements=()=>{
  fetch(announcementAPI_URL,{
  }).then(response=>{
    response.json().then(result=>{
      result.reverse();
      result.forEach(announcement => {

        const div = document.createElement('div');
        const title = document.createElement('h3');
        const body = document.createElement('p');
        const date = document.createElement('small');
        const button =document.createElement('button');

        div.className='announcement--post';
        title.textContent = announcement.title;
        body.textContent = announcement.body;
        title.className = 'announcement--element';
        body.className = 'announcement--element';
        date.className = 'announcement--element';
        date.textContent = new Date(announcement.date);
        button.className = 'orange--button';
        button.textContent ='delete';

        const announcementid={
          id:announcement.id
        }

        button.addEventListener('click',()=>{
          fetch(announcementAPI_URL, {//send object to the server
            method: 'DELETE',
            body: JSON.stringify(announcementid),//make object in json format
            headers: {
              'content-type': 'application/json'
            }
        });

        setTimeout(()=>{  
          announcementSection.innerHTML = "";
          getAnnouncements();
        },100);
        });

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(date);
        div.appendChild(button);

        announcementSection.appendChild(div);
      });
    });
  });
}

getProfile();
getAnnouncements(); 

//execute event on click of post on announcement
announcementForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(announcementForm);//store form credentials
  const title = formData.get('Title');
  const body = formData.get('Body');

  if (title.trim() && body.trim()) {//execute if form fields are all filled
    
    const announcement = {//put announcement into object
      title,
      body
    };

    fetch(announcementAPI_URL, {//send object to the server
      method: 'POST',
      body: JSON.stringify(announcement),//make object in json format
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {
      response.text().then(result=>{//get text response from server
        if(result==='true'){//display success message
          announcementForm.reset();
          successMessage.textContent='Post Added';
          successMessage.style.bottom='30';
          errorMessage.style.display='none';
          setTimeout(()=>{
            successMessage.style.bottom='-45';
          },3000);
        }
      });
    });
    setTimeout(()=>{  
      announcementSection.innerHTML = "";
      getAnnouncements();
    },100);
  } else {
    errorMessage.textContent='Title and Body are required!';
    errorMessage.style.display='block';
    successMessage.style.display='-45';
  }
});

//execute event on logout click
logoutButton.addEventListener('click',()=>{
    fetch(logoutAPI_URL, {//send request
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      }).then((response)=>{
          window.location.href=IndexUrl;//go to index page
      });
});

//logout process
deleteAccountButton.addEventListener('click',()=>{
  overlay.style.display='flex';//popup overlay if admin wish to delete his/her account
});
overlayNoButton.addEventListener('click',()=>{
  overlay.style.display='none';//hide overlay if admin cancels
});
//execute event on if admin confirms to delete his/her account
overlayYesButton.addEventListener('click',()=>{
  fetch(profileAPI_URL,{//send delete request
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  }).then(()=>{
    window.location.href=IndexUrl;//redirect to index page
  });
});