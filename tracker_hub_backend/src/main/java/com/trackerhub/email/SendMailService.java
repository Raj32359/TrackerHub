package com.trackerhub.email;

import javax.mail.MessagingException;

import com.tarckerhub.model.Mail;

public interface SendMailService {
	
	void sendMail(Mail mail);
	
	void sendMailWithAttachments(Mail mail) throws MessagingException;

}
