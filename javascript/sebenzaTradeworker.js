/**
 * Created by Brandon on 2016/09/17.
 */

function handleTradeworkerAcceptRequest(response){
    var acceptance = JSON.parse(response);
    console.log(response);
    if(acceptance){
        console.log("The work request was accepted: ");
        //tradeworker-requests-notification-modal-additionalInfo
        $('#tradeworker-requests-notification-modal').foundation('toggle');
        document.getElementById("tradeworker-requests-notification-modal-additionalInfo").innerHTML = "<h3>The work request has been accepted</h3> notification to homeuser has been sent please await his response:";
        sendAJAXRequest('fetch-job-requests', handleTradeworkerFetchJobRequests);
    }
    else{
        console.log("something went wrong");
        $('#tradeworker-requests-notification-modal').foundation('toggle');
        document.getElementById("tradeworker-requests-notification-modal-additionalInfo").innerHTML = "<h3>The request was not accepted</h3> something occured, please contact adiministration for assistance if matter persists";
    }


}

function tradeworkerAcceptJobRequest(){
    var input = $("form input[name=job-requests]:radio");
    //console.log("test");
    if(input.length > 0)
        for(var i = 0 ; i < input.length ; i++){
            //console.log("should be printing :" + input[i].checked);
            if(input[i].checked){
                //console.log('The following request was selected: ' + i);
                //console.log(input[i]);
                var spl = input[i].value.split("_");
                document.getElementById("tradeworker-selected-request-id").value = spl[0];
                if(tradeworkerJobRequestArray[spl[1]]['Status'] == 0){
                    sendAJAXRequest('tradeworker-accept-request',handleTradeworkerAcceptRequest,'tradeworker-selected-request');
                }
                else if(tradeworkerJobRequestArray[spl[1]]['Status'] == 1 || tradeworkerJobRequestArray[spl[1]]['Status'] == 3){
                    $('#tradeworker-requests-notification-modal').foundation('toggle');
                    document.getElementById("tradeworker-requests-notification-modal-additionalInfo").innerHTML = "<h3>The work request has already been accepted:</h3> <p>contact homeuser on " + tradeworkerJobRequestArray[spl[1]]['HomeuserContact'] + " if the job is not being intitialised and you have quoted him already for further details</p>";
                }

            }
        }
    //console.log(input);
}

