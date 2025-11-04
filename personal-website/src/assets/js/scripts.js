function validationCheck(event) {
    event.preventDefault();
  
    Nname = document.getElementById('name').value.trim();
    phone = document.getElementById('phone').value.trim();
    place = document.getElementById('place').value.trim();
    email = document.getElementById('email').value.trim();
    message = document.getElementById('message').value.trim();
  
    if (!Nname || !phone || !place || !email || !message) {
      document.getElementById('warning').innerHTML = "Please Provide all the credentials to proceed with Submitting the form"
      return;
    }

    document.getElementById('warning').innerHTML = null;
}

function clearMsg()
{
  document.getElementById('name').value = ""
  document.getElementById('phone').value = ""
  document.getElementById('place').value = ""
  document.getElementById('email').value = ""
  document.getElementById('message').value = ""
  document.getElementById('warning').innerHTML = null;
}