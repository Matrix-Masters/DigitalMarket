package org.dsi.service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.sql.rowset.serial.SerialBlob;

import org.dsi.entity.Contract;
import org.dsi.entity.InfoUser;
import org.dsi.entity.Product;
import org.dsi.payload.contractInfo;
import org.dsi.repo.ContractRepo;
import org.dsi.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
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
	
	  public void AddContract(MultipartFile file,contractInfo contractInfo) throws Exception {
		    String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
		    String fileName =  timestamp+"_"+file.getOriginalFilename();
			String uploadDir = "ContractPhoto/";
			Contract contract=new Contract();
			ArrayList<Product> listproduct=new ArrayList<>();
			try {
				//Blob pdfBlob = FileUpload.saveFile(uploadDir, fileName, file);
				FileUpload.saveFile(uploadDir, fileName, file);
				contract.setNameContract(fileName);
				contract.setDoneWorkDate(contractInfo.getDoneWorkDate());
				for(int i=0;i<contractInfo.getListProduct().size();i++) {
					listproduct.add(contractInfo.getListProduct().get(i));
				}
				ContractRepo.save(contract);
				InfoUser user=userinfo.getInfoUserById(contractInfo.getIdUer());
				user.setContract(contract);
				userrepo.save(user);
			} catch (IllegalStateException | IOException e) {
				e.printStackTrace();
			}
	  }
	  
	  private Blob convertMultipartFileToBlob(MultipartFile file) throws IOException, SQLException {
	        try (InputStream inputStream = file.getInputStream()) {
	            byte[] bytes = new byte[(int) file.getSize()];
	            inputStream.read(bytes);
	            return new SerialBlob(bytes);
	        }
	    }
}
