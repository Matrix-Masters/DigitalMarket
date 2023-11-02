package org.dsi.controller;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.dsi.entity.InfoUser;
import org.dsi.service.GererSupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
	    @GetMapping("/filter")
	    public ResponseEntity<List<InfoUser>> filterUsers(@RequestParam(required = false) String search,
	                                      @RequestParam(required = false) int status,
	                                      @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date date_enter) {
	    	Timestamp ts=null;
	        if (date_enter != null) {
	            LocalDate localDate = date_enter.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	            ts = Timestamp.valueOf(localDate.atStartOfDay());
	        }
	    	List<InfoUser> suppliers=Gerersupplierservice.getFilteredUsers(search, status, ts);
	    	if(!suppliers.isEmpty()) {
	    		 return new ResponseEntity<>(suppliers, HttpStatus.OK);
	    	}
	    	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	       
	    }
}
