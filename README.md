# Beverage Machine
```
npm install
npm run build
npm run serve
# open index.html
```

You should implement beverage machine wizard using JS/HTML/CSS. 
It is client step-by-step widget that allows user to make a beverage or order it.
## Basic requirements
• CSS/JS/HTML code should be separated.
• Use 4 spaces for indentation.
• You shouldn’t use any frameworks, libraries or boilerplates for implementation.
• You shouldn’t use more than one global variable.
• Application should work in Google Chrome, Firefox and IE Edge.
## User Story
Initial page will show only link ‘Beverage machine’ and that’s it.
* When you click on link ‘Beverage machine’ you see a popup window with beverage machine interface.
* On the first step of wizard I you see a list of possible beverages that should be obtained here http://www.mocky.io/v2/585d155b1000003e0c501dfd. You should also show only available beverages. There should be additional option: ‘Order beverage’.
* If you click on ‘Coffee’ option, you move to the step of coffee type chooser. It should be a list of possible types and two buttons: ‘Cancel’ and ‘OK’. The list should be implemented as drop-down list. ‘Cancel’ will navigate you to the first step with a list of possible beverages. ‘OK’ button should make a request for preparation and move you to the next step with information about a result of your operation. List of possible types can be obtained here http://www.mocky.io/v2/585d1518100000260c501dfa .
* If you click on ‘Order beverage’ you move to the step with label ‘Please enter you phone number for ordering beverages and we will call you back’, input field for entering phone number and ‘Order’ button. Phone number field should validate entered data to make sure that the number looks like real one. ‘Order’ button should send a request, let’s say here http://www.mocky.io/v2/585d165e100000610c501e00 and move to step with a result of operation.
* If you click on beverage (except of ordering option and coffee) you should send a request for preparation. Let’s assume that it should be send here: http://www.mocky.io/v2/585d165e100000610c501e00. After successful operation you should show next step that will tell you that you drink is ready. And you also should display ‘OK’ button that will close a dialog. In case of error you should show another step with error message that you receive from the API. You can assume that the format of error will be following:
```json
{
    "code": 42,
    "message": "Something went wrong" 
}
```