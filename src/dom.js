const infoScreen = document.getElementById('info-screen')
const infoCloseButton = document.getElementById('close-info-screen')
const infoLink = document.getElementById('info-link')

function openInNewTab(url) {
  window.location.href = url
}


infoLink.addEventListener('touchstart', function (e) {
  // e.preventDefault()
  openInfoScreen()
});

infoCloseButton.addEventListener('touchstart', function (e) {
  // e.preventDefault()
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

const links = document.getElementsByClassName('ex-link');

for (let i = 0; i < links.length; i++) {
  const e = links[i];
  const url = e.href;
  e.addEventListener('touchstart', function (e) {
    openInNewTab(url)
  })
}
