module.exports=class ContaReceberDAO{
 
    async gravar(conta,db) {
 
  
        const sql = "INSERT INTO conta_receber (con_cod,ser_cod,con_valor,con_dtVencimento) VALUES (?, ?, ?, ?)";
  
        const valor = [conta.getCod(),conta.getSerCod(),conta.getValor(),conta.getDtVenc()];
        const result = await db.manipula(sql,valor);
        
    }
    async alterar(conta,db){

    
        const sql = "UPDATE conta_receber SET con_dtPgto=? "+
                    "WHERE con_cod = ? AND ser_cod=?";
        
        const valor = [conta.getDtPgto(),conta.getCod(),conta.getSerCod()];
        const result = await db.manipula(sql,valor);
  
    }

    async deletarPorServico(ser_cod,db){
      
    
        const sql = "DELETE FROM conta_receber WHERE ser_cod=? "
              
        
        const valor = [ser_cod];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async consultar(con_cod,ser_cod,db){
        const sql = "select * from conta_receber where con_cod=? and ser_cod=? ";
              
        const valor = [con_cod,ser_cod];
        const conta = await db.consulta(sql,valor);
        return conta;
    }
    async consultarContasServico(ser_cod,db){
        const sql = "select * from conta_receber where ser_cod=? ";
              
        const valor = [ser_cod];
        const conta = await db.consulta(sql,valor);
        return conta;
    }
}