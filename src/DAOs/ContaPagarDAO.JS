module.exports=class ContaPagarDAO{
    async listar(des_cod,db){
        const sql = "SELECT * FROM Conta_Pagar where des_cod=?";
        const valor = [des_cod];
        const contapagar = await db.consulta(sql,valor);
        return contapagar;
    }
    async gravar(conta,des_cod,db) {    
        const sql = "INSERT INTO Conta_Pagar (con_cod,des_cod,con_valor,con_dtVencimento,con_dtPagamento) VALUES (?, ?, ?, ?,?)";
        const valor = [conta.getCon_cod(),des_cod,conta.getCon_valor(),conta.getDt_vencimento(),conta.getDt_pgto()];
        const result=await db.manipula(sql,valor);
        return result;
    }
    async deletar(conta,des_cod,db){
        const sql = "DELETE FROM Conta_Pagar WHERE des_cod=? AND con_cod=? "
              
        const valor = [des_cod,conta.getCon_cod()];
        const result=await db.manipula(sql,valor);
        return result;
    } 
    async alterar(conta,des_cod,db){
        const sql = "UPDATE conta_receber SET con_valor=?, con_dtVencimento=?, con_dtPagamento=? "+
                    "WHERE con_cod = ? AND des_cod=?";
        
        const valor = [conta.getCon_valor(),conta.getDt_vencimento(),conta.getDt_pgto(),conta.getCon_cod(),des_cod];
        const result = await db.manipula(sql,valor);
        return result;
    }
}