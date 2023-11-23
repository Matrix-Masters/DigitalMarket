package org.dsi.repo;

import org.dsi.entity.Contract;
import org.dsi.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo  extends JpaRepository<Product, Long> {

}
