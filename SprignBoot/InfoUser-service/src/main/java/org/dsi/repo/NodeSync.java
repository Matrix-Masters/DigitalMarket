package org.dsi.repo;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.minidev.json.JSONObject;

@FeignClient(name = "GESTIONCOMMANDE-SERVICE")
public interface NodeSync {
	@RequestMapping(method = RequestMethod.POST, value = "/Commande/AddUser")
    void addInfoUser(@RequestBody JSONObject data);

}
