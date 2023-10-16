package Payload;

import org.dsi.entity.Category;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProducInfo {
  String Name;
  int Quantite;
  double prix;
  Category category=null;
}
