---
title: Princípio da Responsabilidade Única
description: Explicação sobre o primeiro principio do SOLID - Principio da Responsabilidade Unica
---

# Princípio da Responsabilidade Única

O Princípio da Responsabilidade Única, ou Single Responsibility Principle, é um dos princípios do SOLID que defende que uma função ou classe deve ter apenas uma responsabilidade e apenas um motivo para mudar. Vale ressaltar que, quando falamos de motivo para mudar, estamos nos referindo à construção da função ou classe e ao código em geral. Isso levanta alguns questionamentos sobre como, no papel de desenvolvedor, conseguiremos construir uma função ou classe com apenas uma responsabilidade. Afinal, o que é responsabilidade? Como vou saber se meu código tem, de fato, apenas uma responsabilidade? Tudo isso será discutido a seguir, com alguns exemplos mais didáticos sobre esse princípio.

## Entendendo o que é responsabilidade

Antes de tudo, vamos entender o conceito de responsabilidade para que possamos seguir uma linha de pensamento ao estudar esse princípio. No dicionário do Google, ao pesquisar pela palavra "responsabilidade", temos o seguinte resultado: "obrigação de responder pelas ações próprias ou dos outros." Isso é curioso porque, quando vemos a fundo o que está sendo exposto, é que quando falamos de responsabilidade estamos falando diretamente sobre ações. Nesse caso, pode ser uma ação sua (da nossa função/classe) ou de outro (informação externa, callback, parâmetros). Com isso, podemos definir que, quando dizemos que nossa função/classe deve ter apenas uma responsabilidade, queremos dizer que ela deve ter apenas uma ação, um objetivo pelo qual assumirá a culpa em caso de erro ou problema na execução geral do nosso código.

## Aplicando o princípio

Imagine que temos um software com uma funcionalidade de extrair dados de uma planilha e exibi-los na tela para os usuários com alguns totalizadores. Sabemos que isso é bastante comum, afinal, o Excel dominou o mundo e o dia a dia das pessoas. Então, vamos entender como podemos fazer isso em um passo a passo:
- Importar o arquivo
- Extrair seus dados
- Ler seus dados
- Calcular as informações dos totalizadores
- Exibir para o usuário

Vemos que há bastante coisa para fazer, e isso tudo se refere a apenas uma funcionalidade do nosso sistema. Então, de imediato, pensamos: "É óbvio, vou criar uma classe `DataProcessor` e nela vou colocar os métodos para fazer todo esse processamento."

```js
class DataProcessor {
    constructor(file) {
        this.file = file;
    }

    process() {
        const data = this.importFile(this.file);
        
        const extractedData = this.extractData(data);
        
        const readData = this.readData(extractedData);
        
        const totals = this.calculateTotals(readData);
        
        this.displayResults(totals);
    }

    importFile(file) {
        console.log(`Importando o arquivo: ${file}`);
        return "dados";
    }

    extractData(data) {
        console.log("Extraindo dados...");
        return [
            { name: "Produto A", factoryPrice: 100, discountPrice: 90, quantityForDiscount: 10, icmsValue: 10, additionalField: 5 },
            { name: "Produto B", factoryPrice: 200, discountPrice: 180, quantityForDiscount: 20, icmsValue: 20, additionalField: 10 }
        ];
    }

    readData(data) {
        console.log("Lendo dados...");
        return data;
    }

    calculateTotals(data) {
        console.log("Calculando totalizadores...");
        return data.map(item => ({
            name: item.name,
            total: item.discountPrice * item.quantityForDiscount
        }));
    }

    displayResults(totals) {
        console.log("Exibindo resultados:");
        totals.forEach(total => {
            console.log(`Produto: ${total.name}, Total: ${total.total}`);
        });
    }
}

// Uso
const processor = new DataProcessor("arquivo.xlsx");
processor.process();
```

