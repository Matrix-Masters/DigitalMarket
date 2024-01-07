
package org.dsi.security;

import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import org.dsi.jwt.JwtAuthenticateEntryPoint;
import org.dsi.jwt.JwtRequestFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@KeycloakConfiguration
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
	private JwtAuthenticateEntryPoint jwtAuthenticationEntryPoint;
    
    @Autowired
	private JwtRequestFilter jwtRequestFilter;

    @Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
	    return super.authenticationManagerBean();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider=new DaoAuthenticationProvider();
		try {
			authProvider.setPasswordEncoder(passwordEncoder());
			authProvider.setUserDetailsService(userDetailsService());
		}catch(Exception e) {
			System.out.println("die :"+e.getMessage());
		}
		return authProvider;
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) {
		try {
			/*auth.authenticationProvider(authenticationProvider());
			auth.userDetailsService(userDetailsService);*/
			auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
		}catch(Exception e) {
			System.out.println(e.getMessage());
		}
	}
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new JwtAuthConverter());
        return jwtAuthenticationConverter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable()
            .authorizeRequests()
            .antMatchers("/contract/**", "/GererEmployer/**", "/GererSupplier/**").permitAll()
            .antMatchers("/auth/**").permitAll() 
            .antMatchers("/users/**").permitAll() 
            .anyRequest().authenticated()
            .and()
            .oauth2ResourceServer()
            .jwt()
            .jwtAuthenticationConverter(jwtAuthenticationConverter());
            
        	http
        	.exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
			http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
   
    }

}
