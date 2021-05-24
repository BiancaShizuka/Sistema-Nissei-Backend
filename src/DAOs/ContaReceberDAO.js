module.exports=class ContaReceberDAO{
 
    async gravar(conta,ser_cod,db) {
 
  
        const sql = "INSERT INTO conta_receber (con_cod,ser_cod,con_valor,con_dtVencimento) VALUES (?, ?, ?, ?)";
  
        const valor = [conta.getCod(),ser_cod,conta.getValor(),conta.getDtVenc()];
        const result = await db.manipula(sql,valor);
        
    }
    async alterar(conta,ser_cod,db){

    
        const sql = "UPDATE conta_receber SET con_dtPgto=? "+
                    "WHERE con_cod = ? AND ser_cod=?";
        
        const valor = [conta.getDtPgto(),conta.getCod(),ser_cod];
        const result = await db.manipula(sql,valor);
  
    }

    async deletarPorServico(conta,ser_cod,db){
      
    
        const sql = "DELETE FROM conta_receber WHERE con_cod=? and ser_cod=? "
        const valor = [conta.getCod(),ser_cod];
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
    async consultarContasFiltro(dtInicio,dtFim,status,cliente,db){

        let hasParameter=false;

        let valor=[];
     
        let sql = "SELECT * FROM conta_receber c,Servico s,Pessoa p ";
        if(dtInicio){
            
            sql+=" where c.con_dtVencimento >= ?"
            valor.push(dtInicio);
            hasParameter=true;
        }
        if(dtFim){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" c.con_dtVencimento<=?";
            valor.push(dtFim);
        }
        if(status){
            
                
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;
            if(status=="Pagamento efetuado")
                sql+=" c.con_dtPgto is not null";
            else
            sql+=" c.con_dtPgto is null";
        }
        if(cliente){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;
         
            sql+=" UPPER(p.pes_nome) like upper(?)";
     
            valor.push("%"+cliente+"%");
        }
        if(hasParameter)
            sql+=" and";
        else
            sql+=" where";
        sql+=" s.ser_status=true and s.ser_cod=c.ser_cod and s.cli_cod=p.pes_cod";
        sql+=" order by s.ser_cod ASC, c.con_cod ASC";
      
        const contas = await db.consulta(sql,valor);
       
        return contas;
    }
}