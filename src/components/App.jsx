import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/';
import Filter from './Filter';
import ContactList from './ContactList';
import { selectContacts } from 'redux/contactsSelectors';
import { addFilter } from 'redux/filterSlice';
import { addContact, fetchContacts } from 'redux/operations';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleData = newContacts => {
    if (
      contacts.some(
        ({ name }) => name.toLowerCase() === newContacts.name.toLowerCase()
      )
    )
      return Notiflix.Notify.failure(
        `${newContacts.name} is already in contacts`
      );

    dispatch(addContact(newContacts));
  };

  const handleChange = e => {
    const { value } = e.currentTarget;
    dispatch(addFilter(value));
  };

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginTop: 0 }}>Phonebook</h1>
      <ContactForm onSubmit={handleData} />

      <h2>Contacts</h2>
      <Filter onChange={handleChange} />
      <ContactList />
    </div>
  );
};

export default App;
