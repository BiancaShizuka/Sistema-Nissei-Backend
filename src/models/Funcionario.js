const Pessoa=require("./Pessoa");
const FuncionarioDAO=require('../DAOs/FuncionarioDAO');
module.exports=class Funcionario extends Pessoa{
    constructor(cod,nome,cpf,sexo,email,ano,senha,status,nivel){
        super(cod,nome,cpf,sexo,email);
        this.fun_ano=ano;
        this.fun_senha=senha;
        this.fun_status=status;
        this.fun_nivel=nivel;
    }
    getCod(){
        return this.pes_cod;
    }
    getStatus(){
        return this.fun_status;
    }
    setStatus(status){
        this.fun_status=status;
    }
    async procurarCod(cod,db){
        const resp=await new FuncionarioDAO().procurarCod(cod,db);

        let funcionario=await new Funcionario(
            resp.data[0].pes_cod,resp.data[0].pes_nome,resp.data[0].pes_cpf,resp.data[0].pes_sexo,resp.data[0].pes_email,
            resp.data[0].fun_anoInicio,resp.data[0].fun_senha,resp.data[0].fun_status,resp.data[0].fun_nivel
        );
       
        return funcionario;
    }
}