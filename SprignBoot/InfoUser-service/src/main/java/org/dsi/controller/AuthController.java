package org.dsi.controller;

import org.dsi.entity.InfoUser;
import org.dsi.payload.Credentials;
import org.dsi.repo.UserRepo;
import org.dsi.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONObject;

@RequestMapping("/auth")
@RestController
public class AuthController {
	@Autowired
    AuthenticationManager authenticationManager; 
	
	@Autowired
	UserDetailsImpl userservice;
	
	@Autowired
	UserRepo UserRepo;
	
	@Autowired
	private org.dsi.jwt.jwtTokenUtil  jwtTokenUtil;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticate(@RequestBody Credentials parametre){
    	try {
    		if(UserRepo.getUserByemail(parametre.getEmail())==null) {
    			return new ResponseEntity<String>("User Not Found",HttpStatus.CONFLICT);
    		}
    		Authentication authsuser = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(parametre.getEmail(), parametre.getPassword()));
    	}catch(BadCredentialsException e) {
    		return new ResponseEntity<String>("Incorrect email or password",HttpStatus.CONFLICT);
    	}
    	
       UserDetails user_detailts=userservice.loadUserByUsername(parametre.getEmail());
       InfoUser user=UserRepo.getUserByemail(parametre.getEmail());
    	
    	if(user.getEmail_verified_at()==null) {
    		return new ResponseEntity<String>("Email not verified",HttpStatus.CONFLICT);
    	}
    	String token=jwtTokenUtil.generateToken(user_detailts);
    	JSONObject json=new JSONObject();
    	json.appendField("user",user);
    	json.appendField("token",token);
    	return  ResponseEntity.ok().body(json);
    }
	
	 /*@PostMapping("/ForgotPassword")
	    public ResponseEntity<?> forgotPassword(@RequestParam(name="email")String email){
	    	try {
	    		userService.forgotPassword(email);
	    	}catch(Exception e) {
	    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.CONFLICT);
	    	}
	    	return ResponseEntity.ok().body("Mail Send With Token");
	    }
	    
	    
	    @PostMapping("/ChangerPassword")
	    public ResponseEntity<?> ResetPassword(@RequestBody ChangerPassword parametre){
	    	String password_hash=SecurityConfig.passwordEncoder().encode(parametre.getPassword());
	    	try {
	    		userService.ChangerPassword(parametre.getEmail(), parametre.getToken(), password_hash);
	    	}catch(Exception e) {
	    		return new ResponseEntity<String>(e.getMessage(),HttpStatus.CONFLICT);
	    	}
	    	return ResponseEntity.ok().body("Password has been changed");
	    }*/
}
