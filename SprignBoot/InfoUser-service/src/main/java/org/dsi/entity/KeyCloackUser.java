package org.dsi.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class KeyCloackUser {

	    private String username;
	    private String firstName;
	    private String lastName;
	    private String email;
	    private boolean enabled;

	    // Constructors, getters, and setters
	

}
