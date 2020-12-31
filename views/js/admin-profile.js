//module imports here
import {errorMessage} from './common.js';

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
const editCovidUpdateFormErrorMessage=document.getElementById('editCovidUpdateFormErrorMessage');
const covidPatientListForm=document.getElementById('covidPatientListForm');
const addNewCaseFormContainer=document.getElementById('addNewCaseFormContainer');
const addNewCaseForm=document.getElementById('addNewCaseForm');
const addNewCaseButton=document.getElementById('addNewCaseButton');
const addNewCaseCancelButton=document.getElementById('addNewCaseCancelButton');
const addNewCaseFormErrorMessage=document.getElementById('addNewCaseFormErrorMessage');
const resetNewCaseButton=document.getElementById('resetNewCaseButton');
const history=document.getElementById('history');
const loadingElement=document.getElementById('loadingElement');
const announcementLoadingElement=document.getElementById('announcementLoadingElement');
const main=document.getElementById('main');

const body=document.querySelector('body');
const overlay=document.getElementById('overlay');
const successMessage=document.getElementById('successMessage');
const postAnnouncementErrorMessage=document.getElementById('postAnnouncementErrorMessage');
const profileElement=document.getElementById('profile');
const announcementSection=document.getElementById('announcementSection');
const announcementForm=document.getElementById('announcementForm');
const deleteAccountButton=document.getElementById('deleteAccount');
const overlayNoButton=document.getElementById('overlayNoButton');
const overlayYesButton=document.getElementById('overlayYesButton');
const logoutButton=document.getElementById('logout');

//API URLS here
const IndexUrl = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/index.html' : 'https://teresa-covid-tracker-test.herokuapp.com/index.html';
const authenticateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/authenticate-user' : 'https://teresa-covid-tracker-test.herokuapp.com/authenticate-user';
const profileAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/profile' : 'https://teresa-covid-tracker-test.herokuapp.com/admin/profile';
const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://teresa-covid-tracker-test.herokuapp.com/announcement';
const adminAnnouncementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/announcement' : 'https://teresa-covid-tracker-test.herokuapp.com/admin/announcement';
const covidUpdateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/covid-update' : 'https://teresa-covid-tracker-test.herokuapp.com/covid-update';
const activeCasesCovidUpdateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/covid-update/active-cases' : 'https://teresa-covid-tracker-test.herokuapp.com/admin/covid-update/active-cases';
const newCasesCovidUpdateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/covid-update/new-cases' : 'https://teresa-covid-tracker-test.herokuapp.com/admin/covid-update/new-cases';
const adminCovidUpdateAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/covid-update' : 'https://teresa-covid-tracker-test.herokuapp.com/admin/covid-update';
const patientListAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/patient-list' : 'https://teresa-covid-tracker-test.herokuapp.com/patient-list';
const adminPatientListAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/patient-list' : 'https://teresa-covid-tracker-test.herokuapp.com/admin/patient-list';
const patientListHistoryAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/patient-list-history' : 'https://teresa-covid-tracker-test.herokuapp.com/patient-list-history';
const adminPatientListHistoryAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/admin/patient-list-history' : 'https://teresa-covid-tracker-test.herokuapp.com/admin/patient-list-history';

fetch(authenticateAPI_URL,{
}).then(response=>{
    response.text().then(result=>{
      if (result!=='true'){
        window.location.replace(IndexUrl);
      }
  })
})

const loadSpinner=(element)=>{
  loadingElement.style.display='';
  element.innerHTML='';
}

const spinner=(state)=>{
    loadingElement.style.display=state;
}

const activeCasesTitleModifier =(number)=>{
  if(number>1){
    activeCasesTitle.textContent='Active Cases';
  }else{
    activeCasesTitle.textContent='Active Case';
  }
}

const newCasesTitleModifier =(number)=>{
  if(number>1){
    newCasesTitle.textContent='New Cases';
  }else{
    newCasesTitle.textContent='New Case';
  }
}

