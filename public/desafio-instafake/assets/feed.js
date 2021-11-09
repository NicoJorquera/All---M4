if(!localStorage.getItem('jwt')) window.location = 'indexD.html'

document.querySelector('#logout').addEventListener('click', () => {
  localStorage.removeItem('jwt')
  window.location = 'indexD.html'
})