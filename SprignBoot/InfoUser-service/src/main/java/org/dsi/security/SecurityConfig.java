package org.dsi.security;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import java.util.Arrays;

import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@KeycloakConfiguration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
	
	 	@Bean
	    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    	
	    	 JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
	         jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new JwtAuthConverter());

	    	
	    	  http.cors().and().csrf().disable()
				.authorizeRequests()
			    .antMatchers("/contract/**").permitAll()
			    .antMatchers("/GererEmployer/**").permitAll()
			    .antMatchers("/GererSupplier/images/**").permitAll()
			    .antMatchers("/GererSupplier/images/**").permitAll()
				.anyRequest().authenticated();


	    	 http.oauth2ResourceServer()
	         .jwt()
	         .jwtAuthenticationConverter(jwtAuthenticationConverter);

	    	 http
	         .sessionManagement()
	         .sessionCreationPolicy(STATELESS);

	    	return http.build();
	}
	 		

}