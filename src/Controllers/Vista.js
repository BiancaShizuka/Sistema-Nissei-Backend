const ContaReceber=require('../models/ContaReceber');
const Parcelado=require('./Parcelado')
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

module.exports=Vista