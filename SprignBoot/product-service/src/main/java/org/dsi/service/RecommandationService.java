package org.dsi.service;

import java.util.List;

import org.dsi.entity.Recommandation;
import org.dsi.repository.RecommandationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecommandationService {
	
	@Autowired
	RecommandationRepository recommandationRepository;
	
	public List<Recommandation> getRecommandation (){
		
		return recommandationRepository.getRecommandation();
		
	}	

}
