Feature: Ecommerce Validations
    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with "postman4075@gmail.com" and "Hello123@"
        When Add "ZARA COAT 4" to Cart
        Then Verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order is present in the OrderHistory

    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed
        Examples:
            | username          | password    |
            | anshika@gmail.com | Iamking@000 |
            | hello@123.com     | Hello@123   |

#run scenarios parallel- npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
#Generate HTML Report-   npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html

# (@Regression tag madhe zaracoat 3 (line no 5) evji zaracoat 4 kara mhnje test fail hoil)
# rerun failed test-     npx cucumber-js --tags "@Regression" --retry 1 --exit --format html:cucumber-report.html 