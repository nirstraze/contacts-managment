import { Contact } from "./models/contact";
import { observable, action, toJS } from "mobx";
import { url } from "gravatar";

class DataStore {
  @observable contacts: Contact[] = [];

  constructor() {
    this.contacts = this.getContacts();
  }

  public getContacts = (): Contact[] => {
    return localStorage.getItem("contacts")
      ? JSON.parse(localStorage.getItem("contacts") || "")
      : [];
  };

  public saveContact = (contact: Contact) => {
    this.contacts.push(contact);

    contact.avatar =
      contact.avatar ||
      url(contact.email, {
        s: "50",
        r: "pg",
        d: "monsterid"
      });
    localStorage.setItem("contacts", JSON.stringify(toJS(this.contacts)));
  };

  @action
  public editContact = (editedContact: Contact) => {
    let contact = this.contacts.find(
      contact => contact.email === editedContact.email
    );
    if (contact) {
      contact = editedContact;
      localStorage.setItem("contacts", JSON.stringify(toJS(this.contacts)));
    }
  };

  @action
  public deleteContact = (contactToDelete: Contact) => {
    const index = this.contacts.findIndex(
      contact => contact.email === contactToDelete.email
    );
    if (index !== -1) {
      this.contacts.splice(index, 1);
      localStorage.setItem("contacts", JSON.stringify(toJS(this.contacts)));
    }
  };
}

const instance = new DataStore();
export default instance;

// return [{ firstName: 'Sami', lastName: 'Davis', phone: '7', email: 'sami@yahoo.com', avatar: '' },
// { firstName: 'David', lastName: 'Davis', phone: '7094', email: 'david@yahoo.com', avatar: '' },
// { firstName: 'Tenzer', lastName: 'Davis', phone: '4527', email: 'hamaniac@yahoo.com', avatar: '' },]
