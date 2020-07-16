import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place/place.service';
import { RootObject } from 'src/app/shared/models/root-object.model';
import { Place } from 'src/app/shared/models/place.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RootObjectList } from 'src/app/shared/models/root-object-list.model';
import { Picture } from 'src/app/shared/models/picture.model';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Component({
  selector: 'neo-place-edit-view',
  templateUrl: './place-edit-view.component.html',
  styleUrls: ['./place-edit-view.component.scss']
})
export class PlaceEditViewComponent implements OnInit {

  subscription = new Subscription();
  place?: RootObject<Place>;
  placeId: number;

  picturesByPlace: RootObjectList<Picture> = new RootObjectList<Picture>(Picture, 'pictures');

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    this.getRouteParam();
  }

  getRouteParam() {
    const routerSubsription = this.route.paramMap.subscribe(params => {
      if (params && params.get('id')) {
        const routePlaceId = Number(params.get('id'));
        this.placeId = routePlaceId;
        this.getOnePlace(this.placeId);
        this.getPicturesByPlace(this.placeId);
      } else {
        this.place = new RootObject<Place>(Place, 'places');
      }
    });
    this.subscription.add(routerSubsription);
  }


  getOnePlace(id: number) {
    const getOnePlaceSubscription = this.placeService.getById(id).subscribe((place: RootObject<Place>) => {
      if (place) {
        this.place = place;
      } else {
        this.place = new RootObject<Place>(Place, 'places');
      }
    });
    this.subscription.add(getOnePlaceSubscription);
  }

  getPicturesByPlace(id: number) {
    this.activityService.getPicturesByPlace(id).subscribe(
      pictures => this.picturesByPlace = pictures
    );
  }

}
