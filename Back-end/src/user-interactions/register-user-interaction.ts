class user {
    public name : string;
    public email : string;
    public password : string;


    constructor(name : string, email : string , password : string){
        this.name = name
        this.email = email
        this.password = password
    }

    public register(){
        console.log(this.name)
        console.log(this.email)
        console.log(this.password)
    }

    public show(){
        console.log(`Seja bem vindo ${this.name}`)
    }
}

let classe = new user('aoba', 'aoba@gmail.com', '23410n1434')
classe.register()
