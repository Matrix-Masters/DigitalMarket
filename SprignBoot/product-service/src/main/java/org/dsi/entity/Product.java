package org.dsi.entity;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.sun.istack.Nullable;

import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;
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
    
    private String description;
    
    private String ImageProduct;
    
    private int status=0;
   
    private int Quantite;
    
    private double prix;
    
    private long IdUser=0;
    
    private long nbSales=0;
    
    @CreationTimestamp
	private Timestamp created_at;
	
	@UpdateTimestamp
	private Timestamp updated_at;
	
    @Nullable
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;
    
    @JsonIgnore
    @OneToMany(cascade = CascadeType.REMOVE,  fetch = FetchType.EAGER,mappedBy="product")
    private List<Recommandation> recommandations;
    
    
}
