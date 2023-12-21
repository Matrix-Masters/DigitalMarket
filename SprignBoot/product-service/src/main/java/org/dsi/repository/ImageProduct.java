package org.dsi.repository;

import org.dsi.entity.ProductImages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageProduct extends JpaRepository<ProductImages,Long> {

}
