---
title: Princípio Aberto/Fechado
description: Explicação sobre o segundo principio do SOLID - Principio Aberto/Fechado
---

# Princípio Aberto/Fechado

O Princípio Aberto/Fechado, ou Open/Closed Principle, sugere que uma classe ou função deve ser fechada para modificações e aberta para extensões. Isso significa que, se precisarmos adicionar uma nova funcionalidade, não devemos modificar a classe ou função original, mas sim estendê-la com a nova operação. 

Vamos imaginar que nossa classe ou função é como uma cozinha que foi inicialmente projetada para fazer pizzas. Você tem um balcão e um forno, mas agora decide que quer também servir batatas fritas. Nesse caso, você precisaria reorganizar toda a cozinha para adicionar uma fritadeira, o que seria bastante trabalhoso, certo? E se, em vez de remodelar toda a cozinha, você tivesse espaços específicos para cada tipo de comida, como pizzas e lanches? A ideia do OCP é exatamente essa: permitir que você estenda as funcionalidades das suas classes ou funções, sem precisar reestruturá-las sempre que uma nova funcionalidade for necessária.

---

**Relembrando:** 

Já vimos anteriormente que cada classe ou função deve ter apenas uma responsabilidade e apenas um motivo para mudar. Não vamos esquecer essa boa prática e vamos aplicá-la em nossos exemplos daqui para frente.

---

## Entendendo o que é extensibilidade

Antes de partirmos para os exemplos de código, é importante discutir o conceito de estender uma classe. Estender diz respeito ao ato de aumentar ou expandir algo. Quando falamos que uma classe deve ser estendida, estamos nos referindo a classes que implementam interfaces ou até outras classes. Porém, isso pode causar certa confusão na programação funcional. 

Aqui, vamos entender "estender" como a ação em si: se uma função é responsável por exibir uma notificação, estendê-la seria ter outra função que também exibe uma notificação, ou seja, sua entrada e saída são as mesmas. Este conceito não é geral, mas vamos aplicá-lo para entender o OCP, não apenas no contexto de OOP, mas em código de maneira geral.

## Aplicando o princípio

Imagine que temos um sistema de pagamentos onde, atualmente, a única forma de pagamento é o cartão de crédito. Isso parece simples, certo? Então, temos uma classe que gerencia esse pagamento.

```java
public class PaymentProcessor {
    public void processCreditCardPayment(double amount) {
        // Lógica para processar pagamento com cartão de crédito
    }
}
```

Isso parece correto, afinal não estamos violando o princípio da responsabilidade única, pois a única ação dessa classe é processar o pagamento. Mas, se você olhar mais de perto, perceberá que em breve teremos um problema sério com essa classe. O que acontece quando quisermos adicionar novos métodos de pagamento, como PayPal?

```java
public class PaymentProcessor {
    public void processCreditCardPayment(double amount) {
        // Lógica para processar pagamento com cartão de crédito
    }

    public void processPayPalPayment(double amount) {
        // Lógica para processar pagamento com PayPal
    }
}
```

Aqui, começamos a introduzir complexidade na classe. Ainda que não tenhamos violado o primeiro princípio, pois a classe continua processando pagamentos, podemos ver que toda vez que precisarmos de uma nova forma de pagamento, teremos que modificar essa classe. Isso pode não parecer um problema agora, com apenas dois métodos, mas imagine quando tivermos dez. A classe se tornaria enorme e difícil de manter. Além disso, se quisermos implementar processos de devolução, reembolso ou usar esses processadores em outros contextos, essa abordagem tornaria tudo muito mais complicado.

É aqui que o princípio aberto/fechado mostra sua importância. Ao fecharmos nossa classe para modificações, evitamos códigos imensos e complexos. E, ao abri-la para extensão, preservamos o reaproveitamento de código e o princípio da responsabilidade única.

Agora, vamos ver como esse processo seria seguindo o princípio aberto/fechado. Entendemos que o método de pagamento precisa ser externo ao processamento do pagamento em si, e, devido a isso, podemos estruturá-lo da seguinte forma:

```java
public interface PaymentMethod {
    void processPayment(double amount);
}

public class CreditCardPayment implements PaymentMethod {
    @Override
    public void processPayment(double amount) {
        // Lógica para processar pagamento com cartão de crédito
    }
}

public class PayPalPayment implements PaymentMethod {
    @Override
    public void processPayment(double amount) {
        // Lógica para processar pagamento com PayPal
    }
}

public class PaymentProcessor {
    public void processPayment(PaymentMethod method, double amount) {
        method.processPayment(amount);
    }
}

// Uso:
PaymentMethod creditCardPayment = new CreditCardPayment();
PaymentMethod payPalPayment = new PayPalPayment();

PaymentProcessor processor = new PaymentProcessor();

processor.processPayment(creditCardPayment, 100.0);
processor.processPayment(payPalPayment, 200.0);
```

Primeiro, criamos uma interface `PaymentMethod`, que define como todo método de pagamento deve se comportar, especificando as entradas e saídas. Depois, temos duas classes que implementam `PaymentMethod`, cada uma aplicando suas regras específicas para seu respectivo método de pagamento. Por último, a classe `PaymentProcessor` processa o pagamento, enviando os mesmos parâmetros e esperando o mesmo resultado da classe `PaymentMethod`, independentemente do método utilizado.

Agora, se quisermos adicionar novos métodos de pagamento, basta criar uma nova classe que implemente `PaymentMethod`. Ao usar `PaymentProcessor`, passamos a nova classe como parâmetro, e tudo funcionará da mesma forma, sem precisar alterar as classes existentes.

## Exemplos de Código

- [Exemplo OCP em programação funcional](https://github.com/b1z3rr4/software-concepts-journal/tree/main/exemples/solid/ocp/functional)
    - [Exemplo funcional ruim](https://github.com/b1z3rr4/software-concepts-journal/tree/main/exemples/solid/ocp/functional/bad)
    - [Exemplo funcional bom](https://github.com/b1z3rr4/software-concepts-journal/tree/main/exemples/solid/ocp/functional/good)

- [Exemplo OCP em programação orientada a objetos](https://github.com/b1z3rr4/software-concepts-journal/tree/main/exemples/solid/ocp/oop)
    - [Exemplo OOP ruim](https://github.com/b1z3rr4/software-concepts-journal/tree/main/exemples/solid/ocp/oop/bad)
    - [Exemplo OOP bom](https://github.com/b1z3rr4/software-concepts-journal/tree/main/exemples/solid/ocp/oop/good)

## Conclusão

Entendemos que, ao criar nossas classes, devemos prezar pela estabilidade. Uma vez criada e definida, uma classe não deve mais ser modificada, mas sim estendida. Ela deve ser projetada já com esse princípio em mente, sabendo que, no futuro, ao adicionar uma nova funcionalidade, ela não poderá ser alterada, mas deverá ser implementada por outra classe, responsável por toda a nova lógica. Espero que esse conceito tenha sido tão útil para você quanto foi para mim, e que tenha ficado tão empolgado quanto eu ao entendê-lo.
