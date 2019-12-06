import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpService } from '../http.service';
import { AutocompleteFilterComponent} from '../components/autocomplete-filter/autocomplete-filter.component'


@Component({
  selector: 'app-list',
  // selector: 'app-root',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

@NgModule({
  imports:[AutocompleteFilterComponent],
  exports:[AutocompleteFilterComponent]
})

export class ListComponent implements OnInit {

  brews: Object;

  constructor(private _http: HttpService) { }

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

 
  displayedColumns: string[];
  columns = new FormControl();
  columnList: string[];

  dataSource = new MatTableDataSource<BreweryElement>(ELEMENT_DATA);
  selection = new SelectionModel<BreweryElement>(true, []);


  // toppings = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: BreweryElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  compareWithFunc(a, b) {
    console.log("compare", a,b)
    return a === b;
  }

  

  ngOnInit() {
    // this._http.getBeer().subscribe(data => {
    //   this.brews = data;
    //   console.log(this.brews);
    // });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.brews = this._http.getBeer();
    console.log(this.brews);

    
    this.columnList = this._http.getColumnList();
    this.columnList.splice(0, 1, "select");
    // this.columnList = this.displayedColumns.slice();
    // this.displayedColumns = this._http.getColumnList();
    this.displayedColumns = this.columnList.slice();
  }
}

/* Static data */

export interface BreweryElement {
  id: number;
  name: string;
  brewery_type: string;
  city: string;
  country: string;
  state: string;
  latitude: string;
  longitude: string;
  phone: string;
  postal_code: string;
  street: string;
  tag_list: [];
  updated_at: string;
  website_url: string;
}

const ELEMENT_DATA: BreweryElement[] = [
  { "id": 2, "name": "Avondale Brewing Co", "brewery_type": "micro", "street": "201 41st St S", "city": "Birmingham", "state": "Alabama", "postal_code": "35222-1932", "country": "United States", "longitude": "-86.774322", "latitude": "33.524521", "phone": "2057775456", "website_url": "http://www.avondalebrewing.com", "updated_at": "2018-08-23T23:19:57.825Z", "tag_list": [] }, { "id": 44, "name": "Trim Tab Brewing", "brewery_type": "micro", "street": "2721 5th Ave S", "city": "Birmingham", "state": "Alabama", "postal_code": "35233-3401", "country": "United States", "longitude": "-86.7914000624146", "latitude": "33.5128492349817", "phone": "2057030536", "website_url": "http://www.trimtabbrewing.com", "updated_at": "2018-08-23T23:20:31.423Z", "tag_list": [] }, { "id": 46, "name": "Yellowhammer Brewery", "brewery_type": "micro", "street": "2600 Clinton Ave W", "city": "Huntsville", "state": "Alabama", "postal_code": "35805-3046", "country": "United States", "longitude": "-86.5932014", "latitude": "34.7277523", "phone": "2569755950", "website_url": "http://www.yellowhammerbrewery.com", "updated_at": "2018-08-23T23:20:33.102Z", "tag_list": [] }, { "id": 55, "name": "Bearpaw River Brewing Co", "brewery_type": "micro", "street": "4605 E Palmer Wasilla Hwy", "city": "Wasilla", "state": "Alaska", "postal_code": "99654-7679", "country": "United States", "longitude": "-149.4127103", "latitude": "61.5752695", "phone": "", "website_url": "http://bearpawriverbrewing.com", "updated_at": "2018-08-23T23:20:40.743Z", "tag_list": [] }, { "id": 76, "name": "King Street Brewing Co", "brewery_type": "micro", "street": "9050 King Street", "city": "Anchorage", "state": "Alaska", "postal_code": "99515", "country": "United States", "longitude": "-149.879076042937", "latitude": "61.1384893547315", "phone": "9073365464", "website_url": "http://www.kingstreetbrewing.com", "updated_at": "2018-08-23T23:20:57.179Z", "tag_list": [] }, { "id": 94, "name": "1912 Brewing", "brewery_type": "micro", "street": "2045 N Forbes Blvd Ste 105", "city": "Tucson", "state": "Arizona", "postal_code": "85745-1444", "country": "United States", "longitude": "-110.992750525872", "latitude": "32.2467372722906", "phone": "5202564851", "website_url": "http://www.1912brewing.com", "updated_at": "2018-08-23T23:21:11.302Z", "tag_list": [] }, { "id": 98, "name": "Bad Water Brewing", "brewery_type": "contract", "street": "4216 N Brown Ave", "city": "Scottsdale", "state": "Arizona", "postal_code": "85251-3914", "country": "United States", "longitude": "-111.924474347826", "latitude": "33.4972615652174", "phone": "5207459175", "website_url": "http://www.badwaterbrewing.com", "updated_at": "2018-08-23T23:21:15.169Z", "tag_list": [] }, { "id": 104, "name": "BJs Restaurant \u0026 Brewery - Chandler", "brewery_type": "brewpub", "street": "3155 W Chandler Blvd", "city": "Chandler", "state": "Arizona", "postal_code": "85226-5175", "country": "United States", "longitude": "-111.911126", "latitude": "33.3053455", "phone": "4809170631", "website_url": "http://www.bjsrestaurants.com", "updated_at": "2018-08-23T23:21:21.165Z", "tag_list": [] }, { "id": 107, "name": "BlackRock Brewers", "brewery_type": "micro", "street": "1664 S Research Loop Ste 200", "city": "Tucson", "state": "Arizona", "postal_code": "85710-6767", "country": "United States", "longitude": "-110.821778571134", "latitude": "32.201608314954", "phone": "5202073203", "website_url": "http://www.brb.beer", "updated_at": "2018-08-23T23:21:23.794Z", "tag_list": [] }, { "id": 127, "name": "Dragoon Brewing Co", "brewery_type": "micro", "street": "1859 W Grant Rd Ste 111", "city": "Tucson", "state": "Arizona", "postal_code": "85745-1214", "country": "United States", "longitude": "-111.005452051979", "latitude": "32.2504946147872", "phone": "5203293606", "website_url": "http://www.dragoonbrewing.com", "updated_at": "2018-08-23T23:21:40.563Z", "tag_list": [] }, { "id": 141, "name": "Grand Canyon Brewing Company", "brewery_type": "micro", "street": "233 W Route 66", "city": "Williams", "state": "Arizona", "postal_code": "86046-2530", "country": "United States", "longitude": "-112.1892168", "latitude": "35.2500282", "phone": "8005132072", "website_url": "http://www.grandcanyonbrewingco.com", "updated_at": "2018-08-23T23:21:53.397Z", "tag_list": [] }, { "id": 163, "name": "Mudshark Brewing Co", "brewery_type": "micro", "street": "210 Swanson Ave", "city": "Lake Havasu City", "state": "Arizona", "postal_code": "86403-0966", "country": "United States", "longitude": "-114.342433477881", "latitude": "34.4689736300844", "phone": "9284532981", "website_url": "http://www.mudsharkbrewingco.com", "updated_at": "2018-08-23T23:22:12.542Z", "tag_list": [] }, { "id": 182, "name": "Richter Aleworks", "brewery_type": "micro", "street": "8279 W Lake Pleasant Pkwy Ste 110", "city": "Peoria", "state": "Arizona", "postal_code": "85382-7434", "country": "United States", "longitude": "-112.238054093359", "latitude": "33.6687744976834", "phone": "6029086553", "website_url": "http://www.richteraleworks.com", "updated_at": "2018-08-23T23:22:29.385Z", "tag_list": [] }, { "id": 187, "name": "SanTan Brewing Co", "brewery_type": "regional", "street": "8 S San Marcos Pl", "city": "Chandler", "state": "Arizona", "postal_code": "85225-7862", "country": "United States", "longitude": "-111.8423459", "latitude": "33.3032436", "phone": "4809178700", "website_url": "http://www.santanbrewing.com", "updated_at": "2018-08-23T23:22:33.482Z", "tag_list": [] }, { "id": 198, "name": "State 48 Brewery", "brewery_type": "brewpub", "street": "13823 W Bell Rd", "city": "Surprise", "state": "Arizona", "postal_code": "85374-3873", "country": "United States", "longitude": "-112.357813820157", "latitude": "33.63822125", "phone": "6235841095", "website_url": "", "updated_at": "2018-08-23T23:22:41.468Z", "tag_list": [] }, { "id": 219, "name": "Wren House Brewing Company", "brewery_type": "micro", "street": "2125 N 24th St", "city": "Phoenix", "state": "Arizona", "postal_code": "85008-2713", "country": "United States", "longitude": "-112.0301125", "latitude": "33.516633", "phone": "6022449184", "website_url": "http://www.wrenhousebrewing.com", "updated_at": "2018-08-23T23:22:59.255Z", "tag_list": [] }, { "id": 225, "name": "Brick Oven Pizza Co / Brick \u0026 Forge Brewing", "brewery_type": "brewpub", "street": "2410 Linwood Dr", "city": "Paragould", "state": "Arkansas", "postal_code": "72450-6122", "country": "United States", "longitude": "-90.5204797204622", "latitude": "36.0316358142169", "phone": "8702364200", "website_url": "http://www.brickovenpizzacompany.com", "updated_at": "2018-08-23T23:23:05.438Z", "tag_list": [] }, { "id": 235, "name": "Diamond Bear Brewing Co", "brewery_type": "micro", "street": "600 N Broadway St", "city": "North Little Rock", "state": "Arkansas", "postal_code": "72114-5381", "country": "United States", "longitude": "-92.2726892120821", "latitude": "34.7594277548278", "phone": "5017082739", "website_url": "http://www.diamondbear.com", "updated_at": "2018-08-23T23:23:14.931Z", "tag_list": [] }, { "id": 247, "name": "Lost Forty Brewing", "brewery_type": "micro", "street": "501 Byrd St", "city": "Little Rock", "state": "Arkansas", "postal_code": "72202", "country": "United States", "longitude": "-92.260019", "latitude": "34.742845", "phone": "5013197275", "website_url": "http://www.lost40brewing.com/", "updated_at": "2018-08-23T23:23:24.018Z", "tag_list": [] }, { "id": 253, "name": "Rapp's Barren Brewing Company", "brewery_type": "micro", "street": "1343 E 9th St", "city": "Mountain Home", "state": "Arkansas", "postal_code": "72653-5050", "country": "United States", "longitude": "-92.3599724", "latitude": "36.3326432", "phone": "8704247288", "website_url": "http://www.rappsbarrenbrewing.com", "updated_at": "2018-08-23T23:23:29.428Z", "tag_list": [] }];


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];