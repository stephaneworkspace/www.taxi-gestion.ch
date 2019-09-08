import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription as Dto } from 'src/app/_dto/TGA/DtoTGA001OutDA01UtilisateurForEmailConfirmationInscription';

@Component({
  selector: 'app-confirmation-inscription',
  templateUrl: './confirmation-inscription.component.html'
})
export class EmailConfirmationInscriptionComponent implements OnInit {
  
  public settings: Settings;
  public item: Dto;

  constructor(
    public appSettings:AppSettings, 
    private route: ActivatedRoute,
    public router: Router,
  ) {
    this.settings = this.appSettings.settings; 
 }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.item = data['item'];
    });
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
    }

  btnLogin() {
    this.router.navigate(['/login']);
  }
}