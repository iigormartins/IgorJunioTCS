$(document).ready(() => {
	//##############################################################################
	//DOCUMENT PRONTO BUSCO A LISTA DE MAQUINAS
	buscaTela("listaMaquinas");
	$('#telaAtual').val('listaMaquinas');
	populaTela('listaMaquinas');
	verificaSimulacao();

	//FICARA ATUALIZANDO A LISTA DA MAQUINA COM OS STATUS A CADA 3 SEGUNDOS
	setInterval(()=>{populaTela('listaMaquinas')}, 3000);

	//CHAMADAS A PARTIR DO MENU
	//HOME
	$('#home').click(() => {
		$('li').removeClass('selected');
		$('#home').addClass('selected');
		buscaTela("listaMaquinas");
		$('#telaAtual').val('listaMaquinas');
		$('#operacao').val('C');
		setInterval(()=>{populaTela('listaMaquinas')}, 3000);
	});
	//MAQUINAS
	$('#maquinas').click(() => {
		$('li').removeClass('selected');
		$('#maquinas').addClass('selected');
		buscaTela("cadastroMaquinas");
		$('#telaAtual').val('maquina');
		populaTela('maquinas');
		$('#operacao').val('C');
		clearInterval(()=>{populaTela('listaMaquinas')});
	});
	//STATUS
	$('#status').click(() => {
		$('li').removeClass('selected');
		$('#status').addClass('selected');
		buscaTela("cadastroStatus");
		$('#telaAtual').val('status');
		populaTela('status');
		$('#operacao').val('C');
		clearInterval(()=>{populaTela('listaMaquinas')});
	});
	//CONFIGURAÇÃO
	$('#configuracao').click(() => {
		$('li').removeClass('selected');
		$('#configuracao').addClass('selected');
		buscaTela("configuracao");
		$('#telaAtual').val('configuracao');
		$('#operacao').val('A');
		populaTela('configuracao');
		clearInterval(()=>{populaTela('listaMaquinas')});
	});

	//##############################################################################
	//AÇÃO AO CLICAR EM GRAVAR, CHAMA O PROGRAMA QUE REALIZA O INSERT NO BANCO DE DADOS
	$(document).on('click', '#gravarRegistro', function(e) {

		var operacao = $('#operacao').val();
		// VERIFICO QUE TIPO DE OPERACAO É C = CADASTRAR, A = ATUALIZAR
		if(operacao == "C"){

			var telaAtual = $('#telaAtual').val();

			if(telaAtual == 'maquina'){

				//VALIDO SE O CAMPO NOME FOI PREENCHIDO
				if($('#nomeMaquina').val() == ""){
					$('<p>Favor preencher o campo Nome da Maquina!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					return false;
				}
				
				var campos = 'nomeMaquina';
				var tabela = 'maquina';
				var valor = "'"+$('#nomeMaquina').val()+"'";
			}

			if(telaAtual == 'status'){

				//VALIDO SE O CAMPO CODIGO FOI PREENCHIDO
				if($('#codStatus').val() == ""){
					$('<p>Favor preencher o campo Código do Status!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					return false;
				}

				//VALIDO SE O CAMPO NOME FOI PREENCHIDO
				if($('#nomeStatus').val() == ""){
					$('<p>Favor preencher o campo Nome do Status!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					return false;
				}
				
				var campos = 'codStatus,nomeStatus';
				var tabela = 'status';
				var valor = "'"+$('#codStatus').val()+"','"+$('#nomeStatus').val()+"'";
			}

			$.ajax({
				async : false,
				method: "POST",
				dataType : "json",
				url: "programas/cadastrar.php",
				data : {
					tabela : tabela,
					campos : campos,
					valores : valor
				}
			}).done((jsonDados) => {
				if(jsonDados == true){
					
					$('<p>Registro Gravado com sucesso!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});

					if(telaAtual == 'maquina'){
						$('#nomeMaquina').val("");
						populaTela('maquinas');
					}

					if(telaAtual == 'status'){
						$('#codStatus').val("");
						$('#nomeStatus').val("");
						populaTela('status');
					}

				}else{
					$('<p>Não foi possivel Gravar o registro!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
				}
			}).fail((jqXHR, msg) => {
				console.log("Erro: "+msg);
			});
		}

		if(operacao == "A"){

			var telaAtual = $('#telaAtual').val();

			if(telaAtual == 'maquina'){
				
				//VALIDO SE O CAMPO NOME FOI PREENCHIDO
				if($('#nomeMaquina').val() == ""){
					$('<p>Favor preencher o campo Nome da Maquina!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					return false;
				}

				//VALIDO SE FOI SELECIONADO ALGUMA MAQUINA JA CADASTRADA
				if($('#maquinasCadastradas').val() == ""){
					$('<p>Favor selecionar a Maquina que dejesa atualizar o nome!</p>').dialog({
						height : 150,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					return false;
				}

				var tabela = 'maquina';
				var update = "nomeMaquina='" + $('#nomeMaquina').val() + "'";
				var condicao = 'codMaquina = ' + $('#maquinasCadastradas').val();
			}

			if(telaAtual == 'status'){
				
				//VALIDO SE O CAMPO NOME FOI PREENCHIDO
				if($('#nomeStatus').val() == ""){
					$('<p>Favor preencher o campo Nome da Status!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					return false;
				}

				//VALIDO SE FOI SELECIONADO ALGUMA STATUS JA CADASTRADO
				if($('#statusCadastrados').val() == ""){
					$('<p>Favor selecionar o Status que dejesa atualizar o nome!</p>').dialog({
						height : 150,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					return false;
				}

				var tabela = 'status';
				var update = "nomeStatus='" + $('#nomeStatus').val() + "'";
				var condicao = "codStatus = '" + $('#statusCadastrados').val()+"'";
			}

			if(telaAtual == 'configuracao'){

				//VALIDO SE O CAMPO TEMPO FOI PREENCHIDO
				if($('#tempo').val() == ""){
					$('<p>Favor preencher o campo Intervalo de Tempo!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					return false;
				}

				if(!somenteNumeros($('#tempo').val())){
					$('<p>Favor preencher o campo Intervalo de Tempo com valor válido!</p>').dialog({
						height : 150,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
					$('#tempo').val("");
					return false;
				}
				var tempo = $('#tempo').val();
				tempo = tempo * 1000;
				var tabela = 'configuracao';
				var update = 'confTempo='+tempo;
				var condicao = 'codTempo = 1';
			}

			$.ajax({
				async : false,
				method: "POST",
				dataType : "json",
				url: "programas/atualizar.php",
				data : {
					tabela : tabela,
					update : update,
					condicao : condicao
				}
			}).done((jsonDados) => {
				if(jsonDados == true){
					
					$('cadastrar').click();
					$('<p>Registro Atualizado com sucesso!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});

					if(telaAtual == 'maquina'){
						$('#nomeMaquina').val("");
						$('#maquinasCadastradas').val("");
						populaTela('maquinas');
					}

					if(telaAtual == 'status'){
						$('#nomeStatus').val("");
						$('#statusCadastrados').val("");
						populaTela('status');
					}

					if(telaAtual == 'configuracao'){
						$('#tempo').val("");
						populaTela('configuracao');
						verificaSimulacao();
					}

				}else{
					$('<p>Não foi possivel Atualizar o registro!</p>').dialog({
						height : 130,
						buttons: [
					    {
					      text: "OK",
					      click: function() {
					        $( this ).dialog( "close" );
					      }
					    }
					  ]
					});
				}
			}).fail((jqXHR, msg) => {
				console.log("Erro: "+msg);
			});
		}
		$('#cadastrar').click();
	});

	$(document).on('click', '#excluiRegistro', function(e) {
		var operacao = $('#operacao').val();
		if(operacao != "A"){
			$('<p>Favor selecionar o Registro de Excluir!</p>').dialog({
				height : 130,
				buttons: [
			    {
			      text: "OK",
			      click: function() {
			        $( this ).dialog( "close" );
			      }
			    }
			  ]
			});
			return false;
		}

		var telaAtual = $('#telaAtual').val();

		if(telaAtual == "maquina"){
			var tabela = "maquina";
			var condicao = 'codMaquina='+ $('#maquinasCadastradas').val();
		}

		if(telaAtual == "status"){
			var tabela = "status";
			var condicao = "codStatus='"+ $('#statusCadastrados').val()+"'";
		}

		$.ajax({
			async : false,
			method: "POST",
			dataType : "json",
			url: "programas/excluir.php",
			data : {
				tabela : tabela,
				condicao : condicao
			}
		}).done((jsonDados) => {
			if(jsonDados == true){
				$('#cadastrar').click();
				$('<p>Registro Excluido com sucesso!</p>').dialog({
					height : 130,
					buttons: [
				    {
				      text: "OK",
				      click: function() {
				        $( this ).dialog( "close" );
				      }
				    }
				  ]
				});

				if(telaAtual == "maquina"){
					$('#maquinasCadastradas').val("");
					populaTela('maquinas');
				}

				if(telaAtual == "status"){
					$('#statusCadastrados').val("");
					populaTela('maquinas');
				}

			}else{
				$('<p>Não foi possivel Excluir o registro!</p>').dialog({
					height : 130,
					buttons: [
				    {
				      text: "OK",
				      click: function() {
				        $( this ).dialog( "close" );
				      }
				    }
				  ]
				});
			}
		}).fail((jqXHR, msg) => {
			console.log("Erro: "+msg);
		});
	});

	//##############################################################################
	//AÇÃO DOS BOTOES CADASTRAR -  ATUALIZAR - EXCLUIR - TELA DE MAQUINAS
	$(document).on('click', '#cadastrar', function(e) {
		$('#gravarRegistro').attr('type','button');
		$('#excluiRegistro').attr('type','hidden');
		$('td').removeClass('selected');
		$('#cadastrar').addClass('selected');
		$('#operacao').val('C');

		if($('#telaAtual').val() == "maquina"){
			$('#nomeMaquina').removeAttr('disabled').val("");
			$('#maquinasCadastradas').attr('disabled','disabled').val("");
		}

		if($('#telaAtual').val() == "status"){
			$('#codStatus').removeAttr('disabled').val("");
			$('#nomeStatus').removeAttr('disabled').val("");
			$('#statusCadastrados').attr('disabled','disabled').val("");
		}
	});

	$(document).on('click', '#atualizar', function(e) {
		$('#gravarRegistro').attr('type','button');
		$('#excluiRegistro').attr('type','hidden');		
		$('td').removeClass('selected');
		$('#atualizar').addClass('selected');
		$('#operacao').val('A');

		if($('#telaAtual').val() == "maquina"){
			$('#nomeMaquina').removeAttr('disabled').val("");
			$('#maquinasCadastradas').removeAttr('disabled').val("");
		}

		if($('#telaAtual').val() == "status"){
			$('#codStatus').attr('disabled','disabled').val("");
			$('#nomeStatus').removeAttr('disabled').val("");
			$('#statusCadastrados').removeAttr('disabled').val("");
		}
	});

	$(document).on('click', '#excluir', function(e) {
		$('#gravarRegistro').attr('type','hidden');
		$('#excluiRegistro').attr('type','button');		
		$('td').removeClass('selected');
		$('#excluir').addClass('selected');
		$('#operacao').val('A');

		if($('#telaAtual').val() == "maquina"){
			$('#nomeMaquina').attr('disabled','disabled').val("");
			$('#maquinasCadastradas').removeAttr('disabled').val("");
		}

		if($('#telaAtual').val() == "status"){
			$('#codStatus').attr('disabled','disabled').val("");
			$('#nomeStatus').attr('disabled','disabled').val("");
			$('#statusCadastrados').removeAttr('disabled').val("");
		}
	});

});

// FUNÇÃO RESPONSAVEL POR BUSCA O PROGRAMA DA TELA
function buscaTela(nomeTela){
	$.ajax({
		async : false,
		method: "POST",
		dataType : "HTML",
		url: "pages/" + nomeTela + ".php"
	}).done((jsonDados) => {
		$('#site_content').empty();
		$('#site_content').append(jsonDados);
	}).fail((jqXHR, msg) => {
		console.log("Erro: "+msg);
	});
}

//FUNÇÃO RESPOSTAVEL POR PREENCHER A TELA COM DADOS DO BANCO
function populaTela(nomeTela){
	if(nomeTela == "maquinas"){
		//PRECISO BUSCAR TODAS AS MAQUINAS QUE JA FORAM CADASTRADAS
		var campos = 'codMaquina, nomeMaquina';
		var tabela = 'maquina';
		var condicao = '';
		$('#maquinasCadastradas').empty();
		$('#maquinasCadastradas').append('<option value=""></option>');
	}

	if(nomeTela == "status"){
		//PRECISO BUSCAR TODAS AS MAQUINAS QUE JA FORAM CADASTRADAS
		var campos = 'codStatus, nomeStatus';
		var tabela = 'status';
		var condicao = '';
		$('#statusCadastrados').empty();
		$('#statusCadastrados').append('<option value=""></option>');
	}

	if(nomeTela == "configuracao"){
		//PRECISO BUSCAR TODAS AS MAQUINAS QUE JA FORAM CADASTRADAS
		var campos = 'confTempo';
		var tabela = 'configuracao';
		var condicao = '';
	}

	if(nomeTela != "listaMaquinas"){
		$.ajax({
			async : false,
			method: "POST",
			dataType : "json",
			url: "programas/pesquisar.php",
			data : {
				tabela : tabela,
				campos : campos,
				condicao : condicao
			}
		}).done((jsonDados) => {
			if(jsonDados.length > 0){
				for(var i=0;i<jsonDados.length;i++){

					if(nomeTela == "maquinas") $('#maquinasCadastradas').append('<option value="'+jsonDados[i].codMaquina+'">'+jsonDados[i].codMaquina+' - '+jsonDados[i].nomeMaquina+'</option>');
					if(nomeTela == "status") $('#statusCadastrados').append('<option value="'+jsonDados[i].codStatus+'">'+jsonDados[i].codStatus+' - '+jsonDados[i].nomeStatus+'</option>');
					if(nomeTela == "configuracao"){
						var tempo = jsonDados[i].confTempo;
						tempo = tempo/1000;
						$('#tempo').val(tempo);
					}
				}
			}
		}).fail((jqXHR, msg) => {
			console.log("Erro: "+msg);
		});
	}else{
		$.ajax({
			async : false,
			method: "POST",
			dataType : "json",
			url: "programas/pesquisarListaMaquinas.php"
		}).done((jsonDados) => {
			if(jsonDados.length > 0){
				var cabecalho = '<tr><td class="maquina">Máquina</td><td class="status">Status</td></tr>';
				$('#listaMaquinas').empty();
				$('#listaMaquinas').append(cabecalho);
				for(var i=0;i<jsonDados.length;i++){					
					var maquina = '<tr><td class="maquina">'+jsonDados[i].codMaquina+' - '+jsonDados[i].nomeMaquina+'</td><td class="status">'+jsonDados[i].nomeStatus+'</td></tr>';
					$('#listaMaquinas').append(maquina);
				}

			}
		}).fail((jqXHR, msg) => {
			console.log("Erro: "+msg);
		});
	}
}

function somenteNumeros(num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
}

function verificaSimulacao(){
	//BUSCO EM QUANTO TEMPO A SIMULAÇÃO DEVE OCORRER
	var tabela = 'configuracao';
	var campos = 'confTempo';
	var condicao = '';

	var tempo = '';

	$.ajax({
		async : false,
		method: "POST",
		dataType : "json",
		url: "programas/pesquisar.php",
		data : {
			tabela : tabela,
			campos : campos,
			condicao : condicao
		}
	}).done((jsonDados) => {
		if(jsonDados.length > 0){
			tempo = parseInt(jsonDados[0].confTempo);
		}
	}).fail((jqXHR, msg) => {
		console.log("Erro: "+msg);
	});

	if(tempo != "" && tempo != null && tempo != undefined){
		setInterval(()=>{simulacao()}, tempo);
	}
}

function simulacao(){
	$.ajax({
		async : false,
		method: "POST",
		dataType : "json",
		url: "programas/simulacao.php"
	}).done((jsonDados) => {
		
	}).fail((jqXHR, msg) => {
		console.log("Erro: "+msg);
	});
}


