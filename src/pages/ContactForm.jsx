import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { contactService } from "../services/contactAPI";

export const ContactForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();
    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            loadContact();
        }
    }, [id]);

    const loadContact = async () => {
        try {
            const data = await contactService.getContact(id);
            setContact(data);
        } catch (error) {
            console.error("Error loading contact:", error);
            navigate("/contacts");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Sending contact:', contact);
            let savedContact;
            if (id) {
                savedContact = await contactService.updateContact(id, contact);
                dispatch({ type: "UPDATE_CONTACT", payload: savedContact });
            } else {
                savedContact = await contactService.addContact(contact);
                dispatch({ type: "ADD_CONTACT", payload: savedContact });
            }
            navigate("/contacts");
        } catch (error) {
            console.error("Error saving contact:", error);
        }
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setContact(prev => ({
        ...prev,
        [name]: value
    }));
};

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-center align-items-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                        <div className="mb-3">
                            <label htmlFor="full_name" className="form-label">Full Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="full_name"
                                name="full_name"
                                value={contact.full_name}
                                onChange={handleChange}
                                placeholder="Enter full name" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="email"
                                name="email"
                                value={contact.email}
                                onChange={handleChange}
                                placeholder="Enter email" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input 
                                type="tel" 
                                className="form-control" 
                                id="phone"
                                name="phone"
                                value={contact.phone}
                                onChange={handleChange}
                                placeholder="Enter phone" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="address"
                                name="address"
                                value={contact.address}
                                onChange={handleChange}
                                placeholder="Enter address" 
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary">Save Contact</button>
                            <Link to="/contacts"><span>or get back to contacts</span></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};