package org.dsi.service;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.dsi.entity.Category;
import org.dsi.entity.Product;
import org.dsi.repository.NodeSync;
import org.dsi.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
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
				//JSONObject jsoUser=new JSONObject();
	  			//jsoUser.appendField("categoryId",cat.getId());
				//Product prod1=nodesync.UpdateIdProducts(id, jsoUser);
		  	}
	  }
	  
	  
}
