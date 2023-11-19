package org.dsi.service;

import org.dsi.entity.Category;
import org.dsi.repository.CategoryRepo;
import org.dsi.repository.NodeSync;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONObject;

@Service
public class CategoryService {
	
	 @Autowired
	 CategoryRepo RepoCat;
	 

	 public void AddCategory(Category cat) throws Exception {
		   if(RepoCat.findByNom(cat.getNom()) != null) {
			   throw new Exception("Category Already Exist"); 
		   }else {
				RepoCat.save(cat);
		   }
	 }
	 
	 
}
