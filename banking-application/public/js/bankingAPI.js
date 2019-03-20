/*
 * @author : Alexis Chretienne
 * @email : alexis.chretienne@fr.ibm.com
 * 
 * Sample code allowing to understand how to code API in Javascript
 * 
 */
// curl --request GET \
//         https://api.eu-gb.apiconnect.appdomain.cloud/sbm-apps-factory-virtual-agent/sb/accinfovalidation/validateaccinfo
//   --url https://api.eu-gb.apiconnect.appdomain.cloud/sbm-apps-factory-virtual-agent/sb/validateaccinfo \
//   --header 'accept: application/json' \
//   --header 'content-type: application/json' \
//   --header 'x-ibm-client-id: 6543d1c0-e43e-4490-9e02-3ce449832b0c' \
//   --header 'x-ibm-client-secret: mH2tK4hQ5lF0iK3cG8mB8pR7pB2vX8eP0dH4vW4sR2jW8wG2vH' \
//   --data '{"Id":"2417420532711424","IdType":"1842839937875968","Name":"Loretta Fernandez","AccNum":"4903797158874314"}'

// const config = require('config');
//https://api.eu-gb.apiconnect.appdomain.cloud/sbm-apps-factory-virtual-agent/sb
// sama-dev: https://api.eu-gb.apiconnect.appdomain.cloud/sbm-apps-factory-virtual-agent/samadev/accountinfovalidation/accinfovalidation
// sama-prod: https://api.eu-gb.apiconnect.appdomain.cloud/sbm-apps-factory-virtual-agent/samaprod/accountinfovalidation/accinfovalidation
const IBM_CLIENT_ID = '36b8386e-b1e2-4149-a55d-2dfb59285987',
    IBM_CLIENT_SECRET = 'cK6yE1lL1bY5lN2rL0uJ6mH7iY1cD1lA1nC7sH5jS2oS6wD1iU',
    URL_API_DEVELOPER_PORTAL = 'https://api.eu-gb.apiconnect.appdomain.cloud/sbm-apps-factory-virtual-agent/samadev',
    OPERATION_PATH = '/accountinfovalidation/accinfovalidation';
const IBM_CLIENT_ID_PROD = '11b22d74-dd93-4b50-92e5-d1d5c6af82dd',
    IBM_CLIENT_SECRET_PROD = 'xK8bV1iX2yH3tO2vW3hE0jK5rY7qU3vP2mU1rB6nE6fL8wH1pY',
    URL_API_DEVELOPER_PORTAL_PROD = 'https://api.eu-gb.apiconnect.appdomain.cloud/sbm-apps-factory-virtual-agent/samaprod',
    OPERATION_PATH_PROD = '/accountinfovalidation/accinfovalidation';
//The API Developer Portal URL
// var url_api_devloper_portal = "https://api.us.apiconnect.ibmcloud.com/spbodieusibmcom-prod/developer-contest/mplbank";


// Your API ClientID
// var IBM_CLIENT_ID = "95ae4958-1a51-45a2-8b3a-491f80f1f389";


// Your API ClientSecret
// var IBM_CLIENT_SECRET = "X5cC2xI8wQ7wL4qD6fQ1mV6iA0cY1oM7dH2rO5kG0nT0eD0vD5";


/*
 * JQUERY ready
 */
$(document).ready(function() {

    // Customer Information API
    $("#btnValidateInfo").click(ValidateInfo);
    $("#btnValidateInfoProd").click(ValidateInfo_Prod);
    // // Banking Account API
    // $("#btnBalanceInquiry").click(balanceInquiry);
    // $("#btnTransactionsInquiry").click(transactionsInquiry);
    // $("#btnAccountDetail").click(accountDetail);

});

/*
 * Banking customer information
 * 
 */

/**
 * Function allowing to get a banking customer's information
 * 
 * @returns customer Information
 */
function customerInformation(customerID) {

    var path = "/customers/";
    var data = customerID;

    doGet(path, data);
}

