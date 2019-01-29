const infoScreen = document.getElementById('info-screen')
const infoCloseButton = document.getElementById('close-info-screen')
const infoLink = document.getElementById('info-link')

infoLink.addEventListener('click', function (e) {
  e.preventDefault()
  if (this.classList.contains('show')) {
   this.classList.remove('show')
   infoScreen.classList.add('show')
  }
});

infoCloseButton.addEventListener('click', function (e) {
  e.preventDefault()
  infoLink.classList.add('show')
  infoScreen.classList.remove('show')
});

setTimeout(() => {
  infoLink.classList.add('show')
}, 1500);