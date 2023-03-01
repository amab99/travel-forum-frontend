import { Atlas } from './atlas.js';
import { RESTDataSource } from './rest-data-source.js';

/** The data source for our Atlas */
const dataSource = new RESTDataSource("https://amab2100-project-backend-dt190g.azurewebsites.net/");
/** The Atlas instance */
const atlas = new Atlas(dataSource);

// Declare global vairabels by Id
const addBtn = document.getElementById("submit");
const form = document.getElementById("form");
const fname = document.getElementById("fname");
const surName = document.getElementById("surName");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNr");
const destination = document.getElementById("destination");
const socialSecurityNumber = document.getElementById("ssn");
const img = document.getElementById("ssn-icon");
var a;

 
/** Starter function runs first */
function starterFunction(){
  // calls the buttonControl function to disable the button
  buttonControl();
}

/** Function to enable and disable the add button based on the form inputs */
function buttonControl(){

  // Disable the button if any of the fields are empty
  if(fname.value === "" || surName.value == "" || (email.value == "" && phoneNumber.value == "" ) || destination.value == "" || socialSecurityNumber.value == "" ) {

    addBtn.disabled = true;

  }else{
    // Enable the addBtn, but disable the button if the email or phoneNumber field are empty
    addBtn.disabled = !(email.value !== "" || phoneNumber.value !== "");
  }
}

/* Function to control show or hide the social security number */
function showSsn(){

  if(a==1){
    socialSecurityNumber.type='password';
    img.src='Img/4727929.webp';
    a=0;
  }else{
    socialSecurityNumber.type='text';
    img.src='Img/show.webp';
    a=1;
  }
}

/** Function to add the new traveler */
function addTraveler() {

  // Add the new traveler with its info to the travelers array
  const newTraveler = atlas.addTraveler(fname.value, surName.value , email.value, phoneNumber.value, destination.value, socialSecurityNumber.value);
  
  // Check if error when adding new traveler
  if(newTraveler === 'error'){

    alert("Error when adding new traveler " + fname.value + " " + surName.value);

  } else {

    // Display an alert shows that the traveler is added
    alert("The traveler " + fname.value + " " + surName.value + " is added");
    // Refresh the form to make it ready to add new traveler
    form.reset();
  }
  
}

// Add eventListener to the button to add a new traveler and to update the button status
addBtn.addEventListener('click', addTraveler);
form.addEventListener('input', buttonControl);
img.addEventListener('click', showSsn);

document.addEventListener('DOMContentLoaded', starterFunction);
