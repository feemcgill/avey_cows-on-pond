const infoScreen = document.getElementById('info-screen')
const tourScreen = document.getElementById('tour-screen')

const infoCloseButton = document.getElementById('close-info-screen')
const tourCloseButton = document.getElementById('close-tour-screen')

const infoLink = document.getElementById('info-link')
const tourLink = document.getElementById('tour-link')

function openInNewTab(url) {
  window.location.href = url
}

// infoLink.addEventListener('touchstart', function (e) {
//   // e.preventDefault()
//   openScreen(infoLink, infoScreen)
// });

// infoCloseButton.addEventListener('touchstart', function (e) {
//   // e.preventDefault()
//   closeScreen(infoLink, infoScreen)
// });


infoLink.addEventListener('click', function (e) {
  e.preventDefault()
  openScreen(infoLink, infoScreen)
});

infoCloseButton.addEventListener('click', function (e) {
  e.preventDefault()
  closeScreen(infoLink, infoScreen)
});



/* TOUR SCREEN STUFF */

// tourLink.addEventListener('touchstart', function (e) {
//   // e.preventDefault()
//   openScreen(tourLink, tourScreen)
// });

// tourCloseButton.addEventListener('touchstart', function (e) {
//   // e.preventDefault()
//   closeScreen(tourLink, tourScreen)
// });


tourLink.addEventListener('click', function (e) {
  e.preventDefault()
  openScreen(tourLink, tourScreen)
});

tourCloseButton.addEventListener('click', function (e) {
  e.preventDefault()
  closeScreen(tourLink, tourScreen)
});


function openScreen(link, screen) {
  //if (link.classList.contains('show')) {
    tourLink.classList.remove('show')
    infoLink.classList.remove('show')
    screen.classList.add('show')
   //}
}

function closeScreen(link, screen) {
  tourLink.classList.add('show')
  infoLink.classList.add('show')  
  screen.classList.remove('show')
}

const links = document.getElementsByClassName('ex-link');

for (let i = 0; i < links.length; i++) {
  const e = links[i];
  const url = e.href;
  // e.addEventListener('touchstart', function (e) {
  //   openInNewTab(url)
  // })
}
