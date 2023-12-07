package org.dsi.controller;


import java.util.List;

import org.dsi.entity.Recommandation;
import org.dsi.service.RecommandationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recommandations")
public class RecommandationController {
	
	@Autowired
	RecommandationService recommandationService;
	
	
	@GetMapping("/getRecommandations")
	public ResponseEntity<?> getRecommandations(@RequestParam("id") Long id){
		try {
			
			List<Recommandation> recommandations = recommandationService.getRecommandations(id);
			return ResponseEntity.ok(recommandations);
			
		}catch(Exception e) {
			
			return null;
		}
		
	}
	
	@PostMapping("/addRecommandation")
	public ResponseEntity<?> addRecommandation(@RequestParam("user_id") Long user_id,@RequestParam("product_id") Long product_id, @RequestParam("count") int count){
		
		try {
			
			recommandationService.addCount(user_id, product_id, count);
			return ResponseEntity.ok("Recommandation added or updated successfuly ");
			
		}catch(Exception e) {
			
			return null;
		}
	}

}