function tradeworkerDisplayRequest(){
    if(tradeworkerJobRequestArray.length > 0) {
        var once = false;
        var endTable = false;
        var html = "";

        for (var j = 0; j < tradeworkerJobRequestArray.length; j++) {
            var status = tradeworkerJobRequestArray[j]['Status'];
            var homeuserResponse = tradeworkerJobRequestArray[j]['HomeuserResponse'];
            if(!tradeworkerJobRequestArray[j].hasOwnProperty('JobID') && homeuserResponse != 2 && status != 2){
                if(!once){
                    html = "<table>";
                    once = true;
                    endTable = true;
                }

                var commencementDate = tradeworkerJobRequestArray[j]['JobCommencementDate'];
                var description = tradeworkerJobRequestArray[j]['JobDescription'];
                var quoteID = tradeworkerJobRequestArray[j]['QuoteID'];

                if(homeuserResponse == 0 && status == 0){
                    homeuserResponse = "Awaiting your acceptance";
                }
                else if(homeuserResponse == 0 && status == 1){
                    homeuserResponse = "Awaiting homeuser confirmation";
                }
                else if(homeuserResponse == 1){
                    homeuserResponse = "Waiting for homeuser to initiate job";
                }

                if (status == 0) {
                    status = "Pending acceptance";
                }
                else if (status == 1) {
                    status = "Job accepted";
                }
                else if (status == 2) {
                    status = "You rejected this request";
                }
                else if (status == 3) {
                    status = "Waiting for homeuser to initiate job";
                }



                var workType = tradeworkerJobRequestArray[j]['WorkType'];
                var workTypeID = tradeworkerJobRequestArray[j]['WorkTypeID'];
                var areaName = tradeworkerJobRequestArray[j]['AreaName'];
                var province = tradeworkerJobRequestArray[j]['Province'];
                var locationName = tradeworkerJobRequestArray[j]['locationName'];

                html += '<tr>' +
                    ' <td class="label">Job Details:</td> ' +
                    '<td colspan="2"> <input type="text" name="tradeworker-requests-WorkType-' + j + '" id="tradeworker-requests-WorkType-' + j + '" value="' + workType + '" readonly> </td> ' +
                    '<td class="label" colspan="2">Required Commencement Date:</td> <td colspan="2"> <input type="text" name="tradeworker-requests-commenceDate-' + j + '" id="tradeworker-requests-commenceDate-' + j + '" value="' + commencementDate + '" readonly></td>' +
                    '</tr> ' +
                    '<tr>' +
                    '<td colspan="6"> <input type="text" name="tradeworker-requests-jobDescription-' + j + '" id="tradeworker-requests-jobDescription-' + j + '" value="' + description + '" readonly> </td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="label">Address</td> ' +
                    '<td colspan="2"> <input type="text" name="tradeworker-requests-sublocality_level_1-' + j + '" id="tradeworker-requests-sublocality_level_1-' + j + '" value="' + areaName + '" readonly> </td> ' +
                    '<td colspan="2"> <input type="text" name="tradeworker-requests-locality-' + j + '" id="tradeworker-requests-locality-' + j + '" value="' + locationName + '" readonly> </td> ' +
                    '<td colspan="1"> <input type="text" name="tradeworker-requests-country-' + j + '" id="tradeworker-requests-country-' + j + '" value="' + province + '" readonly> </td> ' +
                    '</tr> ' +
                    '<tr> ' +
                    '<td class="label">Status</td> ' +
                    '<td colspan="5"> <input type="text" name="tradeworker-requests-status-' + j + '" id="tradeworker-requests-status-' + j + '" value="' + status + '" readonly></td>' +
                    '</tr> ';
                if(tradeworkerJobRequestArray[j]['HomeuserResponse'] == 1){
                    html += '<tr>'+
                        '<td class="label">Homeuser Details</td> ' +
                        '<td colspan="3"> <input type="text" name="tradeworker-requests-homeuser-name-' + j + '" id="tradeworker-requests-homeuser-name-' + j + '" value="' + tradeworkerJobRequestArray[j]['HomeuserName'] + '" readonly> </td> ' +
                        '<td colspan="2"> <input type="text" name="tradeworker-requests-homeuser-surname-' + j + '" id="tradeworker-requests-homeuser-surname-' + j + '" value="' + tradeworkerJobRequestArray[j]['HomeuserSurname'] + '" readonly> </td> ' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label">Homeuser Contact Number</td> ' +
                        '<td colspan="5"> <input type="text" name="tradeworker-requests-homeuser-contact-' + j + '" id="tradeworker-requests-homeuser-contact-' + j + '" value="' + tradeworkerJobRequestArray[j]['HomeuserContact'] + '" readonly> </td> ' +
                        '</tr>';
                }
                html += '<tr> ' +
                    '<td class="label">Homeuser Response</td> ' +
                    '<td colspan="4"> <input type="text" name="tradeworker-requests-homeuserResponse-' + j + '" id="tradeworker-requests-homeuserResponse-' + j + '" value="' + homeuserResponse + '" readonly></td>' +
                    '<td>' +
                    ' <div class="full-width" style="padding-left: 50%"><input type="radio" name="job-requests" id="tradeworker-requests-quoteID-' + j + '" value="' + quoteID + "_" + j + '" readonly></div>' +
                    '</td> ' +
                    '</tr> ' +
                    '<tr style="height: 0.5em;background-color: #0a0a0a"> ' +
                    '<td colspan="6"></td> </tr>';
            }

        }

        if(endTable){
            html += '</table>';
            document.getElementById("tradeworker-manageRequest-areainformation").innerHTML = html;
        }
        else{
            var html = "<h3>There are no requests to display</h3>";
            document.getElementById("tradeworker-manageRequest-areainformation").innerHTML = html;
        }
    }
    else{
        var html = "<h3>There are no requests to display</h3>";
        document.getElementById("tradeworker-manageRequest-areainformation").innerHTML = html;
    }
}

function tradeworkerDisplayOngoingJobs(){
    var result = false;
    if(tradeworkerJobRequestArray.length > 0){
        var html = '';

        for(var j = 0;j < tradeworkerJobRequestArray.length;j++) {
            if(tradeworkerJobRequestArray[j].hasOwnProperty('QuoteID') && tradeworkerJobRequestArray[j].hasOwnProperty('JobID')){
                result = true;
                var onceOff = false;

                if(tradeworkerJobRequestArray[j]['Status'] == 3 && tradeworkerJobRequestArray[j]['HomeuserResponse'] == 3 && tradeworkerJobRequestArray[j]['JobStatus'] == 0){
                    var jobProceedDate = tradeworkerJobRequestArray[j]['JobProceedDate'];
                    var agreedPrice = tradeworkerJobRequestArray[j]['AgreedPrice'];
                    var estimatedCompletionDate = tradeworkerJobRequestArray[j]['EstimatedCompletionDate'];
                    var status = tradeworkerJobRequestArray[j]['JobStatus'];
                    var workType = tradeworkerJobRequestArray[j]['WorkType'];
                    var tableIndex = j;
                    //This will be a button that toggles the request information so that the user can see details
                    //var requestDetails;
                    if(!onceOff){
                        html +=  '<table><thead>' +
                            '<tr>' +
                            '<th>Job Start Date</th>' +
                            '<th>Agreed Price</th>' +
                            '<th>Estimated Complete Date</th>' +
                            '<th>Work Type</th>' +
                            '<th>Status</th>' +
                            '<th>Job Details</th>' +
                            '<th>Selected</th>' +
                            '</tr></thead><tbody>';
                        onceOff = true;
                    }

                    html += '' +
                        '<tr style="height: 3em">' +
                        '<td>' + jobProceedDate + '</td>' +
                        '<td>' + agreedPrice + '</td>' +
                        '<td>' + estimatedCompletionDate + '</td>' +
                        '<td>' + workType + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td>' +
                        '<button type="button" class="button warning" style="margin: 0.5em" onclick="tradeworkerDisplayJobFurtherDetails(' + tableIndex + ')">' +
                        'Details' +
                        '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                        '</button>' +
                        '</td>' +
                        '<td><div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="job-initiate-selected" id="requested-user-id" value="' + tableIndex + '"></div></td>' +
                        '</tr>' +
                        '';


                }
            }

        }
        if(onceOff){
            html +='</tbody></table>';
        }
        document.getElementById('tradeworker-ongoingJobs-areainformation').innerHTML = html;
    }
    if(!result){

        document.getElementById('tradeworker-ongoingJobs-areainformation').innerHTML = "<h3>There are no ongoing jobs to display</h3>";
    }
}

