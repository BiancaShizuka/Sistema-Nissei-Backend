const axios=require('axios');
const db=require('../models/Database');
module.exports=class DespesasDAO{
     async alterar(request,response){
        const {des_cod,des_dtEntrada,dt_cod} = request.body;

    
        const con = await db.conecta();
        const sql = "UPDATE Despesa SET des_dtEntrada=? dt_cod=?"+
                    "WHERE des_cod = ?";
        
        const valor = [des_dtEntrada,dt_cod,des_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    }
    async gravar(des,db) {
        const {des_dtEntrada,dt_cod} = request.body;
        const sql = "INSERT INTO Despesa (des_dtEntrada,dt_cod) VALUES ( ?, ?)";
        
        const valor = [des_dtEntrada,dt_cod];
        const result = await db.manipula(sql,valor);
        return result;
    }
    async deletar(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "DELETE FROM Despesa WHERE des_cod=?";
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    }
    async procurarCod(cod,db){
        const sql = "SELECT * FROM Despesa WHERE des_cod=?";
        
        const valor = [cod];
        const resp = await db.consulta(sql,valor);
        return resp;
    }
}