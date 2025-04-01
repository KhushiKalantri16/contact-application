package com.example.contact_app.controller;

import com.example.contact_app.Security.JwtTokenProvider;
import com.example.contact_app.model.Contact;
import com.example.contact_app.model.User;
import com.example.contact_app.service.ContactService;
import com.example.contact_app.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping
    public ResponseEntity<?> getAllContacts(@RequestHeader("Authorization") String token) {
        System.out.println(" Fetching contacts for logged-in user.");
        System.out.println(" Received Token: " + token);

        // Extract user from token
        String email = jwtTokenProvider.getEmailFromToken(token.replace("Bearer ", ""));
        System.out.println(" Extracted Email from Token: " + email);

        User user = userService.findByEmail(email).orElse(null);
        if (user == null) {
            System.out.println(" User not found for email: " + email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized user");
        }

        System.out.println(" Found User: " + user.getEmail() + " (ID: " + user.getId() + ")");

        // Get contacts belonging to the user
        List<Contact> userContacts = contactService.getContactsByUser(user.getId());

        if (userContacts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(userContacts);
    }

    //  Add a new contact
    @PostMapping("/add")
    public ResponseEntity<?> addContact(@RequestBody Contact contact, @RequestParam Long userId) {
        User user = userService.findUserById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid user ID");
        }
        contact.setUser(user);
        return ResponseEntity.ok(contactService.addContact(contact));
    }

    //  Get contacts by userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Contact>> getContacts(@PathVariable Long userId) {
        return ResponseEntity.ok(contactService.getContactsByUser(userId));
    }



    //  Update contact (Fixed - Single Definition)
    @PutMapping("/update/{contactId}")
    public ResponseEntity<?> updateContact(
            @PathVariable Long contactId,
            @Valid @RequestBody Contact updatedContact,
            @RequestHeader("Authorization") String token) {

        System.out.println(" Received Update Request for Contact ID: " + contactId);
        System.out.println(" Received Token: " + token);

        // Extract user from token
        String email = jwtTokenProvider.getEmailFromToken(token.replace("Bearer ", ""));
        System.out.println(" Extracted Email from Token: " + email);

        User user = userService.findByEmail(email).orElse(null);
        if (user == null) {
            System.out.println(" User not found for email: " + email);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized user");
        }
        System.out.println(" Found User: " + user.getEmail() + " (ID: " + user.getId() + ")");

        Contact contact = contactService.getContactById(contactId).orElse(null);
        if (contact == null) {
            System.out.println(" Contact not found for ID: " + contactId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contact not found");
        }
        System.out.println(" Found Contact. Owner ID: " + contact.getUser().getId() + " | Requesting User ID: " + user.getId());

        if (!contact.getUser().getId().equals(user.getId())) {
            System.out.println(" Access Denied: User ID " + user.getId() + " does not own contact ID " + contactId);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }

        // Update contact details
        contact.setName(updatedContact.getName());
        contact.setEmail(updatedContact.getEmail());
        contact.setPhone(updatedContact.getPhone());

        return ResponseEntity.ok(contactService.updateContact(contactId, contact));
    }


    //  Delete a single contact
    @DeleteMapping("/delete/{contactId}")
    public ResponseEntity<?> deleteContact(@PathVariable Long contactId) {
        contactService.deleteContact(contactId);
        return ResponseEntity.ok().build();
    }

    //  Delete all contacts
    @DeleteMapping("/delete-all")
    public ResponseEntity<Map<String, String>> deleteAllContacts(@RequestHeader("Authorization") String token) {
        System.out.println(" Delete-All API called with token: " + token);
        contactService.deleteAllContacts();

        Map<String, String> response = new HashMap<>();
        response.put("message", "All contacts deleted successfully.");
        return ResponseEntity.ok(response);
    }

    //  Get contact by ID
    @GetMapping("/{contactId}")
    public ResponseEntity<?> getContactById(@PathVariable Long contactId) {
        Optional<Contact> contact = contactService.getContactById(contactId);
        return contact.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

