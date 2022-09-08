import nodemailer from 'nodemailer'
import sendgrid from '@sendgrid/mail'

export class userEmail {
    user : string
    email : string

    constructor(user : string, email : string){
        this.user = user
        this.email = email

    }

    public sendEmail(){
    }
}
