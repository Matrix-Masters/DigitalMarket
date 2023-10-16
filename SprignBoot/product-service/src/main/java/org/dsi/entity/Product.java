package org.dsi.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.sun.istack.Nullable;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder.Default;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
 	private Long id;
    
    private String Name;
    
    private String ImageProduct;
    
    private int status=0;
   
    private int Quantite;
    
    private double prix;
    
    private long IdUser=0;
    
    @Nullable
    @ManyToOne
    private Category category;
    
    
}
