/* This will make the 'setClock()' function execute every 1000 milliseconds (1 second) */
setInterval(setClock, 1000);

/* This selects (using 'attributes' instead of by tag, id or class) and saves the 'hand' div 'HTML elements (which are objects)' into variables */
const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');


function setClock() {
  /* 
  Using the new Date() constructor
    In our case we are interested in the 'current' date, thus Date() has no parameters
      (otherwise we'd want to specify the parameters for the date we want)
  */
  const currentDate = new Date();
  
  /* Logic behind the ratio calculation */
  /* Note that the reason why secondsRatio and minutesRatio are added is because
      secondsRatio is a fraction of a minute
      minutesRatio is a fraction of an hour (including the seconds ratio)
    
      Note that we are dividing by 60, 60 and 12 because
      ...if we wanted to find the degrees of the hand, we'd multiply 
      by conversion factors
        360 degrees/60 seconds on a clock (second hand)
        360 degrees/60 minutes on a clock (minute hand)
        360 degrees/12 hour on a clock (hour hand)
      
      Note that we're mutiplying 360 degrees LATER 'inside the setRotation() function'
  */
  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = ( secondsRatio + currentDate.getMinutes() ) / 60;
  const hoursRatio = ( minutesRatio + currentDate.getHours() ) / 12;

  /* This is telling the HTML HAND elements what degrees they're supposed to be at RIGHT NOW 
      RIGHT NOW meaning the 'currentDate' is changing EVERY 'setInterval amount' (in this case, every 1000 milliseconds)
        therefore the setRotation() is giving each HAND a NEW 'degrees' value each time setClock() executes
  */
  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);
}


/* Changing the value of the CSS variable 'rotation' using JavaScript setProperty() method */
function setRotation(element, rotationRatio) {
  element.style.setProperty('--rotation', rotationRatio * 360);
}


setClock();
