// excel utils folder-  d/vscode project/excelUtils

const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output = readExcel(worksheet, searchText); // not async

  const cell = worksheet.getCell(output.row, output.column + change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

// This does no async work, so don't mark it async.
function readExcel(worksheet, searchText) {
  let output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output = { row: rowNumber, column: colNumber };
      }
    });
  });
  return output;
}

//update Mango Price to 350. (we will call from playwright test so commented)
//writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/Users/rahulshetty/downloads/excelTest.xlsx");

test('Upload download excel validation', async ({ page }) => {
  const textSearch = 'Mango';
  const updateValue = '350';

  await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');// launch url

  const download = page.waitForEvent('download'); // wait for download event
  await page.getByRole('button', { name: 'Download' }).click(); // c/o download button
  const dl = await download;// waiting for complete download event
  const filePath = '/Users/Admin/Downloads/download.xlsx'; // or await dl.path() 

  // ✅ Ensure the edit finishes before upload
  await writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, filePath);
  await page.locator('#fileinput').setInputFiles(filePath);//upload file
  const desiredRow = await page.getByRole('row').filter({ has: page.getByText(textSearch) });// find row which has text mango and its your desired row
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);// using desired row get updatedValue and validate to update value
});

/*
end-to-end scenario
(first run test manually)                                    
launch url               (initially mango-299 price)
click on download        (download.xlx file)
make changes on excel-mango,350 
upload updated file
see mango is showing 350 on screen
then refresh page ,so you will get intial value 299


for automation:
click on download-  add promise to wait for download
make changes on excel-mango,350- call writeExcelTest()
upload updated file-use setInputFile("filepath")
see mango is showing 350 on screen-add validation
run test on ui runner-npx playwright test --ui
(page.screenshot on ui runner)



launch Url 
file takes 3-4 sec time for downloading. but playwrite does not wait for downloading,it tries to open file,so your file may be corrupt.

before click on download button, we said wait for download event (or we make promise to wait for download event)
then we click on download button
then it will wait untill complete download event (depend on your internet speed) (wait for promise resolve before go to next step)


1. Download Handling (महत्त्वाची स्टेप)
  डाऊनलोड बटण दाबण्याआधीच आपण 'download' इव्हेंटची वाट पाहण्याचे प्रॉमिस तयार करतो.
  const downloadPromise = page.waitForEvent('download');

 आता download बटणावर क्लिक करा
  await page.getByRole('button', { name: 'Download' }).click();

 डाऊनलोड पूर्ण होण्याची वाट पहा
  const download = await downloadPromise;

  when you c/o download file is stored here-/Users/Admin/Downloads/download.xlsx
  when you c/o choose file ,your file is on file explorer means out of browser.so playwrite will not work on file explorer
  so we use setInputFile("filepath")-it will upload file
  setInputFile("filepath")-you can use this method if type='file' attributes are present (,if not tell your developer to add it)


we saw how to read write in excel
how to upload(setInputFile()) and download (wait for download)
how to handle table using playwright locator
13-78
for mango,350,/user/downlod.xlsx add textSearch,updateValue,filepath
first find mango by getByText-you will get desired row
then using desired row filter data
validate data





*/