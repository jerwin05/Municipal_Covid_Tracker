//get elements here
const newCases=document.getElementById('newCases');
const activeCases=document.getElementById('activeCases');
const newCasesTitle=document.getElementById('newCasesTitle');
const activeCasesTitle=document.getElementById('activeCasesTitle');
const suspected=document.getElementById('suspected');
const probable=document.getElementById('probable');
const confirmedCases=document.getElementById('cofirmedCases');
const testedNegative=document.getElementById('testedNegative');
const recovered=document.getElementById('recovered');
const death=document.getElementById('death');
const covidUpdateDate=document.getElementById('covidUpdateDate');
const editNewCases=document.getElementById('editNewCases');
const editSuspected=document.getElementById('editSuspected');
const editProbable=document.getElementById('editProbable');
const editConfirmedCases=document.getElementById('editConfirmedCases');
const editTestedNegative=document.getElementById('editTestedNegative');
const editRecovered=document.getElementById('editRecovered');
const editDeath=document.getElementById('editDeath');
const editDate=document.getElementById('editDate');
const notes=document.getElementById('notes');
const covidPatientList=document.getElementById('covidPatientList');
const editCovidUpdateForm=document.getElementById('editCovidUpdateForm');
const loadingElement=document.getElementById('loadingElement');
const main=document.getElementById('main');

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
const logoutAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/logout' : 'https://barangay-covid-map.herokuapp.com/admin/logout';
const profileAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/profile' : 'https://barangay-covid-map.herokuapp.com/admin/profile';
const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://barangay-covid-map.herokuapp.com/announcement';
const IndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/index.html' : 'https://barangay-covid-map.herokuapp.com/index.html';
const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-user' : 'https://barangay-covid-map.herokuapp.com/authenticate-user';
const covidupdateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/covid-update' : 'https://barangay-covid-map.herokuapp.com/covid-update';
const covidpositivelistAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/covid-positive-list' : 'https://barangay-covid-map.herokuapp.com/covid-positive-list';

