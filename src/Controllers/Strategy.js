const ContaReceber=require('../models/ContaReceber')
var GeraConta = function () {
    this.modo = "";
};

GeraConta.prototype = {
    setStrategy: function (modo) {
        this.modo = modo;
    },

    gerarParcelas: function (servico,qtde_parcelas,date,db) {
        //return this.modo.gerar...
        return new Vista().gerarParcelas(servico,qtde_parcelas,date,db);
    }
};
var Parcelado = function () {
    this.gerarParcelas = async function (servico,qtde_parcelas,date,db) {
        for(let i=1;i<=qtde_parcelas-1;i++){
            let date2 = new Date(date);
            let v=parseFloat(servico.getTotal()/qtde_parcelas).toFixed(2);
            servico.addContaReceber(new ContaReceber(i,v,date2));
            date.setDate(date.getDate()+30);
        }
        let auxv=servico.getTotal()-parseFloat(servico.getTotal()/qtde_parcelas).toFixed(2)*(qtde_parcelas-1);
        servico.addContaReceber(new ContaReceber(qtde_parcelas,auxv,date));

        for(let i=0;i<qtde_parcelas;i++)
                await servico.getContas()[i].gravar(servico.getCod(),db);
       
    }
};
var Vista = function () {
    this.gerarParcelas = async function (servico,qtde_parcelas,date,db) {
        if(qtde_parcelas==1){
            servico.addContaReceber(new ContaReceber(1,servico.getTotal(),date));
                
            await servico.getContas()[0].gravar(servico.getCod(),db);
        }
        else{
            new Parcelado().gerarParcelas(servico,qtde_parcelas,date,db);
        }
    }
};


module.exports= GeraConta
