# Exemplo de Aplicação do Princípio SRP (Single Responsibility Principle)

Este projeto demonstra a aplicação do Princípio da Responsabilidade Única (SRP) do SOLID em JavaScript. O objetivo é mostrar como o SRP pode ser aplicado para criar classes que têm uma única responsabilidade e como isso pode melhorar a organização e a manutenção do código.

## O que a Classe Faz

A classe `PdfProcessor` realiza as seguintes operações, cada uma com uma responsabilidade bem definida:

1. **Processamento de PDF**: Lê um arquivo PDF, extrai a data de criação e verifica se a data está dentro de uma faixa específica (entre 10 dias e 1 dia antes da data atual).
2. **Interação com a API**: Envia a data de criação e o usuário para uma API e processa a resposta para verificar a estabilidade do sistema e do processador.
3. **Salvamento de Dados**: Se a resposta da API for estável, salva os dados do PDF em um arquivo TXT.
