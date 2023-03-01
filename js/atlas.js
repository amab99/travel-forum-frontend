/**
 * This class represents a very, very simplified version of Atlas with create,
 * read, update, and delete (CRUD) methods for travelers at the airline
 * Almost all methods return a Promise that is fulfilled with the requested data 
 * or rejected if an error occurs.
 */
export class Atlas {
	#dataSource;

	/**
	 * Create a new Atlas instance with the specified source for its data.
	 * @param dataSource the data source to be used
	 */
	constructor(dataSource) {
		this.#dataSource = dataSource;
	}

	/**
	* Get all Travelers from Atlas.
	* @return a Promise that resolves to an array of travelers
	*/
	async getTravelers() { 		
		return this.#dataSource.getTravelers();
	}

	/**
	* Get a traveler from Atlas with the specified social security number.
	* @param socialSecurityNumber the social security number of the traveler to get
	* @return a Promise that resolves to a traveler object or {} if the traveler doesn't exist
	*/	
	async getTraveler(socialSecurityNumber) {
		return this.#dataSource.getTraveler(socialSecurityNumber);
	}

	/**
	* Add a traveler to Atlas.
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
		return this.#dataSource.addTraveler(firstName, surName , email, phoneNumber, destination, socialSecurityNumber);
	}

	/**
	* Delete a traveler in Atlas.
	* @param socialSecurityNumber the social security number of the traveler to be deleted
	* @return a Promise that resolves to the traveler deleted or an error 
	* message explaining why the traveler couldn't be deleted
	*/
	async deleteTraveler(socialSecurityNumber) {
		return this.#dataSource.deleteTraveler(socialSecurityNumber);
	}

	/**
	* Update a traveler to Atlas.
	* @param firstName the first name of the updated traveler 
	* @param surName the sur name of the updated traveler
	* @param socialSecurityNumber the social security number for the updated traveler
    * @param email the email of the updated traveler 
    * @param phoneNumber the phonenumber of the updated traveler
    * @param destination the destination where the updated traveler is flying to
	* @return a Promise that resolves to the traveler updated or an error 
	* message explaining why the traveler couldn't be updated
	*/	
	updateTraveler(firstName, surName , email, phoneNumber, destination, socialSecurityNumber) {
		return this.#dataSource.updateTraveler(firstName, surName , email, phoneNumber, destination, socialSecurityNumber);
	}
}
