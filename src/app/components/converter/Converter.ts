export class Converter {
    type: string; //type of the conversor ( 'Temperatura', 'Comprimento', 'Peso', 'Tempo')
    number!: number; // number to be converted
    measurementInput!: string; // type of (input) number to be converted (celsius, fahrenheit, kelvin etc)
    measurementOutput!: string; // type of (output) number that will be converted (to celsius, to fahrenheit, to kelvin etc) 
    errorMessage!: string;
    result!: number;

    constructor(type: string,) {
        this.type = type;
    }

    splitStringItems(items: string) { // get items and split into measurementInput and measurementOutput
        let measurementoptionsNumbersay: string[] = items.split(" "); // split items
        measurementoptionsNumbersay.splice(1, 1); // remove the 1 index from measurement 
        this.setMeasurementTypes(measurementoptionsNumbersay[0], measurementoptionsNumbersay[1]); // set measurement types
    }

    setMeasurementTypes(input: string, output: string) { // set measurement types
        this.measurementInput = input;
        this.measurementOutput = output;
    }

    setNumberToBeConverted(number: number) { // set number 
        this.number = number;
        this.setCalculation();
    }

    setErrorMessage(message: string) { // set error message
        this.errorMessage = message;
    }

    setVariableItems() { // verify the converter type
        let options;

        switch (this.type) {
            case 'Temperatura':
                options = this.setTemperaturaItems();
                break;

            case 'Comprimento':
                options = this.setComprimentoItems();
                break;

            case 'Peso':
                options = this.setPesoItems();
                break;

            case 'Tempo':
                options = this.setTempoItems();
                break;

            default:
                this.setErrorMessage('Ocorreu um erro ao selecionar o conversor!');
                break;
        }
        return options;
    }

    setTemperaturaItems() {
        return [
            'Celsius para Fahrenheit',
            'Celsius para Kelvin',
            'Fahrenheit para Celsius',
            'Fahrenheit para Kelvin',
            'Kelvin para Celsius',
            'Kelvin para Fahrenheit'
        ];
    }

    setComprimentoItems() {
        return [
            'Centímetro para Metro',
            'Centímetro para Quilômetro',
            'Metro para Centímetro',
            'Metro para Quilômetro',
            'Quilômetro para Metro',
            'Quilômetro para Centímetro'
        ];
    }

    setPesoItems() {
        return [
            'Grama para Quilograma',
            'Grama para Libra',
            'Quilograma para Grama',
            'Quilograma para Libra',
            'Libra para Grama',
            'Libra para Quilograma'
        ];
    }

    setTempoItems() {
        return [
            'Segundos para Minutos',
            'Segundos para Horas',
            'Minutos para Segundos',
            'Minutos para Horas',
            'Horas para Segundos',
            'Horas para Minutos',
            'Horas para Dias',
        ];
    }

    setCalculation() {
        switch (this.type) {
            case 'Temperatura':
                this.mapTemperaturaCalculation();
                break;

            case 'Comprimento':
                this.mapComprimentoCalculation();
                break;

            case 'Peso':
                this.mapPesoCalculation();
                break;

            case 'Tempo':
                this.mapTempoCalculation();
                break;
        }
    }

    mapCombinations(optionsNumbers: object[],) {
        let index1 = optionsNumbers.findIndex(option => option.hasOwnProperty(this.measurementInput));
        let index2 = optionsNumbers.findIndex(option => option.hasOwnProperty(this.measurementOutput));

        let functionName = `${index1}-${index2}`;
        let functionToExecute = this.functions[functionName];

        if (functionToExecute) {
            functionToExecute();
        }
    }

    functions!: any;
    mapTemperaturaCalculation() {
        let optionsNumbers = [
            { 'Celsius': 0 },
            { 'Fahrenheit': 1 },
            { 'Kelvin': 2 }
        ];

        this.functions = {
            "0-1": () => this.result = this.convertCelsiusToFarenheit(this.number),
            "0-2": () => this.result = this.convertCelsiusToKelvin(this.number),
            "1-0": () => this.result = this.convertFarenheitToCelsius(this.number),
            "1-2": () => this.result = this.convertFarenheitToKelvin(this.number),
            "2-0": () => this.result = this.convertKelvinToCelsius(this.number),
            "2-1": () => this.result = this.convertKelvinToFarenheit(this.number)
        };

        this.mapCombinations(optionsNumbers);
    }

    convertCelsiusToFarenheit(number: number) {
        return (number * (9 / 5)) + 32
    }

    convertCelsiusToKelvin(number: number) {
        return number + 273.15;
    }

    convertFarenheitToCelsius(number: number) {
        return (number - 32) * (5 / 9);
    }

    convertFarenheitToKelvin(number: number) {
        return (number + 459.67) * (5 / 9);
    }

    convertKelvinToCelsius(number: number) {
        return number - 273.15;
    }

    convertKelvinToFarenheit(number: number) {
        return (number * (9 / 5)) - 459.67;
    }

    // =================================================================

    mapComprimentoCalculation() {
        let optionsNumbers = [
            { 'Centímetro': 0 },
            { 'Metro': 1 },
            { 'Quilômetro': 2 }
        ];

        this.functions = {
            "0-1": () => this.result = this.convertCentimetroToMetro(this.number),
            "0-2": () => this.result = this.convertCentimetroToQuilometro(this.number),
            "1-0": () => this.result = this.convertMetroToCentimetro(this.number),
            "1-2": () => this.result = this.convertMetroToQuilometro(this.number),
            "2-0": () => this.result = this.convertQuilometroToCentimetro(this.number),
            "2-1": () => this.result = this.convertQuilometroToMetro(this.number),
        }

        this.mapCombinations(optionsNumbers);
    }

    convertCentimetroToMetro(number: number) {
        return number / 100;
    }

    convertCentimetroToQuilometro(number: number) {
        return number / 100000;
    }

    convertMetroToCentimetro(number: number) {
        return number * 100;
    }

    convertMetroToQuilometro(number: number) {
        return number / 1000;
    }

    convertQuilometroToCentimetro(number: number) {
        return number * 100000;
    }

    convertQuilometroToMetro(number: number) {
        return number * 1000;
    }

    // =================================================================

    mapPesoCalculation() {
        let optionsNumbers = [
            { 'Grama': 0 },
            { 'Quilograma': 1 },
            { 'Libra': 2 }
        ];

        this.functions = {
            "0-1": () => this.result = this.convertGramaToQuilograma(this.number),
            "0-2": () => this.result = this.convertGramaToLibra(this.number),
            "1-0": () => this.result = this.convertQuilogramaToGrama(this.number),
            "1-2": () => this.result = this.convertQuilogramaToLibra(this.number),
            "2-0": () => this.result = this.convertLibraToGrama(this.number),
            "2-1": () => this.result = this.convertLibraToQuilograma(this.number),
        }

        this.mapCombinations(optionsNumbers);
    }

    convertGramaToQuilograma(number: number) {
        return number / 1000;
    }

    convertGramaToLibra(number: number) {
        return number / 453.59237;
    }

    convertQuilogramaToGrama(number: number) {
        return number * 1000;
    }

    convertQuilogramaToLibra(number: number) {
        return number * 2.20462;
    }

    convertLibraToGrama(number: number) {
        return number * 453.59237;
    }

    convertLibraToQuilograma(number: number) {
        return number / 2.20462;
    }

    // =================================================================

    mapTempoCalculation() {
        let optionsNumbers = [
            { 'Segundos': 0 },
            { 'Minutos': 1 },
            { 'Horas': 2 }
        ];

        this.functions = {
            "0-1": () => this.result = this.convertSegundosToMinutos(this.number),
            "0-2": () => this.result = this.convertSegundosToHoras(this.number),
            "1-0": () => this.result = this.convertMinutosToSegundos(this.number),
            "1-2": () => this.result = this.convertMinutosToHoras(this.number),
            "2-0": () => this.result = this.convertHorasToSegundos(this.number),
            "2-1": () => this.result = this.convertHorasToMinutos(this.number),
        }

        this.mapCombinations(optionsNumbers);
    }

    convertSegundosToMinutos(number: number) {
        return number / 60;
    }

    convertSegundosToHoras(number: number) {
        return number / 3600;
    }

    convertMinutosToSegundos(number: number) {
        return number * 60;
    }

    convertMinutosToHoras(number: number) {
        return number / 60;
    }

    convertHorasToSegundos(number: number) {
        return number * 3600;
    }

    convertHorasToMinutos(number: number) {
        return number * 60;
    }
}