//gets admin profile from server
const getProfile =()=>{
  fetch(profileAPI_URL,{
  }).then(response => 
    response.json().then((result)=>{//get results from server
      
      //append user credentials
      const name=document.createElement('h2');
      const div=document.createElement('div');
      const number=document.createElement('p');
      const adminID=document.createElement('p');
      
      name.textContent=`Name: ${result.fname} ${result.mname} ${result.lname}`;
      name.className='profile--name';
      number.className='profile--details';
      number.textContent=`Mobile Number: ${result.mob_no}`;
      adminID.textContent=`Admin ID: ${result.admin_id}`;

      div.appendChild(number);
      div.appendChild(adminID);
      profileElement.appendChild(name);
      profileElement.appendChild(div);
    })
  );
}

const getCovidUpdates=()=>{
  fetch(covidUpdateAPI_URL)
  .then(response=>{

    main.style.display='flex'; 
    spinner('none');

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
      editSuspected.value=suspectedResult;
      editProbable.value=probableResult;
      editConfirmedCases.value=confirmedCasesResult;
      editTestedNegative.value=testedNegativeResult;
      editRecovered.value=recoveredResult;
      editDeath.value=deathResult;
      editDate.value=dateResult;

      newCasesTitleModifier(result[0].new_cases);
      activeCasesTitleModifier(result[0].active_cases);
      
      covidUpdateDate.textContent=`${dateResult}`;

      if(!result[0].notes||/\s+$/.test(result[0].notes)){
        const message=document.createElement('p');
        message.textContent='No notes';
        notes.innerHTML='';
        notes.appendChild(message);
      }else{
        pre.textContent=result[0].notes;
        notes.innerHTML='';
        notes.appendChild(pre);
      }
    })
  })
};

const updateActiveCases=()=>{
  fetch(activeCasesCovidUpdateAPI_URL, {
    method: 'PUT'
  })
  .then(response=>{
    response.text()
    .then(result=>{
      activeCasesTitleModifier(result);
      activeCases.textContent=result;
    });
  });
};

const getPatientList=(callback)=>{
  fetch(patientListAPI_URL)
  .then(response=>{

    spinner('none');

    response.json()
    .then(result=>{
      if(!result.message){

        const active = result.filter(patient => patient.status==='admitted'||patient.status==='strict isolation');
        activeCasesTitleModifier(active.length);
        activeCases.textContent=active.length;

        result.reverse();
        result.forEach((patient)=>{
          const mainDiv=document.createElement('div');
          const div1=document.createElement('div');
          const div2=document.createElement('div');
          const patientNumber=document.createElement('p');
          const age=document.createElement('p');
          const gender=document.createElement('p');
          const barangay=document.createElement('p');
          const status=document.createElement('input');
          const button = document.createElement('button');
          const overlaydiv = document.createElement('div');
          const overlaydiv1 = document.createElement('div');
          const p = document.createElement('p');
          const button1 = document.createElement('button');
          const button2 = document.createElement('button');
  
          patientNumber.textContent=patient.patient_no;
          age.textContent=patient.age;
          gender.textContent=patient.gender;
          barangay.textContent=patient.barangay;
          status.value=patient.status;
          status.className=`status`;
          status.setAttribute("name", `status${patient.id}`);
          button.textContent='Delete';
          button.className=' profile--button patient--deletebutton';
          button.setAttribute("type", `button`);
          mainDiv.className='covidpatientlist--table-grid patientDiv';
          div1.className='covidpatientlist--table-grid covidpatientlist--table-templatecolumns';
          div2.className='covidpatientlist--patientdetails covidpatientlist--table-grid';
          overlaydiv.className='overlay';
          overlaydiv1.className='popUp--container';
          p.textContent='Are you sure you want to delete this patient?';
          p.setAttribute("class", `message`);
          button1.setAttribute("class", `yes deletePatient${patient.id}`);
          button2.setAttribute("class", `no`);
          button1.setAttribute("type", `button`);
          button2.setAttribute("type", `button`);
          button1.textContent='Yes';
          button2.textContent='No';
  
          const patientid={
            id:patient.id
          }
  
          button.addEventListener('click',()=>{
            overlaydiv.style.display='flex';
          });
          button2.addEventListener('click',()=>{
            overlaydiv.style.display='none';
          });
  
          button1.addEventListener('click',(event)=>{
            event.preventDefault();
            loadSpinner(covidPatientList);
            overlaydiv.style.display='none';
            fetch(adminPatientListAPI_URL, {//send object to the server
              method: 'DELETE',
              body: JSON.stringify(patientid),//make object in json format
              headers: {
                'content-type': 'application/json'
              }
            }).then((response)=>{
              response.text()
              .then(result=>{
                if(result==='recovered'){
                  history.innerHTML='';
                  updateActiveCases();
                  getPatientList();
                  getPatientHistory();
                }else{
                  updateActiveCases();
                  getPatientList();
                }
              })
            });
          });
  
          overlaydiv1.appendChild(p);
          overlaydiv1.appendChild(button1);
          overlaydiv1.appendChild(button2);
          overlaydiv.appendChild(overlaydiv1);
          body.appendChild(overlaydiv); 
  
          div2.appendChild(age);
          div2.appendChild(gender);
          div1.appendChild(patientNumber);
          div1.appendChild(div2);
          mainDiv.appendChild(div1);
          mainDiv.appendChild(barangay);
          mainDiv.appendChild(status);
          mainDiv.appendChild(button);
          covidPatientList.appendChild(mainDiv);
        });
      }else{
        activeCasesTitle.textContent='Active Case';
        activeCases.textContent='0';
        const message=document.createElement('p');
        message.textContent='No patient';
        message.className='nopatient';
        covidPatientList.appendChild(message);
      }
    })
  })
};

