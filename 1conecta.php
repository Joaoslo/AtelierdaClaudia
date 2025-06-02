<?php
// Caminho do arquivo do banco de dados SQLite
$dbPath = __DIR__ . '/banco.db';

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexão bem-sucedida!";
} catch (PDOException $e) {
    echo "Erro ao conectar: " . $e->getMessage();
    exit;
}
?>