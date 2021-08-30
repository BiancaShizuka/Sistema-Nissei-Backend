const Vista=require('./Vista')
var GeraConta = function () {
    this.modo = "";
};

GeraConta.prototype = {
    

    gerarParcelas: function (servico,qtde_parcelas,date,db) {
        throw typeof(Error) !== 'undefined'? 
        new Error(" Interface Strategy: method gerarParcelas() unimplemented!") 
        : " Interface Strategy: method gerarParcelas() unimplemented!";
    }
};




module.exports= GeraConta
