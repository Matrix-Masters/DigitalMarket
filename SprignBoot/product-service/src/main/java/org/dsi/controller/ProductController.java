package org.dsi.controller;

import org.dsi.entity.Category;

import org.dsi.entity.Product;
import org.dsi.entity.ProductImages;
import org.dsi.repository.ProductRepo;
import org.dsi.service.FileUpload;
import org.dsi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import Payload.PaginateInfo;
import Payload.ProducInfo;
import net.minidev.json.JSONObject;

import java.awt.image.BufferedImage;
import java.io.File;
import java.lang.Long;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

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
			@RequestParam("name") String name,@RequestParam("quantite") int Quantite,
			@RequestParam("prix") double prix,@RequestParam(name="category",required = false) Category category){
		  			ProducInfo product=new ProducInfo(name,Quantite,prix,category,desc);
		  			ProductService.AddProductService(product,file);
		  			return new ResponseEntity<ProducInfo>(product,HttpStatus.OK);
	 }
	
	@GetMapping("/GetDetailsProd")
	public ResponseEntity<?> GetProduct(@RequestParam("id") Long id){
		Product prod=ProductRepo.ProductWithId(id);
		JSONObject product=new JSONObject();
		product.appendField("name", prod.getName());
		product.appendField("image",prod.getImageProduct());
		product.appendField("id",id);
		product.appendField("prix", prod.getPrix());
		product.appendField("description",prod.getDescription());
		return ResponseEntity.ok(product);
	}
	
	@PutMapping("/IncrementNbSales")
	public ResponseEntity<?> IncrementNbSales(@RequestParam("id") Long id){
		Product product = ProductRepo.findProductById(id);
		product.setNbSales(product.getNbSales()+1);
		ProductRepo.save(product);
		return ResponseEntity.ok(product);
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
	public ResponseEntity<?> AcceptProduct(@RequestParam("id") long id,@RequestBody ProducInfo prod){
		try {
			ProductService.AcceptProduct(id);
			return ResponseEntity.ok(Map.of("message", "product accepted succesfully"));
		}catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}

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
	
	@GetMapping("/getProductsNewArrivals")
	public ResponseEntity<?> getProductsNewArrivals(){
			try {
				List<Product> products = ProductService.getProductNewArrivals();
				return ResponseEntity.ok(products);
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().body("No Products found");
			}
		
	}
	
	
	@GetMapping("/ProductsByIdCategoriePaginate")
	public ResponseEntity<?> ProductsByIdCategoriePaginate(
			@RequestParam(name="id") Long cat_id,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "per_page", defaultValue = "2") int size,
			@RequestParam(name = "search", defaultValue = "") String name,
			@RequestParam(name = "min", defaultValue = "0") double min,
			@RequestParam(name = "max", defaultValue = "0") double max){
		
		if(max==0) {
			max=ProductRepo.getMaxPrice();
		}
		
		if (page < 0 || size <= 0 ) {
	        return ResponseEntity.badRequest().body("Invalid page or per_page values.");
	 		}
		
		try {
	        Page<Product> products;
	        
	        if(min !=0 && name.isEmpty()==true) {
	        	
	        	products=ProductRepo.getProductByCategoryPaginatePrice(cat_id,min,max,PageRequest.of(page, size));
	        	
	        }else if(min ==0 && name.isEmpty()==false) {
	        	
	        	products=ProductRepo.getProductByCategoryPaginateSearch(cat_id,name,PageRequest.of(page, size));
	        	
	        }else if(min !=0 && name.isEmpty()==false) {
	        	
	        	products=ProductRepo.getProductByCategoryPaginatePriceSearch(cat_id,min,max,name,PageRequest.of(page, size));
	        	
	        }else {
	        	
	        	products=ProductRepo.getProductByCategoryPaginate(cat_id,PageRequest.of(page, size));	
	        }
	       	
	        int total = products.getTotalPages();
	        int[] count_page = new int[total];
	        
	        for (int i = 0; i < total; i++) {
	            count_page[i] = i;
	        }

	        PaginateInfo data = new PaginateInfo(count_page, products, page);
	        return ResponseEntity.ok(data);
	        
		}catch (Exception e) {
		    	
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching paginated products.");
		    }
	}

	@GetMapping("/getMaxPrice")
	public ResponseEntity<?> getMaxPrice(){
		double max = ProductRepo.getMaxPrice();
		if(max != 0 ) {
			return ResponseEntity.ok(max);	
		}else {
			return ResponseEntity.badRequest().body("No Products available");
		}
		
	}
	
	
	@GetMapping("/GetProductsFournisseur")
	public ResponseEntity<?> GetProductsFournisseur(
			@RequestParam(name="search",defaultValue="") String name,
    		@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "per_page", defaultValue = "4") int size,
			@RequestParam(name = "status",defaultValue = "1") int status,
			@RequestParam(name = "id") Long idFournisseur
			){
		if (page < 0 || size <= 0 ) {
	        return ResponseEntity.badRequest().body("Invalid page or per_page values.");
	 		}
	    
	 		try {
	        Page<Product> products;
	        if(name.isEmpty()==true) {
	        	products=ProductRepo.getProductsFournisseur(status,idFournisseur,PageRequest.of(page, size));
	        } else {
	        	products=ProductRepo.getProductsFournisseurByName(status,idFournisseur,name,PageRequest.of(page, size));
	        }
	        
	        int total = products.getTotalPages();
	        int[] count_page = new int[total];
	        for (int i = 0; i < total; i++) {
	            count_page[i] = i;
	        }

	        JSONObject json=new JSONObject();
	        json.appendField("data",products);
	        json.appendField("count_page", count_page);
	        json.appendField("page", page);
	        return ResponseEntity.ok(json);
	        
	    } catch (Exception e) {
	    	
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching paginated products.");
	    }
	}
	
	
	@PutMapping("/ChangerQuantiteProduct")
	public ResponseEntity<?> ChangerQuantiteProduct(@RequestParam("id") Long id,@RequestParam("qte") int qte){
		try {
			 ProductService.ChangerQuantite(id, qte);
		        return ResponseEntity.status(HttpStatus.OK).body("Product Updated");
		} catch (Exception e) {
			e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching paginated products.");
		}

	}
	
	@GetMapping("/getProductsByIdUser")
	public ResponseEntity<?> getProductsByIdUser(@RequestParam("id") long id){
		try {
				List<Integer> products=ProductService.getProductsByIdUser(id);
		        return ResponseEntity.status(HttpStatus.OK).body(products);
		} catch (Exception e) {
			e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while fetching paginated products.");
		}
	}
	
	
	
	@PostMapping("/AddImages")
	public ResponseEntity<?> AddImages(@RequestParam("file") MultipartFile file,@RequestParam("idProduct") long idProduct) throws Exception{
				  ProductService.AddImagesService(file, idProduct);
				  JSONObject json=new JSONObject();
			      json.appendField("data","Add images");
			      return ResponseEntity.ok(json);	
	}
	
	@GetMapping("/ImageProducts")
	public ResponseEntity<?> ImageProducts(@RequestParam("id") long id){
			  List<ProductImages> products=ProductService.ImagesProducts(id);
			  JSONObject json=new JSONObject();
		      json.appendField("data",products);
		      return ResponseEntity.ok(json);
	}
	
	@PutMapping("/ChangerPriorite")
	public ResponseEntity<?> ChangerPriorite(@RequestParam("idProd1") long idProd1,@RequestParam("idProd2") long idProd2){
		  ProductService.ChangerPriorite(idProd1,idProd2);
		  JSONObject json=new JSONObject();
	      json.appendField("data","Change with success");
	      return ResponseEntity.ok(json);
	}

}
