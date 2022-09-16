import nodemailer from 'nodemailer'
import sendgrid from '@sendgrid/mail'

export class userEmail {
    user? : string
    email? : string

    constructor(user? : string, email? : string){
        this.user = user
        this.email = email
        sendgrid.setApiKey('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')

    }

    public sendEmail(){
        const message = {
            to : this.email,
            from : 'karl.devcontato@gmail.com',
            subject : 'Sua compra da Goldies',
            text : `Tudo bem ${this.user} ?, temos uma boa notícia...`,
            html : `<h1>Sua compra foi realizada com sucesso !  </h1> <br>
            <p> Caso precise de mais alguma informação, responda esse e-mail ou use nosso sistema de feedback do site.`
        }
        sendgrid.send(message).then((res) => console.log(res))
        .catch((err) => {console.log(err.message)}).finally(() => console.log('Email sent sucessfully'))
    }
}
