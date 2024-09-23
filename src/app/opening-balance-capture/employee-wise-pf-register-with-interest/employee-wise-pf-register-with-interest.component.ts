import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';


interface Year {
  Year: string;
  code: string;
}

@Component({
  selector: 'app-employee-wise-pf-register-with-interest',
  templateUrl: './employee-wise-pf-register-with-interest.component.html',
  styleUrls: ['./employee-wise-pf-register-with-interest.component.scss']
})
export class EmployeeWisePfRegisterWithInterestComponent implements OnInit {

  dropdownItemYearType: Year[];
  PFRegisterForm!: FormGroup;
  showTable: boolean = false;
  PFRegister: any[] = []


  constructor(private fb: FormBuilder) {
    this.dropdownItemYearType = [
      { Year: '2022-2023', code: '2022-2023' },
      { Year: '2023-2024', code: '2023-2024' },
      { Year: '2024-2025', code: '2024-2025' },
    ];

    this.PFRegister = [{
      empName: 'John Doe (EMP001)',
      pfAccount: 'PF00123',
      sectionName: 'Accounts',
      openingBalance: 50000,
      totalWithdrawal: 10000,
      totalDeposit: 15000,
      interest: 2000,
      closingBalance: 57000,
      status: 'Active',
      otherBalance: 5000
    },
    {
      empName: 'John Dow (EMP002)',
      pfAccount: 'PF00123',
      sectionName: 'Accounts',
      openingBalance: 50000,
      totalWithdrawal: 10000,
      totalDeposit: 15000,
      interest: 2000,
      closingBalance: 57000,
      status: ' Not Active',
      otherBalance: 5000
    },
    ];
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.PFRegisterForm = this.fb.group({
      // Head_of_Account: ['', Validators.required],
      // PFD_Admin: ['', Validators.required],
      // Financial_year: ['', Validators.required],
      // Treasury: ['', Validators.required, ], // Assuming EmployeeId is a numeric value
      // Sanction_Admin: ['', Validators.required],

      Head_of_Account: ['',],
      PFD_Admin: ['',],
      Financial_year: ['',],
      Treasury: ['', ,],
      Sanction_Admin: ['',],

    });
  }

