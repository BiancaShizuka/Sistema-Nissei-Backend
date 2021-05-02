const axios = require('axios');
const db = require('../models/Database');
const ContaReceber = require('../models/ContaReceber');
const Servico = require('../models/Servico')
module.exports={
    async fechar(request,response) {
 
        const {ser_cod,qtde_parcelas} = request.body;
        
        const con = await db.conecta();
        
     
        return response.json(result);
    },
    
    
  
}