package org.dsi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
public class InfoUserServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InfoUserServiceApplication.class, args);
	}

}
