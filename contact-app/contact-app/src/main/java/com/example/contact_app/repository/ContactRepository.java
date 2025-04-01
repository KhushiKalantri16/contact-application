package com.example.contact_app.repository;

import com.example.contact_app.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContactRepository extends JpaRepository<Contact, Long> {
//    List<Contact> findByUserId(Long userId);
@Query("SELECT c FROM Contact c WHERE c.user.id = :userId")
List<Contact> findByUserId(@Param("userId") Long userId);

}
