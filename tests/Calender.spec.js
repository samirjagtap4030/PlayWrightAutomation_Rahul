const {test,expect} = require("@playwright/test");//41,42 handle calender automation
 
test("Calendar validations",async({page})=>//npx playwright test --ui
{ 
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();//c/o 2026 of calender box
    await page.locator(".react-calendar__navigation__label").click();//c/o feb 2027
    await page.locator(".react-calendar__navigation__label").click();//c/o 2026
    await page.getByText(year).click(); //c/o 2026
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();//c/o June
    await page.locator("//abbr[text()='"+date+"']").click();//c/o 15
 
    const inputs =  page.locator('.react-date-picker__inputGroup__input') // take common css for 3 elements and store in variable
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]); 
 
    }
 })
 /*
In Vs code ,you can use ai for autocomplete code.

rahulshettyacademy.com/practice/selenium practice/startpracticing/top deals menu
c/o 2026 of calender box/c/o feb 2027/c/o 2026/ c/o 2027/c/o June/c/o 15/validate 06/15/2027

(suppose you selected date n you want fresh then refresh page)
c/o 02/01/2026 of calender edit box -take parent tag         //remember- if you just inspect on 2026 then you will not get whole 02/01/2026 date(box)  
c/o feb 2027 -both having same click (this and below)   // con.. for that select inspect cursur check 02/01/2026 whole box is ispected or not then take css of that box not particular date, month, year
c/o 2026-
c/o 2027- here we tried getByText
c/o June- our no  is starting from 1 but array start from 0.so nth(5).for that month-1 and month is string,convert string into number
c/o 15- take date as string.if you use getByText then here 15 number have 2 times.so we dont use it. ithe apn x path vaprla karn exact css mialt nvata
not used=validate 06/15/2027 edit box- when you inspect it looks value=2027-06-15.that time split it and take value one by one then match with variable .this is one type 
or used=validate 06/15/2027 edit box- 

you have seperate values in dom 06,15,2027.
we take common css for 3 values.store it in variable.  (it shows 4 element but 1 element is showing hidden)
(now we will store our expectedValue in array.) 
now we take first value using inputValue() or getAttributeValue() (textContent() will not work-it work for static value or not for dynamic value)
then we compare actual value to expectedValue first

 */
 