var tradeworkerJobRequestArray;
function handleTradeworkerFetchJobRequests(response){
    tradeworkerJobRequestArray = JSON.parse(response);
    //console.log("It got here:" + response);
    var value;
    console.log(tradeworkerJobRequestArray);
    if(typeof tradeworkerJobRequestArray == 'object'){
        //prints out the object use it to see what values need to be added to the html
        //genericPrintObject(tradeworkerJobRequestArray);
        tradeworkerDisplayRequest();
        tradeworkerDisplayCancelledRequest();
        tradeworkerDisplayCancelledJob();
        tradeworkerDisplayCompletedJob();
        tradeworkerDisplayCancelledJobNotification();
        tradeworkerDisplayCompletedJobNotification();
        tradeworkerDisplayOngoingJobs();
        //tradeworkerRequestsNotifier();
        tradeworkerDisplayRequestAcceptedNotification();
        //console.log("The following is a test: " + tradeworkerJobRequestArray[0]['JobDescription']);
    }
    else if(typeof tradeworkerJobRequestArray == 'boolean'){
        if(tradeworkerJobRequestArray == false)
            console.log("Job request failed: " + tradeworkerJobRequestArray);
        else if(tradeworkerJobRequestArray == true){
            console.log("Job array filled");
        }
    }
    else{
        console.log("Response not recognized" + typeof tradeworkerJobRequestArray + " value: " + tradeworkerJobRequestArray);
    }
}

function tradeworkerDisplayCompletedJobNotification(){

}

