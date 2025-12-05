package com.example.services;

import com.example.daos.userDAO;
import com.example.models.Customer;
import com.example.models.User;
import com.example.repositories.CustomerRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final userDAO userDAO;


    public CustomerService(CustomerRepository customerRepository, userDAO userDAO) {
        this.customerRepository = customerRepository;
        this.userDAO = userDAO;
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with ID: " + customerId));
    }

    public Customer getCustomerByUserId(UUID userId) {
        return customerRepository.findByOptionalRegisteredUser_Id(userId)
                .orElseThrow(() -> new EntityNotFoundException("Customer not found with user ID: " + userId));
    }

    public Customer getCustomerByUsername(String username) {
        return customerRepository.findByUsername(username).orElse(null);
    }

    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer createCustomerWithUser(Customer customer, UUID userId) {
        customer.setOptionalRegisteredUser(userDAO.findById(userId).orElseThrow());
        return customerRepository.save(customer);
    }

    public Customer updateCustomer(Long customerId, Customer customerDetails) {
        Customer existingCustomer = getCustomerById(customerId);

        existingCustomer.setName(customerDetails.getName());
        existingCustomer.setEmail(customerDetails.getEmail());

        return customerRepository.save(existingCustomer);
    }

    public void deleteCustomer(Long customerId) {
        Customer existingCustomer = getCustomerById(customerId);
        customerRepository.delete(existingCustomer);
    }
}