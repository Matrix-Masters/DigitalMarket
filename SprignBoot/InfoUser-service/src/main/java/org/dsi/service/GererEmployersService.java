package org.dsi.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dsi.entity.InfoUser;
import org.dsi.payload.UserInfo;
import org.dsi.repo.NodeSync;
import org.dsi.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONObject;

@Service
public class GererEmployersService {
	   @Autowired
	   private UserRepo Userrepo;
	   @Autowired
	   private NodeSync nodeSync;
   public List<InfoUser> GetAllEmployers() {
	   List<InfoUser> employers=Userrepo.GetAllEmployees();
	   if(employers.isEmpty()) {
		   return null;
	   }else {
		   return employers;
	   }
   }
   public List<InfoUser> searchEmployeesByName(String search) {
       return Userrepo.searchEmployeesByName(search);
   }
   public InfoUser AddEmploye(UserInfo employer) {
	   InfoUser newEmployer = new InfoUser();
	   if(Userrepo.getUserByemail(employer.getEmail())==null) {
		   newEmployer.setFirstName(employer.getFirstName());
		   newEmployer.setLastName(employer.getLastName());
		   newEmployer.setCin(null);
		   newEmployer.setEmail(employer.getEmail());
		   newEmployer.setPassword(employer.getPassword());
		   newEmployer.setNumTlf(employer.getNumTlf());
		   newEmployer.setStatus(1);
		   newEmployer.setRole(employer.getRole());
		   newEmployer.setSexe(employer.getSexe());
		   Userrepo.save(newEmployer);
			JSONObject jsoUser=new JSONObject();
 			jsoUser.appendField("Name",employer.getFirstName());
 			jsoUser.appendField("LastName",employer.getLastName());
 			jsoUser.appendField("email",employer.getEmail());
 			jsoUser.appendField("cin",null);
 			jsoUser.appendField("status",1);
 			jsoUser.appendField("Photo",null);
 			jsoUser.appendField("roles",employer.getRole());
 			nodeSync.addInfoUser(jsoUser);
 			return newEmployer;
   	}
	   	return null;
   }
   public InfoUser RefuseEmployer(Long id) {
	   InfoUser emp=Userrepo.findById(id).get();
	   if(emp!=null) {
		   emp.setStatus(2);
		   Userrepo.save(emp);
		   return emp;
	   }
	   return null;
   }
}
