const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');

module.exports={
    async gravar(request,response) {
 
        const {car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_status} = request.body;
        //verificar se o professor ja esta cadastrado
        const con = await db.conecta();
        const sql = "INSERT INTO servico (car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_fim,ser_status) VALUES (?, ?, ?,?, ?,?, null,?)";
        
        const valor = [car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_status];
        const result = await db.manipula(sql,valor);
        console.log(result);
        return response.json(result);
    },
    async alterar(request,response){
        const {ser_cod,car_id,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_status} = request.body;
        console.log(car_id);
      
        const con = await db.conecta();
        const sql = "UPDATE servico SET car_id=? ,fun_cod=?,"+
                    "ser_descricao=?,ser_maoObra=?,ser_inicio=?, "+
                    "ser_status=? "+
                    "WHERE ser_cod = ?";
        
        const valor = [car_id,fun_cod,ser_descricao,ser_maoObra,ser_inicio,ser_status,ser_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async alterarStatus(request,response){
        const {ser_cod,ser_total,ser_fim,ser_status} = request.body;
        const con = await db.conecta();
        const sql = "UPDATE servico SET ser_status=?,ser_fim=? "+
                    "WHERE ser_cod = ?";
        
        const valor = [ser_status,ser_fim,ser_cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async procurarServico(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servico WHERE ser_cod=?";
        
        const valor = [cod];
        const result = await db.consulta(sql,valor);

        return response.json(result.data);
    },
    async listarPorCliente(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "select * from (SELECT * FROM servico where cli_cod=?)serv left join carro "+
                    "on carro.car_id=serv.car_id";
        const valor = [cod];
        const sers = await db.consulta(sql,valor);
        return response.json(sers.data);
    },
    async listarPorCarro(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servico where car_id=?";
        const valor = [cod];
        const sers = await db.consulta(sql,valor);
        return response.json(sers.data);
    },
    async listar(request,response){
        const con = await db.conecta();
        const sql = "SELECT * FROM servico";
        const sers = await db.consulta(sql);
        return response.json(sers.data);
    },
    async listarFiltros(request,response){
        const cli_nome = request.query["cliente"];
        const fun_cod = request.query["fun_cod"];
        const dt_inicio = request.query["dt_inicio"];
        const dt_saida = request.query["dt_saida"];
        const mar_cod = request.query["mar_cod"];
        const car_placa = request.query["car_placa"];
        const status = request.query["status"];
        //,fun_cod,dt_inicio,dt_saida,mar_cod,car_placa,status
        let hasParameter=false;
        const con = await db.conecta();
        let valor=[];
        /*
        let sql="SELECT s.ser_cod,mar_descricao,p.pes_nome as cli_nome,p2.pes_nome as fun_nome,c.car_placa,s.ser_inicio, ser_status,ser_total ";
        sql+="from Cliente cli,Servico s,Carro c, Marca m, Pessoa p,Pessoa p2 WHERE p.pes_cod=cli.pes_cod ";
        sql+="and s.car_id=c.car_id and m.mar_cod=c.mar_cod and s.cli_cod = p.pes_cod and s.fun_cod=p2.pes_cod";*/
        let sql;
        sql="select s.ser_cod,mar_descricao,p.pes_nome as cli_nome,s.cli_cod as cli_cod,p2.pes_nome as fun_nome,c.car_placa,s.ser_inicio, ser_status";
        sql+=" from (Servico s";
        sql+=" left join Carro c on s.car_id=c.car_id"; 
        sql+=" left join Marca m on c.mar_cod=m.mar_cod";
        sql+=" left join Pessoa p on s.cli_cod=p.pes_cod";
        sql+=" left join Pessoa p2 on s.fun_cod=p2.pes_cod) ";
        if(status){
            sql+=" where s.ser_status=?"
            valor.push(status);
            hasParameter=true;
        }
        
        if(cli_nome){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" UPPER(p.pes_nome) LIKE UPPER(?)";
            valor.push("%"+cli_nome+"%");
        }
 
        if(dt_inicio){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" s.ser_inicio>=?";
            valor.push(dt_inicio);
        }
        if(dt_saida){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" s.ser_inicio<=?";
            valor.push(dt_saida);
        }
      
        if(car_placa){
            if(hasParameter)
                sql+=" and";
            else
                sql+=" where";
            hasParameter=true;

            sql+=" UPPER(c.car_placa) LIKE UPPER(?)";
            valor.push("%"+car_placa+"%");
        }
        /*
        const sql = "SELECT * FROM servico where CURRENT_DATE()>="+datainicio+ " AND CURRENT_DATE()<="+datafim;
        */
        const sers = await db.consulta(sql,valor);
        console.log(sers);
        return response.json(sers.data);
    },
    async listarPorFuncionario(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const sql = "SELECT * FROM servico where fun_cod=?";
        const valor = [cod];
        const sers = await db.consulta(sql,valor);
        return response.json(sers.data);
    },
    async alterarCarroNulo(request,response){
        const {cod} = request.params;;
    
      
        const con = await db.conecta();
        const sql = "UPDATE servico SET car_id=? "+
                    "WHERE car_id = ?";
        
        const valor = [null,cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async alterarFuncionarioNulo(request,response){
        const {cod} = request.params;
    
        console.log('passei');
        const con = await db.conecta();
        const sql = "UPDATE servico SET fun_cod=? "+
                    "WHERE fun_cod = ? and ser_status=true";
        
        const valor = [null,cod];
        const result = await db.manipula(sql,valor);
        return response.json(result);
    },
    async consultarServico(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        let sql = "SELECT ser_inicio,ser_status,p.pes_cod,ser_fim,ser_descricao,ser_maoObra,p.pes_nome as cli_nome, p1.pes_nome as func_nome,p1.pes_cod as func_cod,c.car_placa ";
        sql+="FROM (Servico s ";
        sql+="left join Pessoa p on cli_cod=p.pes_cod ";
        sql+="left join Pessoa p1 on fun_cod=p1.pes_cod ";
        sql+="left join Carro c on s.car_id=c.car_id) where s.ser_cod=?";
        const valor = [cod];
        const sers = await db.consulta(sql,valor);
        return response.json(sers.data);
    }
}