package org.dsi.entity;


import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

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
 	private Long id;
    
    @Column(nullable = false)
    private String nom;

    @Column(length = 999999999)
    private String image;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE,  fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Product> products;
    
}
