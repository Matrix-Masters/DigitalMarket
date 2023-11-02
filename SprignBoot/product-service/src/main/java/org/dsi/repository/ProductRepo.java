package org.dsi.repository;

import java.util.List;

import org.dsi.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ProductRepo extends JpaRepository<Product,Long> {
	
	   @Query(value = "SELECT p FROM Product p WHERE p.category.id = :id")
	   List<Product> getProductsByCategoryId(long id);
	   
	   @Query(value = "SELECT p FROM Product p WHERE p.category.id = null and p.status=1")
	   List<Product> ProductsWithoutCategory();
	   
	   @Query(value = "SELECT p FROM Product p WHERE p.id = :id")
	   Product ProductWithId(long id);
	   
	   @Query(value="SELECT * FROM  product  WHERE id=:id",nativeQuery=true)
		Product findProductById(Long id);
		
		@Query(value="select * from product where status=1 ",nativeQuery=true)
		Page<Product> getProductPaginate(Pageable pageable );
		
		@Query(value="SELECT * FROM product WHERE status = 1 AND name LIKE :name ",nativeQuery=true)
		Page<Product> getProductPaginateSearch(String name,Pageable pageable );
		
		@Query(value="select * from product where status=2 ",nativeQuery=true)
		Page<Product> getRefusedProducts(Pageable pageable);
		
		@Query(value="select * from product where status=0",nativeQuery=true)
		Page<Product> getPendingProducts(Pageable pageable);
		
		 @Query(value = "SELECT * FROM product where status=1 ORDER BY created_at DESC LIMIT 8",nativeQuery=true)
		   List<Product> getProductNewArrivals();
		 
		 @Query(value="SELECT * FROM product WHERE category_id=:id and status = 1 and name LIKE :name ",nativeQuery=true)
			Page<Product> getProductByCategoryPaginateSearch(Long id,String name,Pageable pageable );
		 
		 @Query(value="SELECT * FROM product WHERE category_id=:id and status = 1",nativeQuery=true)
			Page<Product> getProductByCategoryPaginate(Long id,Pageable pageable );
}
