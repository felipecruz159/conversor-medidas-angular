import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorComponent } from './components/selector/selector.component';
import { ConverterComponent } from './components/converter/converter.component';

const routes: Routes = [
    { path: '', component: SelectorComponent},
    { path: 'converter', component: ConverterComponent}
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {} 