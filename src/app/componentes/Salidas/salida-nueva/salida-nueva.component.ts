import { Component, OnInit } from '@angular/core';
import { SalidaService} from '../../../services/salida.service';
import { NotificacionService } from '../../../services/notificacion.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { VehiculoInterface } from '../../../modelos/vehiculo';
import { SalidaInterface } from '../../../modelos/salida';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-salida-nueva',
  templateUrl: './salida-nueva.component.html',
  styleUrls: ['./salida-nueva.component.css']
})
export class SalidaNuevaComponent implements OnInit {

  createFormGroup(){

    return new FormGroup({
      id: new FormControl(''),
      origen: new FormControl('', [Validators.required]),
      destino: new FormControl('',[Validators.required]),
      vehiculo: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      hora: new FormControl('', [Validators.required]),
     
    
    });
  }

  public salidaForm: FormGroup;

  constructor(private salidaService: SalidaService, private vehiculoService: VehiculoService,
              private notificacionService: NotificacionService) {

        this.salidaForm = this.createFormGroup();

      }
  
  private vehiculos: VehiculoInterface[];
  private salidas: SalidaInterface[];

  ngOnInit() {

    this.getListVehiculos();
    this.getListSalidas();
    
  }

  // PARA GUARDAR UN VIAJE

  onSaveSalida(salidaForm: FormGroup){

    if(salidaForm.value){
      this.salidaService.addSalida(salidaForm.value);
    }

    this.salidaForm.reset(); 
  }

  getListVehiculos() {
    this.vehiculoService.getVehiculos().subscribe(vehiculos => {
      this.vehiculos = vehiculos;
    });
  }

  getListSalidas() {
    this.salidaService.getSalidas().subscribe(salidas => {
      this.salidas = salidas;
    });
  }

  onDeleteSalida(idSalida: string): void {

    const confirmacion = confirm('¿Está seguro de Eliminar este registro?')
    if (confirmacion) {
      this.salidaService.deleteSalida(idSalida);
    }
    else { }

  }


  onUpdateSalida(salida: SalidaInterface) {


    this.salidaService.selectedSalida = Object.assign({},salida);
  

  }





    //--Limpiar Formulario

    onResetForm(){
      this.salidaForm.reset();
    }
  
    get id() { return this.salidaForm.get('id');}
    get origen() { return this.salidaForm.get('origen');}
    get destino() { return this.salidaForm.get('destino');}
    get vehiculo() { return this.salidaForm.get('vehiculo');}
    get fecha(){ return this.salidaForm.get('fecha');}
    get hora() { return this.salidaForm.get('hora');}
  
    onClose(){
      this.salidaForm.reset();
      
    }


 

}