  isInvalidAndTouched(controlName: string): boolean {
    const control = this.PFRegisterForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
  onSearch() {
    if (this.PFRegisterForm.valid) {
      this.showTable = true;
    } else {
      this.showTable = false;
      Object.keys(this.PFRegisterForm.controls).forEach(field => {
        const control = this.PFRegisterForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }




  downloadPDF(employee) {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const startY = 40; // Starting Y position for the employee's details
    const tableMargin = 10; // Margin around tables
    const buttonMargin = 10; // Margin for button or text placement

    // Centered Header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Office of the DIRECTORATE OF PUBLIC INSTRUCTION', pageWidth / 2, 15, { align: 'center' });
    doc.text('Provident Fund Account Statement (2022-2023)', pageWidth / 2, 22, { align: 'center' });

    // Add a border around the header
    doc.setLineWidth(0.5); // Bold border
    doc.rect(10, 10, 190, 20);

    // Divider Line
    doc.setLineWidth(0.5);
    doc.line(10, 35, 200, 35); // Horizontal line

    // Employee Details Section
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let yPosition = startY;

    // Column 1 (Left)
    doc.text('Employee ID:', 12, yPosition);
    doc.text(employee.empName, 60, yPosition);
    doc.text('Name Of The Employee:', 12, yPosition + 8);
    doc.text(employee.pfAccount, 60, yPosition + 8);
    doc.text('Date Of Joining:', 12, yPosition + 16);
    doc.text('01-01-2003', 60, yPosition + 16);
    doc.text('Treasury Name (Code):', 12, yPosition + 24);
    doc.text('Alipore-I(SPA)', 60, yPosition + 24);
    doc.text('PFD Admin Description (Code):', 12, yPosition + 32);
    doc.text('PRINCIPAL/T.I.C VIDYANAGAR COLLEGE(PF) (35)', 64, yPosition + 32);
    doc.text('Office Name(Code):', 12, 80);
    doc.text('DIRECTORATE OF PUBLIC INSTRUCTION (2HEH0001)', 60, 80);
    doc.text('Sanction Admin (Code):', 12, 88);
    doc.text('DIRECTORATE OF PUBLIC INSTRUCTION (2HEH0001)', 60, 88);
    doc.text('Date Of Cessation:', 12, 96);
    doc.text('12/10/2007', 60, 96);

    // Column 2 (Right)
    doc.text('PF A/C No:', 110, yPosition);
    doc.text('HEC200300009', 160, yPosition);
    doc.text('Designation:', 110, yPosition + 8);
    doc.text('Gram Sevak', 160, yPosition + 8);
    doc.text('Date Of Retirement:', 110, yPosition + 16);
    doc.text('23-12-2014', 160, yPosition + 16);

    doc.setLineWidth(0.5); // Bold border
    doc.rect(10, yPosition - 4, 190, 60 + 4);

    // Update yPosition for the first table
    const table1StartY = yPosition + 70;

    // Table Data Section
    const tableColumns = [
      { header: 'Deposition Month', dataKey: 'month' },
      { header: 'Subscription ', dataKey: 'subscription' },
      { header: 'Refund ', dataKey: 'refund' },
      { header: 'Arrear/Transfer ', dataKey: 'arrear' },
      { header: 'Total Deposit ', dataKey: 'totalDeposit' },
      { header: 'Unauthorised Deposit ', dataKey: 'unauthorised' },
      { header: 'Withdrawn ', dataKey: 'withdrawn' }
    ];

    const tableRows = [
      { month: 'APR 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
      { month: 'MAY 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
      { month: 'JUN 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
      { month: 'JUL 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
      { month: 'AUG 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
      { month: 'SEP 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
      { month: 'OCT 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
      { month: 'NOV 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
      { month: 'DEC 22', subscription: '0', refund: '0', arrear: '0', totalDeposit: '0.0', unauthorised: '0', withdrawn: '0' },
    ];

    // Add the first table
    (doc as any).autoTable({
      head: [tableColumns.map(col => col.header)],
      body: tableRows.map(row => Object.values(row)),
      startY: table1StartY,
      margin: { top: table1StartY, left: 10, right: 10, bottom: tableMargin },
      theme: 'grid',
      headStyles: {
        fillColor: [100, 100, 100],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 2,
        halign: 'center'
      }
    });

    // Track the position of the first table manually
    const table1EndY = (doc as any).autoTable.previous.finalY;
    let table2StartY = table1EndY + tableMargin;

    // Add the second table
    const tableColumnsForSecondTable = [
      { header: 'Particulars Balance-I', dataKey: 'Balance' },
      { header: 'Balance-I (Withdrawable)', dataKey: 'withdrawal' },
      { header: 'Balance-II (Non-Withdrawable)', dataKey: 'nonwithdrawal' },
      { header: 'Total', dataKey: 'total' },
      { header: 'Balance-III (Unauthorized Deposit) ', dataKey: 'Deposit' },
    ];

    const tableRowsForSecondTable = [
      { Balance: 'Opening Balance as on 01/04/2022 ', withdrawal: '500', nonwithdrawal: '0.0', total: '1000.0', Deposit: '90' }
    ];

    (doc as any).autoTable({
      head: [tableColumnsForSecondTable.map(col => col.header)],
      body: tableRowsForSecondTable.map(row => Object.values(row)),
      startY: table2StartY,
      margin: { top: table2StartY, left: 10, right: 10, bottom: tableMargin },
      theme: 'grid',
      headStyles: {
        fillColor: [100, 100, 100],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 10,
        cellPadding: 2,
        halign: 'center'
      }
    });

    // Track the position of the second table manually
    const table2EndY = (doc as any).autoTable.previous.finalY;
    let approvalBoxStartY = table2EndY + 20;

    // Add "Approved By / Designation" section with improved design
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const textY = approvalBoxStartY + 7; // Center the text vertically
    const boxHeight = 18; // Adjust the height to match the image

    doc.text('Approved By /', 12, textY);
    doc.text('Designation:', 12, textY + 8);

    // Adjust the text position for "Designation:" to align with the image
    const textBoxX = 42;
    const textBoxWidth = pageWidth - textBoxX - 10;

    // Draw the rectangle around the "Approved By / Designation" section
    doc.setLineWidth(0.5);
    doc.rect(10, approvalBoxStartY, 190, boxHeight);

    // Draw inner lines to match the image style
    doc.setLineWidth(0.5);
    doc.line(10 + 38, approvalBoxStartY, 10 + 38, approvalBoxStartY + boxHeight); // Vertical line between labels and text box
    doc.line(textBoxX, approvalBoxStartY, textBoxX, approvalBoxStartY + boxHeight); // Additional vertical line


    // Open PDF in new window
    const pdfOutput = doc.output('blob');
    const blobURL = URL.createObjectURL(pdfOutput);
    window.open(blobURL);
  }



}
