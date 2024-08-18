---
title: Padrões Estruturais
description: Explicando os padrões estruturais do Design Pattern
---

# Padrões Estruturais

Os **Padrões Estruturais** lidam com a composição de classes e objetos para formar estruturas maiores e mais complexas. Eles ajudam a garantir que a estrutura do sistema seja flexível e eficiente, permitindo que componentes sejam combinados ou conectados de várias maneiras. Esses padrões são fundamentais para organizar sistemas grandes e facilitar a reutilização de código ao criar relações entre entidades.

## Exemplos de Padrões Estruturais

### 1. **Adapter**
O padrão **Adapter** (ou Adaptador) permite que classes com interfaces incompatíveis trabalhem juntas, atuando como um tradutor que adapta uma interface para outra que o cliente espera. É útil quando você deseja usar uma classe existente, mas sua interface não corresponde ao que o cliente espera.

**Exemplo de Uso:**
```javascript
class Target {
    request() {
        return 'Target: comportamento padrão';
    }
}

class Adaptee {
    specificRequest() {
        return 'Adaptee: comportamento específico';
    }
}

class Adapter extends Target {
    constructor(adaptee) {
        super();
        this.adaptee = adaptee;
    }

    request() {
        return `Adapter: (traduzido) ${this.adaptee.specificRequest()}`;
    }
}

const adaptee = new Adaptee();
console.log(adaptee.specificRequest()); // Adaptee: comportamento específico

const adapter = new Adapter(adaptee);
console.log(adapter.request()); // Adapter: (traduzido) Adaptee: comportamento específico
```

### 2. **Bridge**
O padrão **Bridge** (ou Ponte) separa uma abstração da sua implementação, permitindo que ambos possam variar independentemente. Isso é útil para evitar uma explosão de subclasses quando você precisa combinar várias variantes de abstração com várias variantes de implementação.

**Exemplo de Uso:**
```javascript
class Abstraction {
    constructor(implementation) {
        this.implementation = implementation;
    }

    operation() {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with: ${result}`;
    }
}

