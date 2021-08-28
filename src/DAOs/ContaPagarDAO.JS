module.exports=class ContaPagarDAO{
    async listar(des_cod,db){
        const sql = "SELECT * FROM Conta_Pagar where des_cod=?";
        const valor = [des_cod];
        const contapagar = await db.consulta(sql,valor);
        return contapagar;
    }
    async gravar(conta,des_cod,db) {    
        const sql = "INSERT INTO Conta_Pagar (con_cod,des_cod,con_valor,con_dtVencimento,con_dtPgto) VALUES (?, ?, ?, ?,null)";
        const valor = [conta.getCod(),des_cod,conta.getValor(),conta.getDtVenc()];
        const result=await db.manipula(sql,valor);
        console.log(result);
        return result;
    }
    async deletar(conta,des_cod,db){
        const sql = "DELETE FROM Conta_Pagar WHERE des_cod=? AND con_cod=? "
              
        const valor = [des_cod,conta.getCod()];
        const result=await db.manipula(sql,valor);
        return result;
    } 
    async alterar(conta,des_cod,db){
        const sql = "UPDATE conta_pagar SET con_valor=?, con_dtVencimento=?, con_dtPgto=? "+
                    "WHERE con_cod = ? AND des_cod=?";
        
        const valor = [conta.getValor(),conta.getDtVenc(),conta.getDtPgto(),conta.getCod(),des_cod];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async listarFiltro(td_cod,dtInicio,dtFim,db){
        let hasParameter=false;

        let valor=[];
     
        let sql = "SELECT * FROM conta_pagar c,Despesa d, tipo_despesa t ";
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
        if(td_cod && td_cod>0){
            
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;
            sql+=" d.td_cod=?";
            valor.push(td_cod);
        }
        
        if(hasParameter)
            sql+=" and";
        else
            sql+=" where";
        sql+=" c.des_cod=d.des_cod and d.td_cod=t.td_cod ";
        sql+=" order by c.des_cod ASC, c.con_cod ASC";
     
        //let sql = "SELECT * FROM conta_pagar c,Despesa d, tipo_despesa t where c.des_cod=d.des_cod and d.td_cod=t.td_cod";
 
      
        const contas = await db.consulta(sql,valor);

        return contas;
    }
}