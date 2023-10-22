package org.dsi.entity;


import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Category {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
 	private long id;
    
    private String nom;
    private String image;
    

    
    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE,  fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Product> products;
    
}
