import { Component, OnInit } from '@angular/core';
import { StakeHolderService } from '../../core/services/stakeHolder/stake-holder.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-stake-holder',
  templateUrl: './stake-holder.component.html',
  styleUrls: ['./stake-holder.component.scss']
})
export class StakeHolderComponent implements OnInit {

  stakeHolder: any[] = [];

    constructor(private stakeHolderService: StakeHolderService, private toastService: ToastService, private router: Router) {}

    ngOnInit(): void {
        this.getStakeHolder();
    }

    getStakeHolder(): void {
    this.stakeHolderService.getStakeHolder().subscribe(
        (response: any) => {
            console.log('API response:', response);
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                this.stakeHolder = response.result.map((item: any) => {
                    return {
                        ...item,
                        recommendingAuthRequired: item.recommendingAuthRequired ? 'Yes' : 'No'
                    };
                });
                console.log('Stakeholders:', this.stakeHolder);
            } else {
                this.toastService.showAlert(response.message, response.apiResponseStatus);
            }
        },
        (error: any) => {
            console.error('Error fetching stakeholders:', error);
            this.toastService.showError('Error fetching stakeholders');
        }
    );
}


    editStakeHolder($event) {
    //    console.log($event);
        this.router.navigate(['stakeHolder/editStakHolder', { data: JSON.stringify(this.stakeHolder.filter(e=>e.hoa == $event)) }]);
    }

    addStakeHolder() {
        this.router.navigate(['stakeHolder/addStakHolder', { data: JSON.stringify(this.stakeHolder) }]);
    }

}
