import bcrypt from 'bcrypt'

export class userHash {

    public password : string;

    constructor(password : string){
        this.password = password
    }

    public hashPassword(){
        let result = bcrypt.hash(this.password, 10)
        return result
    }
}
