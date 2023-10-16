package org.dsi.entity;


import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

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
    
    private long IdUser=0;
    
    @OneToMany(mappedBy="category")
    private Set<Product> Products;
    
}
