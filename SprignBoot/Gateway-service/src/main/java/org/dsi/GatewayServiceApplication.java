package org.dsi;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;


@SpringBootApplication
@CrossOrigin
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}
	
	/*@Bean
	RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
	    return builder.routes()
	            .route(r -> r.path("/categories/**").uri("http://localhost:8001/"))
	            .route(r->r.path("/products/**").uri("http://localhost:8001/"))
	         .build();
	}*/
	
	/*@Bean
	RouteLocator routesLogin(RouteLocatorBuilder builder) {
		return builder.routes()
				.route(r -> r.path(
						"/api/Commande/**")
						.filters(f -> f.dedupeResponseHeader("Access-Control-Allow-Origin",
								"RETAIN_UNIQUE"))
						.uri("http://localhost:3000"))
				.build();
	}*/

    @Bean
	DiscoveryClientRouteDefinitionLocator dynamicRoutes(ReactiveDiscoveryClient rdc,DiscoveryLocatorProperties dlp) {
		return new DiscoveryClientRouteDefinitionLocator(rdc,dlp);
	}
	
	
	
}
