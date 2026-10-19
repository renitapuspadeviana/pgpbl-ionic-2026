import { Component, OnInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../data.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: false,
})
export class MapsPage implements OnInit {
  map!: L.Map;
  constructor() { }

  ngOnInit() {

    this.loadPoints();

    if (!this.map) {
      setTimeout(() => {
        this.map = L.map('map').setView([-7.7956, 110.3695],
          13);
        var osm =
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          });
        osm.addTo(this.map);
      });
    }
  }

  private dataService = inject(DataService);

  async loadPoints() {
    const points: any = await this.dataService.getPoints();
    for (const key in points) {
      if (points.hasOwnProperty(key)) {
        const point = points[key];
        const coordinates =
          point.coordinates.split(',').map((c: string) =>
            parseFloat(c));
        const marker = L.marker(coordinates as
          L.LatLngExpression).addTo(this.map);
        marker.bindPopup(`${point.name}`);
      }
    }
    this.map.on('popupopen', (e) => {
      const popup = e.popup;
    });
  }
}
