<?php
	
	$return = array(); ##RESPONSAVEL POR RETORNA O STATUS DA OPERAÇÃO SE FALHOU OU N

	##ABRE A CONEXÃO COM O BANCO DE DADOS
	try{
		$conexao = mysqli_connect('localhost','id5255737_root','igor12345', 'id5255737_maquinas');
	}catch(Exception $e){
		$return = FALSE;
	}

	##BUSCO A QUANTIDADE DE MAQUINAS EXISTEM CADASTRADAS
	$query = "SELECT COUNT(codMaquina) as count FROM maquina";
	$resultado = $conexao->query($query);
	$total = $resultado->fetch_assoc();
	$total = $total['count'];

	##MONTA A QUERY
	$query = "SELECT 
				codMaquina, nomeMaquina, nomeStatus 
			FROM maquinastatus
				 LEFT JOIN maquina ON codMaquina = codigoMaquina
				 LEFT JOIN status ON codStatus = codigoStatus
			ORDER BY Data_Hora DESC
			LIMIT ".$total;

	$resultado = $conexao->query($query);

	if ($resultado->num_rows > 0) {
		while($row = $resultado->fetch_assoc()) {
			$return[] = $row;
		}
	}
	
	$conexao->close();	

	echo json_encode($return);

?>