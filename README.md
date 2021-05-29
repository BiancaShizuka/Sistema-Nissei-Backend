# Sistema-Nissei-Backend
Função Fundamental: Gerar ordem de Serviço
-A view se encontra em src/Paginas/Cadastros/cadastroServiço.js
-A controller se encontra em src/Controllers/ServicoController.js
-Ao clicar no botão salvar será chamado a função 'cadastrarServico' que está chamará a controller 'ServiçoController', fazendo a função 'gravar'.
-Caso seja para alterar será chamado a controller 'ServiçoController', fazendo a função 'alterar'.

Função Fundamental: Fechar ordem de Serviço
-A view se encontra em src/Paginas/Servico/fechaServico.js
-A controller se encontra em src/Controllers/FecharServicoController.js
-Ao clicar no botao será chamado a função 'gerarContaReceber' que irá chamar a controller 'FecharServicoController',fazendo a funcao 'fechar'

Função Fundamental: Cancelar ordem de Serviço
-A view se encontra em src/Paginas/Servico/visualizarServico.js
-A controller se encontra em src/Controllers/CancelarServicoController.js
-Ao clicar no botao será chamado a função 'cancelarFechamento', que chamará a controller 'CancelarServicoController', fazendo a função 'cancelar'

Função Fundamentar: Efetuar Recebimento
-A view se encontra em src/Paginas/Listas/listaContaReceber.js
-A controller se encontra em src/Controllers/EfetuarRecebimentoController.js
-Na view terá dois botões um para pagar pacialmente e outra que paga total.
->Para pagar total
	-Ao clicar irá chamar a função 'confirmarRecebimento', que chamará a controller 'EfetuarRecebimentoController', fazendo a função 'alterar'
->Para pagar parcial
	-Ao clicar irá chamar a função 'receberParc', que chamará a controller 'EfetuarRecebimentoController', fazendo a função 'receberParcial'

Função Fundamental: Gerar Contas a pagar
-View não finalizada
-A controller se encontra em src/Controllers/GerarContasPagarController.js
-Ao chamar essa controller será feita a função 'gravar'

Função Fundamental: Efetuar Pagamento
-View não finalizada
-A controller se encontra em src/Controllers/EfetuarPagamentoController.js
-Ao chamar essa controller será feita a função 'efetuarPagamento'