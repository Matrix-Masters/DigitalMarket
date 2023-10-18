package org.dsi.repository;

import java.util.List;

import org.dsi.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductRepo extends JpaRepository<Product,Long> {
	
	   @Query(value = "SELECT p FROM Product p WHERE p.category.id = :id")
	   List<Product> getProductsByCategoryId(long id);
	   
	   @Query(value = "SELECT p FROM Product p WHERE p.category.id = null")
	   List<Product> ProductsWithoutCategory();
	   
	   @Query(value = "SELECT p FROM Product p WHERE p.id = :id")
	   Product ProductWithId(long id);
}
