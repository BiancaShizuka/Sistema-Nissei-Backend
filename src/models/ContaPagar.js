
const ContaPagarDAO = require('../DAOs/ContaPagarDAO');
const Conta=require("../models/Conta");
module.exports=class ContaPagar extends Conta{
    constructor(con_cod,con_valor,con_dtVencimento,con_dtPgto){
        super(con_cod,con_valor,con_dtVencimento,con_dtPgto);
    }
 
    async gravar(des_cod,db) {
        const resp=await new ContaPagarDAO().gravar(this,des_cod,db);
        return resp;
    }
    async alterar(des_cod,db){
        const resp=await new ContaPagarDAO().alterar(this,des_cod,db);
    }
    async deletar(des_cod,db){
        const resp=await new ContaPagarDAO().deletar(this,des_cod,db)
        return resp;
    }
    async listarContasDespesa(des_cod,db){
        let resp= await new ContaPagarDAO().listar(des_cod,db);
        let contas=[];
        for(let i=0;i<resp.data.length;i++){
            contas.push(
                new ContaPagar(resp.data[i].con_cod,resp.data[i].con_valor,resp.data[i].con_dtVencimento,resp.data[i].con_dtPgto)
                
            )

        }
        return contas;
    }
    async listarContasFiltro(td_cod,dtInicio,dtFim,db){
        let resp=await new ContaPagarDAO().listarFiltro(td_cod,dtInicio,dtFim,db);
        let contas=[];
       
        for(let i=0;i<resp.data.length;i++){
            
            
            let c=new ContaPagar(resp.data[i].con_cod,resp.data[i].con_valor,resp.data[i].con_dtVencimento,resp.data[i].con_dtPgto);
            c["td_nome"]=resp.data[i].td_nome;
            c['des_cod']=resp.data[i].des_cod
            contas.push(c);
        }
        
        return contas;
    }
}