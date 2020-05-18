import { 
	addNewContact, 
	getAllContacts,
	getContactByID,
	updateContact,
	deleteContact,
} from '../controllers/controller';

const Routes = app => {
	app.route('/contact')
		.get((req, res, next) => {
			// Middleware goes in here. E.g.:
			// console.dir(req);
			next();
		}, getAllContacts)

		.post(addNewContact);

	app.route('/contact/:contactID')
		.get(getContactByID)
		
		.put(updateContact)
		
		.delete(deleteContact);
}

export default Routes;