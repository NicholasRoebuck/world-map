import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapApiService } from '../map-api.service';

@Component({
  selector: 'app-world-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})
export class WorldMapComponent {

  constructor (private mapApiService: MapApiService){ }

  country: any = {};
  hoverActive: boolean = false;

  hovered(){
    this.hoverActive = true;
  }
  notHovered(){
    this.hoverActive = false;
  }


  
  getCountryID(event: any){
    this.mapApiService.setCountryData(event.target.id).subscribe(
      (res: any) => {
        this.country = {
          ...res
        }
        console.log(this.country)
      },
      (err: any) => console.log('Error:' + err)
    );
  }

}
