const Pessoa=require("./Pessoa");
const ClienteDAO=require("../DAOs/ClienteDAO");
module.exports=class Cliente extends Pessoa{
    constructor(cod,nome,cpf,sexo,email,rua,bairro,cidade,uf,cep,status){
        super(cod,nome,cpf,sexo,email);
        this.cli_bairro=bairro;
        this.cli_uf=uf;
        this.cli_cidade=cidade;
        this.cli_rua=rua;
        this.cli_status=status;
        this.cli_cep=cep;
    }
    async procurarCod(cod,db){
        const resp=await new ClienteDAO().procurarCod(cod,db);
        let cliente=new Cliente(
            resp.data[0].pes_cod,resp.data[0].pes_nome,resp.data[0].pes_cpf,resp.data[0].pes_sexo,resp.data[0].pes_email,
            resp.data[0].cli_rua,resp.data[0].cli_bairro,resp.data[0].cli_cidade,resp.data[0].cli_uf,
            resp.data[0].cli_cep,resp.data[0].cli_status
        );
        return cliente;
    }
}