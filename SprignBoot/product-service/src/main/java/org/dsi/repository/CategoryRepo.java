package org.dsi.repository;



import java.util.List;

import org.dsi.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface CategoryRepo extends JpaRepository<Category,Long> {
	
	Category findByNom(String nom);

	@Query(value="SELECT * FROM  category  WHERE id=:id",nativeQuery=true)
	Category findCategoryById(long id);

	@Query(value="SELECT * FROM category WHERE  nom LIKE :name ",nativeQuery=true)
	Category getCategorySearchName(String name);

	@Query(value="SELECT * FROM category ",nativeQuery=true)
	List<Category> getAllCategory();
	


}
