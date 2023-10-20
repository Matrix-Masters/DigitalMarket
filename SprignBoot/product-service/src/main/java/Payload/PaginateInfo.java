package Payload;

import org.dsi.entity.Product;
import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginateInfo {

	private int[] count_page;
	private Page<Product> product;
	int page;
}
