package org.dsi.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.sun.istack.Nullable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity @Data @AllArgsConstructor @NoArgsConstructor
public class Contract {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	String nameContract;
	Date DoneWorkDate;
	
	@Nullable
	@OneToOne(mappedBy = "contract")
	private InfoUser user;
	
	@OneToMany(mappedBy = "contract_tab", cascade = CascadeType.ALL)
	private List<Product> listProduct ;
	
	
}
