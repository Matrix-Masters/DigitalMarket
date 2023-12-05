package org.dsi.service;

import java.util.List;

import org.dsi.entity.Product;
import org.dsi.entity.Recommandation;
import org.dsi.repository.RecommandationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecommandationService {
	
	@Autowired
	RecommandationRepository recommandationRepository;
	
	public List<Recommandation> getRecommandations(Long id) {

	    List<Recommandation> defaultRecommandations = recommandationRepository.getDefaultRecommandations();
	    List<Recommandation> recommandationsById = recommandationRepository.getRecommandationsById(id);

	    if (recommandationsById.size() < 6) {
	       return defaultRecommandations;  
	    } else {
	       return recommandationsById;
	    }
	}

}
