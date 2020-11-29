//module imports
// import {getAnnouncements} from './common.js';

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
const notes=document.getElementById('notes');
const covidPatientList=document.getElementById('covidPatientList');

//api urls here
const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-user' : 'https://barangay-covid-map.herokuapp.com/authenticate-user';
const adminIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin-profile.html' : 'https://barangay-covid-map.herokuapp.com/admin-profile.html';
const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://barangay-covid-map.herokuapp.com/announcement';
const covidupdateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/covid-update' : 'https://barangay-covid-map.herokuapp.com/covid-update';
const covidpositivelistAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/covid-positive-list' : 'https://barangay-covid-map.herokuapp.com/covid-positive-list';

//authenticate user
fetch(authenticateAPI_URL,{
}).then(response=>{
  response.text().then(result=>{
    if (result==='true'){
      window.location.replace(adminIndexUrl);
    }
  })
})

const getCovidUpdates=()=>{
  fetch(covidupdateAPI_URL)
  .then(response=>{
    response.json()
    .then(result=>{
      const pre=document.createElement('pre');

      activeCases.textContent=result[0].active_cases;
      newCases.textContent=result[0].new_cases;
      suspected.textContent=result[0].suspected;
      probable.textContent=result[0].probable;
      confirmedCases.textContent=result[0].confirmed_cases;
      testedNegative.textContent=result[0].tested_negative;
      recovered.textContent=result[0].recovered;
      death.textContent=result[0].death;

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
      const updateDate=result[0].date_updated.substring(4, 16);
      covidUpdateDate.textContent=`As of ${updateDate}`;

      pre.textContent=result[0].notes;
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
        gender.textContent=element.gender;
        barangay.textContent=element.barangay;
        status.textContent=element.status;

        div2.className='covidpatientlist--patientdetails';
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

const getAnnouncements=()=>{
  fetch(announcementAPI_URL)
  .then(response=>{
    response.json()
    .then(result=>{
      result.reverse();
      result.forEach(announcement => {
        const body=document.createElement('pre');
        const div = document.createElement('div');
        const title = document.createElement('h3');
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

getCovidUpdates();
getPositivePatients();
getAnnouncements();