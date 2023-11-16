package org.dsi.service;

import java.util.List;

import org.dsi.entity.InfoUser;
import org.dsi.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GererEmployersService {
	   @Autowired
	   private UserRepo Userrepo;
   public List<InfoUser> GetAllEmployers() {
	   List<InfoUser> employers=Userrepo.GetAllEmployees();
	   if(employers.isEmpty()) {
		   return null;
	   }else {
		   return employers;
	   }
   }
}
