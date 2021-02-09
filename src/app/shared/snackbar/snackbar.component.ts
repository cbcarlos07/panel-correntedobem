import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import {tap, switchMap} from 'rxjs/operators'
import { NotificationService } from 'src/app/service/notification.service';


@Component({
	selector: 'app-snackbar',
	templateUrl: './snackbar.component.html',
	styleUrls: ['./snackbar.component.css'],
	animations: [
		trigger('snack-visibility', [
		  state('hidden', style({
			opacity: 0,
			bottom: '0px'
		  })),
		  state('visible', style({
			opacity: 1,
			bottom: '60px'
		  })),
		  transition('hidden => visible', animate('500ms 0s ease-in')),
		  transition('visible => hidden', animate('500ms 0s ease-out'))
		])
	  ]
	
})
export class SnackbarComponent implements OnInit {
	message: string = 'Hello There!'
	snackVisibility: string = 'hidden'
	tipAlert: string

	constructor(private _notificationService: NotificationService) { }
	
	ngOnInit() {
		this._notificationService
		.notifier
		.pipe(
			tap( (obj: any) => {
				console.log(obj);
				
				this.tipAlert = obj.status == true ? 'alert-success' : 'alert-danger'
				this.message  = obj.message
				
				this.snackVisibility = 'visible'
				
			}),
			switchMap( message => timer(3000))
			).subscribe( timer => this.snackVisibility = 'hidden' )
			
		}
		
	}
	