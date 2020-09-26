import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  public records: any[] = [];
  public csvHeader: any[] = [];

  ngOnInit() {
  }

// on upload read file and process it
  uploadListener($event: any): void {
    console.log(" change file: ");
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.csvHeader = headersRow;
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length, headersRow);
      };

      reader.onerror = function () {
        alert('error is occured while reading file!');
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  
  // read csv record and add to array
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any, headersRow: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord != null) {
        let subArray = {};
        for (let cr = 0; cr < curruntRecord.length; cr++) {
          let arrayKey = headersRow[cr];
          let arrayValue = curruntRecord[cr].trim();
          subArray[arrayKey] = arrayValue;
        }
          csvArr.push(subArray);
      }
    }
    return csvArr;
  }

  // check file format
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  // read header of csv
  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  // reset records
  fileReset() {
    this.records = [];
  }

  // send records to server
  csvDataPush(){
    console.log(this.records);
  }

}
