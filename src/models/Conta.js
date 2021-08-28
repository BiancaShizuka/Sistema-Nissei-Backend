module.exports=class Conta{
    constructor(con_cod,con_valor,con_dtVencimento,con_dtPgto){
        this.con_cod=con_cod;
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

    setDtPgto(data){
        this.con_dtPgto=data;
    }
    getDtPgto(){
        return this.con_dtPgto;
    }
    setValor(valor){
        this.con_valor = valor;
    }
}