package org.dsi.controller;

import java.util.List;

import org.dsi.entity.InfoUser;
import org.dsi.payload.UserInfo;
import org.dsi.service.GererEmployersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/GererEmployer")
public class gererEmployerController {
	
	@Autowired
	GererEmployersService gererEmployersService;
	
	@GetMapping("/getAllEmployers")
	public ResponseEntity<List<InfoUser>> getAllEmployers(@RequestParam(required = false) String search) {
	    if (search != null && !search.isEmpty()) {
	        List<InfoUser> filteredEmployees = gererEmployersService.searchEmployeesByName(search);
	        if (filteredEmployees.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(filteredEmployees, HttpStatus.OK);
	    } else {
	        List<InfoUser> employees = gererEmployersService.GetAllEmployers();
	        if (employees.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(employees, HttpStatus.OK);
	    }
	}

	@PostMapping("/AddEmployer")
	public ResponseEntity<InfoUser> AddEmployer(@RequestBody UserInfo Employer) {
	InfoUser newEmployer=gererEmployersService.AddEmploye(Employer);
	if(newEmployer!=null) {
		return new ResponseEntity<>(newEmployer, HttpStatus.OK);
	}
	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/RefuseEmployer")
	public ResponseEntity<InfoUser> RefuseEmployer(@RequestParam long id){
		InfoUser emp=gererEmployersService.RefuseEmployer(id);
		if(emp!=null) {
			return new ResponseEntity<>(emp, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
