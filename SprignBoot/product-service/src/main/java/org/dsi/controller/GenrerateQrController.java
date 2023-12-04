package org.dsi.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.imageio.ImageIO;

import org.dsi.repository.NodeSync;
import org.dsi.service.FileService;
import org.dsi.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;

import Payload.InfoFactureQr;
import Payload.ProducInfo;
import net.minidev.json.JSONObject;


@RequestMapping("/codeQr")
@RestController
public class GenrerateQrController {

	@Autowired
	ProductService ProductService;
	
	@Autowired
	FileService fileService;
	
	@Autowired
	NodeSync NodeSync;

	
	@PutMapping("/GenerateCodeQr")
	public JSONObject getFacture(@RequestBody InfoFactureQr info){
		try {
			BufferedImage bufferedImage = generateQRCodeImage(info);
			String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
			String name_facture=timestamp+"_"+info.getNumCommande();
			File outputfile = new File("C:\\Users\\talel\\Desktop\\Matrix-Masters\\DigitalMarket\\SprignBoot\\product-service\\QrImages\\"+name_facture+".jpg");
			ImageIO.write(bufferedImage, "jpg", outputfile);
			JSONObject NameJson=new JSONObject();
			NameJson.appendField("NameFacture",name_facture+".jpg");
			NodeSync.UpdateNameFacture(info.getNumCommande(), NameJson);
			Path filePath = Paths.get("QrImages").resolve(name_facture).normalize();
			JSONObject data=new JSONObject();
			data.appendField("name",name_facture+".jpg");
			return data;
		}catch (Exception e) {
			return null;
		}
	}
	
	
	public  BufferedImage generateQRCodeImage(InfoFactureQr barcodeText) throws WriterException {
		StringBuilder str = new StringBuilder();
		str = str.append("Name:").append(barcodeText.getName()).append("| |").append("Latitude:").append(barcodeText.getLocation_latitude()).append("| |").append("Logitude:")
				.append(barcodeText.getLocation_logitude()).append("||").append("Name").append(barcodeText.getLocation_name());
	    QRCodeWriter barcodeWriter = new QRCodeWriter();
	    BitMatrix bitMatrix = 
	      barcodeWriter.encode(str.toString(), BarcodeFormat.QR_CODE, 200, 200);
	    return MatrixToImageWriter.toBufferedImage(bitMatrix);
	}
	
	
	@GetMapping("/{fileName:.+}")
    public ResponseEntity<?> getQr(@PathVariable String fileName) {
        try {
            Resource file = fileService.loadFileAsResource(fileName,"QrImages");
            return ResponseEntity.ok().body(file);
        } catch (Exception e) {
        	return new ResponseEntity<String>("Not Found",HttpStatus.NOT_FOUND);
        }
    }
	
	
}
