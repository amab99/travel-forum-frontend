import { Atlas } from './atlas.js';
import { RESTDataSource } from './rest-data-source.js';

/** The data source for our Atlas */
const dataSource = new RESTDataSource("https://amab2100-project-dt190g-ht22.azurewebsites.net/");
/** The Atlas instance */
const atlas = new Atlas(dataSource);

/** An array of all travelers */
let travelers = [];

/** Declare global variables by id*/
const selector = document.getElementById("selectTraveler");
const updBtn = document.getElementById("update");
const form = document.getElementById("form");
const fname = document.getElementById("fname");
const surName = document.getElementById("surName");
const email = document.getElementById("email");
const phoneNr = document.getElementById("phoneNr");
const destination = document.getElementById("destination");
const ssn = document.getElementById("ssn");
const img = document.getElementById("ssn-icon");

var a;

/** Starter function runs first */
function starterFunction() {

    // Disable the button first 
    buttonControl();

    // Call the createTravelersList() to create the list with the travelers
    createTravelersList();
}

/** Function to control the enable and disable of the
*  button based on the form inputs 
*/
function buttonControl() {

    // Disable the update button if any of the fields are empty
    if(fname.value === "" || surName.value == "" || (email.value == "" && phoneNr.value == "" ) || destination.value == "" || ssn.value == "" ) {
        updBtn.disabled = true;
    
    }else {
        // Enable the update button, but disable the button if the email or phoneNumber field are empty
        updBtn.disabled = !(email.value !== "" || phoneNr.value !== "");
    }
};

/* Create an arraylist of the travelers and add socialSecurityNumber, first name and surname.*/
function createTravelersList() {

    // An arrayList to save the traveler information in it 
    let travelersArray = [];
    
    // Get all travelers from atlas and then create the list with the travelers
    atlas.getTravelers()
    .then(fetchedTravelers => {
        travelers = fetchedTravelers;
    
        // Get the relevant information about each traveler and add it to the travelersArray 
        travelers.forEach(traveler => {
            let firstName = traveler.firstName;
            let surName = traveler.surName;
            let ssn = traveler.socialSecurityNumber;
            travelersArray.push(firstName + " " + surName + " -- " + ssn);
        });
        
        // Create the options by Looping through each traveler in the travelersArray
        for (var i = 0; i < travelersArray.length; i++) {

            // Create new option element
            let opt = document.createElement("option");

            opt.innerText = travelersArray[i];
            
            // Add the option elements to the selector element
            selector.appendChild(opt);
        };
    })
    .catch(error => console.error(`An error occurd when getting travelers from Atlas: ${error}`));
}

/* Get the data about the selected traveler
* based on the socialSecurityNumber 
*/
function getTraveler(selected) {

    // Get the selected traveler data from Atlas
    var  socialSecurityNumber = selected.split(" -- ")[1];

    // update with new traveler in atlas
    atlas.getTraveler(socialSecurityNumber).then(traveler => {

        // update the form with the data about the selected traveler
        fname.value = traveler.firstName;
        surName.value = traveler.surName;
        email.value = traveler.email;
        phoneNr.value = traveler.phoneNumber;
        destination.value = traveler.destination;
        ssn.value = traveler.socialSecurityNumber;

        // Enable the buttons
        updBtn.disabled = false;
    })
}

/* Function to control show or hide the social security number */
function showSsn(){
    
    if(a==1){
        ssn.type='password';
        img.src='Img/4727929.webp';
        a=0;
    }else{
        ssn.type='text';
        img.src='Img/show.webp';
        a=1;
    }
}

/* Function to update the selected traveler information */
function updateTraveler() {
    
    // Add  the updated traveler with its info to the travelers array
    const update = atlas.updateTraveler(fname.value, surName.value  , email.value, phoneNr.value, destination.value, ssn.value);
    
    // Check if error when updating a traveler
    if(update === 'error') {

        alert("The traveler " + fname.value + " " + surName.value + " couldn't be updated");
    }else {

        // Display msg that shows that the traveler has been updated
        alert("The traveler " + fname.value + " " + surName.value + " is updated");
        // Refresh the form 
        form.reset();
    }
 
}

// Add eventListeners for the buttons and the selector
selector.addEventListener('change', (event) => getTraveler(selector.value));
updBtn.addEventListener('click', updateTraveler);
form.addEventListener('input', buttonControl);
img.addEventListener('click', showSsn);

document.addEventListener('DOMContentLoaded', starterFunction);
