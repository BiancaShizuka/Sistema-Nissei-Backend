module.exports=class ContaReceber{
    constructor(con_cod,ser_cod,con_valor,con_dtVencimento,con_dtPgto){
        this.con_cod=con_cod;
        this.ser_cod=ser_cod;
        this.con_valor=con_valor;
        this.con_dtVencimento=con_dtVencimento;
        this.con_dtPgto=con_dtPgto;
    }
    getSerCod(){
        return this.ser_cod;
    }
}