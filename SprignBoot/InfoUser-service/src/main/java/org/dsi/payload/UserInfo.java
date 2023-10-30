package org.dsi.payload;

import java.util.List;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
	private String FirstName;
	
	private String LastName;
	
	private String Email;
	
	private String Password;
	
	private String NumTlf;
	
	
	private String Cin;
	
	private String Sexe;
	
	@Column(length=999999999)
	private String PhotoCin;
	
	private List<String> roles;

}
