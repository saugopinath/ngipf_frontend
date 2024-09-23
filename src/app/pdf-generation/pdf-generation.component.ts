import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';

@Component({
  selector: 'app-pdf-generation',
  templateUrl: './pdf-generation.component.html',
  styleUrls: ['./pdf-generation.component.scss']
})
export class PdfGenerationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}
  title = 'pdf-generator-app';

  downloadPDF() {
    const doc = new jsPDF();
  
    // Setting font and size for the header
    doc.setFont('times', 'bold');
    doc.setFontSize(19);
  
    // Adding the header content
    doc.text('Government of West Bengal', 105, 20, { align: 'center' });
    doc.text('Directorate of Pension, Provident Fund & Group Insurance', 105, 30, { align: 'center' });
    doc.text('Finance Department', 105, 40, { align: 'center' });
    doc.text('Purta Bhaban(2nd Floor), Salt Lake, Kolkata-700091', 105, 50, { align: 'center' });
  
    // Memo and Date information
    doc.setFontSize(14);
    doc.text('Memo No. test 11/06', 10, 60);  // Align to the left
    doc.text('Dated-11/06/2024', 200, 60, { align: 'right' });  // Align to the right
  
    // Adding the "ORDER" title
    doc.setFontSize(16);
    doc.setFont('times', 'bold');
    doc.text('ORDER', 105, 80, { align: 'center' });
  
    // Adding the paragraph content
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    const orderText = `Sanction is hereby accorded for payment of interest on Provident Fund Deposits of the employees of the under
    mentioned Institutions/Organization:`;
    doc.text(orderText, 10, 90);
  
    // Adding the table
    (doc as any).autoTable({
      head: [['Sl No.', 'Treasury Code', 'Op. Code', 'Scheme Code', 'Name of Institutions/Organization', 'Interest Credited upto Year', 'Amount of Interest']],
      body: [
        ['1', 'CAC', '180', '999992', 'PRIN. BANGABASI COLLEGE', '2022-2023', '0'],
        ['', '', '', '', 'TOTAL', '', '0'],
      ],
      startY: 110,
      theme: 'plain',
      headStyles: {
        halign: 'center', // Center-align the header text
        fillColor: [255, 255, 255], // No fill color (white background)
        textColor: [0, 0, 0] // Black text
      },
      bodyStyles: {
        halign: 'center' // Center-align the body text
      },
      styles: {
        cellPadding: 3,
        fontSize: 10,
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      }
    });

    // Additional text
    const additionalText = `
    The Assistant Director, DPPG will act as DDO(DDO Code-CAFENA002).
    The amount of interest of the above mentioned institutions will be debited from 
    HOA 18-2049-60-101-00-002-C-45 in the financial year 2023-2024 and directly 
    by-transferred to the respective Deposit A/C of the Institutions through inter treasury transfer
    module.
    No bill will have to be drawn from the respective treasury of the institution on the strength 
    of this sanction order.`;

    const signatureText = `Assistant Director
    Directorate of Pension, Provident Fund &
    Group Insurance
    West Bengal`;

    // Adding the additional text below the table
    const finalY = (doc as any).lastAutoTable.finalY || 130; // Adjust finalY based on table's final position
    doc.text(additionalText, 10, finalY + 8);

    // Positioning signatureText under the specified text
    doc.text(signatureText, 180, finalY + 45, { align: 'right' });


    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    doc.text('Memo No. test 11/06', 10, finalY + 70);
    doc.text('Dated-11/06/2024', 190, finalY + 70, { align: 'right' });

    // Adding the final memo information and signature section
    const memoText = `Copy forwarded for information with the further request to acknowledge the deposit of
interest on PF after necessary updation of passbook from the concerned PAO/Treasury. :-\n
1. The Pay & Accounts Officer, Kolkata-P&A.O.-III.\n
2. The Accountant General(A & E), West Bengal, Treasury Buildings, Kolkata-700 001.`;

    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(memoText, 20, finalY + 80);

    

    const signatureText1 = `Assistant Director
    Directorate of Pension, Provident Fund &
    Group Insurance
    West Bengal`;

    // Positioning the second signature
    doc.setFont('times', 'normal');
    doc.text(signatureText1, 180, finalY + 120, { align: 'right' });

    // Open the PDF in a new window
    window.open(doc.output('bloburl'), '_blank');
  }
}
