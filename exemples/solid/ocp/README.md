# Exemplo de Aplicação do Princípio OCP (Open/Closed Principle)

Este projeto demonstra a aplicação do Princípio do Aberto/Fechado (OCP) do SOLID em JavaScript. O objetivo é mostrar como o OCP pode ser aplicado para criar classes que podem ser facilmente estendidas com novas funcionalidades sem a necessidade de modificar o código existente, melhorando assim a flexibilidade e a manutenção do sistema.

## O que a Classe Faz

A classe `PasswordManager` permite que senhas sejam criptografadas utilizando diferentes algoritmos. Ela realiza as seguintes operações:

1. **Criptografia de Senhas**: A classe permite criptografar senhas utilizando diferentes algoritmos de criptografia (como AES e bcrypt).
