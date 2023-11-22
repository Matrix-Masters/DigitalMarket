package org.dsi.payload;

import java.util.ArrayList;
import java.util.Date;

import org.dsi.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data @AllArgsConstructor @NoArgsConstructor
public class contractInfo {
	String nameContract;
	Date DoneWorkDate;
	ArrayList<Product> ListProduct;
	Long idUer;
}
