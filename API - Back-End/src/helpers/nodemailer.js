import nodemailer from "nodemailer";
import fs from "fs";

function enviarEmail (novaSenha, usuarioEmail, nomeUsuario) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "luizf.892002@gmail.com",
            pass: "iwhm ltbe lewv cyhr"
        }
    });

    let mailOptions = {
        from: 'luizf.892002@gmail.com',
        to: usuarioEmail,
        subject: 'Recuperação de Senha',
        html: getEmailTemplate(novaSenha, nomeUsuario)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erro ao enviar o e-mail: ', error);
        } else {
            console.log('E-mail enviado: ' + info.response);
        }
    });
}

const getEmailTemplate = (novaSenha, nomeUsuario) => {
   const htmlTemplate = fs.readFileSync("./src/templates/changePassword.html", 'utf-8');
   
   return htmlTemplate
      .replace('{{novaSenha}}', novaSenha)
      .replace('{{nomeUsuario}}', nomeUsuario)
};

export {enviarEmail};