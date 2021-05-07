const axios=require('axios');
const db=require('../models/Database');

module.exports={
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM peca where pec_status=true";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async procurarCod(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM peca WHERE pec_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
    async gravar(request,response) {
 
        const {pec_descricao} = request.body;
  
        const con = await db.conecta();
        const sql = "INSERT INTO peca (pec_descricao,pec_status) VALUES (?,true)";
        
        const valor = [pec_descricao];
        const result = await db.manipula(sql,valor);
        return response.json(result.data);
    },
    async alterar(request,response){
        const {pec_cod,pec_descricao} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE peca SET pec_descricao=? "+
                    "WHERE pec_cod = ?";
        
        const valor = [pec_descricao,pec_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async listarPorFiltro(request,response){
        const filtro = request.params.filtro;
        const con = await db.conecta();
        const sql = "SELECT * FROM peca WHERE UPPER(pec_descricao) LIKE UPPER(?) AND pec_status=true";
        const valor = ["%"+filtro+"%"];
        const pecas = await db.consulta(sql,valor);
        return response.json(pecas.data);
    },
    async deletar(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        let sql = "SELECT * FROM servicopecas s where pec_cod=?";
        let valor = [cod];
        let result = await db.consulta(sql,valor);
        if(result.data.length===0){
            sql = "DELETE FROM Peca WHERE pec_cod=?";  
            valor = [cod];
            result = await db.manipula(sql,valor);
        }else{
            sql = "UPDATE Peca SET pec_status = ? "+
            "WHERE pec_cod = ?";
            valor = [false,cod];
            result = await db.manipula(sql,valor);
        }
        return response.json(result);
    }
}