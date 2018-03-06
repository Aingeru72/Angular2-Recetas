import { Component, OnInit, Input } from '@angular/core';
import { Receta } from '../model/receta';
import { RecetasService } from '../providers/recetas.service';

@Component({
  selector: 'app-recetario',
  templateUrl: './recetario.component.html',
  styleUrls: ['./recetario.component.scss']
})
export class RecetarioComponent implements OnInit {

  // Input
  checked: boolean;

  // Atributos
  listaMostrada: Receta[] = [];
  listaRecetas: Receta[];
  recetasSinGluten: Receta[] = [];
  receta = null;
  temp = null;  // variable con el elemento pulsado anteriormente

  constructor(public recetasService: RecetasService) {
    console.log('RecetarioComponent constructor(RecetasService)');
    // Inicializar receta por defecto
    this.receta = new Receta('Receta');
  }

  ngOnInit() {
    console.log('RecetarioComponent ngOnInit()');
    this.listaRecetas = this.recetasService.getAll();
    this.listaMostrada = this.listaRecetas;
    this.listaRecetas.forEach( recetaIt => {
      if (recetaIt.isGlutenFree) {
        this.recetasSinGluten.push(recetaIt);
      }
    });
  }

  /**
   * Recoger la receta seleccionada en 'this.receta' y marcarla como activa
   * @param event : elemento activo
   * @param elem : receta seleccionada
   */
  select(event, elem) {
    console.log('RecetarioComponent setActive($event, elem)');
    // console.log('$event.target: %o', event);
    console.log('elem: %o', elem);
    this.receta = elem;
    if (this.temp != null) {
      this.temp.classList.remove('active');
    }
    event.classList.add('active');
    this.temp = event;
  }

  /**
   * Mostrar lista completa de recetas o para celíacos
   * @param filtroCeliacos : boolean para activar el filtro
   */
  cambiarLista(filtroCeliacos) {
    console.log('RecetarioComponent cambiarLista(filtroCeliacos %b)', filtroCeliacos.checked);
    if (filtroCeliacos.checked) {
      this.listaMostrada = this.recetasSinGluten;
    } else {
      this.listaMostrada = this.listaRecetas;
    }
  }

}