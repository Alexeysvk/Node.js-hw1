const fs = require("fs").promises;
const path = require("path");
const {nanoid} = require("nanoid")


const contactsPath = path.join(__dirname, "/db/contacts.json");

const getAllContacts = async () => JSON.parse(await fs.readFile(contactsPath, 'utf-8'));

const listContacts = async () => {
		const contacts = await getAllContacts();

		return console.log(contacts);
};

const getContactById = async contactId => {
		const contacts = await getAllContacts();
		const findedContact = contacts.filter(({ id }) => id === contactId.toString());

		if (findedContact.length === 0) {
			throw new Error('There is no contact with such id');
		}

		return console.log(findedContact);
};

const removeContact = async contactId => {
		const contacts = await getAllContacts();
		const filteredContacts = contacts.filter(({ id }) => id !== contactId.toString());

		if (filteredContacts.length === contacts.length) {
			throw new Error('There is no contact with such id, so it can be removed. Please insert correct id!');
		}

		fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

		return console.log('Contact successfully removed');
};

const addContact = async (name, email, phone) => {
	if (name && email && phone) {
		const contacts = await getAllContacts();
		const newContact = {
			id: nanoid(),
			name,
			email,
			phone,
		};

		contacts.push(newContact);
		fs.writeFile(contactsPath, JSON.stringify(contacts));

		return console.log('New contact added');
	}

	return console.error('Not all data. Please add data');
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};