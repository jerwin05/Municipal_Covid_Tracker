const errorMessage=(errorElement,message)=>{
    errorElement.textContent=message;
    errorElement.style.display='';
}

const registerSuccess=(form,errorElement,successElement,message)=>{
  form.style.display='none';
  successElement.textContent=message;
  successElement.style.display='';
  errorElement.style.display='none';
}

const getAnnouncements=()=>{
    const announcementAPI_URL = (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') ? 'http://localhost:3000/announcement' : 'https://meower-api.now.sh/v2/mews';
    fetch(announcementAPI_URL,{
    }).then(response=>{
      response.json().then(result=>{
        result.reverse();
        result.forEach(announcement => {
          const div = document.createElement('div');
  
          const title = document.createElement('h3');
          title.textContent = announcement.title;
  
          const body = document.createElement('p');
          body.textContent = announcement.body;
  
          const date = document.createElement('small');
          date.textContent = new Date(announcement.date);
  
          div.appendChild(title);
          div.appendChild(body);
          div.appendChild(date);
  
          announcementSection.appendChild(div);
        });
      });
    });
  }

const capitalize=(str)=>{
  return str.replace(/^./, str[0].toUpperCase());
}

export {errorMessage,getAnnouncements,capitalize,registerSuccess};