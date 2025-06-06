<?php

try {
    // Caminho para o arquivo do banco de dados SQLite
    $db = new PDO('sqlite:' . __DIR__ . '/banco.db');

    // Configura o PDO para lançar exceções em caso de erro
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Configura para retornar arrays associativos por padrão
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
} catch (PDOException $e) {
    // Em caso de erro na conexão
    echo "Erro na conexão: " . $e->getMessage();
    exit;
}
?>