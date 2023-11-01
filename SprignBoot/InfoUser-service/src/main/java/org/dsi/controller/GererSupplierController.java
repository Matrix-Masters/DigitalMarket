package org.dsi.controller;

import java.util.List;

import org.dsi.entity.InfoUser;
import org.dsi.service.GererSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/GererSupplier")
public class GererSupplierController {
	  @Autowired
	    private GererSupplierService Gerersupplierservice;

	    @GetMapping("/suppliers")
	    public ResponseEntity<List<InfoUser>> getSuppliers() {
	        List<InfoUser> suppliers = Gerersupplierservice.getSuppliers();
	        if (suppliers.isEmpty()) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	        return new ResponseEntity<>(suppliers, HttpStatus.OK);
	    }
	    @PutMapping("/AcceptSupplier")
	    public  ResponseEntity<String> verifySupplier(@RequestParam("id") Long supplierId) {
	    	InfoUser infoUser=Gerersupplierservice.verifySupplier(supplierId);
	    	if(infoUser!=null) {
	    		return new ResponseEntity<>("supplier accepted", HttpStatus.OK); 
	    	}
	    	return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
	    }
	    @PutMapping("/RefuseSupplier")
	    public  ResponseEntity<String> RefuseSupplier(@RequestParam("id") Long supplierId) {
	    	InfoUser infoUser=Gerersupplierservice.RefuseSupplier(supplierId);
	    	if(infoUser!=null) {
	    		return new ResponseEntity<>("supplier Refused", HttpStatus.OK); 
	    	}
	    	return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
	    }
	    
}
