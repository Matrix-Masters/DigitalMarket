package org.dsi.controller;

import java.util.List;

import org.dsi.entity.InfoUser;
import org.dsi.service.GererEmployersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/GererEmployer")
public class gererEmployerController {
	@Autowired
	GererEmployersService gererEmployersService;
	@GetMapping("/getAllEmployers")
	public ResponseEntity<List<InfoUser>> getAllEmployers(){
		List<InfoUser> Employees = gererEmployersService.GetAllEmployers();
		 if (Employees.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(Employees, HttpStatus.OK);
	}
}
