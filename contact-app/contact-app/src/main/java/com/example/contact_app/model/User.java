package com.example.contact_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false) //  Ensure name is required
    private String name;

    @Column(nullable = false, unique = true) //  Added phone field
    private String phone;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contact> contacts = new ArrayList<>();

    //  Constructor with phone
    public User(String email, String password, String name, String phone) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.contacts = new ArrayList<>();
    }

    //  Utility method to add a contact
    public void addContact(Contact contact) {
        contact.setUser(this);
        contacts.add(contact);
    }

    //  Utility method to remove a contact
    public void removeContact(Contact contact) {
        contacts.remove(contact);
        contact.setUser(null);
    }
}
