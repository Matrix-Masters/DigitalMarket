package org.dsi.repository;

import java.util.List;
import org.springframework.data.repository.query.Param;
import org.dsi.entity.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface ImageProduct extends JpaRepository<ProductImages,Long> {
	
	@Query(value = "SELECT pi FROM ProductImages pi WHERE pi.product.id = :id order by pi.ImagePriorite")
	List<ProductImages> getImagesProducts(@Param("id") long id);
 
}
