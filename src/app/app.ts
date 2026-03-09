// 1. Añade Inject y PLATFORM_ID a tu import de @angular/core
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
// 2. Añade isPlatformBrowser a tu import de @angular/common
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import * as AOS from 'aos';

import { SobreMi } from './components/sobre-mi/sobre-mi';
import { Habilidades } from './components/habilidades/habilidades';
import { Experiencia } from './components/experiencia/experiencia';
import { Proyectos } from './components/proyectos/proyectos';
import { Estudios } from './components/estudios/estudios';
import { Certificados } from './components/certificados/certificados';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SobreMi,
    Habilidades,
    Experiencia,
    Proyectos,
    Estudios,
    Certificados
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  title = 'cv-ricardo';
  seccionActiva: string = 'sobre-mi';
  menuAbierto: boolean = false;

  // 3. Añadimos el constructor para inyectar el ID de la plataforma
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // 4. Envolvemos la inicialización de AOS en esta validación
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100
      });
    }
  }

  seleccionarSeccion(seccion: string) {
    this.seccionActiva = seccion;
    this.menuAbierto = false; 

    // También es buena práctica validar window
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }
}