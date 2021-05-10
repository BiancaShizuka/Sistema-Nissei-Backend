const axios=require('axios');
const db=require('../models/Database');

module.exports={
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM carro where car_status=1";
        const users = await db.consulta(sql);
        return response.json(users.data);
    },
    async listarPorMarca(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM carro where mar_cod=? and car_status=1";
        const valor=[cod];
        const users = await db.consulta(sql,valor);
        return response.json(users.data);
    },
    async procurarCod(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM Carro WHERE car_id=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
    async procurarCodPessoa(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "SELECT * FROM Carro WHERE pes_cod=? and car_status=1";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);
        return response.json(result.data);
    },
    async gravar(request,response) {
 
        const {pes_cod,mar_cod,car_placa,car_ano,car_modelo,car_km} = request.body;
       
     
        const con = await db.conecta();
        const sql = "INSERT INTO carro (pes_cod,mar_cod,car_placa,car_ano,car_modelo,car_km,car_status) VALUES (?,?,?,?,?,?,?)";
        
        const valor = [pes_cod,mar_cod,car_placa,car_ano,car_modelo,car_km,true];
        const result = await db.manipula(sql,valor);
        if(!result.status)
            console.log("Ja cadastrado");
        
        return response.json(result);
    },
    async alterar(request,response){
        const {car_id,pes_cod,mar_cod,car_placa,car_ano,car_modelo,car_km} = request.body;
    
      
        const con = await db.conecta();
        const sql = "UPDATE carro SET pes_cod=?, mar_cod=?,car_placa=?,car_ano=?,car_modelo=?,car_km=? "+
                    "WHERE car_id = ?";
        
        const valor = [pes_cod,mar_cod,car_placa,car_ano,car_modelo,car_km,car_id];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async deletar(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        let valor = [cod];
        let sql="SELECT * FROM servico where car_id=?";
        let result=await db.consulta(sql,valor);

        if(result.data.length>0){
            sql = "UPDATE carro SET car_status=? WHERE car_id = ?";
            valor = [false,cod];
            await db.manipula(sql,valor);

            sql = "UPDATE servico SET car_id=? "+
                    "WHERE car_id = ? and ser_fim is null";
            valor = [null,cod];
            result = await db.manipula(sql,valor);
        }
        else{
            sql = "DELETE FROM Carro WHERE car_id=?";
            result = await db.manipula(sql,valor);
        }
        return response.json(result.data);
    },
    async alterarMarcaNull(request,response){
        const cod = request.params.cod;
        const con = await db.conecta();
        const sql = "UPDATE carro SET mar_cod=null WHERE mar_cod = ?";
        
        const valor = [cod];
        const result = await db.manipula(sql,valor);
        console.log(result);
        return response.json(result.data);
    },
}