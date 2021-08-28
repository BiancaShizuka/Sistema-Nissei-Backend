const ContaReceberDAO=require('../DAOs/ContaReceberDAO');
const Conta=require("../models/Conta");
module.exports=class ContaReceber extends Conta{
    constructor(con_cod,con_valor,con_dtVencimento,con_dtPgto){
        super(con_cod,con_valor,con_dtVencimento,con_dtPgto);
    }
	
	async gravarPago(ser_cod,db){
        let result = await new ContaReceberDAO().gravarPago(this,ser_cod,db);

    }
    async gravar(ser_cod,db){
        let result = await new ContaReceberDAO().gravar(this,ser_cod,db);

    }
    async alterar(ser_cod,db){
   
        let result = await new ContaReceberDAO().alterar(this,ser_cod,db);
        return result;
    }
    
    async getConta(con_cod,ser_cod,db){

        let resp= await new ContaReceberDAO().consultar(con_cod,ser_cod,db);
        return new ContaReceber(resp.data[0].con_cod,resp.data[0].con_valor,resp.data[0].con_dtVencimento,resp.data[0].con_dtPgto)
    }
    async deletarContaServico(ser_cod,db){
   
        let result = await new ContaReceberDAO().deletarPorServico(this,ser_cod,db);
    }
    async listarContasServico(ser_cod,db){
        let resp= await new ContaReceberDAO().consultarContasServico(ser_cod,db);
        let contas=[];
        for(let i=0;i<resp.data.length;i++){
            contas.push(
                new ContaReceber(resp.data[i].con_cod,resp.data[i].con_valor,resp.data[i].con_dtVencimento,resp.data[i].con_dtPgto)
                
            )

        }
        return contas;
    }
    async listarContasFiltro(dtInicio,dtFim,status,cliente,db){
        let resp= await new ContaReceberDAO().consultarContasFiltro(dtInicio,dtFim,status,cliente,db);
        let contas=[];
       
        for(let i=0;i<resp.data.length;i++){
            let c=new ContaReceber(resp.data[i].con_cod,resp.data[i].con_valor,resp.data[i].con_dtVencimento,resp.data[i].con_dtPgto);
            c['ser_cod']=resp.data[i].ser_cod;
            c['cli_nome']=resp.data[i].pes_nome;
 
            contas.push(c)
        }
        return contas;
    }
    
}