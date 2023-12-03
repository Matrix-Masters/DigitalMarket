package org.dsi.repository;

import java.util.List;

import org.dsi.entity.Product;
import org.dsi.entity.Recommandation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface RecommandationRepository extends JpaRepository<Recommandation, Long>{
	
	  @Query(value = "SELECT * FROM Recommandation",nativeQuery=true)
	   List<Recommandation> getRecommandation();

}
