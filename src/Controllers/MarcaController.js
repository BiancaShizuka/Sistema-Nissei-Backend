const axios=require('axios');
const db=require('../models/Database');

module.exports={
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM marca where mar_status=true";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async procurarCod(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM marca WHERE mar_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
    async listarPorFiltro(request,response){
        const filtro = request.params.filtro;
        const con = await db.conecta();
        const sql = "SELECT * FROM marca WHERE UPPER(mar_descricao) LIKE UPPER(?) and mar_status=true";
        const valor = [filtro+"%"];
        const marcas = await db.consulta(sql,valor);
        return response.json(marcas.data);
    },
    async gravar(request,response) {
 
        const {mar_descricao} = request.body;
       
     
        const con = await db.conecta();
        const sql = "INSERT INTO marca (mar_descricao,mar_status) VALUES (?,true)";
        
        const valor = [mar_descricao];
        const result = await db.manipula(sql,valor);
        if(!result.status)
            console.log("Ja cadastrado");
        
        return response.json(result);
    },
    async alterar(request,response){
        const {mar_cod,mar_descricao} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE marca set mar_descricao=? "+
                    "WHERE mar_cod = ?";
        
        const valor = [mar_descricao,mar_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async alterarStatus(request,response){
        const {cod} = request.params;
    
      
        const con = await db.conecta();
        var sql = "UPDATE marca set mar_status=false "+
                    "WHERE mar_cod = ?";
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);

        return response.json(result);
    },
    async excluir(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "DELETE FROM Marca WHERE mar_cod=?";
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    
  
}