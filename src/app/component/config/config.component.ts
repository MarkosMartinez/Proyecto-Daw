import { Component } from '@angular/core';
import { ConfigService } from '../../services/config.service';
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {

  config: any;
  idiomas = ["es", "en"];
  idiomaSeleccionado = "";
  appName = ""
  updateDesactivado: boolean = false;

  constructor(private translate: TranslateService, private _snackBar: MatSnackBar, private configService: ConfigService) { }

  ngOnInit(): void {
    this.loadConfig();

  }

  loadConfig(){
    this.configService.getConfig().subscribe(resultado =>{
      //console.log(resultado);
      sessionStorage.setItem("config", JSON.stringify(resultado));
      
      this.config = JSON.stringify(resultado);
      this.idiomaSeleccionado = JSON.parse(this.config)[0].language;
      this.appName = JSON.parse(this.config)[0].app_name;
    });
  }

  updateIdioma(){
    this.updateDesactivado = true;
    this.configService.updateConfig("language", this.idiomaSeleccionado).subscribe(resultado =>{
      if(resultado){
        this.translate.use(this.idiomaSeleccionado);
        setTimeout(() => {
          this._snackBar.open(this.translate.instant('CONFIG.config_updated_snack'), this.translate.instant('CONFIG.accept_snack'), {
            duration: 3 * 1000, // 3 Segundos
          });
        }, 250);
        this.updateDesactivado = false;
      }else{
        this._snackBar.open(this.translate.instant('CONFIG.config_updated_error_snack'), this.translate.instant('CONFIG.accept_snack'), {
          duration: 3 * 1000, // 3 Segundos
        });
        this.updateDesactivado = false;
      }
    });
  }

  updateAppName(){
    this.updateDesactivado = true;
    this.configService.updateConfig("app_name", this.appName).subscribe(resultado =>{
      if(resultado){
          this._snackBar.open(this.translate.instant('CONFIG.config_updated_snack'), this.translate.instant('CONFIG.accept_snack'), {
            duration: 3 * 1000, // 3 Segundos
          });
        this.updateDesactivado = false;
        //this.loadConfig();
      }else{
        this._snackBar.open(this.translate.instant('CONFIG.config_updated_error_snack'), this.translate.instant('CONFIG.accept_snack'), {
          duration: 3 * 1000, // 3 Segundos
        });
        this.updateDesactivado = false;
      }
    });
  }

}
