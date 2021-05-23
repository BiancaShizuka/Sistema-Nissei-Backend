module.exports=class ContaPagarDAO{
    async listar(con_cod,db){
        const sql = "SELECT * FROM Conta_Pagar where con_cod=?";
        const valor = [con_cod];
        const contapagar = await db.consulta(sql,valor);
        return contapagar;
    }
    async gravar(Despesa,cod,db) {    
        const sql = "INSERT INTO Conta_Pagar (con_cod,des_cod,con_valor,con_dtVencimento,con_dtPagamento) VALUES (?, ?, ?, ?,?)";
        const valor = [cod,despesa.getCod().getCod(),con_valor,con_dtVencimento,con_dtPagamento];
        const result=await db.manipula(sql,valor);
        return result;
    }
    async deletar(despesa,cod,db){
        const sql = "DELETE FROM Conta_Pagar WHERE des_cod=? AND con_cod=? "
              
        const valor = [cod,despesa.getCod()];
        const result=await db.manipula(sql,valor);
        return result;
    } 
    async alterar(contapagar,despesa,cod,db){
        const sql = "UPDATE conta_receber SET con_valor=?, con_dtVencimento=?, con_dtPagamento=? "+
                    "WHERE con_cod = ? AND des_cod=?";
        
        const valor = [conta.getDtPgto(),conta.getCod(),ser_cod];
        const result = await db.manipula(sql,valor);
  
    }
}