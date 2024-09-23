import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-self-registration',
  templateUrl: './self-registration.component.html',
  styleUrls: ['./self-registration.component.scss']
})
export class SelfRegistrationComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  viewClick()
{
  this.router.navigate(['View/selfRegistration']); 
}}
