package org.dsi.controller;

import org.dsi.entity.Recommandation;
import org.dsi.service.RecommandationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recommandations")
public class RecommandationController {

	@Autowired
	RecommandationService recommandationService;
	
	@GetMapping("/getRecommandations")
	public ResponseEntity<?> getRecommandation(){
		
		return ResponseEntity.ok(recommandationService.getRecommandation());
		
	}
}
