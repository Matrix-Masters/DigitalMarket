package org.dsi.repository;

import org.dsi.entity.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import net.minidev.json.JSONObject;

@FeignClient(name = "GESTIONCOMMANDE-SERVICE")
public interface NodeSync {
	    @RequestMapping(method = RequestMethod.PUT, value = "/Commande/UpdateNameFacture/{num}")
	    void UpdateNameFacture(@PathVariable("num") String num,@RequestBody JSONObject NameFacture);
}