function tradeworkerDisplayCancelledJobNotification(){
    var html = "";
    var onceOff = false;
    if(tradeworkerJobRequestArray.length > 0){
        for(var i = 0;i < tradeworkerJobRequestArray.length; i++){
            if(tradeworkerJobRequestArray[i].hasOwnProperty("JobStatus")){
                if(tradeworkerJobRequestArray[i]['JobStatus'] == 2 && tradeworkerJobRequestArray[i]['Notifier'] == 1 && !onceOff){
                    onceOff = true;
                    var jobProceedDate = tradeworkerJobRequestArray[i]['JobProceedDate'];
                    var agreedPrice = tradeworkerJobRequestArray[i]['AgreedPrice'];
                    var estimatedCompletionDate = tradeworkerJobRequestArray[i]['EstimatedCompletionDate'];
                    var jobStatus = tradeworkerJobRequestArray[i]['JobStatus'];
                    var workType = tradeworkerJobRequestArray[i]['WorkType'];
                    var status = tradeworkerJobRequestArray[i]['Status'];
                    var homeuserResponse = tradeworkerJobRequestArray[i]['HomeuserResponse'];
                    var commencementDate = tradeworkerJobRequestArray[i]['JobCommencementDate'];
                    var description = tradeworkerJobRequestArray[i]['JobDescription'];
                    var quoteID = tradeworkerJobRequestArray[i]['QuoteID'];
                    var workTypeID = tradeworkerJobRequestArray[i]['WorkTypeID'];
                    var areaName = tradeworkerJobRequestArray[i]['AreaName'];
                    var province = tradeworkerJobRequestArray[i]['Province'];
                    var locationName = tradeworkerJobRequestArray[i]['locationName'];
                    var jobID = tradeworkerJobRequestArray[i]['JobID'];
                    var tableIndex = i;
                    //This will be a button that toggles the request information so that the user can see details
                    //var requestDetails;

                    html +=  '<form id="tradeworker-confirm-jobTermination-form" name="tradeworker-confirm-jobTermination-form">' +
                        '<input type="hidden" id="tradeworker-confirm-jobTermination-ID" name="ignore-tradeworker-confirm-jobTermination-ID" value="' + jobID + '">' +
                        '</form>' +
                        '<h3>Job Terminated Notifier</h3>' +
                        '<h5>Job Details</h5><table><thead>' +
                        '<tr>' +
                        '<th>Job Start Date</th>' +
                        '<th>Agreed Price</th>' +
                        '<th>Estimated Complete Date</th>' +
                        '<th>Work Type</th>' +
                        '<th>Status</th>' +
                        '</tr></thead><tbody>' +
                        '<tr style="height: 3em">' +
                        '<td>' + jobProceedDate + '</td>' +
                        '<td>' + agreedPrice + '</td>' +
                        '<td>' + estimatedCompletionDate + '</td>' +
                        '<td>' + workType + '</td>' +
                        '<td>' + jobStatus + '</td>' +
                        '</tr>' +
                        '</table>';

                    if(homeuserResponse == 0 && status == 0){
                        homeuserResponse = "Awaiting your acceptance";
                    }
                    else if(homeuserResponse == 0 && status == 1){
                        homeuserResponse = "Awaiting homeuser confirmation";
                    }
                    else if(homeuserResponse == 1){
                        homeuserResponse = "Waiting for homeuser to initiate job";
                    }

                    if (status == 0) {
                        status = "Pending acceptance";
                    }
                    else if (status == 1) {
                        status = "Job accepted";
                    }
                    else if (status == 2) {
                        status = "You rejected this request";
                    }
                    else if (status == 3) {
                        status = "Waiting for homeuser to initiate job";
                    }
                    html += '<h5>Request Details</h5><table><tr>' +
                        ' <td class="label">Job Details:</td> ' +
                        '<td colspan="2"> <input type="text" name="tradeworker-requests-WorkType-" id="tradeworker-requests-WorkType-" value="' + workType + '" readonly> </td> ' +
                        '<td class="label" colspan="2">Required Commencement Date:</td> <td colspan="2"> <input type="text" name="tradeworker-requests-commenceDate-" id="tradeworker-requests-commenceDate-" value="' + commencementDate + '" readonly></td>' +
                        '</tr> ' +
                        '<tr>' +
                        '<td colspan="6"> <input type="text" name="tradeworker-requests-jobDescription-" id="tradeworker-requests-jobDescription-" value="' + description + '" readonly> </td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td class="label">Address</td> ' +
                        '<td colspan="2"> <input type="text" name="tradeworker-requests-sublocality_level_1-" id="tradeworker-requests-sublocality_level_1-" value="' + areaName + '" readonly> </td> ' +
                        '<td colspan="2"> <input type="text" name="tradeworker-requests-locality-" id="tradeworker-requests-locality-" value="' + locationName + '" readonly> </td> ' +
                        '<td colspan="1"> <input type="text" name="tradeworker-requests-country-" id="tradeworker-requests-country-" value="' + province + '" readonly> </td> ' +
                        '</tr> ' +
                        '<tr> ' +
                        '<td class="label">Status</td> ' +
                        '<td colspan="5"> <input type="text" name="tradeworker-requests-status-" id="tradeworker-requests-status-" value="' + status + '" readonly></td>' +
                        '</tr> ';
                    html += '<tr> ' +
                        '<td class="label">Homeuser Response</td> ' +
                        '<td colspan="5"> <input type="text" name="tradeworker-requests-homeuserResponse-" id="tradeworker-requests-homeuserResponse-" value="' + homeuserResponse + '" readonly></td></table>';
                    html += "<column class='large-4 medium-4 small-12'><button class=\"success button radius\" id=\"tradeworker-request-notification-button\" onclick=\"sendAJAXRequest('tradeworker-accept-jobTerminated-confirmation',handletradeworkerAcceptConfirmationJobTerminatedResponse,'tradeworker-confirm-jobTermination-form');\"> Noted </button></column> ";


                    $('#tradeworker-homepage-notification-modal').foundation('toggle');
                    document.getElementById("tradeworker-homepage-notification-modal-additionalInfo").innerHTML = html;

                }
            }
        }
    }
}

function handletradeworkerAcceptConfirmationJobTerminatedResponse(response){
    var success = JSON.parse(response);
    console.log("The following is the value " + success + " the following is the type: " + typeof success);
    if(typeof success == "boolean"){
        if(success){
            console.log("Noted");
            var html = "<h3>Notification noted</h3>";
            sendAJAXRequest('fetch-job-requests', handleTradeworkerFetchJobRequests);
            $('#tradeworker-homepage-notification-modal-response').foundation('toggle');
            document.getElementById("tradeworker-homepage-notification-modal-response-additionalInfo").innerHTML = html;

        }
        else{
            //Something went wrong with the request check it out
        }
    }
}

function tradeworkerDisplayCompletedJob(){
    var finish = false;
    var html ="";
    if(tradeworkerJobRequestArray.length > 0){
        for(var i = 0;i < tradeworkerJobRequestArray.length; i++){
            if(tradeworkerJobRequestArray[i].hasOwnProperty("JobStatus")){
                if(tradeworkerJobRequestArray[i]['JobStatus'] == 1){

                    var jobProceedDate = tradeworkerJobRequestArray[i]['JobProceedDate'];
                    var agreedPrice = tradeworkerJobRequestArray[i]['AgreedPrice'];
                    var estimatedCompletionDate = tradeworkerJobRequestArray[i]['EstimatedCompletionDate'];
                    var status = tradeworkerJobRequestArray[i]['JobStatus'];
                    var jobID = tradeworkerJobRequestArray[i]['JobID'];
                    var workType = tradeworkerJobRequestArray[i]['WorkType'];
                    var tableIndex = i;
                    //This will be a button that toggles the request information so that the user can see details
                    //var requestDetails;
                    if(!finish){
                        html +=  '<table><thead>' +
                            '<tr>' +
                            '<th>Job Start Date</th>' +
                            '<th>Agreed Price</th>' +
                            '<th>Estimated Complete Date</th>' +
                            '<th>Work Type</th>' +
                            '<th>Status</th>' +
                            '<th>Job Details</th>' +
                            '</tr></thead><tbody>';
                        finish = true;
                    }

                    html +='<tr style="height: 3em">' +
                        '<td>' + jobProceedDate + '</td>' +
                        '<td>' + agreedPrice + '</td>' +
                        '<td>' + estimatedCompletionDate + '</td>' +
                        '<td>' + workType + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td>' +
                        '<button type="button" class="button warning" style="margin: 0.5em" onclick="tradeworkerDisplayJobFurtherDetails(' + i + ')">' +
                        'Details' +
                        '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                        '</button>' +
                        '</td>' +
                        '</tr>';
                }

            }
        }
    }
    if(!finish){

        document.getElementById('tradeworker-completed-areainformation').innerHTML = "<h3>There are no completed jobs to display</h3>";
    }
    else{
        html +='</tbody></table>';
        document.getElementById('tradeworker-completed-areainformation').innerHTML = html;
    }
}

