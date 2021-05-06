const axios = require('axios');
//const mysql = require('mysql2/promise');
const db = require('../models/Database');
const Servico=require('../models/Servico');
const Peca=require('../models/Peca');
const ServicoPeca=require('../models/ServicoPeca');
const Carro=require('../models/Carro');
const Cliente=require('../models/Cliente');
const Funcionario=require('../models/Funcionario');
module.exports={
    async gravar(request,response) {
        const {car_id,cli_cod,fun_cod,ser_descricao,ser_maoObra,ser_inicio,pecas,ser_status} = request.body;
        const con = await db.conecta();
        let servico=new Servico(0,await new Carro().procurarCod(car_id,db),
                                await new Cliente().procurarCod(cli_cod,db),
                                await new Funcionario().procurarCod(fun_cod,db),
                                ser_descricao,
                                ser_maoObra,
                                ser_inicio,
                                ser_status);
        for(let i=0;i<pecas.length;i++){
            servico.addPecaLista(new ServicoPeca(await new Peca().procurarCod(pecas[i].pec_cod,db),
                                                pecas[i].uti_precoUni,
                                                pecas[i].uti_qtde));
        }
        await servico.gravar(db);
        for(let i=0;i<servico.getPecas().length;i++){
            await servico.getPecas()[i].gravar(servico.getCod(),db);
        }
        return response.json(servico);
    },
    async alterar(request,response){
        const {ser_cod,car_id,fun_cod,ser_descricao,ser_maoObra,ser_inicio,pecas,ser_status} = request.body;
        const con = await db.conecta();
        let servico=new Servico(ser_cod,await new Carro().procurarCod(car_id,db),
                                null,
                                await new Funcionario().procurarCod(fun_cod,db),
                                ser_descricao,
                                ser_maoObra,
                                ser_inicio,
                                ser_status);
        for(let i=0;i<pecas.length;i++){
            servico.addPecaLista(new ServicoPeca(await new Peca().procurarCod(pecas[i].pec_cod,db),
                                                pecas[i].uti_precoUni,
                                                pecas[i].uti_qtde));
        }
        await servico.alterar(db);
        for(let i=0;i<servico.getPecas().length;i++){
            if(pecas[i].banco==0) //apenas aqueles que ainda nao estao
            await servico.getPecas()[i].gravar(servico.getCod(),db);
        }
        return response.json(servico);
    },
    async procurarServico(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const servico=await new Servico().procurarCod(cod,db);
        return response.json(servico);
    },
    async deletarServicoPeca(request,response){
        const ser_cod = request.params.ser_cod;
        const pec_cod = request.params.pec_cod;
        const con = await db.conecta();
        let servicoPeca=await new ServicoPeca().procurarServicoPeca(ser_cod,pec_cod,db);
        servicoPeca.deletarServicoPeca(ser_cod,db);
        return response.json(servicoPeca);
    },
    async listarPorCliente(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const servicos=await new Servico().listarPorCliente(cod,db);
        return response.json(servicos);
    },
    async listarPorCarro(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        const servicos=await new Servico().listarPorCarro(cod,db);
        return response.json(servicos);
    },
    async listarFiltros(request,response){
        const cli_nome = request.query["cliente"];
        const dt_inicio = request.query["dt_inicio"];
        const dt_saida = request.query["dt_saida"];
        const car_placa = request.query["car_placa"];
        const status = request.query["status"];
        
        let servicos=await new Servico().listarFiltros(cli_nome,dt_inicio,dt_saida,car_placa,status,db);
        return response.json(servicos);
    }
}