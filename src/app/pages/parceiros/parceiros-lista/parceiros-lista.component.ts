import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParceirosService } from 'src/app/service/parceiros.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-parceiros-lista',
  templateUrl: './parceiros-lista.component.html',
  styleUrls: ['./parceiros-lista.component.css']
})
export class ParceirosListaComponent implements OnInit {
	@Input() images = []
	host: string
	@Output() item = new EventEmitter()
	@Output() remove = new EventEmitter()
	constructor(private _parceirosService: ParceirosService) {
		this.host = environment.host
	 }

	ngOnInit() {
		
	}



	

	getItem(data: any){
		this.item.emit(data)		
	}

	

	remover(item: any){
		this._parceirosService	
			.delete(item.id)
			.subscribe((response: any)=>{
				this.remove.emit( true )
			})
	}

}