function tradeworkerDisplayCancelledJob(){
    var finish = false;
    var html ="";
    if(tradeworkerJobRequestArray.length > 0){
        for(var i = 0;i < tradeworkerJobRequestArray.length; i++){
            if(tradeworkerJobRequestArray[i].hasOwnProperty("JobStatus")){
                if(tradeworkerJobRequestArray[i]['JobStatus'] == 2){

                    var jobProceedDate = tradeworkerJobRequestArray[i]['JobProceedDate'];
                    var agreedPrice = tradeworkerJobRequestArray[i]['AgreedPrice'];
                    var estimatedCompletionDate = tradeworkerJobRequestArray[i]['EstimatedCompletionDate'];
                    var status = tradeworkerJobRequestArray[i]['JobStatus'];
                    var jobID = tradeworkerJobRequestArray[i]['JobID'];
                    var workType = tradeworkerJobRequestArray[i]['WorkType'];
                    var tableIndex = i;
                    //This will be a button that toggles the request information so that the user can see details
                    //var requestDetails;
                    if(!finish){
                        html +=  '<table><thead>' +
                            '<tr>' +
                            '<th>Job Start Date</th>' +
                            '<th>Agreed Price</th>' +
                            '<th>Estimated Complete Date</th>' +
                            '<th>Work Type</th>' +
                            '<th>Status</th>' +
                            '<th>Job Details</th>' +
                            '<th>Selected</th>' +
                            '</tr></thead><tbody>';
                        finish = true;
                    }

                    html +='<tr style="height: 3em">' +
                        '<td>' + jobProceedDate + '</td>' +
                        '<td>' + agreedPrice + '</td>' +
                        '<td>' + estimatedCompletionDate + '</td>' +
                        '<td>' + workType + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td>' +
                        '<button type="button" class="button warning" style="margin: 0.5em" onclick="tradeworkerDisplayJobFurtherDetails(' + i + ')">' +
                        'Details' +
                        '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                        '</button>' +
                        '</td>' +
                        '<td><div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="ignore-requested-user-onGoingJobs-selected" id="requested-user-onGoingJobs-id" value="' + tableIndex + "_" + jobID + '"></div></td>' +
                        '</tr>';
                }

            }
        }
    }
    if(!finish){

        document.getElementById('tradeworker-cancelled-areainformation').innerHTML = "<h3>There are no ongoing jobs to display</h3>";
    }
    else{
        html +='</tbody></table>';
        document.getElementById('tradeworker-cancelled-areainformation').innerHTML = html;
    }

}

