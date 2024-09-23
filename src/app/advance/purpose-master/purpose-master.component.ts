import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

enum ActiveStatus {
  Yes = 'y',
  No = 'n',
}
@Component({
    selector: 'app-purpose-master',
    templateUrl: './purpose-master.component.html',
    styleUrls: ['./purpose-master.component.scss'],
    providers: [DialogService],
})
export class PurposeMasterComponent implements OnInit {
    purposeForm: FormGroup;
    displayDialog: boolean = false;
    constructor(private formBuilder: FormBuilder, private dialogService: DialogService) {}

    ngOnInit(): void {
        this.purposeForm = this.formBuilder.group({
            purpose: ['', Validators.required],
            active: [null, Validators.required],
            goDate: ['', Validators.required],
            GONo:[''],
            selectedGODate:[],
            selectedWEFDate:[],
            remarks: [''],
        });
    }
    activeOptions = [
      { label: 'Yes', value: ActiveStatus.Yes },
      { label: 'No', value: ActiveStatus.No },
  ];
    savePurpose() {
      // Handle form submission logic here
      console.log(this.purposeForm.value);
      this.closeDialog();
  }

  closeDialog() {
      this.displayDialog = false;
  }
  addNew() {
    this.displayDialog=true;
  }
}
