package org.dsi.controller;

import java.util.List;

import org.dsi.entity.InfoUser;
import org.dsi.payload.UserInfo;
import org.dsi.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class InfoUserController {
	
	@Autowired
	UserInfoService userInfoService;

	@GetMapping(value="/getUserByMail")
	public ResponseEntity<?> getUserByMail(@RequestParam("email") String email){
		try {
			InfoUser user = userInfoService.getInfoUserByEmail(email);
			  return ResponseEntity.ok(user);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping(value="/getUserById")
	public ResponseEntity<?> getUserById(@RequestParam("id") Long id){
		
		try {
			InfoUser user = userInfoService.getInfoUserById(id);
			  return ResponseEntity.ok(user);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping(value="/addUserInfo")
	public ResponseEntity<?> addUserInfo(@RequestBody UserInfo user){
		try {
			userInfoService.addInfoUser(user);
			return  ResponseEntity.ok().body("user add");
        } catch (Exception e) {
        	return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
	}
	
	

}
