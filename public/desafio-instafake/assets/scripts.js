const postData = async(email, password) => { 
  try {
    const response = await fetch('http://localhost:3000/api/login',
    {
      method:'POST',
      body: JSON.stringify({email:email, password:password})
    });

    if (!response.ok) return;
    const { token } = await response.json()
    return token 
  } catch(err){
    console.error(`Error:`, err)
  }
}

$('#js-form').submit( async (event) => {
  event.preventDefault();
  const email = document.getElementById('js-input-email').value;
  const password = document.getElementById('js-input-password').value;
  const JWT = await postData(email,password)
  console.log(email)

  console.log(JWT)
  if (!JWT) return alert('Usuario y/o contraseña incorrecta')
  localStorage.setItem('jwt', JWT)
  window.location = 'principal.html'
})
