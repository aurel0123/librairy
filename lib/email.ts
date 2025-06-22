import emailjs from '@emailjs/browser';
import config from './config';



const sendEmail = async({email , subject , message} : EmailParams ) => {
  return emailjs.send(
    config.env.emailjs.serviceId,
    config.env.emailjs.templateId,
    {
        email: email,
        subject: subject,
        message: message,
    }, 
    {
        publicKey: config.env.emailjs.publicKey , 
    }
  )
}

export default sendEmail ; 