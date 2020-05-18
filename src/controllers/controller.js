import mongoose from 'mongoose';
import { ContactSchema } from '../models/model';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => {
	let newContact = new Contact(req.body);
	
	newContact.save((err, contact) => err ? res.json(err) : res.json(contact));
}

export const getAllContacts = (req, res) => {
	Contact.find(
		{}, 
		(err, contact) => {
			!err ? res.json(contact) : res.json(err);
		}	
	);
			
}

export const getContactByID = (req, res) => {
	Contact.findById(
		req.params.contactID, 
		(err, contact) => err ? res.json(err) : contact ? res.json(contact) : res.json({ "message": "User cannot be found!" }),
	);
}

export const updateContact = (req, res) => {
	Contact.findOneAndUpdate(
		{ _id: req.params.contactID, }, 
		req.body,
		{
			new: true,
			useFindAndModify: false,
		},
		(err, contact) => err ? res.json(err) : res.json(contact),
	);
}

export const deleteContact = (req, res) => {
	Contact.deleteOne(
		{ _id: req.params.contactID, },
		(err) => 
			err ? res.json(err) : res.json({
				"message": "Succesfuly deleted user!"
			}),
	);
}
