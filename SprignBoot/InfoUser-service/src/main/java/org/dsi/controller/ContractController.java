package org.dsi.controller;

import java.util.ArrayList;
import java.util.Date;

import org.dsi.entity.Product;
import org.dsi.payload.contractInfo;
import org.dsi.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

@RequestMapping("/contract")
@RestController
public class ContractController {
	
	 @Autowired
	 ContractService ContractService;
	
	@PostMapping
	public ResponseEntity<?> AddContract(
			   @RequestParam("file") MultipartFile file,
			   @RequestParam("nameContract") String nameContract,
			   @RequestParam("DoneWorkDate") Date DoneWorkDate,
			   @RequestParam("products") ArrayList<Product> product,
			   @RequestParam("idUer") Long idUer
			){		
		try {
			contractInfo contr=new contractInfo(nameContract,DoneWorkDate,product,idUer);
			ContractService.AddContract(file,contr);
			return new ResponseEntity<>("Contract Added",HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
			
	}
	
}
