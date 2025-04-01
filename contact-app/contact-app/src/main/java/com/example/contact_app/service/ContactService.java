package com.example.contact_app.service;

import com.example.contact_app.model.Contact;
import com.example.contact_app.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    //  Add a new contact
    public Contact addContact(Contact contact) {
        return contactRepository.save(contact);
    }

    //  Get all contacts
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    //  Get contacts by user ID
    public List<Contact> getContactsByUser(Long userId) {
        return contactRepository.findByUserId(userId);
    }

    //  Get contact by ID (NEW METHOD)
    public Optional<Contact> getContactById(Long contactId) {
        return contactRepository.findById(contactId);
    }

    //  Update contact
    public Contact updateContact(Long contactId, Contact updatedContact) {
        Contact existingContact = contactRepository.findById(contactId)
                .orElseThrow(() -> new RuntimeException("Contact not found"));

        existingContact.setName(updatedContact.getName());
        existingContact.setEmail(updatedContact.getEmail());
        existingContact.setPhone(updatedContact.getPhone());

        return contactRepository.save(existingContact);
    }

    //  Delete a single contact
    public void deleteContact(Long contactId) {
        contactRepository.deleteById(contactId);
    }

    //  Delete all contacts
    public void deleteAllContacts() {
        contactRepository.deleteAll();
    }
}

