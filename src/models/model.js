import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema =  new Schema({
	firstName: {
		type: String,
		required: 'First name required!',
	},
	lastName: {
		type: String,
		required: 'Last name required!',
	},
	email: { 
		type: String, 
		unique: true,
	},
	phoneNumber: { 
		type: Number 
	},
	company: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
});