<?php

	##SIMULADOR, REALIZA A TROCA DOS STATUS DAS MAQUINAS NO INTERVALO DE TEMPO SETADO NA PAGINA DE CONFIGURAÇÃO

	##ABRE A CONEXÃO COM O BANCO DE DADOS
	try{
		$conexao = mysqli_connect('localhost','id5255737_root','igor12345', 'id5255737_maquinas');
	}catch(Exception $e){
		$return = FALSE;
	}

	##BUSCO AS MAQUINAS
	$query = "SELECT * FROM maquina";
	$resultado = $conexao->query($query);

	$maquinas = array();
	if ($resultado->num_rows > 0) {
		while($row = $resultado->fetch_assoc()) {
			$maquinas[] = $row;
		}
	}

	##BUSCO OS STATUS
	$query = "SELECT * FROM status";
	$resultado = $conexao->query($query);

	$status = array();
	if ($resultado->num_rows > 0) {
		while($row = $resultado->fetch_assoc()) {
			$status[] = $row;
		}
	}

	##PERCORRER TODAS AS MAQUINAS PARA IR GERANDO O STATUS DE FORMA ALEATORIO
	$arraySimulados = array();
	for($i=0;$i<count($maquinas);$i++){
		##PEGA UM STATUS NO ARRAY DE STATUS ALEATORIO
		$posStatus = rand(0,count($status)-1);
		$arraySimulados[] = array('maquina' => $maquinas[$i]['codMaquina'], 'status' => $status[$posStatus]['codStatus']);
	}

	##PERCORRE O ARRAY PARA GRAVAR NO BANCO DE DADOS
	foreach ($arraySimulados as $simulado) {
		$query = "INSERT INTO maquinastatus (codigoMaquina,codigoStatus,Data_Hora) VALUES (".$simulado['maquina'].",".$simulado['status'].",'".date("Y-m-d H:i:s")."')";
		##EXECUTA A QUERY
		try{
			mysqli_query($conexao, $query);	
		}catch(Exception $e){
			var_dump("Erro ao tentar cadastrar a simulação");
			exit;
		}	
	}

	
	$conexao->close();	

	echo json_encode(true);

?>