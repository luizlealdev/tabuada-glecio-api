import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
   private transporter: nodemailer.Transporter;

   constructor() {
      this.transporter = nodemailer.createTransport({
         host: process.env.SMTP_HOST,
         port: Number(process.env.SMTP_PORT),
         secure: false,
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
         },
      });
   }

   async sendResetPasswordEmail(email: string, token: string) {
      try {
         await this.transporter.sendMail({
            from: `Tabuada do Glécio <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Pedido de redefinição de senha',
            html: `Clique para <a href="https://tabuadadoglecio.vercel.app/reset-password/${token}">Redefinir senha</a>
            
            <p>O código é válido por 5 minutos<p>`,
         });
         console.log('Email send sucessfully!');
      } catch (err) {
         console.error(err);
         throw err;
      }
   }
}
