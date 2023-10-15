package org.dsi.controller;

import java.util.List;

import org.dsi.entity.Category;
import org.dsi.repository.CategoryRepo;
import org.dsi.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	CategoryService ServiceCat;
	
	@Autowired
	CategoryRepo cateRepo;
	
	@PostMapping("/AddCat")
	public ResponseEntity<?> AddCategory(@RequestBody Category cat){
		try {
			ServiceCat.AddCategory(cat);
			return ResponseEntity.ok("Category Added");
		}catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.FOUND);
		}
	}
	
	@GetMapping("/getCatg")
	public Category getCat() {
		return cateRepo.findAll().get(0);
	}
 }
