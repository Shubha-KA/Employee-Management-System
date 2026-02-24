package com.ems.service;

import java.util.List;

import com.ems.model.Employee;
import com.ems.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Override
    public List<Employee> searchByName(String name){
        return repository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return repository.findById(id).orElseThrow(() ->
                new RuntimeException("Employee not found"));
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Employee existing = repository.findById(id).orElseThrow(() ->
                new RuntimeException("Employee not found"));

        existing.setName(employee.getName());
        existing.setEmail(employee.getEmail());
        existing.setSalary(employee.getSalary());

        return repository.save(existing);
    }

    @Override
    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }
}
