module.exports=class Pessoa{
    constructor(cod,nome,cpf,sexo,email){
        this.pes_cod=cod;
        this.pes_nome=nome;
        this.pes_sexo=sexo;
        this.pes_cpf=cpf;
        this.pes_email=email;
    }

    getNome(){
        return this.pes_nome;
    }
    getCod(){
        return this.pes_cod;
    }
    getSexo(){
        return this.pes_sexo;
    }
    getCpf(){
        return this.pes_cpf;
    }
    getEmail(){
        return this.pes_email;
    }
}