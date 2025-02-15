import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import  {HeaderComponent} from './components/header/header.component';
import { FiltersBooksComponent } from './components/filters-books/filters-books.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports:[
    RouterOutlet,
    FormsModule,
    HeaderComponent,
    FiltersBooksComponent,
    CommonModule,
  
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;
  title = 'bibliotecaAngular';
}
