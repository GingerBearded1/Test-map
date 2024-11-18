import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryLookupService } from '../country-lookup.service';

@Component({
  selector: 'app-map-comp',
  templateUrl: './map-comp.component.html',
  styleUrls: ['./map-comp.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [CountryLookupService]
})
export class MapCompComponent implements OnInit {
  countryDataList: any[] = [];
  selectedCountryData: any = null; // Holds the data for the selected country
  constructor(private countryLookupService: CountryLookupService) {} // Inject the service

  
  onSvgClick(event: MouseEvent) {
    const target = event.target as SVGElement;
  
    console.log('Element nodeName:', target.nodeName);
    console.log('Element ID:', target.id);
  
    if (target && target.nodeName === 'path' && target.id) {
      const countryId = target.id.trim().toLowerCase(); // Normalize the ID to lowercase
      this.selectedCountryData = this.countryDataList.find(
        country => country.id && country.id.toLowerCase() === countryId // Ensure `id` exists
      );
  
      if (this.selectedCountryData) {
        console.log('Selected Country Data:', this.selectedCountryData);
        this.highlightCountryOnMapById(countryId);
      } else {
        console.log(`No data found for country with ID: ${countryId}`);
      }
    } else {
      console.error('Clicked element is not a valid SVG path or does not have an ID');
    }
  }
  
  
  

  highlightCountryOnMapById(countryId: string) {
    // Remove 'highlight' class from all <path> elements
    const allPaths = document.querySelectorAll('path');
    allPaths.forEach(path => path.classList.remove('highlight'));
  
    // Add 'highlight' class to the clicked path
    const countryElement = document.querySelector(`#${countryId}`);
    if (countryElement) {
      countryElement.classList.add('highlight');
    }
  }
  
  ngOnInit() {
    this.countryLookupService.getAllCountriesData().subscribe(data => {
      console.log('Full data received from API:', data);
  
      if (data && data.length > 1) {
        this.countryDataList = data[1]; // Assuming the correct structure
        console.log('Country Data List Loaded:', this.countryDataList);
  
        // Log the structure of individual entries for verification
        this.countryDataList.forEach(country => console.log('Country entry:', country));
      } else {
        console.log('Unexpected data format:', data);
      }
    });
  }
}