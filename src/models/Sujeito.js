

var Sujeito = function () {
    this.observadores="";
  };
  
Sujeito.prototype = {
      
  
    adicionar: function (observ) {
        throw typeof(Error) !== 'undefined'? 
        new Error(" Interface Sujeito: method adicionar() unimplemented!") 
        : " Interface Sujeito: method adicionar() unimplemented!";
    },
    remove: function(observ){
        throw typeof(Error) !== 'undefined'? 
          new Error(" Interface Sujeito: method remove() unimplemented!") 
          : " Interface Sujeito: method remove() unimplemented!";
    }
};
  
  
  
  
  module.exports= Sujeito