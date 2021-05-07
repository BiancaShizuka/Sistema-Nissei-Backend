const ContaReceberDAO=require('../DAOs/ContaReceberDAO');
module.exports=class ContaReceber{
    constructor(con_cod,ser_cod,con_valor,con_dtVencimento,con_dtPgto){
        this.con_cod=con_cod;
        this.ser_cod=ser_cod;
        this.con_valor=con_valor;
        this.con_dtVencimento=con_dtVencimento;
        this.con_dtPgto=con_dtPgto;
    }

    getCod(){
        return this.con_cod
    }
    getValor(){
        return this.con_valor
    }
    getDtVenc(){
        return this.con_dtVencimento
    }
    getSerCod(){
        return this.ser_cod;
    }
    setDtPgto(data){
        this.con_dtPgto=data;
    }
    getDtPgto(){
        return this.con_dtPgto;
    }
    async gravar(db){
        let result = await new ContaReceberDAO().gravar(this,db);

    }
    async alterar(db){
   
        let result = await new ContaReceberDAO().alterar(this,db);
        return result;
    }
    
    async getConta(con_cod,ser_cod,db){
        console.log(con_cod);
        console.log(ser_cod);
        let resp= await new ContaReceberDAO().consultar(con_cod,ser_cod,db);
        console.log(resp.data[0]);
        return new ContaReceber(resp.data[0].con_cod,resp.data[0].ser_cod,resp.data[0].con_valor,resp.data[0].con_dtVencimento,resp.data[0].con_dtPgto)
    }
    async deletarContaServico(db){
        this.contasReceber=[];
        let result = await new ContaReceberDAO().deletarPorServico(this.ser_cod,db);
    }
    async listarContasServico(ser_cod,db){
        let resp= await new ContaReceberDAO().consultarContasServico(ser_cod,db);
        let contas=[];
        for(let i=0;i<resp.data.length;i++){
            contas.push(
                new ContaReceber(resp.data[i].con_cod,resp.data[i].ser_cod,resp.data[i].con_valor,resp.data[i].con_dtVencimento,resp.data[i].con_dtPgto)
                
            )

        }
        return contas;
    }
    async listarContasFiltro(dtInicio,dtFim,status,db){
        let resp= await new ContaReceberDAO().consultarContasFiltro(dtInicio,dtFim,status,db);
        let contas=[];
        for(let i=0;i<resp.data.length;i++){
            contas.push(
                new ContaReceber(resp.data[i].con_cod,resp.data[i].ser_cod,resp.data[i].con_valor,resp.data[i].con_dtVencimento,resp.data[i].con_dtPgto)
                
            )
        }
        return contas;
    }
    
}