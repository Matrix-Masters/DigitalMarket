package org.dsi.repository;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.minidev.json.JSONObject;

@FeignClient(name = "NODEJS-SERVICE")
public interface NodeSync {
	    @RequestMapping(method = RequestMethod.POST, value = "/node/addProduct")
	    String addProd(@RequestBody JSONObject title);

}