E de fato, você estaria coberto de razão. Mas imagine que agora os usuários solicitaram uma nova funcionalidade: além de calcular os totais, o sistema também deve calcular as médias de alguns campos e gerar gráficos para visualização. Provavelmente, você está pensando que iria criar outro método para calcular as médias e exibiria junto com os totais os gráficos, certo? Acho que você percebeu que, quanto mais coisas são solicitadas, mais vezes precisamos revisitar e modificar a classe. Vamos analisar quantas ações temos nessa classe. Ela está responsável por muita coisa, não acha? Em alguns parágrafos, já consigo me imaginar mexendo nessa classe diversas vezes ao longo da evolução do meu sistema, o que cria uma complexidade enorme em um mesmo local de código, e sempre teremos que mudar, adaptar e entender o que essa classe faz para conseguir evoluí-la.

Agora, vamos aplicar o conceito de responsabilidade única do SOLID e entender o quão importante ele é e como ele realmente faz diferença no todo. Vejamos abaixo o exemplo dessa mesma funcionalidade, mas com esse princípio aplicado:

```js
class FileImporter {
    import(file) {
        console.log(`Importando o arquivo: ${file}`);
        return "dados";
    }
}

class DataExtractor {
    extract(data) {
        console.log("Extraindo dados...");
        return [
            { name: "Produto A", factoryPrice: 100, discountPrice: 90, quantityForDiscount: 10, icmsValue: 10, additionalField: 5 },
            { name: "Produto B", factoryPrice: 200, discountPrice: 180, quantityForDiscount: 20, icmsValue: 20, additionalField: 10 }
        ];
    }
}

class DataReader {
    read(data) {
        console.log("Lendo dados...");
        return data;
    }
}

class DataCalculator {
    calculateTotals(data) {
        console.log("Calculando totalizadores...");
        return data.map(item => ({
            name: item.name,
            total: item.discountPrice * item.quantityForDiscount
        }));
    }
}

class ResultDisplayer {
    display(totals) {
        console.log("Exibindo resultados:");

        console.log("\nTotalizadores:");
        totals.forEach(total => {
            console.log(`Produto: ${total.name}, Total: ${total.total}`);
        });
    }
}

class DataProcessor {
    constructor(file) {
        this.file = file;
        this.fileImporter = new FileImporter();
        this.dataExtractor = new DataExtractor();
        this.dataReader = new DataReader();
        this.dataCalculator = new DataCalculator();
        this.resultDisplayer = new ResultDisplayer();
    }

    process() {
        const data = this.fileImporter.import(this.file);
        const extractedData = this.dataExtractor.extract(data);
        const readData = this.dataReader.read(extractedData);
        const totals = this.dataCalculator.calculateTotals(readData);
        this.resultDisplayer.display(totals);
    }
}

// Uso
const processor = new DataProcessor("arquivo.xlsx");
processor.process();
```

Veja que, agora, ao invés de apenas uma classe, temos cinco, e cada uma tem sua responsabilidade. Agora, se quisermos adicionar uma etapa a mais nesse código, como por exemplo, o cálculo de médias, só precisaremos alterar uma classe, e as outras continuarão fazendo o que faziam antes como se nada tivesse acontecido. Além disso, ganhamos uma redução na curva de aprendizado, pois, ao invés de ler um arquivo enorme, leremos classe por classe e entenderemos sua participação no todo de maneira individual.

## Conclusão

Entendemos que o princípio da responsabilidade única diz respeito diretamente à ação daquela classe ou função dentro do nosso código. Cada uma deve ter sua responsabilidade e, com isso, apenas um motivo para ser alterada. Entendemos que, quando seguimos esse princípio, a classe `DataReader` não precisa ser alterada se adicionarmos a possibilidade de trazer os dados em gráficos, pois isso não tem nada a ver com leitura, e sim com exibição. Espero que esse conteúdo seja útil para que você consiga aplicar esse conceito no seu dia a dia.
