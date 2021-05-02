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
    async deletar(conta,db){

        const sql = "DELETE FROM conta_receber WHERE con_cod=? AND ser_cod=? "
              
        
        const valor = [conta.getCod(),conta.getSerCod()];
        const result = await db.manipula(sql,valor);
    }
    async deletarPorServico(conta,db){
      
    
        const sql = "DELETE FROM conta_receber WHERE ser_cod=? "
              
        
        const valor = [conta.getSerCod()];
        const result = await db.manipula(sql,valor);
    
    }
}