import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchServicesService } from './services/search-services.service';
import { IProdect } from '../../../Models/iprodect';
import { HttpClientModule } from '@angular/common/http';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, HttpClientModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

// export class HeaderComponent {
export class HeaderComponent implements OnChanges, OnInit {
  searchValue: string = '';
  searchProduct: IProdect[] = [];
  constructor(
    private searchServices: SearchServicesService,
    private elementRef: ElementRef
  ) {
    console.log(this.searchValue);
    console.log(this.searchProduct);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInsideSearch = this.elementRef.nativeElement.contains(
      event.target
    );
    if (!clickedInsideSearch) {
      this.searchValue = '';
      this.searchProduct = [];
    }
  }

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {}
  onSearchQueryChange() {
    if (this.searchValue.length > 0) this.getProductSearch();
  }

  getProductSearch() {
    if (this.searchValue === ' ') {
      this.searchProduct = [];
    } else {
      this.searchServices
        .getProductsBySearch(this.searchValue.toLocaleLowerCase())
        .subscribe(
          (res: any) => {
            console.log(res.products);
            this.searchProduct = res.products;
          },
          (error) => {
            alert(error);
          }
        );
    }
  }
}
