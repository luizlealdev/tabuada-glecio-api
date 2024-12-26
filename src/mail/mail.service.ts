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

   async sendResetPasswordEmail(email: string, username: string, token: string) {
      try {
         const emailResult = await this.transporter.sendMail({
            from: `Tabuada do Glécio <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Pedido de redefinição de senha',
            html: `
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                  <tr>
                        <td>
                           <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                              align="center" cellpadding="0" cellspacing="0">
                              <tr>
                                    <td style="height:80px;">&nbsp;</td>
                              </tr>
                              <tr>
                                    <td style="height:20px;">&nbsp;</td>
                              </tr>
                              <tr>
                                    <td>
                                       <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                          style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                          <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                          <tr>
                                                <td style="padding:0 35px;">
                                                   <h6 style="color:#1e1e2d; font-weight:300; margin-top:0; margin-bottom:20px;font-size:26px;font-family:'Rubik',sans-serif;">Olá, ${username}</h6>
                                                   <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Pedido de redefinição de senha</h1>
                                                   <span
                                                      style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                   <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">Não podemos simplesmente enviar a sua senha antiga. Um link exclusivo para redefinir seu a senha foi gerada para você. Para redefinir sua senha, clique no botão link abaixo e siga as instruções.
                                                   </p>
                                                   <a href="${process.env.SITE_URL}/password-reset/confirm/${token}"
                                                      style="background:#7B4EC7;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Resetar senha</a>
                                                </td>
                                          </tr>
                                          <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                          </tr>
                                       </table>
                                    </td>
                              <tr>
                                    <td style="height:20px;">&nbsp;</td>
                              </tr>
                              <tr>
                                    <td style="height:80px;">&nbsp;</td>
                              </tr>
                           </table>
                        </td>
                  </tr>
               </table>`,
         });
         console.log('Email send sucessfully!');

         if (!emailResult.response.includes('OK')) {
            await this.sendResetPasswordEmail(email, username, token)
         }

      } catch (err) {
         console.error(err);
         throw err;
      }
   }
}
