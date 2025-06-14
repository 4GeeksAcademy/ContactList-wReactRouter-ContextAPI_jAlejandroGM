import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { contactService } from "../services/contactAPI";


export const Contacts = () => {

  const { store, dispatch } = useGlobalReducer()

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await contactService.getContacts();
      dispatch({ type: "LOAD_CONTACTS", payload: data });
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await contactService.deleteContact(id);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-4">
        {Array.isArray(store.contacts) &&
          store.contacts.map((contact) => (
            <div key={contact.id} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{contact.full_name}</h5>
                  <p className="card-text">
                    <i className="fas fa-envelope me-2"></i>{contact.email}<br />
                    <i className="fas fa-phone me-2"></i>{contact.phone}<br />
                    <i className="fas fa-map-marker-alt me-2"></i>{contact.address}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/form/${contact.id}`} className="btn btn-warning">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="d-flex justify-content-between mt-3">
        <Link to="/">
          <button className="btn btn-primary">Back home</button>
        </Link>
        <Link to="/form">
          <button className="btn btn-success">Create new Contact</button>
        </Link>
      </div>
    </div>
  );
};
