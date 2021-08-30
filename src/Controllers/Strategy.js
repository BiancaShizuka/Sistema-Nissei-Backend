const Vista=require('./Vista')
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




module.exports= GeraConta
