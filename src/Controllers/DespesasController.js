  const axios=require('axios');
const db=require('../models/Database');

module.exports={
    async alterar(request,response){
        const {pec_cod,pec_descricao} = request.body;

    
        const con = await db.conecta();
        const sql = "UPDATE peca SET pec_descricao=? "+
                    "WHERE pec_cod = ?";
        
        const valor = [pec_descricao,pec_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async  gravar ( despesas , db )  {
        const  sql  =  "INSERT INTO despesas (des_desc, des_valor)  VALUES (?,?)" ;
        
        const valor  =  [des_desc,des_valor] ;
        const result = await db.manipula(sql,valor);
        
        return result;
    },
    async deletar(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "DELETE FROM Despesas WHERE des_cod=?";
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
}