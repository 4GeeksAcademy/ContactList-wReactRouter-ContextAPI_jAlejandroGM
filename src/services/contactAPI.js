const url = 'https://playground.4geeks.com/contact/agendas/jAlejandroGM'

export const contactService = {
    getContacts: async () => {
        try {
            const response = await fetch(url)
            if (!response.ok) throw new Error('Error loading contacts')
            return await response.json()
        } catch (error) {
            throw error
        }
    },

    getContact: async (id) => {
        try {
            const response = await fetch(`${url}/${id}`);
            if (!response.ok) throw new Error('Error loading contact');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    addContact: async (contact) => {
        try {
            const response = await fetch(`${url}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact)
            })
            if (!response.ok) throw new Error('Error adding contact')
            return await response.json()
        } catch (error) {
            throw error
        }
    },

    updateContact: async (id, contact) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contact)
            })
            if (!response.ok) throw new Error('Error updating contact')
            return await response.json()
        } catch (error) {
            throw error
        }
    },

    deleteContact: async (id) => {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw new Error('Error deleting contact')
            return true
        } catch (error) {
            throw error
        }
    }
}