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
                                ser_status,
                                null);
        for(let i=0;i<pecas.length;i++){
            servico.addPecaLista(new ServicoPeca(await new Peca().procurarCod(pecas[i].pec_cod,db),
                                                pecas[i].uti_precoUni,
                                                pecas[i].uti_qtde));
        }
        await servico.gravar(db);
        for(let i=0;i<servico.getPecas().length;i++){
            await servico.getPecas()[i].gravar(servico.getCod(),db);
        }
        await servico.adicionar(servico.getCliente(),true,db);
        await servico.adicionar(servico.getFuncionario(),true,db);
        return response.json(servico);
    },
    async alterar(request,response){
        const {ser_cod,car_id,fun_cod,ser_descricao,ser_maoObra,ser_inicio,pecas,pecasExc,ser_status} = request.body;
        const con = await db.conecta();
        let servico=new Servico(ser_cod,await new Carro().procurarCod(car_id,db),
                                null,
                                await new Funcionario().procurarCod(fun_cod,db),
                                ser_descricao,
                                ser_maoObra,
                                ser_inicio,
                                ser_status,
                                null);
        for(let i=0;i<pecas.length;i++){
            servico.addPecaLista(new ServicoPeca(await new Peca().procurarCod(pecas[i].pec_cod,db),
                                                pecas[i].uti_precoUni,
                                                pecas[i].uti_qtde));
        }
        await servico.alterar(db);

        //percorro a lista das peças do serviço que foram excluidas
        let pec;
        for(let i=0;i<pecasExc.length;i++){
            pec=new ServicoPeca(await new Peca().procurarCod(pecasExc[i].pec_cod,db),
                                                    pecasExc[i].uti_precoUni,
                                                    pecasExc[i].uti_qtde);
            //deleto a peça do serviço do banco
            await pec.deletar(servico.getCod(),db);
        }

        //Vejo quais peças da lista ainda não estão no banco
        for(let i=0;i<servico.getPecas().length;i++){
            if(pecas[i].banco==0) //apenas aqueles que ainda nao estao eu gravo
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
    async excluir(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        let servico=await new Servico().procurarCod(cod,db);
        //deleto todas as peças que o serviço utilizou da tabela ServiçoPeça
        for(let i=0;i<servico.getPecas().length;i++)
            await servico.getPecas()[i].deletar(cod,db);
        //Deleto todas as contas que o serviço tem
        for(let i=0;i<servico.getContas().length;i++)
            await servico.getContas()[i].deletarContaServico(cod,db);
        await servico.excluir(db);
        return response.json(servico);
    },
    async listarPorCliente(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        let cliente=await new Cliente().procurarCod(cod,db);
        let servicos;
        if(cliente!=null){
            servicos=await new Servico().listarPorCliente(cliente,db);
        }
        return response.json(servicos);
    },
    async listarPorCarro(request,response){
        const {cod} = request.params;
        const con = await db.conecta();
        let servicos;
        let carro=await new Carro().procurarCod(cod,db);
        if(carro!==null){
            servicos=await new Servico().listarPorCarro(carro,db);
        }
        return response.json(servicos);
    },
    async listarPorCarroNull(request,response){
        const {cod} = request.params;
        const con = await db.conecta();

        const servicos=await new Servico().listarPorCarroNull(cod,db);
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