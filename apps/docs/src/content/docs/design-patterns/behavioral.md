---
title: Padrões Comportamentais
description: Explicando os padrões comportamentais do Design Pattern
---

# Padrões Comportamentais

Os **Padrões Comportamentais** lidam com a comunicação entre objetos, promovendo a interação e a responsabilidade de forma flexível e eficiente. Eles facilitam a forma como objetos e classes interagem, além de aumentar a capacidade de extensão e alteração do código, sem impactar outros componentes do sistema.

## Exemplos de Padrões Comportamentais

### 1. **Chain of Responsibility**
O padrão **Chain of Responsibility** (ou Cadeia de Responsabilidade) permite que vários objetos tenham a oportunidade de processar uma solicitação, passando-a ao longo de uma cadeia de manipuladores. Cada manipulador decide se processa a solicitação ou a encaminha para o próximo da cadeia.

**Exemplo de Uso:**
```javascript
class Handler {
    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    }
}

class ConcreteHandler1 extends Handler {
    handle(request) {
        if (request === 'A') {
            return `Handler1: Processando ${request}`;
        }
        return super.handle(request);
    }
}

class ConcreteHandler2 extends Handler {
    handle(request) {
        if (request === 'B') {
            return `Handler2: Processando ${request}`;
        }
        return super.handle(request);
    }
}

const handler1 = new ConcreteHandler1();
const handler2 = new ConcreteHandler2();

handler1.setNext(handler2);

console.log(handler1.handle('A')); // Handler1: Processando A
console.log(handler1.handle('B')); // Handler2: Processando B
console.log(handler1.handle('C')); // null
```

### 2. **Command**
O padrão **Command** transforma uma solicitação em um objeto independente que pode ser parametrizado, enfileirado e registrado, permitindo que diferentes solicitações sejam tratadas de forma flexível.

**Exemplo de Uso:**
```javascript
class Command {
    execute() {
        throw new Error("Este método deve ser implementado!");
    }
}

class SimpleCommand extends Command {
    constructor(payload) {
        super();
        this.payload = payload;
    }

    execute() {
        console.log(`SimpleCommand: Fazendo algo simples com ${this.payload}`);
    }
}

class ComplexCommand extends Command {
    constructor(receiver, a, b) {
        super();
        this.receiver = receiver;
        this.a = a;
        this.b = b;
    }

    execute() {
        console.log("ComplexCommand: Delegando tarefas ao receiver.");
        this.receiver.doSomething(this.a);
        this.receiver.doSomethingElse(this.b);
    }
}

class Receiver {
    doSomething(a) {
        console.log(`Receiver: Trabalhando em (${a})`);
    }

    doSomethingElse(b) {
        console.log(`Receiver: Trabalhando em outra coisa (${b})`);
    }
}

class Invoker {
    setOnStart(command) {
        this.onStart = command;
    }

    setOnFinish(command) {
        this.onFinish = command;
    }

    doSomethingImportant() {
        if (this.onStart) {
            this.onStart.execute();
        }
        console.log("Invoker: Fazendo algo muito importante...");
        if (this.onFinish) {
            this.onFinish.execute();
        }
    }
}

const invoker = new Invoker();
invoker.setOnStart(new SimpleCommand('Olá!'));
const receiver = new Receiver();
invoker.setOnFinish(new ComplexCommand(receiver, 'A', 'B'));

invoker.doSomethingImportant();
```

### 3. **Observer**
O padrão **Observer** define uma dependência um-para-muitos entre objetos, onde, quando um objeto muda de estado, todos os seus dependentes são notificados e atualizados automaticamente. Esse padrão é ideal para criar um sistema de notificação em tempo real.

**Exemplo de Uso:**
```javascript
class Subject {
    constructor() {
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer);
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify() {
        this.observers.forEach(observer => observer.update(this));
    }
}

class ConcreteSubject extends Subject {
    constructor() {
        super();
        this.state = null;
    }

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = state;
        this.notify();
    }
}

class ConcreteObserver {
    update(subject) {
        console.log(`Observer: Estado atualizado para: ${subject.getState()}`);
    }
}

const subject = new ConcreteSubject();
const observer1 = new ConcreteObserver();
const observer2 = new ConcreteObserver();

subject.attach(observer1);
subject.attach(observer2);

subject.setState('Novo Estado');
// Observer: Estado atualizado para: Novo Estado
// Observer: Estado atualizado para: Novo Estado
```

