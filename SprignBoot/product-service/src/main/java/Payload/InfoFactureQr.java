package Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class InfoFactureQr {
	
	String numCommande;
	String name;
	String LastName;
	String phone;
	String PrixTotal;
	String location_logitude;
	String location_latitude;
	String location_name;
	
	
}
