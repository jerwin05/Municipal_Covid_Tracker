const errorMessage=(errorElement,message)=>{
    errorElement.textContent=message;
    errorElement.style.display='block';
}

const registerSuccess=(form,errorElement,successElement,message)=>{
  form.style.display='none';
  successElement.textContent=message;
  successElement.style.display='block';
  errorElement.style.display='none';
}

const capitalize=(str)=>{
  return str.replace(/^./, str[0].toUpperCase());
}

export {errorMessage,capitalize,registerSuccess};