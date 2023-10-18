package org.dsi.service;

import java.io.Console;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import org.dsi.entity.Product;
import org.dsi.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import Payload.ProducInfo;


@Service
public class ProductService {

	  @Autowired
	  ProductRepo ProductRepo;
	  
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
				prod.setQuantite(info.getQuantite());
				ProductRepo.save(prod);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
	  }
	  
	  
}
