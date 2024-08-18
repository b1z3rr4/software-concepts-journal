---
title: Padrões Criacionais
description: Explicando os padrões criacionais do Design Pattern
---

# Padrões Criacionais

Os **Padrões Criacionais** são uma categoria de Design Patterns que tratam da criação de objetos. Eles ajudam a abstrair o processo de instanciar objetos, tornando o sistema independente de como os objetos são criados, compostos e representados. Esses padrões promovem maior flexibilidade e reutilização ao permitir que as classes deleguem a responsabilidade de criação para outras classes ou métodos especializados.

## Exemplos de Padrões Criacionais

### 1. **Singleton**
O padrão **Singleton** garante que uma classe tenha apenas uma instância e fornece um ponto global de acesso a essa instância. Esse padrão é útil em situações onde exatamente uma instância de uma classe é necessária para coordenar ações em todo o sistema.

**Exemplo de Uso:**
```javascript
class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
        }
        return Singleton.instance;
    }

    someMethod() {
        console.log('Método de instância singleton');
    }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true
```

### 2. **Factory Method**
O **Factory Method** define uma interface para criar um objeto, mas permite que as subclasses alterem o tipo de objetos que serão criados. Esse padrão promove o princípio de responsabilidade única, delegando a criação de objetos para subclasses.

**Exemplo de Uso:**
```javascript
class Product {
    operation() {
        return 'Operação padrão do produto';
    }
}

class ConcreteProductA extends Product {
    operation() {
        return 'Operação do produto A';
    }
}

class ConcreteProductB extends Product {
    operation() {
        return 'Operação do produto B';
    }
}

class Creator {
    factoryMethod() {
        return new Product();
    }

    someOperation() {
        const product = this.factoryMethod();
        return `Creator: O mesmo código trabalha com ${product.operation()}`;
    }
}

class ConcreteCreatorA extends Creator {
    factoryMethod() {
        return new ConcreteProductA();
    }
}

class ConcreteCreatorB extends Creator {
    factoryMethod() {
        return new ConcreteProductB();
    }
}

const creatorA = new ConcreteCreatorA();
console.log(creatorA.someOperation()); // Creator: O mesmo código trabalha com Operação do produto A

const creatorB = new ConcreteCreatorB();
console.log(creatorB.someOperation()); // Creator: O mesmo código trabalha com Operação do produto B
```

### 3. **Abstract Factory**
O **Abstract Factory** fornece uma interface para criar famílias de objetos relacionados ou dependentes sem especificar suas classes concretas. Esse padrão é útil quando o sistema precisa ser independente das classes concretas que ele cria.

**Exemplo de Uso:**
```javascript
class AbstractFactory {
    createProductA() {
        throw new Error("Este método deve ser implementado!");
    }

    createProductB() {
        throw new Error("Este método deve ser implementado!");
    }
}

class ConcreteFactory1 extends AbstractFactory {
    createProductA() {
        return new ConcreteProductA1();
    }

    createProductB() {
        return new ConcreteProductB1();
    }
}

class ConcreteFactory2 extends AbstractFactory {
    createProductA() {
        return new ConcreteProductA2();
    }

    createProductB() {
        return new ConcreteProductB2();
    }
}

class ConcreteProductA1 {
    operation() {
        return 'Produto A1';
    }
}

class ConcreteProductB1 {
    operation() {
        return 'Produto B1';
    }
}

class ConcreteProductA2 {
    operation() {
        return 'Produto A2';
    }
}

class ConcreteProductB2 {
    operation() {
        return 'Produto B2';
    }
}

// Cliente usando Abstract Factory
function clientCode(factory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productA.operation());
    console.log(productB.operation());
}

clientCode(new ConcreteFactory1()); // Produto A1, Produto B1
clientCode(new ConcreteFactory2()); // Produto A2, Produto B2
```

### 4. **Builder**
O **Builder** separa a construção de um objeto complexo da sua representação, permitindo que o mesmo processo de construção possa criar diferentes representações. Esse padrão é especialmente útil quando a criação de objetos envolve vários passos ou quando o processo de criação deve ser separado do resultado final.

**Exemplo de Uso:**
```javascript
class Product {
    constructor() {
        this.parts = [];
    }

    listParts() {
        console.log(`Partes do produto: ${this.parts.join(', ')}`);
    }
}

class Builder {
    buildPartA() {}
    buildPartB() {}
    buildPartC() {}
}

class ConcreteBuilder extends Builder {
    constructor() {
        super();
        this.product = new Product();
    }

    buildPartA() {
        this.product.parts.push('Parte A');
    }

    buildPartB() {
        this.product.parts.push('Parte B');
    }

    buildPartC() {
        this.product.parts.push('Parte C');
    }

    getResult() {
        return this.product;
    }
}

class Director {
    setBuilder(builder) {
        this.builder = builder;
    }

    buildMinimalViableProduct() {
        this.builder.buildPartA();
    }

    buildFullFeaturedProduct() {
        this.builder.buildPartA();
        this.builder.buildPartB();
        this.builder.buildPartC();
    }
}

const director = new Director();
const builder = new ConcreteBuilder();
director.setBuilder(builder);

console.log('Construindo Produto Básico:');
director.buildMinimalViableProduct();
builder.getResult().listParts();

console.log('Construindo Produto Completo:');
director.buildFullFeaturedProduct();
builder.getResult().listParts();
```

### 5. **Prototype**
O **Prototype** permite a criação de novos objetos copiando um objeto existente, conhecido como protótipo. Esse padrão é útil quando a criação de objetos envolve operações caras ou quando se deseja evitar a criação repetitiva de objetos semelhantes.

**Exemplo de Uso:**
```javascript
class Prototype {
    clone() {
        throw new Error("Este método deve ser implementado!");
    }
}

class ConcretePrototype extends Prototype {
    constructor(name) {
        super();
        this.name = name;
    }

    clone() {
        return new ConcretePrototype(this.name);
    }
}

const prototype1 = new ConcretePrototype('Protótipo 1');
const prototype2 = prototype1.clone();

console.log(prototype1.name); // Protótipo 1
console.log(prototype2.name); // Protótipo 1
```

---
