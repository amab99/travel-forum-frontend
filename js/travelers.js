import { Atlas } from './atlas.js';
import { RESTDataSource } from './rest-data-source.js';

/** The data source for our Atlas */
const dataSource = new RESTDataSource("https://amab2100-project-backend-dt190g.azurewebsites.net/");

/** The Atlas instance */
const atlas = new Atlas(dataSource);

/** A filter that returns true for travelers whose social security number or name or destination contains the searched string */
const searchFilter = (traveler, searchString) => {

	// Search in socialSecurityNumber, name and destination
	const haystack = (
		traveler.firstName + " " + traveler.surName + "|" + 
		traveler.socialSecurityNumber + "|" + traveler.destination
		).toLowerCase();

	// return false if nothing to search for or if the searched string is found or not
	return searchString == '' || haystack.includes(searchString);
};

/** 
* Starter function runs first
*/
function starterFunction() {

	// Call search function on keyup events from the search text input
	document.getElementById("search").addEventListener("keyup", search);

	// call the function to create the table with the fetched travelers
	createTable(); 
}

/**
* Creates the HTML table displaying the travelers
*/
function createTable() {	

	// An array of all travelers to list in the table.
	let travelers = [];

	// Get the list of all travelers from Atlas
	atlas.getTravelers()
	.then(async fetchedTravelers => {
		travelers = fetchedTravelers;

		// Regardles the type of table to create, sort and filter the travelers
		const searchString = document.getElementById("search").value.toLowerCase();

		// Keep the original traveler array intact by assigning the filterad travelers to a new array
		// Sorting the array by surname alpabetically and limit number of travelers to show on the page to 100
		let travelersToList = travelers.filter(traveler => searchFilter(traveler, searchString));
		travelersToList = travelersToList.sort((a, b) => a.surName.localeCompare(b.surName)).slice(0, 100);
		
		// Clear any existing data in the table
		const table = document.getElementById("travelers-table");
		table.innerHTML = null;
		
		// Create the table 
		// (a call to createTableRows(travelers, table)
		createTableRows(travelersToList, table);
	})
	.catch(error => console.error(`An error occurd when getting travelers from Atlas: ${error}`));
}

/**
* Create table rows for all travelers in the array.
* @param travelers an array of travelers to create table rows 
* @param table the table or the table body to add the rows to
*/
function createTableRows(travelers, table){
	// For each traveler create a table row with traveler data
	travelers.forEach(traveler => {
		// Make a table row
		const tr = document.createElement("tr");

		// Populate the row with the data to display
		createTd(traveler.firstName + " " + traveler.surName, tr);
		createTd(traveler.email, tr);
		createTd(traveler.phoneNumber, tr);
		createTd(traveler.destination, tr);

		// Create a delete button
		const deleteBtn = document.createElement("button");
		deleteBtn.innerText = "Delete";
		deleteBtn.id = "delete_";
		
		// Add onclick listener to the button
		deleteBtn.onclick = async function() {
			await atlas.deleteTraveler(traveler.socialSecurityNumber);
			window.location.reload();
		};

		// Add the row to the table
		table.appendChild(tr);
		// Add the delete button
		tr.appendChild(deleteBtn);
	});
}

/**
* Create a data cell (td element) with the specified text
* @param text the text to to be displayed in the data cell
* @param tr the table row to add the data cell to
* @param extra a lambda that handles any extra that needs to be added to the data cell
*/
function createTd(text, tr, extra) {

	const td = document.createElement("td");
	td.innerText = text;

	if(extra) {
		extra(td);
	}
	tr.appendChild(td);
}

/**
* Perform a search for travelers matching the text entered in the search input.
*/
function search(){
	// A re-creation of the table will filter out the travelers not matching the searched value
	createTable();
}

document.addEventListener('DOMContentLoaded', starterFunction);
