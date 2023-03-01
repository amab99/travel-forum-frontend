import { DataSource } from "./data-source.js";

/**
 * This class represents a data source where a REST API is used 
 * to get data from.
 * @extends DataSource
 */
export class RESTDataSource extends DataSource {
	/**
	 * Create a new data source with the specified JSON file as its source of data.
	 * @param url the name of the JSON file to be used as source of data
	 */
	constructor(url) {
		super(url);
	}

	/**
	 * Get data from the specified endpoint.
	 * @param endpoint the endpoint to use, default an empty string ''
	 * @param method the HTTP request method to use, default GET
	 * @param body  the body to be sent with the request, default an empty body {}
	 * @return a Promise that resolves with the result of parsing the response 
	 * body text as JSON.
	 */
	async getData(endpoint = '', method = 'GET', body = {}) {
		return super.getData(endpoint, method, body);
		
	}

    /**
	* Get all travelers from the REST API.
	* @return a Promise that resolves to an array of travelers
	*/
	async getTravelers() { 
		return this.getData('api/travelers')
        .then(travelers => travelers.json());	
	}

	/**
	* Get the traveler with specific social security number from the REST API.
	* @param socialSecurityNumber the social security number of the traveler to get
	* @return a Promise that resolves to a traveler object or error msg if the traveler doesn't exist
	*/
	async getTraveler(socialSecurityNumber) {		
		return this.getData('api/traveler/' + socialSecurityNumber)
        .then(traveler => traveler.json());
	}

	/**
	* Add a traveler to the REST API.
	* @param firstName the first name of the new traveler
	* @param surName the sur name of the new traveler
	* @param socialSecurityNumber the social security number for the new traveler
    * @param email the email of the new traveler 
    * @param phoneNumber the phonenumber of the new traveler
    * @param destination the destination where the new traveler is flying to
	* @return a Promise that resolves to the traveler added or an error 
	* message explaining why the traveler couldn't be added
	*/
	async addTraveler(firstName, surName , email, phoneNumber, destination, socialSecurityNumber) { 
        return this.getData('api/traveler/', 'POST', {
			'firstName': firstName,
            'surName':surName, 
            "email": email,
            'phoneNumber': phoneNumber,
            'destination': destination,
			'socialSecurityNumber':socialSecurityNumber
        })
		.then(traveler => traveler.json());
	}	

	/**
	* Delete a traveler from the REST API.
	* @param socialSecurityNumber the social security number for the traveler to be deleted
	* @return a Promise that resolves to the traveler deleted or an error 
	* message explaining why the traveler couldn't be deleted
	*/
	async deleteTraveler(socialSecurityNumber) { 
		return this.getData('api/traveler/' + socialSecurityNumber, 'DELETE')
        .then(traveler => traveler.json());
	}

	/**
	* Updates the travelers information.
	* @param firstName the first name of the updated traveler 
	* @param surName the sur name of the updated traveler
	* @param socialSecurityNumber the social security number for the updated traveler
    * @param email the email of the updated traveler 
    * @param phoneNumber the phonenumber of the updated traveler
    * @param destination the destination where the updated traveler is flying to
	* @return a Promise that resolves to the traveler updated or an error 
	* message explaining why the traveler couldn't be updated
	*/
	async updateTraveler(firstName, surName  , email, phoneNumber, destination, socialSecurityNumber) { 
		return this.getData('api/traveler/' + socialSecurityNumber, 'PUT', {
			'firstName': firstName,
            'surName':surName, 
            "email": email,
            'phoneNumber': phoneNumber,
            'destination': destination,
			'socialSecurityNumber':socialSecurityNumber
        })
		.then(traveler => traveler.json());
	}
}