function tradeworkerDisplayJobFurtherDetails(tableIndex){
    console.log(".....6......");
    var street = tradeworkerJobRequestArray[tableIndex]["Road"];
    var streetNumber = tradeworkerJobRequestArray[tableIndex]["StreetNumber"];
    var subLocality = tradeworkerJobRequestArray[tableIndex]["AreaName"];
    var locality = tradeworkerJobRequestArray[tableIndex]["locationName"];
    var province = tradeworkerJobRequestArray[tableIndex]["Province"];
    var jobDescription = tradeworkerJobRequestArray[tableIndex]["JobDescription"];
    var estimatedPrice = tradeworkerJobRequestArray[tableIndex]["AgreedPrice"];
    //var status = tradeworkerJobRequestArray[tableIndex]["Accepted"];
    var status = tradeworkerJobRequestArray[tableIndex]['JobStatus'];
    var jobType = tradeworkerJobRequestArray[tableIndex]["WorkType"];
    var html = '<h3>Request information</h3><table>';
    var jobID = tradeworkerJobRequestArray[tableIndex]["JobID"];
    html += '<tr> ' +
        '<td class="label">Address</td> ' +
        '<td><input type="text" name="tradeworker-ongoingJobs-Details-street_number-' + tableIndex + '" id="tradeworker-ongoingJobs-Details-street_number-' + tableIndex + '" value="' + streetNumber + '"  readonly> </td>' +
        '<td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-Details-route-' + tableIndex + '" id="tradeworker-ongoingJobs-Details-route-' + tableIndex + '" value="' + street + '"  readonly> </td>' +
        '<td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-Details-sublocality_level_1-' + tableIndex + '" id="tradeworker-ongoingJobs-Details-sublocality_level_1-' + tableIndex + '" value="' + subLocality + '"  readonly> </td>' +
        '</tr> ' +
        '<tr> ' +
        '<td></td> ' +
        '<td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-Details-locality-' + tableIndex + '" id="tradeworker-ongoingJobs-Details-locality-' + tableIndex + '" value="' + locality + '"  readonly> </td> ' +
        '<td colspan="3"> <input type="text" name="tradeworker-ongoingJobs-Details-country-' + tableIndex + '" id="tradeworker-ongoingJobs-Details-country-' + tableIndex + '" value="' + province + '"  readonly> </td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td class="label">Job Description:</td> <td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-Details-WorkType-' + tableIndex + '" id="tradeworker-ongoingJobs-Details-WorkType-' + tableIndex + '" value="' + jobType + '"  readonly> </td> ' +
        '<td colspan="3"> <input type="text" name="tradeworker-ongoingJobs-Details-locality-' + tableIndex + '" id="tradeworker-ongoingJobs-Details-jobDescription-' + tableIndex + '" value="' + jobDescription + '"  readonly> </td> ' +
        '</tr> </table>';
    console.log(".....6......");
    console.log(status);
    console.log(".....6......");
    if(status == 0) {
        html +=   '<form id="tradeworker-manage-ongoingJobs-editableInformation-form" name="tradeworker-manage-ongoingJobs-editableInformation-form">' +
            '<div class="row">';
        //TODO: make elements toggleable so that additional information can be displayed upon submission of form
        //new Foundation.Toggler($("#tradeworker-initiateJob-commenceDate-info"),'data-animate="fade-in fade-out"');
        //new Foundation.Toggler($("#tradeworker-initiateJob-numberDays-info"),'data-animate="fade-in fade-out"');
        //    Remember to do this after it has been done to the html page else it will not work

        html +='<h3>Editable information</h3>' +
            '<input type="hidden" value="' + tableIndex + '" id="tradeworker-ongoingJobs-Details-jobID-' + tableIndex + '" name="ignore-tradeworker-ongoingJobs-Details-jobID-' + tableIndex + '">' +
            '<div class="column large-11 medium 11">' +
            '<label>Agreed price:</label><input type="number" step="0.01" min="20" name="tradeworker-ongoingJobs-Details-agreedPrice-edit-' + tableIndex + '" id="tradeworker-ongoingJobs-Details-agreedPrice-edit-' + tableIndex + '" class="REQ_VAL" value="' + estimatedPrice + '">' +
            '<div class="additional-info top-padding" id="tradeworker-ongoingJobs-Details-agreedPrice-edit-' + tableIndex + '-info" data-toggler data-animate="fade-in fade-out">' +
            '<p class="help-text no-margins">Please enter in an agreed price e.g. R1500</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="column large-offset-8 medium-offset-8 large-3 medium-3">' +
            '<a type="top-bar-button button" class="button success" style="margin-top: 0.2em" onclick="sendAJAXRequest(\'tradeworker-update-agreed-price\',handleHomeuserUpdateAgreedPriceResponse,\'tradeworker-manage-ongoingJobs-editableInformation-form\');">Requset Edit<img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"></a>' +
            '</div>' +
            '</form>';
    }
    else if(status == 1){
        html += '<div class="row">' +
            '<h3>Pictures:</h3>' +
            '<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>' +
            '<ul class="orbit-container">' +
            '<button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>' +
            '<button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>';
        console.log("!!!5!!!");
        console.log(tradeworkerJobRequestArray[tableIndex]['JobID-' + 0 + '-' + 'PictureCount']);
        console.log(tradeworkerJobRequestArray[tableIndex]['JobID-' + 0 + '-' + 'PictureID-'+ 0]);

        console.log("!!!5!!!");
        for(var d = 0;d < tradeworkerJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount'];d++){
            var picFile = tradeworkerJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureID-'+ d];
            console.log("!!!5!!!");
            console.log(picFile);
            console.log("!!!5!!!");
            var picName = picFile.split("_");
            html += '<li class="is-active orbit-slide">' +
                '<img class="orbit-image" src="UploadedPictures/' + picFile + '" alt="Space">' +
                '<figcaption class="orbit-caption">' + picName[picName.length - 1] + '</figcaption>' +
                '</li>';
        }

        html += '</ul>' +
            '<nav class="orbit-bullets">';
        for(var w = 0;w < tradeworkerJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount'];w++) {
            if(w == 0){
                html += '<button class="is-active" data-slide="0"><span class="show-for-sr">' + w + ' slide details.</span><span class="show-for-sr">Current Slide</span></button>';
            }
            else{
                html += '<button data-slide="' + w + '"><span class="show-for-sr">' + w + ' slide details.</span>';
            }

        }
        html +='</nav>' +
            '</div>' +
            '</div>';
    }
    $('#tradeworker-ongoingJobs-modal').foundation('toggle');
    document.getElementById("tradeworker-ongoingJobs-modal-additionalInfo").innerHTML = html;
}

