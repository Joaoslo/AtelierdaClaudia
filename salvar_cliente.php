<?php
require_once 'db.php';

$nome = $_POST['nome'] ?? '';
$sobrenome = $_POST['sobrenome'] ?? '';
$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$cpf = $_POST['cpf'] ?? '';
$data_nascimento = $_POST['data_nascimento'] ?? '';
$celular = $_POST['celular'] ?? '';

// Criar allert incorret e alert correct
if (empty($nome) || empty($sobrenome) || empty($username) || empty($email) || empty($senha) || empty($cpf)) {
    echo json_encode(['success' => false, 'message' => 'Preencha todos os campos obrigatórios']);
    exit;
}

// Criptografa a senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

try {
    // Prepara a SQL
    $stmt = $db->prepare("INSERT INTO clientes 
                         (nome, sobrenome, username, email, senha, cpf, data_nascimento, celular) 
                         VALUES 
                         (:nome, :sobrenome, :username, :email, :senha, :cpf, :data_nascimento, :celular)");
    

    $stmt->execute([
        ':nome' => $nome,
        ':sobrenome' => $sobrenome,
        ':username' => $username,
        ':email' => $email,
        ':senha' => $senhaHash,
        ':cpf' => $cpf,
        ':data_nascimento' => $data_nascimento,
        ':celular' => $celular
    ]);
    
  
    echo json_encode(['success' => true, 'message' => 'Cadastro realizado com sucesso!']);
    
} catch (PDOException $e) {
    // Verifica se é erro de duplicação (username ou email já existem)
    if ($e->getCode() == 23000) {
        echo json_encode(['success' => false, 'message' => 'Username ou email já cadastrados']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar: ' . $e->getMessage()]);
    }
}
?>