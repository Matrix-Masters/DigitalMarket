package org.dsi.mail;

import org.dsi.entity.InfoUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class MailService {

	 @Autowired
	 private JavaMailSender javamailSender;
	 private final TemplateEngine templateEngine ;
	 
		public MailService(TemplateEngine templateEngine) {
			this.templateEngine=templateEngine;
		}
		
		public void SendMailConfirm(String email_current,String new_email) 
					throws MessagingException ,UnsupportedEncodingException{
			Context context=new Context();
			context.setVariable("email_new", new_email);
			context.setVariable("link","http://localhost:4200/login?email="+email_current+"&email_new="+new_email);
			String body=templateEngine.process("ConfirmChangeEmail", context);
			
			String fromAddress = "myeduconnect2002@gmail.com";
			String senderName = "DigitalMarket";
	         
			MimeMessage message = javamailSender.createMimeMessage();
			
			MimeMessageHelper helper = new MimeMessageHelper(message,true);
			String toAddress = email_current;
			helper.setFrom(fromAddress, senderName);
			helper.setTo(toAddress);
			helper.setSubject("Confirm Change Email");

			helper.setText(body, true);

			javamailSender.send(message);
		}
		
		
		//verify email
		public void sendVerificationEmail(InfoUser user)
				throws MessagingException, UnsupportedEncodingException {

			Context context=new Context();
			context.setVariable("name", user.getLastName());
			context.setVariable("code", user.getCode());
			String body=templateEngine.process("VerifyEmail", context);
			
			String fromAddress = "villageconnectt@gmail.com";
			String senderName = "DigitalMarket";
	         
			MimeMessage message = javamailSender.createMimeMessage();
			
			MimeMessageHelper helper = new MimeMessageHelper(message,true);
			String toAddress = user.getEmail();
			helper.setFrom(fromAddress, senderName);
			helper.setTo(toAddress);
			helper.setSubject("Email address Verification");

			helper.setText(body, true);

			javamailSender.send(message);
		}
		
		public void SendForgotPassword(InfoUser user,String Token)
				throws MessagingException, UnsupportedEncodingException {

			Context context=new Context();
			context.setVariable("token", Token);
			String body=templateEngine.process("ForgotPassword", context);
			
			String fromAddress = "villageconnectt@gmail.com";
			String senderName = "DigitalMarket";
	         
			MimeMessage message = javamailSender.createMimeMessage();
			
			MimeMessageHelper helper = new MimeMessageHelper(message,true);
			String toAddress = user.getEmail();
			helper.setFrom(fromAddress, senderName);
			helper.setTo(toAddress);
			helper.setSubject("Email Forgot Password");

			helper.setText(body, true);

			javamailSender.send(message);
		}
		
}
