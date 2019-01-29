const infoScreen = document.getElementById('info-screen')
const infoCloseButton = document.getElementById('close-info-screen')
const infoLink = document.getElementById('info-link')



infoLink.addEventListener('touchstart', function (e) {
  e.preventDefault()
  openInfoScreen()
});

infoCloseButton.addEventListener('touchstart', function (e) {
  e.preventDefault()
  closeInfoScreen()
});


infoLink.addEventListener('click', function (e) {
  e.preventDefault()
  openInfoScreen()
});

infoCloseButton.addEventListener('click', function (e) {
  e.preventDefault()
  closeInfoScreen()
});



function openInfoScreen() {
  if (infoLink.classList.contains('show')) {
    infoLink.classList.remove('show')
    infoScreen.classList.add('show')
   }
}

function closeInfoScreen() {
  infoLink.classList.add('show')
  infoScreen.classList.remove('show')
}


setTimeout(() => {
  infoLink.classList.add('show')
}, 1500);