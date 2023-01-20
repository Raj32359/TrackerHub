package com.trackerhub.email;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.tarckerhub.model.Mail;

@Service
public class SendMailServiceImpl implements SendMailService {
	
	private final JavaMailSender javaMailSender;
	
	public SendMailServiceImpl(JavaMailSender javaMailSender) {
		super();
		this.javaMailSender = javaMailSender;
	}

	@Override
	public void sendMail(Mail mail) {
		// TODO Auto-generated method stub
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(mail.getMessage(), mail.getRecipient());
		message.setSubject(mail.getSubject());
		message.setText(mail.getMessage());
		javaMailSender.send(message);

	}

	@Override
	public void sendMailWithAttachments(Mail mail) throws MessagingException {
		// TODO Auto-generated method stub
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
		
		helper.setText(mail.getRecipient());
		helper.setSubject(mail.getSubject());
		helper.setText(mail.getMessage(), true);
		helper.addAttachment("-", new ClassPathResource("-"));
		javaMailSender.send(mimeMessage);
	}

}
