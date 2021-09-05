import "./App.css";
import { useState, useEffect, useMemo } from "react";
import { v4 as uuidv } from "uuid";

import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contactsFromStorage = JSON.parse(localStorage.getItem("contacts"));
    if (contactsFromStorage.length !== 0) {
      setContacts(contactsFromStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
    console.log("boom1");
  }, [contacts]);

  function addToContactList(nameForCheck, number) {
    if (
      contacts.find((contact) => {
        return contact.name === nameForCheck;
      })
    ) {
      return alert(`${nameForCheck} is already in contacts!`);
    }

    return setContacts([
      ...contacts,
      {
        id: uuidv(),
        name: nameForCheck,
        number: number,
      },
    ]);
  }

  function handleInputFilterChange(event) {
    setFilter(event.currentTarget.value);
  }

  const filterContactsByName = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toUpperCase().includes(filter.toUpperCase())
    );
  }, [contacts, filter]);

  function deleteContactFromList(event) {
    setContacts(contacts.filter((contact) => contact.id !== event.target.id));
  }

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addToContactList={addToContactList} />
      <h2>Contacts</h2>
      <Filter onChangeFilterInput={handleInputFilterChange} />
      <ContactList
        contacts={filterContactsByName}
        deleteContactFromList={deleteContactFromList}
      />
    </div>
  );
}

export default App;
