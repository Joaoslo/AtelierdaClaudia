<?php
require_once 'db.php';

// Recebe os dados do formulário
$username = $_POST['username'] ?? '';
$senha = $_POST['senha'] ?? '';

// Validações básicas
if (empty($username) || empty($senha)) {
    echo json_encode(['success' => false, 'message' => 'Preencha todos os campos']);
    exit;
}

try {
    // Busca o usuário no banco de dados
    $stmt = $db->prepare("SELECT * FROM clientes WHERE username = :username");
    $stmt->execute([':username' => $username]);
    $usuario = $stmt->fetch();
    
    // Verifica se encontrou o usuário e se a senha está correta
    if ($usuario && password_verify($senha, $usuario['senha'])) {
        // Inicia a sessão
        session_start();
        $_SESSION['usuario'] = [
            'id' => $usuario['id_clientes'],
            'nome' => $usuario['nome'],
            'username' => $usuario['username'],
            'email' => $usuario['email']
        ];
        
        echo json_encode(['success' => true, 'message' => 'Login realizado com sucesso!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Username ou senha incorretos']);
    }
    
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erro ao fazer login: ' . $e->getMessage()]);
}
?>