//module imports
// import {getAnnouncements} from './common.js';

//get elements here
const covidUpdateDate=document.getElementById('covidUpdateDate');
const newCasesTitle=document.getElementById('newCasesTitle');
const activeCasesTitle=document.getElementById('activeCasesTitle');
const newCases=document.getElementById('newCases');
const activeCases=document.getElementById('activeCases');
const suspected=document.getElementById('suspected');
const probable=document.getElementById('probable');
const confirmedCases=document.getElementById('cofirmedCases');
const testedNegative=document.getElementById('testedNegative');
const recovered=document.getElementById('recovered');
const death=document.getElementById('death');
const notes=document.getElementById('notes');
const covidPatientList=document.getElementById('covidPatientList');
const history=document.getElementById('history');
const loadingElement=document.getElementById('loadingElement');
const sectionContainer=document.getElementById('sectionContainer');

//api urls here
const adminIndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin-profile.html' : 'https://teresa-covid-tracker.herokuapp.com/admin-profile.html';
const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-user' : 'https://teresa-covid-tracker.herokuapp.com/authenticate-user';
const covidUpdateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/covid-update' : 'https://teresa-covid-tracker.herokuapp.com/covid-update';
const patientListAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/patient-list' : 'https://teresa-covid-tracker.herokuapp.com/patient-list';
const patientListHistoryAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/patient-list-history' : 'https://teresa-covid-tracker.herokuapp.com/patient-list-history';
const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://teresa-covid-tracker.herokuapp.com/announcement';

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
  fetch(covidUpdateAPI_URL)
  .then(response=>{

    sectionContainer.style.display='block';    
    loadingElement.style.display='none'; 

    response.json()
    .then(result=>{
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

      const updateDate=result[0].date_updated;
      covidUpdateDate.textContent=`${updateDate}`;

      if(!result[0].notes||/\s+$/.test(result[0].notes)){
        const message=document.createElement('p');
        message.textContent='No notes';
        notes.appendChild(message);
      }else{
        const pre=document.createElement('pre');
        pre.textContent=result[0].notes;
        pre.className='main--body';
        notes.appendChild(pre);
      }

    })
  })
};

const getPositivePatients=()=>{
  fetch(patientListAPI_URL)
  .then(response=>{
    response.json()
    .then(result=>{
      if(!result.message){
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
      }else{
        const message=document.createElement('p');
        message.textContent='No patient';
        message.className='nopatient';
        covidPatientList.appendChild(message);
      }
    })
  })
};

const getPatientHistory=()=>{
  fetch(patientListHistoryAPI_URL)
  .then(response=>{
    response.json()
    .then(result=>{
      if(!result.message){
        for(var a=0,b=result.history_count; a<b ;a++){
          const div=document.createElement('div');
          const div1=document.createElement('div');
          const span=document.createElement('span');
          span.className='history--date';
          div1.className='history--people';
          span.textContent=result[`history${a+1}`].date;
          div.appendChild(span);
          div.appendChild(div1);
          for(var c=0,d=result[`history${a+1}`].recovered_count; c<d ;c++){
            const p1 =document.createElement('p');
            const p2 =document.createElement('p');
            const p3 =document.createElement('p');
            const p4 =document.createElement('p');
            p1.textContent=result[`history${a+1}`][`recovered${c+1}`].patient_no;
            p2.textContent=result[`history${a+1}`][`recovered${c+1}`].age;
            p3.textContent=result[`history${a+1}`][`recovered${c+1}`].gender;
            p4.textContent=result[`history${a+1}`][`recovered${c+1}`].barangay;
            div1.appendChild(p1);
            div1.appendChild(p2);
            div1.appendChild(p3);
            div1.appendChild(p4);
          }
          history.appendChild(div);
        }
      }else{
        const message=document.createElement('p');
        message.textContent='No history';
        history.appendChild(message); 
      }
    })
  })
};

const getAnnouncements=()=>{
  fetch(announcementAPI_URL)
  .then(response=>{ 

    response.json()
    .then(result=>{
      if(!result.message){
        result.reverse();
      result.forEach(announcement => {
        const body=document.createElement('pre');
        const div = document.createElement('div');
        const title = document.createElement('h3');
        const date = document.createElement('small');

        body.textContent = announcement.body;
        title.className = 'announcement--element main--heading';
        body.className = 'announcement--element main--body';
        date.className = 'announcement--element';
        title.textContent = announcement.title;
        date.textContent = announcement.date;

        div.appendChild(title);
        div.appendChild(body);
        div.appendChild(date);

        announcementSection.appendChild(div);
      });
      }else{
        const message=document.createElement('p');
        message.textContent='No announcement';
        announcementSection.appendChild(message); 
      }
    });
  });
}

getCovidUpdates();
getPositivePatients();
getPatientHistory();
getAnnouncements();