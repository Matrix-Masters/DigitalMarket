package org.dsi.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.dsi.entity.Contract;
import org.dsi.entity.Product;
import org.dsi.payload.contractInfo;
import org.dsi.repo.ContractRepo;
import org.dsi.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	 
	 @Autowired
	 ContractRepo ContractRepo;
	
	@PostMapping
	public ResponseEntity<?> AddContract(
			   @RequestParam("file") MultipartFile file,
			   @RequestParam("nameContract") String nameContract,
			   @RequestParam("DoneWorkDate") Date DoneWorkDate,
			   @RequestParam("products") List<String> product,
			   @RequestParam("idUer") Long idUer
			){		
		try {
			contractInfo contr=new contractInfo(nameContract,DoneWorkDate,product,idUer);
			ContractService.AddContract(file,contr);
			return new ResponseEntity<>(product,HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
			
	}
	
	  @GetMapping("/pdf/{contractId}")
	    public ResponseEntity<?> serveFile(@PathVariable long contractId) {
	        try {
	        	Contract contract=ContractRepo.findById(contractId).get();
	            Resource file = ContractService.loadFileAsResource(contract.getNameContract());
	            return ResponseEntity.ok().body(file);
	        } catch (Exception e) {
	        	return new ResponseEntity<String>("Not Found",HttpStatus.NOT_FOUND);
	        }
	    }
	
}
