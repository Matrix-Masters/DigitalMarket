package org.dsi.payload;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.dsi.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data @AllArgsConstructor @NoArgsConstructor
public class contractInfo {
	String nameContract;
	Date  DoneWorkDate;
	List<String> ListProduct;
	long idUer;
}
