<!DOCTYPE HTML>
<html>

<head>
  <title>Igor Junio TCS</title>
  <!-- CSS -->
  <link rel="stylesheet" type="text/css" href="css/site.css" />
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.theme.min.css" />
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.structure.min.css" />  

  <!-- JS -->
  <script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
  <script type="text/javascript" src="js/jquery-ui.min.js"></script>
  <script type="text/javascript" src="js/site.js"></script>
</head>

<body>
  <div id="main">
    <div id="header">
      <div id="menubar">
        <ul id="menu">
          <li id="home" class="selected"><a>Home</a></li>
          <li id="maquinas"><a >Maquinas</a></li>
          <li id="status"><a >Status</a></li>
          <li id="configuracao"><a >Configuração</a></li>
        </ul>
      </div>
    </div>
    
     <!-- UTILIZO COMO VARIAVEIS DE CONTROLE, NA PROPRIA TELA
        TENDO CONTROLE DA TELA ATUAL QUE ESTOU, E DA OPERACAO QUE SERA REALIZA -->
    <input type="hidden" id="telaAtual" />
    <input type="hidden" id="operacao" value='C' />

    <div id="site_content">
      <div style="text-align: center;">
        
       
        

      </div>      
    </div>
  </div>
</body>
</html>
