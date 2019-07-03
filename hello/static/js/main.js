

const time = document.getElementById('time');
const greeting = document.getElementById('greeting');

let morpic = new Array(
  "url('https://i.ibb.co/7vDLJFb/morning.jpg')",
  "url('http://p1.qhimgs4.com/t019888d9876a6fd561.jpg')",
  "url('https://wallpapercave.com/wp/wp4152205.jpg')"
);

let aftpic = new Array(
  "url('https://i.ibb.co/3mThcXc/afternoon.jpg')",
  "url('https://picserio.com/data/out/424/nature-images-wallpaper-hd_6272157.jpg')",
  "url('http://cdn.desktopwallpapers4.me/wallpapers/nature/1920x1080/2/14492-trail-in-autumn-forest-1920x1080-nature-wallpaper.jpg')"
);

let evepic = new Array(
  "url('https://i.ibb.co/924T2Wv/night.jpg')"
);

// Options
const showAmPm = true;

// Show Time
function showTime() {
    let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes(),
      sec = today.getSeconds();
  
    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';
  
    // 12hr Format
    hour = hour % 12 || 12;
  
    // Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;
  
    setTimeout(showTime, 1000);
  }

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if ( hour > 19 ) {
    // Evening
    document.body.style.backgroundImage = evepic[parseInt(Math.random()*evepic.length)];
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }else if ( hour > 12) {
    // Afternoon
    document.body.style.backgroundImage = aftpic[parseInt(Math.random()*aftpic.length)];
    greeting.textContent = 'Good Afternoon, ';
    document.body.style.color = 'white';
  } else if (hour > 4) {
    // Morning
    document.body.style.backgroundImage = morpic[parseInt(Math.random()*morpic.length)];
    greeting.textContent = 'Good Morning, ';
  } else {
    // Evening
    document.body.style.backgroundImage = evepic[parseInt(Math.random()*evepic.length)];
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

  //Run
  showTime();
  setBgGreet();