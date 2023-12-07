package org.dsi.service;

import java.util.List;

import org.dsi.entity.Product;
import org.dsi.entity.Recommandation;
import org.dsi.repository.ProductRepo;
import org.dsi.repository.RecommandationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RecommandationService {
	
	@Autowired
	RecommandationRepository recommandationRepository;
	
	@Autowired
	ProductRepo productRepository;
	
	public List<Recommandation> getRecommandations(Long id) {

	    List<Recommandation> defaultRecommandations = recommandationRepository.getDefaultRecommandations();
	    List<Recommandation> recommandationsById = recommandationRepository.getRecommandationsById(id);

	    if (recommandationsById.size() < 6) {
	       return defaultRecommandations;  
	    } else {
	       return recommandationsById;
	    }
	}
	
	
	public void addCount(Long user_id,Long product_id,int count) {
		Product product = productRepository.findProductById(product_id);
		Recommandation recommandation = recommandationRepository.checkRecommandation(user_id, product_id);
		
		if(recommandation != null) {
			
			recommandation.setCount(recommandation.getCount()+count);
			recommandationRepository.save(recommandation);
			
		}else {
			
			Recommandation newRecommandation = new Recommandation();
			newRecommandation.setUser_id(user_id);
			newRecommandation.setCount(count);
			newRecommandation.setProduct(product);
			recommandationRepository.save(newRecommandation);
			
		}
		
	}

}
