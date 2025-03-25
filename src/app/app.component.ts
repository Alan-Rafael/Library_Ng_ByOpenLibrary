import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import  {HeaderComponent} from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports:[
    RouterOutlet,
    FormsModule,
    HeaderComponent,
    CommonModule,
    FooterComponent,
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  title = 'bibliotecaAngular';
}
