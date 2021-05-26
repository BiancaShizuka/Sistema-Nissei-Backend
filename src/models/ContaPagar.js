
const ContaPagarDAO = require('../DAOs/ContaPagarDAO');

module.exports=class ContaPagar{
    constructor(con_cod,con_valor,con_dtVencimento,con_dtPgto){
        this.con_cod=con_cod;
        this.con_valor=con_valor;
        this.con_dtVencimento=con_dtVencimento;
        this.con_dtPgto=con_dtPgto;
    }
    getCon_cod(){
        return this.con_cod;
    }
    getCon_valor(){
        return this.con_valor;
    }
    getDt_vencimento(){
        return this.con_dtVencimento
    }
    getDt_pgto(){
        return this.con_dtPago;
    }
    setDt_pgto(date){
        this.con_dtPago=date;
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
}