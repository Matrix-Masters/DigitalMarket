package org.dsi.service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.dsi.entity.InfoUser;
import org.dsi.repo.NodeSync;
import org.dsi.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.FileTemplateResolver;

import net.minidev.json.JSONObject;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class GererSupplierService {
	
	 	@Autowired
	    private JavaMailSender emailSender;
		private TemplateEngine templateEngine;
		
	    @Autowired
	    private UserRepo Userrepo;
	    
	    @Autowired
		NodeSync nodeSync;
	    
	    @Autowired
	    public GererSupplierService(JavaMailSender emailSender, TemplateEngine templateEngine) {
	        this.emailSender = emailSender;
	        this.templateEngine = templateEngine;
	    }

	    public List<InfoUser> getSuppliers() {
	        return Userrepo.findByRole("Supplier");
	    }
	    
	    public void verifySupplier(Long supplierId)throws Exception {
	        	InfoUser infouser=Userrepo.getUserById(supplierId);
	        	if(infouser==null) {
	        		throw new Exception("User not found");
	        	}else {
	            sendVerificationEmail(infouser);
	            JSONObject jsonUser=new JSONObject();
	            jsonUser.appendField("email",infouser.getEmail());
	            nodeSync.AcceptUser(jsonUser);
	            infouser.setStatus(1);
	        	Userrepo.save(infouser);
	        }
	        
	    }
	    public InfoUser RefuseSupplier(Long supplierId) {
	        InfoUser infouser=Userrepo.findById(supplierId).orElse(null);
	        if(infouser!=null) {
	        	JSONObject jsonUser=new JSONObject();
	            jsonUser.appendField("email",infouser.getEmail());
	        	nodeSync.RefuseSupplier(jsonUser);
	        	infouser.setStatus(2);
	        	Userrepo.save(infouser);
	            return infouser;
	        }
	        return null;
	    }
	    


	    private void sendVerificationEmail(InfoUser supplier) throws MessagingException {
	        MimeMessage message = emailSender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message, true);
	        helper.setTo(supplier.getEmail());
	        helper.setSubject("Supplier Account Verification");

	        Context context = new Context();
	        context.setVariable("recipientName", supplier.getFirstName() + " " + supplier.getLastName());

	        String htmlContent = templateEngine.process("accept-fournisseur-template", context);
	        helper.setText(htmlContent, true);

	        emailSender.send(message);
	    }
	    
	    public List<InfoUser> getFilteredUsers(String search, int status, Timestamp date) {
	    	return Userrepo.findFilteredSuppliers(search,status,date);
	        
	    }

	 
}


