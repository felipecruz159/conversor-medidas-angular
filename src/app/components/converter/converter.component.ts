import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Converter } from './Converter';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent {
  typeOfConverter!: string; // type of the converter based on the user choice
  converter!: Converter;
  options: any = [];
  selectedOption: string = 'Selecione...';
  numberToBeConverted!: number;
  result!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.typeOfConverter = this.route.snapshot.params['type']; // set the type of the converter
    this.converter = new Converter(this.typeOfConverter);
    this.options = this.converter.setVariableItems();
    
    // console.log(this.options);
  }

  onChangeSelect() {
    this.converter.splitStringItems(this.selectedOption);
    this.converter.setCalculation();
    this.result = this.converter.result;
  }

  validateNumber(event: any){
    const newValue = event.target.value.replace(',', '.');
    this.converter.setNumberToBeConverted(Number(newValue));
    this.result = this.converter.result;
  }

}
