package org.dsi.controller;

import org.dsi.entity.Category;

import org.dsi.entity.Product;
import org.dsi.repository.NodeSync;
import org.dsi.repository.ProductRepo;
import org.dsi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import Payload.PaginateInfo;
import Payload.ProducInfo;
import net.minidev.json.JSONObject;
import java.lang.Long;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/products")
public class ProductController {
 
	@Autowired
	ProductService ProductService;
	
	@Autowired
	ProductRepo ProductRepo;

	@PostMapping("/AddProduct")
	public ResponseEntity<?> AddProduct(@RequestParam("file") MultipartFile file,
			@RequestParam("description") String desc,
			@RequestParam("name") String name,@RequestParam("Quantite") int Quantite,
			@RequestParam("prix") double prix,@RequestParam(name="category",required = false) Category category){
		  			ProducInfo product=new ProducInfo(name,Quantite,prix,category,desc);
		  			ProductService.AddProductService(product,file);
		  			return new ResponseEntity<ProducInfo>(product,HttpStatus.OK);
	 }
	
	@GetMapping("/AllProduct")
	public ResponseEntity<?> getAllProductPaginate(
    		@RequestParam(name="search",defaultValue="") String name,
    		@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "per_page", defaultValue = "2") int size){
    	
	 	
	 	if (page < 0 || size <= 0 ) {
	        return ResponseEntity.badRequest().body("Invalid page or per_page values.");
	 		}
	    
	 		try {
	        Page<Product> product;
	        if(name.isEmpty()==true) {
	        	product=ProductRepo.getProductPaginate(PageRequest.of(page, size));
	        } else {
	        	product=ProductRepo.getProductPaginateSearch(name,PageRequest.of(page, size));
	        }
	        
	        int total = product.getTotalPages();
	        int[] count_page = new int[total];
	        for (int i = 0; i < total; i++) {
	            count_page[i] = i;
	        }

	        PaginateInfo data = new PaginateInfo(count_page, product, page);
	        return ResponseEntity.ok(data);
	        
	    } catch (Exception e) {
	    	
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching paginated products.");
	    }
    }
	
	@GetMapping("/ProductsWithoutCategory")
	public ResponseEntity<?> ProductsWithoutCategory(){
		return ResponseEntity.ok(ProductRepo.ProductsWithoutCategory());
	}
	
	@PutMapping("/LibererProduct")
	public ResponseEntity<?> LibererProduct(@RequestParam("id") long id){
		try {
			ProductService.LibereProd(id);
			return  ResponseEntity.ok("Product Upated");
		}catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/ProductsByIdCategorie")
	public ResponseEntity<?> ProductsByIdCategorie(@RequestParam("id") long id){
		return ResponseEntity.ok(ProductRepo.getProductsByCategoryId(id));
	}
	
	@PutMapping("/UpdateIdProducts")
	public ResponseEntity<?> UpdateIdProduct(@RequestParam("id") long id,@RequestBody Category cat){
		try {
			ProductService.UpdateIdProduct(id, cat);
			return  ResponseEntity.ok("Product Upated");
		}catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	

	@PutMapping("/RejectProduct")
	public ResponseEntity<?> RejectProduct(@RequestParam("id") long id){
		try {
			ProductService.RejectProduct(id);
			return ResponseEntity.ok(Map.of("message", "product rejected succesfully"));
		}catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}

	
	@DeleteMapping("/DeleteAll")
	public ResponseEntity<?> DeleteAllProducts(){
		List<Product> products = ProductRepo.findAll();
		try {
			if(products.isEmpty()) {
				
				return ResponseEntity.ok("No Products is available to delete , please check later");
			}else {
				
				ProductRepo.deleteAll();

				return ResponseEntity.ok("All Products deleted successfully");
			}
		} catch (SecurityException e) {
			
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Permission denied for this operation.");
	        
	    } catch (Exception e) {
	    	
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting products.");
	    }
	}
	
	@DeleteMapping("/DeleteProductById")
	public ResponseEntity<?> DeleteProductById(@RequestParam("id") Long id){
		Product product = ProductRepo.findProductById(id);
		try {
			if(product == null) {
				String message = "This Product is not available , please check again";
	            return ResponseEntity.ok(message);
			}else {
				ProductRepo.delete(product);
				return ResponseEntity.ok("Product deleted successfully");
			}
		}catch(Exception e) {
			 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while deleting the product.");
		}		
	}
	
	@PutMapping("/AcceptProduct")
	public ResponseEntity<?> AcceptProduct(@RequestParam("id") long id){
		try {
			ProductService.AcceptProduct(id);
			 return ResponseEntity.ok(Map.of("message", "product accepted succesfully"));
		}catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
  /*
    @PutMapping("/AcceptProduct")
	public ResponseEntity<?> AcceptProduct(@RequestParam("id") long id){
		Product prod=ProductRepo.ProductWithId(id);
		prod.setStatus(1);
		ProductRepo.save(prod);
		return  ResponseEntity.ok().body("Product accepted");
	}
	 @PutMapping("/RefuseProduct")
	 public ResponseEntity<?> RefuseProduct(@RequestParam("id") long id){
		Product prod=ProductRepo.ProductWithId(id);
		prod.setStatus(2);
		ProductRepo.save(prod);
		return  ResponseEntity.ok().body("Product refused");
	}
	*/
	
	@PutMapping("/PendingProduct")
	public ResponseEntity<?> PendingProduct(@RequestParam("id") Long id){
		Product prod=ProductRepo.ProductWithId(id);
		prod.setStatus(0);
		ProductRepo.save(prod);
		return  ResponseEntity.ok().body("Product pending");
	}
	
	@GetMapping("/RefusedProducts")
	public ResponseEntity<?> getRefusedProducts(
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "per_page", defaultValue = "2") int size){
		if (page < 0 || size <= 0 ) {
	        return ResponseEntity.badRequest().body("Invalid page or per_page values.");
	 		}
		
		try {
			Page<Product> RefusedProduct;
			RefusedProduct=ProductRepo.getRefusedProducts(PageRequest.of(page, size));
	        int total = RefusedProduct.getTotalPages();
	        int[] count_page = new int[total];
	        for (int i = 0; i < total; i++) {
	            count_page[i] = i;
	        }

	        PaginateInfo data = new PaginateInfo(count_page, RefusedProduct, page);
	        return ResponseEntity.ok(data);
	        
	    } catch (Exception e) {
	    	
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching paginated products.");
	    }
		
	}
	@GetMapping("/PendingProduct")
	public ResponseEntity<?> getPundingProduct(
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "per_page", defaultValue = "2") int size){
		if (page < 0 || size <= 0 ) {
	        return ResponseEntity.badRequest().body("Invalid page or per_page values.");
	 		}
		
		try {
			Page<Product> pendingProduct;
			pendingProduct=ProductRepo.getPendingProducts(PageRequest.of(page, size));
	        int total = pendingProduct.getTotalPages();
	        int[] count_page = new int[total];
	        for (int i = 0; i < total; i++) {
	            count_page[i] = i;
	        }

	        PaginateInfo data = new PaginateInfo(count_page, pendingProduct, page);
	        return ResponseEntity.ok(data);
	        
	    } catch (Exception e) {
	    	
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching paginated products.");
	    }
		
	}

	

}
