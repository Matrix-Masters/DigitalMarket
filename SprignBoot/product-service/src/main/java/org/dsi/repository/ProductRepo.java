package org.dsi.repository;

import java.util.List;

import org.dsi.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
	   
	    /*@Query("SELECT p,pi.image_product,pi.image_priorite FROM Product p left JOIN product_images pi ON pi.product_id = p.id WHERE p.status = 1")
	    Page<Product> getProductPaginate(Pageable pageable);*/
		
		@Query(value="select * from product where status=1 ",nativeQuery=true)
		Page<Product> getProductPaginate(Pageable pageable );
		
		@Query(value="SELECT * FROM product WHERE status = 1 AND name LIKE %:name% ",nativeQuery=true)
		Page<Product> getProductPaginateSearch(String name,Pageable pageable );
		
		@Query(value="select * from product where status=2 ",nativeQuery=true)
		Page<Product> getRefusedProducts(Pageable pageable);
		
		@Query(value="select * from product where status=0",nativeQuery=true)
		Page<Product> getPendingProducts(Pageable pageable);
		
		 @Query(value = "SELECT * FROM product where status=1 ORDER BY created_at DESC LIMIT 8",nativeQuery=true)
		   List<Product> getProductNewArrivals();
		 
		 @Query(value="SELECT * FROM product WHERE  status = 1 and category_id=:cat_id",nativeQuery=true)
			Page<Product> getProductByCategoryPaginate(Long cat_id,Pageable pageable);
		 
		 @Query(value="SELECT * FROM product WHERE  status = 1 and category_id=:cat_id and prix>= :min and prix<= :max",nativeQuery=true)
			Page<Product> getProductByCategoryPaginatePrice(Long cat_id, double min, double max,Pageable pageable);
		 
		 @Query(value="SELECT * FROM product WHERE  status = 1 and category_id=:cat_id and name LIKE %:name% ",nativeQuery=true)
			Page<Product> getProductByCategoryPaginateSearch(Long cat_id,String name,Pageable pageable );
		 
		 @Query(value="SELECT * FROM product WHERE  status = 1 and category_id=:cat_id  and prix>= :min and prix <= :max and name LIKE %:name%",nativeQuery=true)
			Page<Product> getProductByCategoryPaginatePriceSearch(Long cat_id,double min,double max,String name,Pageable pageable );
		 
		 @Query(value="SELECT MAX(prix) AS max_price FROM product where status = 1",nativeQuery=true)
		 double getMaxPrice();
		 
		 @Query(value = "SELECT * from product WHERE status = :status And id_user=:id",nativeQuery = true)
		 Page<Product> getProductsFournisseur(int status,long id,Pageable pageable);
		 
		 @Query(value="SELECT * from product WHERE status = :status And id_user=:id and name LIKE %:name% ",nativeQuery=true)
		 Page<Product> getProductsFournisseurByName(int status,long id,String name,Pageable pageable );

		
		  @Query(value = "SELECT id FROM Product  WHERE id_user = :id")
		  List<Integer> getProductsByIdUser(long id);
		 
}
