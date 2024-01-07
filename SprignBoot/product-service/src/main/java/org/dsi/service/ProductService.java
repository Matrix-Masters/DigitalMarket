package org.dsi.service;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.dsi.entity.Category;
import org.dsi.entity.Product;
import org.dsi.entity.ProductImages;
import org.dsi.repository.ImageProduct;
import org.dsi.repository.NodeSync;
import org.dsi.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import Payload.ProducInfo;
import net.minidev.json.JSONObject;


@Service
public class ProductService {

	  @Autowired
	  ProductRepo ProductRepo;
	  
	  @Autowired
	  ImageProduct ImageProductRepo;
	  
		@Autowired
		private NodeSync nodesync;
	  
	  public void AddProductService(ProducInfo info,MultipartFile file) {
		    String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		    String fileName =  timestamp+"_"+file.getOriginalFilename();
			String uploadDir = "ProductPhotos/";
			Product prod=new Product();
			try {
				FileUpload.saveFile(uploadDir, fileName, file);
				prod.setCategory(info.getCategory());
				prod.setImageProduct(fileName);
				prod.setName(info.getName());
				prod.setPrix(info.getPrix());
				prod.setIdUser(info.getId());
				prod.setDescription(info.getDescription());
				prod.setQuantite(info.getQuantite());
				ProductRepo.save(prod);
				/*JSONObject jsoUser=new JSONObject();
	  			jsoUser.appendField("title",info.getName());
	  			jsoUser.appendField("Description",info.getDescription());
	  			jsoUser.appendField("ImageProduct",fileName);
	  			jsoUser.appendField("Quantite",info.getQuantite());
	  			jsoUser.appendField("prix",info.getQuantite());
	  			jsoUser.appendField("idUser",0);
	  			jsoUser.appendField("idSpring",prod.getId());*/
	  			//String prod1=nodesync.addProd(jsoUser);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
	  }
	  
	  public void AddImagesService(MultipartFile file,Long id) throws Exception {
		    String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		    String fileName =  timestamp+"_"+file.getOriginalFilename();
			String uploadDir = "ProductPhotos/";
			ProductImages prod=new ProductImages();
			try {
				FileUpload.saveFile(uploadDir, fileName, file);
				Product product=ProductRepo.findById(id).get();
				List<ProductImages> imagesPrio=this.ImagesProducts(id);
				if (imagesPrio.size()!=0) {
					prod.setImagePriorite(imagesPrio.get(imagesPrio.size()-1).getImagePriorite()+1);
					product.setImageProduct(imagesPrio.get(0).getImageProduct());
					ProductRepo.save(product);
				}else {
					prod.setImagePriorite((long) 0);
					product.setImageProduct(fileName);
					ProductRepo.save(product);
				}
				prod.setImageProduct(fileName);
				prod.setProduct(product);
				ImageProductRepo.save(prod);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
	  }
	  
	  public void LibereProd(long id)throws Exception {
		  	Product prod=ProductRepo.ProductWithId(id);
		  	if(prod==null) {
		  	   throw new Exception("Product Not Found");
		  	}else {
		  		prod.setCategory(null);
				ProductRepo.save(prod);
				//Product prod1=nodesync.LibererProduct(id);
		  	}
	  }
	  
	  public void RejectProduct(long id)throws Exception {
		  Product prod=ProductRepo.ProductWithId(id);
		  	if(prod==null) {
		  	   throw new Exception("Product Not Found");
		  	}else {
		  		prod.setStatus(2);
				ProductRepo.save(prod);
				//Product prod1=nodesync.RejectProduct(id);
		  	}
	  }

		public void AcceptProduct(long id)throws Exception{
				Product prod=ProductRepo.ProductWithId(id);
			  	if(prod==null) {
			  	   throw new Exception("Product Not Found");
			  	}else {
			  		prod.setStatus(1);
					ProductRepo.save(prod);
					//Product prod1=nodesync.AccepterProduct(id);
			  	}
		}
	  
	  public void UpdateIdProduct(long id,Category cat) throws Exception{
		  Product prod=ProductRepo.ProductWithId(id);
		  	if(prod==null) {
		  	   throw new Exception("Product Not Found");
		  	}else {
		  		prod.setCategory(cat);
				ProductRepo.save(prod);
		  	}
	  }
	  
	  
	  public void ChangerQuantite(long id,int qte) throws Exception{
		  Product prod=ProductRepo.ProductWithId(id);
		  	if(prod==null) {
		  	   throw new Exception("Product Not Found");
		  	}else {
		  		prod.setQuantite(prod.getQuantite()-qte);
				ProductRepo.save(prod);
		  	}
	  }
	  
	  public List<Product> getProductNewArrivals() throws Exception {
		  
		    List<Product> products = ProductRepo.getProductNewArrivals();
		    
		    if (products.isEmpty()) {
		        throw new Exception("Products Not Found");
		    }
		    return products;
		}
	  
	  	public List<Integer> getProductsByIdUser(long id) throws Exception {
		  
		    List<Integer> products = ProductRepo.getProductsByIdUser(id);
		    
		    if (products.isEmpty()) {
		        throw new Exception("Products Not Found");
		    }
		    return products;
		}
	  	
		public List<ProductImages> ImagesProducts(long id) {
		    List<ProductImages> productsImages = ImageProductRepo.getImagesProducts(id);
		    return productsImages;
		}
		
		public void ChangerPriorite(long idProd1,long idProd2,long id) {
			
			long prior1=ImageProductRepo.findById(idProd1).get().getImagePriorite();
			long prior2=ImageProductRepo.findById(idProd2).get().getImagePriorite();
			
			ProductImages prod1=ImageProductRepo.findById(idProd1).get();
			prod1.setImagePriorite(prior2);
			
			ProductImages prod2=ImageProductRepo.findById(idProd2).get();
			prod2.setImagePriorite(prior1);
	
			ImageProductRepo.save(prod1);
			ImageProductRepo.save(prod2);
			
			Product product=ProductRepo.findById(id).get();
			List<ProductImages> imagesPrio=this.ImagesProducts(id);
			product.setImageProduct(imagesPrio.get(0).getImageProduct());
			ProductRepo.save(product);
			
		}
		
		public void deleteImage(long id) {
			ImageProductRepo.deleteById(id);
		}
		
		public void IncrementQteProd(long id,int qte) throws Exception {
			    Product prod=ProductRepo.ProductWithId(id);
			  	if(prod==null) {
			  	   throw new Exception("Product Not Found");
			  	}else {
			  		prod.setQuantite(qte);
					ProductRepo.save(prod);
			  	}
		}
	  
}
