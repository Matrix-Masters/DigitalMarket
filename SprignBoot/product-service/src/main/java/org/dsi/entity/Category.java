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
 	private long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false, length = 429496729)
    private String image;
    
    @OneToMany(mappedBy = "category", cascade = CascadeType.REMOVE,  fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Product> products;
    
}
