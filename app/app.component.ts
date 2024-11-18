import { Component, OnInit } from '@angular/core';
import { CountryLookupService } from './country-lookup.service';
import { MapCompComponent } from "./map-comp/map-comp.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MapCompComponent]
})
export class AppComponent implements OnInit {
  countryData: any[] = []; // This will store the list of country data

  constructor(private countryService: CountryLookupService) {}

  ngOnInit() {
    // Fetch country data from the service and populate the `countryData` array
    this.countryService.getAllCountriesData().subscribe(data => {
      if (data && data.length > 1) {
        this.countryData = data[1]; // Assuming the country data array is at data[1]
        console.log('Country data loaded:', this.countryData);
      }
    });
  }
}
