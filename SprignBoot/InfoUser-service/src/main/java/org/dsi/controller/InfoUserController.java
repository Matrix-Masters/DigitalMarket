package org.dsi.controller;

import java.util.List;

import javax.mail.MessagingException;

import org.dsi.entity.InfoUser;
import org.dsi.entity.KeyCloackUser;
import org.dsi.mail.MailService;
import org.dsi.payload.InfoEmail;
import org.dsi.payload.UserInfo;
import org.dsi.repo.UserRepo;
import org.dsi.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.common.net.HttpHeaders;

import net.minidev.json.JSONObject;

@RestController
@RequestMapping("/users")
public class InfoUserController {
	
	@Autowired
	UserInfoService userInfoService;
	
	@Autowired
	MailService mailSender;
	
	@Autowired
	UserRepo UserRepo;
	
	@Autowired
	RestTemplate restTemplate;
	
    /*private final String keycloakBaseUrl = "http://localhost:8080/admin/realms/DigitalMarket/users";
    private final String keycloakAdminUsername = "admin";
    private final String keycloakAdminPassword = "admin";*/

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

            /*String keycloakUrl = keycloakBaseUrl;

            KeyCloackUser keycloakUser = new KeyCloackUser(user.getEmail(), user.getFirstName(), user.getLastName(),
                    user.getEmail(), false);

            ResponseEntity<String> response = restTemplate.postForEntity(keycloakUrl, keycloakUser, String.class);

          	
            if (response.getStatusCode().is2xxSuccessful()) {
                return ResponseEntity.ok().body("User added successfully in both Spring Boot and Keycloak");
            } else {
                return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
            }*/
            JSONObject json=new JSONObject();
            json.appendField("data","User added successfully");
            return ResponseEntity.ok().body(json);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
	}
	
	
	@PostMapping(value="/updateUser")
	public ResponseEntity<?> updateUser (@RequestBody InfoUser user,Long id){
		try {
			userInfoService.updateUser(user, id);
			return  ResponseEntity.ok().body("User updated successfully"+user);
			
		} catch (Exception e) {
			
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}

	}
	
	 	@GetMapping("/SendEmailChanged")
	    public ResponseEntity<?> SendChangedEmail(@RequestParam("email_new") String email_new,@RequestParam("email_old" ) String email_old){
	    	    try {
	    	    	mailSender.SendMailConfirm(email_old,email_new);
	    		}catch(MessagingException  e) {
					return new ResponseEntity<String>("Error Connexion",HttpStatus.CONFLICT);
				}catch(java.io.UnsupportedEncodingException e) {
					return new ResponseEntity<String>("Unsupported Forme",HttpStatus.CONFLICT);
				}

	    	    return  ResponseEntity.ok().body("Send Mail For Confirm");
	    }
	 	
	 	   @PutMapping("/updateEmail")
		    public ResponseEntity<?> updateEmail(@RequestBody InfoEmail data) throws Exception{
	 		  try {
	 			   InfoUser user = userInfoService.getInfoUserByEmail(data.getOldEmail());
		    	   if (user == null) {
		    	        return ResponseEntity.status(HttpStatus.CONFLICT).body("User not Found");
		    	    }
		    	   user.setEmail(data.getNewEmail());
		    	   user.setEmail_verified_at(null);
		    	   UserRepo.save(user);
		    	   return  ResponseEntity.ok().body("Email Modified");
	 			} catch (Exception e) {
	 				return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
	 			}
		    }
	
	

}
