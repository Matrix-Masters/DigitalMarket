package org.dsi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@EnableFeignClients
@SpringBootApplication
public class InfoUserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InfoUserServiceApplication.class, args);
	}

	 	@Bean
	    public RestTemplate getRestTemplate() {
	    	return new RestTemplate();
	    }
}