function tradeworkerDisplayCancelledRequest(){
    if(tradeworkerJobRequestArray.length > 0) {
        var once = false;
        var endTable = false;
        var html = "";
        for (var j = 0; j < tradeworkerJobRequestArray.length; j++) {
            var status = tradeworkerJobRequestArray[j]['Status'];
            var homeuserResponse = tradeworkerJobRequestArray[j]['HomeuserResponse'];
            if(!tradeworkerJobRequestArray[j].hasOwnProperty('JobID') && (homeuserResponse == 2 || status == 2)){
                if(!once){
                    html = "<table>";
                    once = true;
                    endTable = true;
                }

                var commencementDate = tradeworkerJobRequestArray[j]['JobCommencementDate'];
                var description = tradeworkerJobRequestArray[j]['JobDescription'];
                var quoteID = tradeworkerJobRequestArray[j]['QuoteID'];

                if(homeuserResponse == 2){
                    homeuserResponse = "Rejected Request";
                }
                else{
                    homeuserResponse = "Request was rejected";
                }

                if (status == 2) {
                    status = "Rejected Request";
                }
                else{
                    status = "Request was rejected";
                }



                var workType = tradeworkerJobRequestArray[j]['WorkType'];
                var workTypeID = tradeworkerJobRequestArray[j]['WorkTypeID'];
                var areaName = tradeworkerJobRequestArray[j]['AreaName'];
                var province = tradeworkerJobRequestArray[j]['Province'];
                var locationName = tradeworkerJobRequestArray[j]['locationName'];

                html += '<tr> ' +
                    '<td class="label">Job Details:</td> ' +
                    '<td colspan="2"> <input type="text" name="tradeworker-requests-cancelled-WorkType-' + j + '" id="tradeworker-requests-cancelled-WorkType-' + j + '" value="' + workType + '" readonly> </td>' +
                    '<td class="label" colspan="2">Required Commencement Date:</td> ' +
                    '<td colspan="2"> <input type="text" name="tradeworker-requests-cancelled-commenceDate-' + j + '" id="tradeworker-requests-cancelled-commenceDate-' + j + '" value="' + commencementDate + '" readonly></td> ' +
                    '</tr> ' +
                    '<tr> ' +
                    '<td colspan="6"> <input type="text" name="tradeworker-requests-cancelled-jobDescription-' + j + '" id="tradeworker-requests-cancelled-jobDescription-' + j + '" value="' + description + '" readonly> </td> ' +
                    '</tr> ' +
                    '<tr> ' +
                    '<td class="label">Address</td> ' +
                    '<td colspan="2"> <input type="text" name="tradeworker-requests-cancelled-sublocality_level_1-' + j + '" id="tradeworker-requests-cancelled-sublocality_level_1-' + j + '" value="' + areaName + '" readonly> </td> ' +
                    '<td colspan="2"> <input type="text" name="tradeworker-requests-cancelled-locality-' + j + '" id="tradeworker-requests-cancelled-locality-' + j + '" value="' + locationName + '" readonly> </td> ' +
                    '<td colspan="1"> <input type="text" name="tradeworker-requests-cancelled-country-' + j + '" id="tradeworker-requests-cancelled-country-' + j + '" value="' + province + '" readonly> </td> ' +
                    '</tr> ' +
                    '<tr> ' +
                    '<td class="label">Status</td> ' +
                    '<td colspan="5"> <input type="text" name="tradeworker-requests-cancelled-status-' + j + '" id="tradeworker-requests-cancelled-status-' + j + '" value="' + status + '" readonly></td>' +
                    '</tr>' +
                    '<tr>' +
                    '<td class="label">Homeuser Response</td> ' +
                    '<td colspan="5"> <input type="text" name="tradeworker-requests-cancelled-homeuserResponse-' + j + '" id="tradeworker-requests-cancelled-homeuserResponse-' + j + '" value="' + homeuserResponse + '" readonly></td> ' +
                    '</tr>' +
                    '<tr style="height: 0.5em;background-color: #0a0a0a"> <td colspan="6"></td> </tr>'
            }

        }

        if(endTable){
            html += '</table>';
            document.getElementById("tradeworker-manageRequest-cancelled-areainformation").innerHTML = html;
        }
        else{
            var html = "<h3>There are no requests cancelled to display</h3>";
            document.getElementById("tradeworker-manageRequest-cancelled-areainformation").innerHTML = html;
        }
    }
    else{
        var html = "<h3>There are no requests cancelled to display</h3>";
        document.getElementById("tradeworker-manageRequest-cancelled-areainformation").innerHTML = html;
    }
}