class ExtendedAbstraction extends Abstraction {
    operation() {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction: Extended operation with: ${result}`;
    }
}

class ConcreteImplementationA {
    operationImplementation() {
        return 'Implementation A';
    }
}

class ConcreteImplementationB {
    operationImplementation() {
        return 'Implementation B';
    }
}

const implementationA = new ConcreteImplementationA();
const abstractionA = new Abstraction(implementationA);
console.log(abstractionA.operation()); // Abstraction: Base operation with: Implementation A

const implementationB = new ConcreteImplementationB();
const abstractionB = new ExtendedAbstraction(implementationB);
console.log(abstractionB.operation()); // ExtendedAbstraction: Extended operation with: Implementation B
```

### 3. **Composite**
O padrão **Composite** permite que você componha objetos em estruturas de árvore para representar hierarquias partes-todo. O Composite permite que clientes tratem objetos individuais e composições de objetos de maneira uniforme, o que é útil para manipular estruturas recursivas.

**Exemplo de Uso:**
```javascript
class Component {
    add(component) {}
    remove(component) {}
    isComposite() {
        return false;
    }
    operation() {
        throw new Error("Este método deve ser implementado!");
    }
}

class Leaf extends Component {
    operation() {
        return 'Folha';
    }
}

class Composite extends Component {
    constructor() {
        super();
        this.children = [];
    }

    add(component) {
        this.children.push(component);
    }

    remove(component) {
        const index = this.children.indexOf(component);
        this.children.splice(index, 1);
    }

    isComposite() {
        return true;
    }

    operation() {
        return `Branch(${this.children.map(child => child.operation()).join('+')})`;
    }
}

const leaf = new Leaf();
console.log(leaf.operation()); // Folha

const tree = new Composite();
const branch1 = new Composite();
const branch2 = new Composite();

branch1.add(new Leaf());
branch1.add(new Leaf());

branch2.add(new Leaf());

tree.add(branch1);
tree.add(branch2);

console.log(tree.operation()); // Branch(Branch(Folha+Folha)+Branch(Folha))
```

### 4. **Decorator**
O padrão **Decorator** permite que você adicione comportamentos adicionais a um objeto dinamicamente, mantendo a mesma interface. Os decoradores fornecem uma alternativa flexível ao uso de subclasses para estender funcionalidades.

**Exemplo de Uso:**
```javascript
class Component {
    operation() {
        return 'Componente';
    }
}

class Decorator extends Component {
    constructor(component) {
        super();
        this.component = component;
    }

    operation() {
        return this.component.operation();
    }
}

class ConcreteDecoratorA extends Decorator {
    operation() {
        return `Decorador A(${super.operation()})`;
    }
}

class ConcreteDecoratorB extends Decorator {
    operation() {
        return `Decorador B(${super.operation()})`;
    }
}

const simple = new Component();
console.log(simple.operation()); // Componente

const decoratorA = new ConcreteDecoratorA(simple);
const decoratorB = new ConcreteDecoratorB(decoratorA);
console.log(decoratorB.operation()); // Decorador B(Decorador A(Componente))
```

### 5. **Facade**
O padrão **Facade** fornece uma interface simplificada para um conjunto de interfaces em um subsistema, tornando o subsistema mais fácil de usar. É útil para reduzir a complexidade de uma grande quantidade de classes ou para fornecer uma interface mais amigável ao cliente.

**Exemplo de Uso:**
```javascript
class Subsystem1 {
    operation1() {
        return 'Subsystem1: Ready!';
    }

    operationN() {
        return 'Subsystem1: Go!';
    }
}

class Subsystem2 {
    operation1() {
        return 'Subsystem2: Get ready!';
    }

    operationZ() {
        return 'Subsystem2: Fire!';
    }
}

class Facade {
    constructor(subsystem1 = null, subsystem2 = null) {
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }

    operation() {
        let result = 'Facade initializes subsystems:\n';
        result += this.subsystem1.operation1() + '\n';
        result += this.subsystem2.operation1() + '\n';
        result += 'Facade orders subsystems to perform the action:\n';
        result += this.subsystem1.operationN() + '\n';
        result += this.subsystem2.operationZ() + '\n';
        return result;
    }
}

const facade = new Facade();
console.log(facade.operation());
```

### 6. **Flyweight**
O padrão **Flyweight** minimiza o uso de memória compartilhando o máximo possível de dados com objetos semelhantes. É útil em sistemas onde você precisa criar um grande número de objetos semelhantes, como em renderizações gráficas ou em sistemas de cache.

**Exemplo de Uso:**
```javascript
class Flyweight {
    constructor(sharedState) {
        this.sharedState = sharedState;
    }

    operation(uniqueState) {
        const shared = JSON.stringify(this.sharedState);
        const unique = JSON.stringify(uniqueState);
        console.log(`Flyweight: Compartilhado [${shared}] e único [${unique}]`);
    }
}

class FlyweightFactory {
    constructor(initialFlyweights) {
        this.flyweights = {};

        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }

    getKey(state) {
        return state.join('_');
    }

    getFlyweight(sharedState) {
        const key = this.getKey(sharedState);

        if (!(key in this.flyweights)) {
            console.log('FlyweightFactory: Criando novo flyweight.');
            this.flyweights[key] = new Flyweight(sharedState);
        } else {
            console.log('FlyweightFactory: Reutilizando flyweight existente.');
        }

        return this.flyweights[key];
    }

    listFlyweights() {
        const count = Object.keys(this.flyweights).length;
        console.log(`\nFlyweightFactory: Temos ${count} flyweights.`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

const factory = new FlyweightFactory([
    ['Chevrolet', 'Camaro2018', 'amarelo'],
    ['Mercedes Benz', 'C300', 'preto'],
    ['Mercedes Benz', 'C500', 'vermelho'],
    ['BMW', 'M5', 'azul'],
]);

factory.listFlyweights();

const flyweight1 = factory.getFlyweight(['Chevrolet', 'Camaro2018', 'amarelo']);
flyweight1.operation(['XYZ123', 'Cliente 1']);

const flyweight2 = factory.getFlyweight(['BMW', 'M5', 'azul']);
flyweight2.operation(['XYZ456', 'Cliente 2']);

factory.listFlyweights();
```

### 7. **Proxy**
O padrão **Proxy** fornece um substituto ou ponto de controle para acessar um objeto, permitindo que você controle o acesso a ele. Esse padrão é útil para adicionar uma camada extra de controle, como ao usar objetos remotos, carregar recursos sob demanda ou aplicar políticas de acesso.

**Exemplo de Uso:**
```javascript
class RealSubject {
    request() {
        console.log('RealSubject: Lidando com a solicitação.');
    }
}

class Proxy

 {
    constructor(realSubject) {
        this.realSubject = realSubject;
    }

    request() {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    checkAccess() {
        console.log('Proxy: Verificando acesso antes de encaminhar a solicitação.');
        return true;
    }

    logAccess() {
        console.log('Proxy: Registrando o acesso.');
    }
}

const realSubject = new RealSubject();
const proxy = new Proxy(realSubject);
proxy.request();
```

## Conclusão

Os Padrões Estruturais ajudam a organizar a estrutura interna de sistemas complexos, promovendo a reutilização e a flexibilidade. Cada padrão oferece soluções específicas para problemas comuns relacionados à organização de classes e objetos, tornando o código mais modular, extensível e de fácil manutenção.