fetch(authenticateAPI_URL,{
}).then(response=>{
    response.text().then(result=>{
      if (result!=='true'){
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

const getCovidUpdates=()=>{
  fetch(covidupdateAPI_URL)
  .then(response=>{
    response.json()
    .then(result=>{
      const pre=document.createElement('pre');
      const activeCasesResult= result[0].active_cases;
      const newCasesResult= result[0].new_cases;
      const suspectedResult= result[0].suspected;
      const probableResult= result[0].probable;
      const confirmedCasesResult= result[0].confirmed_cases;
      const testedNegativeResult= result[0].tested_negative;
      const recoveredResult= result[0].recovered;
      const deathResult= result[0].death;
      const dateResult=result[0].date_updated;

      activeCases.textContent=activeCasesResult;
      newCases.textContent=newCasesResult;
      suspected.textContent=suspectedResult;
      probable.textContent=probableResult;
      confirmedCases.textContent=confirmedCasesResult;
      testedNegative.textContent=testedNegativeResult;
      recovered.textContent=recoveredResult;
      death.textContent=deathResult;
      editNewCases.value=newCasesResult;
      editSuspected.value=suspectedResult;
      editProbable.value=probableResult;
      editConfirmedCases.value=confirmedCasesResult;
      editTestedNegative.value=testedNegativeResult;
      editRecovered.value=recoveredResult;
      editDeath.value=deathResult;
      editDate.value=dateResult;

      if(result[0].new_cases>1){
        newCasesTitle.textContent='New Cases';
      }else{
        newCasesTitle.textContent='New Case';
      }
      if(result[0].active_cases>1){
        activeCasesTitle.textContent='Active Cases';
      }else{
        activeCasesTitle.textContent='Active Case';
      }

      covidUpdateDate.className='covidupdate--date';
      covidUpdateDate.textContent=`${dateResult}`;

      pre.textContent=result[0].notes;
      notes.innerHTML='';
      notes.appendChild(pre);
      
    })
  })
};

const getPositivePatients=()=>{
  fetch(covidpositivelistAPI_URL)
  .then(response=>{
    response.json()
    .then(result=>{
      result.forEach((element,index,array)=>{
        const mainDiv=document.createElement('div');
        const div1=document.createElement('div');
        const div2=document.createElement('div');
        const patientNumber=document.createElement('p');
        const age=document.createElement('p');
        const gender=document.createElement('p');
        const barangay=document.createElement('p');
        const status=document.createElement('p');

        patientNumber.textContent=element.patient_no;
        age.textContent=element.age;
        gender.textContent=element.gender.toLowerCase();
        barangay.textContent=element.barangay.toLowerCase();
        status.textContent=element.status.toLowerCase();

        mainDiv.className='covidpatientlist--table-grid';
        div1.className='covidpatientlist--table-grid covidpatientlist--table-templatecolumns';
        div2.className='covidpatientlist--patientdetails covidpatientlist--table-grid';
        div2.appendChild(age);
        div2.appendChild(gender);
        div1.appendChild(patientNumber);
        div1.appendChild(div2);
        mainDiv.appendChild(div1);
        mainDiv.appendChild(barangay);
        mainDiv.appendChild(status);
        covidPatientList.appendChild(mainDiv);
      });
    })
  })
};

//get announcements from db
const getAnnouncements=()=>{
  loadingElement.style.display=''; 
  fetch(announcementAPI_URL,{
  }).then(response=>{

    main.style.display='flex';    
    loadingElement.style.display='none'; 

    response.json().then(result=>{
      result.reverse();
      result.forEach(announcement => {

        const div = document.createElement('div');
        const title = document.createElement('h3');
        const body = document.createElement('pre');
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
getCovidUpdates();
getPositivePatients();
getAnnouncements(); 

editCovidUpdateForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  loadingElement.style.display=''; 
  const formData = new FormData(editCovidUpdateForm);
  const formDate = formData.get('date');
  const formNewCases = formData.get('newCases');
  const formSuspected = formData.get('suspected');
  const formProbable = formData.get('probable');
  const formConfirmedCases = formData.get('confirmedCases');
  const formTestedNegative = formData.get('testedNegative');
  const formRecovered = formData.get('recovered');
  const formDeath = formData.get('death');
  const formNotes = formData.get('notes');
  editCovidUpdateForm.reset();
  let obj={};  

  if(formNotes){
    obj={
      date_updated:formDate,
      new_cases:formNewCases,
      suspected:formSuspected,
      probable:formProbable,
      confirmed_cases:formConfirmedCases,
      tested_negative:formTestedNegative,
      recovered:formRecovered,
      death:formDeath,
      notes:formNotes
    }
    fetch(covidupdateAPI_URL,{
      method:'PUT',
      body: JSON.stringify(obj),//make object in json format
      headers: {
        'content-type': 'application/json'
      }
    }).then(()=>{
      getCovidUpdates();
      loadingElement.style.display='none'; 
      successMessage.textContent='Updated';
      successMessage.style.bottom='30';
      setTimeout(()=>{
        successMessage.style.bottom='-45';
      },3000);
    });
  }else{
    obj={
      date_updated:formDate,
      new_cases:formNewCases,
      suspected:formSuspected,
      probable:formProbable,
      confirmed_cases:formConfirmedCases,
      tested_negative:formTestedNegative,
      recovered:formRecovered,
      death:formDeath
    }
    fetch(covidupdateAPI_URL,{
      method:'PUT',
      body: JSON.stringify(obj),//make object in json format
      headers: {
        'content-type': 'application/json'
      }
    }).then(()=>{
      getCovidUpdates();
      loadingElement.style.display='none'; 
      successMessage.textContent='Updated';
      successMessage.style.bottom='30';
      setTimeout(()=>{
        successMessage.style.bottom='-45';
      },3000);
    });
  }
})

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
        // headers: {
        //   'content-type': 'application/json'
        // }
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