const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			showModal: false,
			contactToBeDeleted: null,
			contacts: [
				{
					id: 1,
					name: "Nolan Grayson",
					homeAddress: "2827 Chicago",
					phone: "(405) 270-0441",
					email: "omniman@exampleemail.com"
				},
				{
					id: 2,
					name: "Alex Louis Armstrong",
					homeAddress: "2387 Hillhaven",
					phone: "(210) 757-0694",
					email: "FMA@exampleemail.com"
				},
				{
					id: 3,
					name: "Ron Swanson",
					homeAddress: "4907 Colonial Park",
					phone: "(704) 746-7010",
					email: "justron@exampleemail.com"
				},
				{
					id: 4,
					name: "J. Jonah Jameson",
					homeAddress: "2373 NY",
					phone: "(562) 309-5061",
					email: "dailybugle@exampleemail.com"
				},
			]
		},

		actions: {
			//add contact to the list
			addContact: (contact) => {
				// pulls contacts from the store
				let listOfContacts = getStore().contacts;
				// creates an id for the new contact and add rest of its info
				const newContact = {
					id: listOfContacts.length + 1,
					...contact
				};
				// adds new contact to the list
				setStore({ contacts: [...listOfContacts, newContact] });
			},

			//edit contact from the list
			editContact: (id, updatedContact) => {
				// pulls contacts from the store
				let listOfContacts = getStore().contacts;
				// if contact with id exists then update it
				const contactIndex = listOfContacts.findIndex(contact => contact.id === id);
				if (contactIndex !== -1) {
					const updatedContacts = [...listOfContacts];
					updatedContacts[contactIndex] = { id, ...updatedContact };
					// updates the contacts' info in the store
					setStore({ contacts: updatedContacts });
				}
			},

			// toggle the modal on
			toggleModal: (show) => {
				setStore({ showModal: show })
			},

			// checks if all fields are filled else shows modals
			checkEmptyFields: (newContact) => {
				const { name, homeAddress, phone, email } = newContact;
				if (name && homeAddress && phone && email) {
					// if all fields are filled, saves contact
					getActions().addContact(newContact);
				} else {
					// if any field is empty, shows modal
					getActions().toggleModal(true);
				}
			},

			//close modal button
			closeModal: () => {
				setStore({ showModal: false });
			},

			// set contact to be deleted
			setContactToBeDeleted: (contact) => {
				setStore({ contactToBeDeleted: contact });
			},

			// close the confirm delete modal without deleting a record
			closeDeleteModal: () => {
				setStore({ showModal: false, contactToBeDeleted: null });
			},

			//delete contact from the list
			deleteContact: (contact) => {
				//pulls the contacts in the store
				let listOfContacts = getStore().contacts;
				//filters the contact and generates new array
				setStore({ contacts: listOfContacts.filter((item) => item !== contact) });
				// close the confirm delete modal after deleting a record
				getActions().closeDeleteModal();
			},
		}
	};
};

export default getState;