### 4. **Strategy**
O padrão **Strategy** define uma família de algoritmos, encapsula cada um deles e os torna intercambiáveis. O Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam.

**Exemplo de Uso:**
```javascript
class Strategy {
    execute(data) {
        throw new Error("Este método deve ser implementado!");
    }
}

class ConcreteStrategyA extends Strategy {
    execute(data) {
        return `Strategy A: processando ${data}`;
    }
}

class ConcreteStrategyB extends Strategy {
    execute(data) {
        return `Strategy B: processando ${data}`;
    }
}

class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    doSomeBusinessLogic(data) {
        return this.strategy.execute(data);
    }
}

const context = new Context(new ConcreteStrategyA());
console.log(context.doSomeBusinessLogic('Dado A')); // Strategy A: processando Dado A

context.setStrategy(new ConcreteStrategyB());
console.log(context.doSomeBusinessLogic('Dado B')); // Strategy B: processando Dado B
```

### 5. **State**
O padrão **State** permite que um objeto altere seu comportamento quando seu estado interno muda. Parece que o objeto mudou de classe, mas na verdade ele delega a tarefa ao objeto de estado interno correspondente.

**Exemplo de Uso:**
```javascript
class State {
    handle(context) {
        throw new Error("Este método deve ser implementado!");
    }
}

class ConcreteStateA extends State {
    handle(context) {
        console.log('Estado A: Mudando para o Estado B.');
        context.transitionTo(new ConcreteStateB());
    }
}

class ConcreteStateB extends State {
    handle(context) {
        console.log('Estado B: Mudando para o Estado A.');
        context.transitionTo(new ConcreteStateA());
    }
}

class Context {
    constructor(state) {
        this.transitionTo(state);
    }

    transitionTo(state) {
        console.log(`Contexto: Mudando para o ${state.constructor.name}.`);
        this.state = state;
        this.state.handle(this);
    }

    request() {
        this.state.handle(this);
    }
}

const context = new Context(new ConcreteStateA());
context.request(); // Estado A: Mudando para o Estado B.
// Contexto: Mudando para o ConcreteStateB.
// Estado B: Mudando para o Estado A.
// Contexto: Mudando para o ConcreteStateA.
```

### 6. **Template Method**
O padrão **Template Method** define o esqueleto de um algoritmo na superclasse, mas permite que subclasses substituam etapas específicas do algoritmo sem alterar sua estrutura geral.

**Exemplo de Uso:**
```javascript
class AbstractClass {
    templateMethod() {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperations2();
        this.baseOperation3();
        this.hook2();
    }

    baseOperation1() {
        console.log('AbstractClass: Faz algo importante.');
    }

    baseOperation2() {
        console.log('AbstractClass: Permite a modificação de subclasses.');
    }

    baseOperation3() {
        console.log('AbstractClass: Encerra algo importante.');
    }

    requiredOperations1() {
        throw new Error('Este método deve ser implementado!');
    }

    requiredOperations2() {
        throw new Error('Este método deve ser implementado!');
    }

    hook1() {}
    hook2() {}
}

class ConcreteClass1 extends AbstractClass {
    requiredOperations1() {
        console.log('ConcreteClass1: Implementa operação 1.');
    }

    requiredOperations2() {
        console.log('ConcreteClass1: Implementa operação 2.');
    }

    hook1() {
        console.log('ConcreteClass1: Implementa o hook1.');
    }
}

class ConcreteClass2 extends AbstractClass {
    requiredOperations1() {
        console.log('ConcreteClass2: Implementa operação 1.');
    }

    requiredOperations2() {
        console.log('ConcreteClass2: Implementa operação 2.');
    }

    hook2() {
        console.log('ConcreteClass2: Implementa o hook2.');
    }
}

const class1 = new ConcreteClass1();
class1.templateMethod();

const class2 = new ConcreteClass2();
class2.templateMethod();
```

## Conclusão

Os Padrões Comportamentais são essenciais para definir a forma como os objetos interagem entre si e como as responsabilidades são distribuídas dentro de um sistema. Eles fornecem soluções padronizadas para problemas recorrentes de comunicação e coordenação entre diferentes partes