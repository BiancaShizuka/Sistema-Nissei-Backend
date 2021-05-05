const {Router}=require('express');
const routes=Router();

const clienteCtrl=require('./Controllers/ClienteController')
const pessoaCtrl=require('./Controllers/PessoaController');
const marcaCtrl=require('./Controllers/MarcaController');
const carroController=require('./Controllers/CarroController');
const pecaController=require('./Controllers/PecaController');
const funcController=require('./Controllers/FuncController');
const contatoCtrl=require('./Controllers/ContatoController');
const servicoCtrl=require('./Controllers/ServicoController');
const serPecaCtrl=require('./Controllers/ServicoPecaController');
const contaCtrl=require('./Controllers/ContaReceberController');

routes.post('/peca',pecaController.gravar);
routes.put('/peca',pecaController.alterar);
routes.put('/pecaLog/:cod',pecaController.deletarLogico);
routes.get('/peca/:cod',pecaController.procurarCod);
routes.get('/peca',pecaController.listar);
routes.delete('/peca/:cod',pecaController.deletar);
routes.get('/pecafiltro/:filtro',pecaController.listarPorFiltro);


routes.post('/carro',carroController.gravar);
routes.put('/carro',carroController.alterar);
routes.put('/carroLog/:cod',carroController.deletarLogico);
routes.get('/carros',carroController.listar);
routes.get('/carro/:cod',carroController.procurarCod);
routes.get('/carroPes/:cod',carroController.procurarCodPessoa);
routes.get('/carroMarca/:cod',carroController.listarPorMarca);
routes.delete('/carro/:cod',carroController.deletar);
routes.put('/carroMarcaNull/:cod',carroController.alterarMarcaNull);

routes.get('/marcas',marcaCtrl.listar);
routes.post('/marcas',marcaCtrl.gravar);
routes.put('/marcas',marcaCtrl.alterar);
routes.get('/marcas/:cod',marcaCtrl.procurarCod);
routes.delete('/marcas/:cod',marcaCtrl.excluir);
routes.get('/marcasfiltro/:filtro',marcaCtrl.listarPorFiltro);
routes.put('/marcasstatus/:cod',marcaCtrl.alterarStatus);

routes.post('/pessoas',pessoaCtrl.gravar);
routes.get('/pessoaCod/:cod',pessoaCtrl.procurarCod)
routes.get('/pessoasCli',pessoaCtrl.listarCliente);
routes.get('/pessoasCliFiltro/:filtro',pessoaCtrl.listarClientePorFiltro);
routes.get('/pessoasFun',pessoaCtrl.listarFuncionario);
routes.get('/pessoasFunFiltro/:filtro',pessoaCtrl.listarFuncionarioPorFiltro);
routes.get('/pessoaCpf/:cpf',pessoaCtrl.procurarCPF);
routes.put('/pessoa',pessoaCtrl.alterar);
routes.get('/pessoaEmail/:email',pessoaCtrl.validarEmail);
routes.get('/pessoaProcurarEmail/:email',pessoaCtrl.procurarEmail);

routes.post('/clientes',clienteCtrl.gravar);
routes.put('/clientes',clienteCtrl.alterar);
routes.put('/cliente/:cod',clienteCtrl.deletarLogico);
routes.get('/clienteCod/:cod',clienteCtrl.procurarCliente);
routes.get('/cliente',clienteCtrl.listar);
routes.delete('/cliente/:cod',clienteCtrl.deletar);


routes.post('/contatos',contatoCtrl.gravar);
routes.get('/contatos/:cod',contatoCtrl.listarCod);
routes.delete('/contato/:cod',contatoCtrl.excluir);

routes.post('/func',funcController.gravar);
routes.put('/func',funcController.alterar);
routes.put('/funcLog/:cod',funcController.deletarLogico);
routes.get('/func/:email/:senha',funcController.procurarUser);
routes.get('/func',funcController.listar);
routes.get('/func/:cod',funcController.procurarFunc);
routes.delete('/func/:cod',funcController.deletar);

routes.post('/servico',servicoCtrl.gravar);
routes.get('/servicoCarro/:cod',servicoCtrl.listarPorCarro);
routes.get('/servicoCliente/:cod',servicoCtrl.listarPorCliente);
routes.get('/servicoFuncionario/:cod',servicoCtrl.listarPorFuncionario);
routes.get('/servico/:cod',servicoCtrl.procurarServico);
routes.get('/servicoFiltro',servicoCtrl.listarFiltros);
routes.get('/servico',servicoCtrl.listar);
routes.get('/servicoInfo/:cod',servicoCtrl.consultarServico);
routes.put('/servico',servicoCtrl.alterar);
routes.put('/servicoCarro/:cod',servicoCtrl.alterarCarroNulo);
routes.put('/servicoFuncNull/:cod',servicoCtrl.alterarFuncionarioNulo);
routes.put('/servicoFechar',servicoCtrl.alterarStatus);

routes.post('/servicopeca',serPecaCtrl.gravar);
routes.put('/servicopeca',serPecaCtrl.alterar);
routes.delete('/servicopeca/:ser_cod/:pec_cod',serPecaCtrl.deletar);
routes.get('/servicopeca/:ser_cod',serPecaCtrl.listar);
routes.get('/servicoPecasPeca/:pec_cod',serPecaCtrl.listarPecas);


routes.post('/conta',contaCtrl.gravar);
routes.put('/conta',contaCtrl.alterar);
routes.delete('/conta/:con_cod/:ser_cod',contaCtrl.deletar);
routes.delete('/contaPorServico/:ser_cod',contaCtrl.deletarPorServico);
routes.get('/conta/:ser_cod',contaCtrl.listar);
routes.get('/contaPaga/:ser_cod',contaCtrl.listarContasPagas);
routes.get('/contaFiltros',contaCtrl.listarFiltros);

const contaReceberCtr=require('./Controllers/EfetuarRecebimentoController');
routes.put('/contaReceber',contaReceberCtr.alterar);
routes.get('/contaReceber/:ser_cod',contaReceberCtr.listarContas);

const fecharServicoCtr=require('./Controllers/FecharCancelarServicoController');
routes.post('/fecharServico',fecharServicoCtr.fechar);
routes.put('/cancelarFechamento',fecharServicoCtr.cancelar);
module.exports=routes;