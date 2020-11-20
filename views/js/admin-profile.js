//get elements here
//element initial state
const overlay=document.getElementById('overlay');
const successMessage=document.getElementById('successMessage');
const errorMessage=document.getElementById('errorMessage');
const profileElement=document.getElementById('profile');
const body=document.querySelector('body');
const announcementSection=document.getElementById('announcementSection');
const announcementForm=document.getElementById('announcementForm');
const residentsFormSection=document.getElementById('residentsFormContainer');
const deleteAccountButton=document.getElementById('deleteAccount');
const overlayNoButton=document.getElementById('overlayNoButton');
const overlayYesButton=document.getElementById('overlayYesButton');
const logoutButton=document.getElementById('logout');

//API URLS here
const logoutAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/profile-logout' : 'https://meower-api.now.sh/v2/mews';
const profileAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/profile' : 'https://meower-api.now.sh/v2/mews';
const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://meower-api.now.sh/v2/mews';
const residentsAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/residentList' : 'https://meower-api.now.sh/v2/mews';
const IndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/index.html' : 'https://meower-api.now.sh/v2/mews';
const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-admin' : 'https://meower-api.now.sh/v2/mews';
const memberIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/member-profile.html' : 'https://meower-api.now.sh/v2/mews';

fetch(authenticateAPI_URL,{
}).then(response=>{
    response.text().then(result=>{
      console.log(result);
      if (result==='member'){
        window.location.replace(memberIndexUrl);
      }else{
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
      name.textContent=`Name: ${result.fname} ${result.mname} ${result.lname}`;
      const number=document.createElement('p');

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

//get residents and populate the residents form
function getResidents(){
  fetch(residentsAPI_URL,{}).then(response=>{
    response.json().then(result=>{
      result.forEach(resident => {

        const label = document.createElement('label');
        const residentDiv = document.createElement('div');
        const residentName = document.createElement('p');
        const residentDetail = document.createElement('p');
        const input = document.createElement('input');
        const button = document.createElement('button');
        const overlaydiv = document.createElement('div');
        const overlaydiv1 = document.createElement('div');
        const p = document.createElement('p');
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');

        label.setAttribute("for", `remarks${resident.id}`);
        input.setAttribute("name", `remarks${resident.id}`);
        input.setAttribute("value", "positive");
        input.setAttribute("type", "checkbox");
        input.className='residentRemarksInput';
        button.className = 'profile--button blue--button';
        button.setAttribute("type", "button");
        button.textContent='Delete';
        residentName.textContent=`${resident.last_name}, ${resident.first_name} ${resident.middle_name}`;
        residentName.className='resident--name';
        residentDetail.textContent=`${resident.mob_no}`;
        residentDetail.className='resident--mobNo';
        overlaydiv.className='overlay';
        overlaydiv1.className='popUp--container';
        p.textContent='Are you sure you want to delete this resident?';
        p.setAttribute("class", `message`);
        button1.setAttribute("class", `yes deleteResident${resident.id}`);
        button2.setAttribute("class", `no`);
        button1.setAttribute("type", `button`);
        button2.setAttribute("type", `button`);
        button1.textContent='Yes';
        button2.textContent='No';

        if(resident.remarks=='positive'){
          input.checked=true;
        }else{
          input.checked=false;
        }

        const residentid={
          id:resident.id
        }

        button.addEventListener('click',()=>{
          overlaydiv.style.display='flex';
        });
        button2.addEventListener('click',()=>{
          overlaydiv.style.display='none';
        });

        button1.addEventListener('click',()=>{
          overlaydiv.style.display='none';
          fetch(residentsAPI_URL, {//send object to the server
            method: 'DELETE',
            body: JSON.stringify(residentid),//make object in json format
            headers: {
              'content-type': 'application/json'
            }
          });
          
          setTimeout(()=>{  
            residentsFormSection.innerHTML = "";
            getResidents();
          },100);
        });

        overlaydiv1.appendChild(p);
        overlaydiv1.appendChild(button1);
        overlaydiv1.appendChild(button2);
        overlaydiv.appendChild(overlaydiv1);
        body.appendChild(overlaydiv);

        

        residentDiv.appendChild(residentName);
        residentDiv.appendChild(residentDetail);
        label.appendChild(residentDiv);
        label.appendChild(input);
        label.appendChild(button);
      
        residentsFormSection.appendChild(label);
      });
    });
  });
}

getProfile();
getResidents();
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