function tradeworkerDisplayRequestAcceptedNotification(){
    if(tradeworkerJobRequestArray.length > 0) {
        for(var t = 0;t < tradeworkerJobRequestArray.length;t++){
            if(tradeworkerJobRequestArray[t].hasOwnProperty('HomeuserResponse')){

                if(tradeworkerJobRequestArray[t]['HomeuserResponse'] == 1 && tradeworkerJobRequestArray[t]['Status'] == 1){
                    console.log("The following should be occuring yo yo yo");
                    var AreaName = tradeworkerJobRequestArray[t]['AreaName'];
                    var City = tradeworkerJobRequestArray[t]['City'];
                    var ContactNumber = tradeworkerJobRequestArray[t]['HomeuserContact'];
                    var JobCommencementDate = tradeworkerJobRequestArray[t]['JobCommencementDate'];
                    var JobDescription = tradeworkerJobRequestArray[t]['JobDescription'];
                    var Name = tradeworkerJobRequestArray[t]['HomeuserName'];
                    var QuoteID = tradeworkerJobRequestArray[t]['QuoteID'];
                    var Road = tradeworkerJobRequestArray[t]['Road'];
                    var StreetNumber = tradeworkerJobRequestArray[t]['StreetNumber'];
                    var Surname = tradeworkerJobRequestArray[t]['HomeuserSurname'];
                    var WorkType = tradeworkerJobRequestArray[t]['WorkType'];
                    var locationName = tradeworkerJobRequestArray[t]['locationName'];
                    var html = "<h1>Work Request Confirmation:</h1> " +
                        "<h3>Request Details</h3>" +
                        "<row>" +
                        "<h5>Work Details</h5> " +
                        "<form id='tradeworker-notification-request-form' name='tradeworker-notification-request-form'>" +
                        "<column class='large-4 medium-4 small-12'><input type=\"hidden\" name=\"ignore-tradeworker-request-notification-quoteID\" id=\"tradeworker-request-notification-quoteID\" value=" + QuoteID + "></column>" +
                        "</form>" +
                        "<column class='large-4 medium-4 small-12'><label>Date tradeworker is to come: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-commencementDate\" id=\"tradeworker-request-notification-commencementDate\" value=" + JobCommencementDate + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Job Type: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-jobType\" id=\"tradeworker-request-notification-jobType\" value=" + WorkType + " readonly></column> " +
                        "<column class='large-12 medium-12 small-12'><label>Job Description: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-JobDescription\" id=\"tradeworker-request-notification-JobDescription\" value=" + JobDescription + " readonly></column> " +
                        "<h5>Address Details</h5> " +
                        "<column class='large-4 medium-4 small-12'><label>Number: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-number\" id=\"tradeworker-request-notification-number\" value=" + StreetNumber + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Road: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-road\" id=\"tradeworker-request-notification-road\" value=" + Road + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>SubArea: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-subarea\" id=\"tradeworker-request-notification-subarea\" value=" + locationName + " readonly></column> " +
                        "<column class='large-6 medium-6 small-12'><label>Area: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-area\" id=\"tradeworker-request-notification-area\" value=" + AreaName + " readonly></column>" +
                        "<column class='large-6 medium-6 small-12'><label>Province: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-province\" id=\"tradeworker-request-notification-province\" value=" + City + " readonly></column>" +
                        "<h5>Homeuser Details</h5> " +
                        "<column class='large-4 medium-4 small-12'><label>Homeuser name: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-name\" id=\"tradeworker-request-notification-name\" value=" + Name + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Homeuser surname: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-surname\" id=\"tradeworker-request-notification-surname\" value=" + Surname + " readonly></column>" +
                        "<column class='large-4 medium-4 small-12'><label>Homeuser contact details: </label><input type=\"text\" name=\"ignore-tradeworker-request-notification-contactNumber\" id=\"tradeworker-request-notification-contactNumber\" value=" + ContactNumber + " readonly></column> " +
                        "<column class='large-4 medium-4 small-12'><button type=\"submit\" class=\"success button radius\" id=\"tradeworker-request-notification-button\" onclick=\"sendAJAXRequest('tradeworker-accept-confirmation',handletradeworkerAcceptConfirmationResponse,'tradeworker-notification-request-form');\"> Confirm </button></column> " +
                        "<column class='large-4 medium-4 small-12'><p>*note: Please go quote user on day specified and afterwards ask user to initiate job</p></column> " +
                        "</row>";

                    $('#tradeworker-homepage-notification-modal').foundation('toggle');
                    document.getElementById("tradeworker-homepage-notification-modal-additionalInfo").innerHTML = html;
                }
            }
        }

    }
    else{
        console.log("No more notifications to display");
    }
}

function handletradeworkerAcceptConfirmationResponse(response){
    var result = JSON.parse(response);
    console.log("This is the type: " + typeof result + " and the value of the response: " + result);
    if(typeof result == 'boolean'){
        if(result){
            var html = "<h3>Request Acknowledged</h3>";

            $('#tradeworker-homepage-notification-modal-response').foundation('toggle');
            document.getElementById("tradeworker-homepage-notification-modal-response-additionalInfo").innerHTML = html;
            sendAJAXRequest('fetch-job-requests', handleTradeworkerFetchJobRequests);

        }
        else{
            //Failed to accept request on server
        }
    }
}

function tradeworkerTerminateJobInitiate(){
    console.log("Should be terminating");
}

function tradeworkerExtendJobInitiate(){
    console.log("Should be extending");
}

function tradeworkerCompleteJobInitiate(){
    console.log("Should be completing");
}