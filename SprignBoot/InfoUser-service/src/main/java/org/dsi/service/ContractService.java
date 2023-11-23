package org.dsi.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.sql.rowset.serial.SerialBlob;

import org.dsi.entity.Contract;
import org.dsi.entity.InfoUser;
import org.dsi.entity.Product;
import org.dsi.payload.contractInfo;
import org.dsi.repo.ContractRepo;
import org.dsi.repo.ProductRepo;
import org.dsi.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class ContractService {
	
	@Autowired
	ContractRepo ContractRepo;
	
	@Autowired
	UserRepo userrepo;
	
	@Autowired
	UserInfoService userinfo;
	
	@Autowired
	ProductRepo ProductRepo;
	
	public void AddContract(MultipartFile file, contractInfo contractInfo) throws Exception {
	    String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
	    String fileName = timestamp + "_" + file.getOriginalFilename();
	    String uploadDir = "ContractPhoto";
	    
	    Contract contract = new Contract();
	    try {
	        FileUpload.saveFile(uploadDir, fileName, file);
	        contract.setNameContract(fileName);
	        contract.setDoneWorkDate(contractInfo.getDoneWorkDate());
	        contract.setListProduct(new ArrayList<>());
	       // contract.setListProduct(contractInfo.getListProduct());
	        Contract contract_returned = ContractRepo.save(contract);

	        for (String product : contractInfo.getListProduct()) {
	            Product newProduct = new Product();
	            newProduct.setName(product);
	            newProduct.setContract_tab(contract_returned);
	            ProductRepo.save(newProduct);
	            contract_returned.getListProduct().add(newProduct);
	        }
	        InfoUser user = userinfo.getInfoUserById(contractInfo.getIdUer());
	        user.setContract(contract_returned);
	        userrepo.save(user);
	    } catch (IllegalStateException | IOException e) {
	        e.printStackTrace();
	        throw new Exception("Failed to add contract: " + e.getMessage());
	    }
	}
	
	 public Resource loadFileAsResource(String fileName) throws MalformedURLException {
	        Path filePath = Paths.get("ContractPhoto").resolve(fileName).normalize();
	        Resource resource = new UrlResource(filePath.toUri());
	        if (resource.exists()) {
	            return resource;
	        } else {
	            throw new RuntimeException("File not found: " + fileName);
	        }
	    }

	  
	 
}
