package org.dsi.repository;

import org.dsi.entity.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import net.minidev.json.JSONObject;

@FeignClient(name = "NODEJS-SERVICE")
public interface NodeSync {
	    @RequestMapping(method = RequestMethod.POST, value = "/node/addProduct")
	    String addProd(@RequestBody JSONObject title);
	    
	    @RequestMapping(method = RequestMethod.POST, value = "/node/AddCategory")
	    String AddCategory(@RequestBody JSONObject cat);
	    
	    @RequestMapping(method = RequestMethod.PUT, value = "/node/LibererProduct/{id}")
	    Product LibererProduct(@PathVariable("id") long id);
	    
	    @RequestMapping(method = RequestMethod.PUT, value = "/node/UpdateIdProducts/{id}")
	    Product UpdateIdProducts(@PathVariable("id") long id,@RequestBody JSONObject CategoryId);
	    
	    @RequestMapping(method = RequestMethod.PUT, value = "/node/RejectProduct/{id}")
	    Product RejectProduct(@PathVariable("id") long id);
	    
	    @RequestMapping(method = RequestMethod.PUT, value = "/node/AccepterProduct/{id}")
	    Product AccepterProduct(@PathVariable("id") long id);

}
