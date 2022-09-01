import nodemailer from 'nodemailer'

export class userEmail {

    user : string
    email : string

    constructor(user : string, email : string){
        this.user = user
        this.email = email
    }

    public sendEmail(){
        let emailTransport = nodemailer.createTransport({
            service : 'gmail',
        })
    }
}
