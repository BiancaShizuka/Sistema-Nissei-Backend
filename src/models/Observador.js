

var Observador = function () {
  this.msg="";
};

Observador.prototype = {
    

    atualizar: function (msg) {
        throw typeof(Error) !== 'undefined'? 
        new Error(" Interface Observador: method atualizar() unimplemented!") 
        : " Interface Observador: method atualizar() unimplemented!";
    }
};




module.exports= Observador