/**
 * Function allowing to get a banking customer's contracts (cards & banking
 * account)
 * 
 * @returns a list of banking contracts
 */
function ValidateInfo() {

    // var path = "/customers/contracts/";
    var v_id = $("#inputCustomerId").val();
    var v_idType = $("#btnGroupDrop1").val();
    var v_Name = $("#inputCustomerName").val();
    var v_AccNum = $("#inputAccountNumber").val();
    var messageData = {
        Id: v_id,
        IdType: v_idType,
        Name: v_Name,
        AccNum: v_AccNum
    };
    doGet(messageData);

}

function ValidateInfo_Prod() {

    // var path = "/customers/contracts/";
    var v_id = $("#inputCustomerId").val();
    var v_idType = $("#btnGroupDrop1").val();
    var v_Name = $("#inputCustomerName").val();
    var v_AccNum = $("#inputAccountNumber").val();
    var messageData = {
        Id: v_id,
        IdType: v_idType,
        Name: v_Name,
        AccNum: v_AccNum
    };
    doGetProd(messageData);

}

/*
 * Banking Account information
 */

/**
 * Function allowing to get a banking account's balance
 * 
 * @returns a balance
 */
function balanceInquiry() {

    var path = "/accounts/";
    var pathParameter = $("#inputBalanceInquiry").val();
    var queryParamaeter = "?date=2019-10-10";

    var data = pathParameter + queryParamaeter;

    // doGet(path, data);

}

/**
 * Function allowing to get last banking account's transactions
 * 
 * @returns a list of banking transactions
 */
function transactionsInquiry() {

    var path = "/accounts/transactions/";
    var pathParameter = $("#inputTransactionsInquiry").val();

    // doGet(path, pathParameter);

}

/**
 * Function allowing to get banking account's details
 * 
 * @returns details
 */
function accountDetail() {

    var path = "/accounts/details/";
    var pathParameter = $("#inputAccountDetail").val();

    // doGet(path, pathParameter);

}


/*
 * Miscellaneous function
 */

/**
 * Function allowing to make a AJAX call using JQuery
 * 
 * @param path :
 *            customized URL path
 * @param parameter :
 *            path parameter + query parameters
 * @returns
 */
function doGet(messageData) {
    console.log("messageData -> " + JSON.stringify(messageData));
    $.ajax({
        type: 'GET',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            "x-ibm-client-id": IBM_CLIENT_ID,
            "x-ibm-client-secret": IBM_CLIENT_SECRET
        },
        async: true,
        crossDomain: true,
        cache: false,
        url: URL_API_DEVELOPER_PORTAL + OPERATION_PATH,
        contentType: "application/json",
        body: messageData,
        beforeSend: function() { $('#myPleaseWait').modal('show'); },
        success: function(data) {
            var jsonPretty = JSON.stringify(data, null, 4);
            $("#result").text(jsonPretty);
        },
        error: function(xhr, status, error) {
            $("#result").text(xhr.responseText);
        },
        complete: function() {
            $('#myPleaseWait').modal('hide');
            console.log("complete function GET");
        }

    });
}

function doGetProd(messageData) {
    console.log("messageData -> " + JSON.stringify(messageData));
    $.ajax({
        type: 'GET',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            "x-ibm-client-id": IBM_CLIENT_ID_PROD,
            "x-ibm-client-secret": IBM_CLIENT_SECRET_PROD
        },
        async: true,
        crossDomain: true,
        cache: false,
        url: URL_API_DEVELOPER_PORTAL_PROD + OPERATION_PATH_PROD,
        contentType: "application/json",
        body: messageData,
        beforeSend: function() { $('#myPleaseWait').modal('show'); },
        success: function(data) {
            var jsonPretty = JSON.stringify(data, null, 4);
            $("#result").text(jsonPretty);
        },
        error: function(xhr, status, error) {
            $("#result").text(xhr.responseText);
        },
        complete: function() {
            $('#myPleaseWait').modal('hide');
            console.log("complete function GET");
        }

    });

}