const getPatientHistory=(callback)=>{
  fetch(patientListHistoryAPI_URL)
  .then(response=>{

    spinner('none');

    response.json()
    .then(result=>{
      if(!result.message){
        for(var a=0,b=result.history_count; a<b ;a++){
          const div=document.createElement('div');
          const div1=document.createElement('div');
          const span=document.createElement('span');
          const button=document.createElement('button');
          const overlaydiv = document.createElement('div');
          const overlaydiv1 = document.createElement('div');
          const p1 = document.createElement('p');
          const button1 = document.createElement('button');
          const button2 = document.createElement('button');
  
          span.textContent=result[`history${a+1}`].date;
          span.className='history--date';
          div1.className='history--people';
          button.textContent='Delete';
          button.className='profile--button blue--button';
          overlaydiv.className='overlay';
          overlaydiv1.className='popUp--container';
          p1.textContent='Are you sure you want to delete this history?';
          p1.setAttribute("class", `message`);
          button1.setAttribute("class", `yes deleteHistory${a+1}`);
          button2.setAttribute("class", `no`);
          button1.setAttribute("type", `button`);
          button2.setAttribute("type", `button`);
          button1.textContent='Yes';
          button2.textContent='No';
  
          const history_id={
            date_id:result[`history${a+1}`].date_id
          }
  
          button.addEventListener('click',()=>{
            overlaydiv.style.display='flex';
          });
          button2.addEventListener('click',()=>{
            overlaydiv.style.display='none';
          });
  
          button1.addEventListener('click',(event)=>{
            event.preventDefault();
            loadSpinner(history);
            overlaydiv.style.display='none';
            fetch(adminPatientListHistoryAPI_URL, {//send object to the server
              method: 'DELETE',
              body: JSON.stringify(history_id),//make object in json format
              headers: {
                'content-type': 'application/json'
              }
            }).then(()=>{
              getPatientHistory();
            });
          });
  
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
  
          overlaydiv1.appendChild(p1);
          overlaydiv1.appendChild(button1);
          overlaydiv1.appendChild(button2);

          overlaydiv.appendChild(overlaydiv1);
          body.appendChild(overlaydiv); 
  
          div.appendChild(button);
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

//get announcements from db
const getAnnouncements=(callback)=>{
  fetch(announcementAPI_URL,{
  }).then(response=>{
    response.json().then(result=>{
      if(!result.message){
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
          date.textContent =announcement.date;
          button.className = 'profile--button orange--button';
          button.textContent ='Delete';
  
          const announcementid={
            id:announcement.id
          }
  
          button.addEventListener('click',()=>{
            announcementSection.innerHTML='';
            announcementLoadingElement.style.display='block';
            fetch(adminAnnouncementAPI_URL, { //send object to the server
              method: 'DELETE',
              body: JSON.stringify(announcementid),//make object in json format
              headers: {
                'content-type': 'application/json'
              }
            }).then(response=>{
              announcementLoadingElement.style.display='none';
              getAnnouncements();
            });
          });
  
          div.appendChild(title);
          div.appendChild(body);
          div.appendChild(date);
          div.appendChild(button);
  
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

getPatientList();
getPatientHistory();
getAnnouncements(); 
getProfile();
getCovidUpdates();

editCovidUpdateForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const formData = new FormData(editCovidUpdateForm);
  const formDate = formData.get('date');
  const formSuspected = formData.get('suspected');
  const formProbable = formData.get('probable');
  const formConfirmedCases = formData.get('confirmedCases');
  const formTestedNegative = formData.get('testedNegative');
  const formRecovered = formData.get('recovered');
  const formDeath = formData.get('death');
  const formNotes = formData.get('notes');
  
  let obj={};  

  const newDate=new Date(formDate);
  const oldDate=new Date(covidUpdateDate.textContent);

  if(newDate<oldDate){
    editCovidUpdateFormErrorMessage.style.display='block';
    setTimeout(()=>{
      editCovidUpdateFormErrorMessage.style.display='none';
    },3000);
  }else{
    editCovidUpdateFormErrorMessage.style.display='none';
    editCovidUpdateForm.reset();
    spinner('');
    if(formNotes){
      obj={
        date_updated:formDate,
        suspected:formSuspected,
        probable:formProbable,
        confirmed_cases:formConfirmedCases,
        tested_negative:formTestedNegative,
        recovered:formRecovered,
        death:formDeath,
        notes:formNotes
      }
      fetch(adminCovidUpdateAPI_URL,{
        method:'PUT',
        body: JSON.stringify(obj),//make object in json format
        headers: {
          'content-type': 'application/json'
        }
      }).then(()=>{
        getCovidUpdates();
        successMessage.textContent='Updated';
        successMessage.style.bottom='50';
        setTimeout(()=>{
          successMessage.style.bottom='-45';
        },3000);
      });
    }else{
      obj={
        date_updated:formDate,
        suspected:formSuspected,
        probable:formProbable,
        confirmed_cases:formConfirmedCases,
        tested_negative:formTestedNegative,
        recovered:formRecovered,
        death:formDeath
      }
      fetch(adminCovidUpdateAPI_URL,{
        method:'PUT',
        body: JSON.stringify(obj),//make object in json format
        headers: {
          'content-type': 'application/json'
        }
      }).then(()=>{
        getCovidUpdates();
        successMessage.textContent='Updated';
        successMessage.style.bottom='50';
        setTimeout(()=>{
          successMessage.style.bottom='-45';
        },3000);
      });
    }
  }
})

addNewCaseButton.addEventListener('click',(event)=>{
  addNewCaseFormContainer.style.display='block';
});
addNewCaseCancelButton.addEventListener('click',(event)=>{
  event.preventDefault();
  addNewCaseForm.reset();
  addNewCaseFormContainer.style.display='none';
  addNewCaseFormErrorMessage.style.display='none';
})
addNewCaseForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const formData=new FormData(addNewCaseForm);
  const patient_number=formData.get('patient_number');
  const age=formData.get('age');
  const gender=formData.get('gender').toLowerCase();
  const barangay=formData.get('barangay').toLowerCase();
  const status=formData.get('status').toLowerCase();

  if(patient_number.trim()&&age.trim()&&gender.trim()
    &&barangay.trim()&&status.trim()){

    let patient={};

    spinner('');

    const newCase=parseInt(newCases.textContent)+1;
    const activeCase=parseInt(activeCases.textContent)+1;
    
    if(status.toLowerCase()=='admitted'||status.toLowerCase()=='strict isolation'){
      patient = {//put announcement into object
        patient_no:patient_number,
        age:age,
        gender:gender,
        barangay:barangay,
        status:status,
        'new_case':newCase,
        'active_case':activeCase
      };
    }else{
      patient = {//put announcement into object
        patient_no:patient_number,
        age:age,
        gender:gender,
        barangay:barangay,
        status:status,
        'new_case':newCase
      };
    }

    fetch(adminPatientListAPI_URL, {//send object to the server
      method: 'POST',
      body: JSON.stringify(patient),//make object in json format
      headers: {
        'content-type': 'application/json'
      }
    }).then(response=>{
      response.text()
      .then(result=>{
        if(result==='patient exist'){
          errorMessage(addNewCaseFormErrorMessage,'Patient already exist!')
          spinner('none');
        }else{
          newCases.textContent=newCase;
          newCasesTitleModifier(newCase);
          activeCasesTitleModifier(activeCase);
          activeCases.textContent=activeCase;

          loadSpinner(covidPatientList);
          addNewCaseFormErrorMessage.style.display='none';
          addNewCaseFormContainer.style.display='none';
          addNewCaseForm.reset();
          getPatientList();
        }
      });
    });
  }else{
    errorMessage(addNewCaseFormErrorMessage,'Please supply the missing fields!')
  }
});

resetNewCaseButton.addEventListener('click',(event)=>{
  event.preventDefault();
  newCases.textContent='0';
  newCasesTitle.textContent='New Case';
  fetch(newCasesCovidUpdateAPI_URL, {//send object to the server
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  });
})

covidPatientListForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const patient=document.querySelectorAll('.status');
  
  if(patient.length){
    const formData = new FormData(covidPatientListForm);//store form credentials

    for(var x=0,y=patient.length;x<y;x++){//iterate over each checkbox 
      const patientId=parseInt(patient[x].name.match(/\d+/)[0]);//get checkbox id
      const status= formData.get(patient[x].name);// get checkbox value
      
      const patientDetails={//store data in a object
        id:patientId,
        status:status
        // patient_length:
      }
  
      // if(x!=y-1){
        fetch(adminPatientListAPI_URL, {//send object to the server
          method: 'PUT',
          body: JSON.stringify(patientDetails),//make object in json format
          headers: {
            'content-type': 'application/json'
          }
        });
      // }else{
      //   fetch(adminPatientListAPI_URL, {//send object to the server
      //     method: 'PUT',
      //     body: JSON.stringify(patientDetails),//make object in json format
      //     headers: {
      //       'content-type': 'application/json'
      //     }
      //   });
      // }
    }
  
    successMessage.textContent='Patient Updated';
    successMessage.style.bottom='50';
    setTimeout(()=>{
      updateActiveCases();
    },100);
    setTimeout(()=>{
      successMessage.style.bottom='-45';
    },3000);
  }else{

  }
});

//execute event on click of post on announcement
announcementForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const formData = new FormData(announcementForm);//store form credentials
  const title = formData.get('Title');
  const body = formData.get('Body');

  if (title.trim().toString() && body.trim().toString()) {//execute if form fields are all filled
    loadSpinner(announcementSection);
    postAnnouncementErrorMessage.style.display='none';
    announcementForm.reset();

    const announcement = {//put announcement into object
      title,
      body
    };

    fetch(adminAnnouncementAPI_URL, {//send object to the server
      method: 'POST',
      body: JSON.stringify(announcement),//make object in json format
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => {

      spinner('none');
      getAnnouncements();

      response.text().then(result=>{//get text response from server
        if(result==='true'){//display success message
          successMessage.textContent='Post Added';
          successMessage.style.bottom='50';
          setTimeout(()=>{
            successMessage.style.bottom='-45';
          },3000);
        }
      });
    });
  } else {
    postAnnouncementErrorMessage.textContent='Title and Body are required!';
    postAnnouncementErrorMessage.style.display='block';
    setTimeout(()=>{
      postAnnouncementErrorMessage.style.display='none';
    },3000);
  }
});

//execute event on logout click
logoutButton.addEventListener('click',()=>{
    fetch(profileAPI_URL, {//send request
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