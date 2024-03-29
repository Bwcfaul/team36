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
        sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
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

function tradeworkerRejectJobRequest(){
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
                    sendAJAXRequest('tradeworker-reject-request',handleTradeworkerRejectRequest,'tradeworker-selected-request');
                }
                else if(tradeworkerJobRequestArray[spl[1]]['Status'] == 2){
                    $('#tradeworker-requests-notification-modal').foundation('toggle');
                    document.getElementById("tradeworker-requests-notification-modal-additionalInfo").innerHTML = "<h3>The work request has already been rejected:</h3> <p>contact homeuser on " + tradeworkerJobRequestArray[spl[1]]['HomeuserContact'] + " if the job is not being intitialised and you have quoted him already for further details</p>";
                }

            }
        }
}

function handleTradeworkerRejectRequest(response){
    var result = JSON.parse(response);
    console.log(response);

}

function tradeworkerDisplayRequest(){
    var html = '';
    if(tradeworkerOngoingRequestArray.length < 1){
        html = "<h3>There are no requests to display</h3>";
        document.getElementById("tradeworker-manageRequest-areainformation").innerHTML = html;
    }
    else{
        html = genericTableGenerate(tradeworkerOngoingRequestArray,'ongoing-requests');
        document.getElementById("tradeworker-manageRequest-areainformation").innerHTML = html;
    }
}

function tradeworkerDisplayRequestInformation(tableIndex){

    var html = "<table>";
    var status = tradeworkerJobRequestArray[tableIndex]['Status'];
    var homeuserResponse = tradeworkerJobRequestArray[tableIndex]['HomeuserResponse'];
    var commencementDate = tradeworkerJobRequestArray[tableIndex]['JobCommencementDate'];
    var description = tradeworkerJobRequestArray[tableIndex]['JobDescription'];
    var quoteID = tradeworkerJobRequestArray[tableIndex]['QuoteID'];

    if(homeuserResponse == 0 && status == 0){
        homeuserResponse = "Awaiting your acceptance";
    }
    else if(homeuserResponse == 0 && status == 1){
        homeuserResponse = "Awaiting homeuser confirmation";
    }
    else if(homeuserResponse == 1){
        homeuserResponse = "Waiting for homeuser to initiate job";
    }
    else if(homeuserResponse == 2){
        homeuserResponse = "Homeuser Cancelled Request";
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



    var workType = tradeworkerJobRequestArray[tableIndex]['WorkType'];
    var workTypeID = tradeworkerJobRequestArray[tableIndex]['WorkTypeID'];
    var areaName = tradeworkerJobRequestArray[tableIndex]['AreaName'];
    var province = tradeworkerJobRequestArray[tableIndex]['Province'];
    var locationName = tradeworkerJobRequestArray[tableIndex]['locationName'];

    html += '<tr>' +
        ' <td class="label">Job Details:</td> ' +
        '<td colspan="2"> <input type="text" name="tradeworker-requests-WorkType-' + tableIndex + '" id="tradeworker-requests-WorkType-' + tableIndex + '" value="' + workType + '" readonly> </td> ' +
        '<td class="label" colspan="2">Required Commencement Date:</td> <td colspan="2"> <input type="text" name="tradeworker-requests-commenceDate-' + tableIndex + '" id="tradeworker-requests-commenceDate-' + tableIndex + '" value="' + commencementDate + '" readonly></td>' +
        '</tr> ' +
        '<tr>' +
        '<td colspan="6"> <input type="text" name="tradeworker-requests-jobDescription-' + tableIndex + '" id="tradeworker-requests-jobDescription-' + tableIndex + '" value="' + description + '" readonly> </td>' +
        '</tr>' +
        '<tr>' +
        '<td class="label">Address</td> ' +
        '<td colspan="2"> <input type="text" name="tradeworker-requests-sublocality_level_1-' + tableIndex + '" id="tradeworker-requests-sublocality_level_1-' + tableIndex + '" value="' + areaName + '" readonly> </td> ' +
        '<td colspan="2"> <input type="text" name="tradeworker-requests-locality-' + tableIndex + '" id="tradeworker-requests-locality-' + tableIndex + '" value="' + locationName + '" readonly> </td> ' +
        '<td colspan="1"> <input type="text" name="tradeworker-requests-country-' + tableIndex + '" id="tradeworker-requests-country-' + tableIndex + '" value="' + province + '" readonly> </td> ' +
        '</tr> ' +
        '<tr> ' +
        '<td class="label">Status</td> ' +
        '<td colspan="5"> <input type="text" name="tradeworker-requests-status-' + tableIndex + '" id="tradeworker-requests-status-' + tableIndex + '" value="' + status + '" readonly></td>' +
        '</tr> ';
    if(tradeworkerJobRequestArray[tableIndex]['HomeuserResponse'] == 1){
        html += '<tr>'+
            '<td class="label">Homeuser Details</td> ' +
            '<td colspan="3"> <input type="text" name="tradeworker-requests-homeuser-name-' + tableIndex + '" id="tradeworker-requests-homeuser-name-' + tableIndex + '" value="' + tradeworkerJobRequestArray[tableIndex]['HomeuserName'] + '" readonly> </td> ' +
            '<td colspan="2"> <input type="text" name="tradeworker-requests-homeuser-surname-' + tableIndex + '" id="tradeworker-requests-homeuser-surname-' + tableIndex + '" value="' + tradeworkerJobRequestArray[tableIndex]['HomeuserSurname'] + '" readonly> </td> ' +
            '</tr>' +
            '<tr>' +
            '<td class="label">Homeuser Contact Number</td> ' +
            '<td colspan="5"> <input type="text" name="tradeworker-requests-homeuser-contact-' + tableIndex + '" id="tradeworker-requests-homeuser-contact-' + tableIndex + '" value="' + tradeworkerJobRequestArray[tableIndex]['HomeuserContact'] + '" readonly> </td> ' +
            '</tr>';
    }
    html += '<tr> ' +
        '<td class="label">Homeuser Response</td> ' +
        '<td colspan="5"> <input type="text" name="tradeworker-requests-homeuserResponse-' + tableIndex + '" id="tradeworker-requests-homeuserResponse-' + tableIndex + '" value="' + homeuserResponse + '" readonly></td>' +
        '</tr> ';
    html += '</table>';

    $('#tradeworker-ongoingJobs-modal').foundation('toggle');
    document.getElementById("tradeworker-ongoingJobs-modal-additionalInfo").innerHTML = html;
}

function tradeworkerDisplayOngoingJobs(){
    if(tradeworkerOngoingJobsArray.length < 1){

        document.getElementById('tradeworker-ongoingJobs-areainformation').innerHTML = "<h3>There are no ongoing jobs to display</h3>";
    }
    else{
        document.getElementById('tradeworker-ongoingJobs-areainformation').innerHTML = genericTableGenerate(tradeworkerOngoingJobsArray,'ongoing-jobs');
    }
}

var tradeworkerJobRequestArray;
function handleFetchJobRequests(response){
    tradeworkerJobRequestArray = JSON.parse(response);
    //console.log("It got here:" + response);
    var value;
    console.log(tradeworkerJobRequestArray);
    if(typeof tradeworkerJobRequestArray == 'object'){
        //prints out the object use it to see what values need to be added to the html
        //genericPrintObject(tradeworkerJobRequestArray);
        tradeworkerBuildUpInterfaceArrays();
        tradeworkerDisplayRequest();
        tradeworkerDisplayCancelledRequest();
        tradeworkerDisplayCancelledJob();
        tradeworkerDisplayCompletedJob();
        tradeworkerDisplayCancelledJobNotification();
        tradeworkerDisplayCompletedJobNotification();
        tradeworkerDisplayOngoingJobs();
        tradeworkerSetUpBadges();
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

function tradeworkerPrintCompletedJobs(){
    //console.log("Printing");
    //var toPrint = "<p>This is a test</p>";
    //var test =  document.getElementsBy;
    //test.style.display = 'none';
    //var printWindow = window;
    //$("#AreaToBePrinted").show();
    console.log("Array to be added to be printed: ");
    console.log(tradeworkerJobRequestArray);
    var html = '';

    for(var t = 0;t < tradeworkerJobRequestArray.length;t++){
        if(tradeworkerJobRequestArray[t]['HomeuserResponse'] == 3 && tradeworkerJobRequestArray[t]['Status'] == 3 && tradeworkerJobRequestArray[t]['JobStatus'] == 1){
            var street = tradeworkerJobRequestArray[t]["Road"];
            var streetNumber = tradeworkerJobRequestArray[t]["StreetNumber"];
            var subLocality = tradeworkerJobRequestArray[t]["AreaName"];
            var locality = tradeworkerJobRequestArray[t]["locationName"];
            var province = tradeworkerJobRequestArray[t]["Province"];
            var jobDescription = tradeworkerJobRequestArray[t]["JobDescription"];
            var estimatedPrice = tradeworkerJobRequestArray[t]["AgreedPrice"];
            //var status = tradeworkerJobRequestArray[t]["Accepted"];
            var status = tradeworkerJobRequestArray[t]['JobStatus'];
            var jobType = tradeworkerJobRequestArray[t]["WorkType"];
            html += '<div style="page-break-after:always;width: 100%;height: 100%">';
            html += '<h2>Job:' + t + '</h2>';
            html += '<h3>Request information</h3>';
            var jobID = tradeworkerJobRequestArray[t]["JobID"];
            html += '<div class="row">' +
                '<div class="column large-11 medium-11"><table>' +
                '<tr> ' +
                '<td class="label">Address</td> ' +
                '<td><input type="text" name="tradeworker-ongoingJobs-Details-street_number-' + t + '" id="tradeworker-ongoingJobs-Details-street_number-' + t + '" value="' + streetNumber + '"  readonly> </td>' +
                '<td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-Details-route-' + t + '" id="tradeworker-ongoingJobs-Details-route-' + t + '" value="' + street + '"  readonly> </td>' +
                '<td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-Details-sublocality_level_1-' + t + '" id="tradeworker-ongoingJobs-Details-sublocality_level_1-' + t + '" value="' + subLocality + '"  readonly> </td>' +
                '</tr> ' +
                '<tr> ' +
                '<td></td> ' +
                '<td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-Details-locality-' + t + '" id="tradeworker-ongoingJobs-Details-locality-' + t + '" value="' + locality + '"  readonly> </td> ' +
                '<td colspan="3"> <input type="text" name="tradeworker-ongoingJobs-Details-country-' + t + '" id="tradeworker-ongoingJobs-Details-country-' + t + '" value="' + province + '"  readonly> </td> ' +
                '</tr> ' +
                '<tr> ' +
                '<td class="label">Job Description:</td> <td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-Details-WorkType-' + t + '" id="tradeworker-ongoingJobs-Details-WorkType-' + t + '" value="' + jobType + '"  readonly> </td> ' +
                '<td colspan="3"> <input type="text" name="tradeworker-ongoingJobs-Details-locality-' + t + '" id="tradeworker-ongoingJobs-Details-jobDescription-' + t + '" value="' + jobDescription + '"  readonly> </td> ' +
                '</tr> ';
            if(status != 2){
                html += '<tr> ' +
                    '<td class="label">Homeuser Details:</td> <td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-username-WorkType-' + t + '" id="tradeworker-ongoingJobs-username-WorkType-' + t + '" value="' + tradeworkerJobRequestArray[t]["HomeuserName"] + '"  readonly> </td> ' +
                    '<td colspan="3"> <input type="text" name="tradeworker-ongoingJobs-surname-jobDescription-' + t + '" id="tradeworker-ongoingJobs-surname-jobDescription-' + t + '" value="' + tradeworkerJobRequestArray[t]["HomeuserSurname"] + '"  readonly> </td> ' +
                    '<tr>' +
                    '<td colspan="1"></td>' +
                    '<td colspan="5"> <input type="text" name="tradeworker-ongoingJobs-contact-jobDescription-' + t + '" id="tradeworker-ongoingJobs-contact-jobDescription-' + t + '" value="' + tradeworkerJobRequestArray[t]["HomeuserContact"] + '"  readonly> </td> ' +
                    '</tr>' +
                    '</tr>';
            }
            html += '</table></div></div>';
            //console.log(".....6......");
            //console.log(status);
            //console.log(".....6......");
            if(status == 1){
                if(tradeworkerJobRequestArray[t]['JobID-' + jobID + '-' + 'PictureCount'] != 0) {
                    html += '<h3>Pictures:</h3>' +
                        '<div class="row">' +
                        '<div class="column large-11 medium-11">';


                    //console.log("!!!5!!!");
                    //console.log(tradeworkerJobRequestArray[tableIndex]['JobID-' + 0 + '-' + 'PictureCount']);
                    //console.log(tradeworkerJobRequestArray[tableIndex]['JobID-' + 0 + '-' + 'PictureID-'+ 0]);

                    //console.log("!!!5!!!");
                    for (var d = 0; d < tradeworkerJobRequestArray[t]['JobID-' + jobID + '-' + 'PictureCount']; d++) {
                        var picFile = tradeworkerJobRequestArray[t]['JobID-' + jobID + '-' + 'PictureID-' + d];
                        //console.log("!!!5!!!");
                        //console.log(picFile);
                        //console.log("!!!5!!!");
                        var picName = picFile.split("_");
                        if(tradeworkerJobRequestArray[t]['JobID-' + jobID + '-' + 'PictureID-' + d + '-ToPrint'] == 1){
                            html += '<div style="float: left">' +
                                '<img style="height: 200px;width: 200px" src="UploadedPictures/' + picFile + '">' +
                                    //'<figcaption>' + picName[picName.length - 1] + '</figcaption>' +
                                '</div>';
                        }

                    }


                    //    '<nav class="orbit-bullets">';
                    //for(var w = 0;w < tradeworkerJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount'];w++) {
                    //    if(w == 0){
                    //        html += '<button class="is-active" data-slide="0"><span class="show-for-sr">' + w + ' slide details.</span><span class="show-for-sr">Current Slide</span></button>';
                    //    }
                    //    else{
                    //        html += '<button data-slide="' + w + '"><span class="show-for-sr">' + w + ' slide details.</span>';
                    //    }
                    //
                    //}
                    //html +='</nav>' +
                    html += '</div>' +

                        '</div>';
                    html += '</div>';
                }
                else{
                    html += '<h3>Pictures:</h3><h5>Please add pictures from the job as soon as you can, will be confirmed by the homeuser</h5>';
                }
            }
        }
    }

    var toBePrinted = document.getElementsByClassName('section-to-print');

    toBePrinted[0].innerHTML = "";

    toBePrinted[0].innerHTML += html;

    //toBePrinted[0].innerHTML += html;
    //The following is a little complicated way to get all the pictures and details of the completed jobs to print
    setTimeout(function(){document.getElementById('make-visible-onprint').style.display = "block"; window.print(); document.getElementById('make-visible-onprint').style.display = "none";}, 1500);


    //test.style.display = '';
    //$("#AreaToBePrinted").show();
    //window.print();
    //var divContents = $("#AreaToBePrinted").html();
    //var printWindow = window.open('', '', 'height=400,width=800');
    //printWindow.document.write('<html><head><title>DIV Contents</title>');
    //printWindow.document.write('</head><body >');
    //printWindow.document.write(divContents);
    //printWindow.document.write('</body></html>');
    //document.getElementById('AreaToBePrinted').print();
    //printWindow.document.close();
    //printWindow.print();
}

function tradeworkerSetUpBadges(){
    if(tradeworkerOngoingRequestToAccept > 0){
        document.getElementById('tradeworker-ongoing-request-toAccept-badge').innerHTML = '<div class="badge">' + tradeworkerOngoingRequestToAccept + '</div>';
    }
    else{
        document.getElementById('tradeworker-ongoing-request-toAccept-badge').innerHTML = '';
    }
    if(tradeworkerOngoingRequestToAccept > 0){
        document.getElementById('tradeworker-ongoing-jobs-badge').innerHTML = '<div class="badge">' + tradeworkerJobsInitiatedCount + '</div>';
    }
    else{
        document.getElementById('tradeworker-ongoing-jobs-badge').innerHTML = '';
    }
}
var tradeworkerOngoingRequestArray = [];
var tradeworkerCancelledRequestArray = [];
var tradeworkerOngoingJobsArray = [];
var tradeworkerCancelledJobsArray = [];
var tradeworkerCompletedJobsArray = [];
var tradeworkerOngoingRequestToAccept = 0;
var tradeworkerJobsInitiatedCount = 0;
function tradeworkerBuildUpInterfaceArrays(){
    var tradeworkerOngoingRequestArrayCounter = 0;
    var tradeworkerCancelledRequestArrayCounter = 0;
    var tradeworkerOngoingJobsArrayCounter = 0;
    var tradeworkerCancelledJobsArrayCounter = 0;
    var tradeworkerCompletedJobsArrayCounter = 0;
    tradeworkerOngoingRequestToAccept = 0;
    tradeworkerJobsInitiatedCount = 0;
    if(tradeworkerJobRequestArray.length > 0) {

        for (var j = 0; j < tradeworkerJobRequestArray.length; j++) {
            var status = tradeworkerJobRequestArray[j]['Status'];
            var homeuserResponse = tradeworkerJobRequestArray[j]['HomeuserResponse'];
            if(!tradeworkerJobRequestArray[j].hasOwnProperty('JobID')){
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
                    if(homeuserResponse != 2)
                    tradeworkerOngoingRequestToAccept++;
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
                var locationName = tradeworkerJobRequestArray[j]['locationName'];

                //
                if(tradeworkerJobRequestArray[j]['HomeuserResponse'] == 1 && tradeworkerJobRequestArray[j]['Status'] != 2){
                    tradeworkerOngoingRequestArray[tradeworkerOngoingRequestArrayCounter++] = {'Commencement Date' : commencementDate,
                                                                                                'Job Type' : workType,
                                                                                                'Area' : locationName,
                                                                                                'Description' : description,
                                                                                                'Homeuser Details' : 'Available',
                                                                                                'Request Details': '<button type="button" class="button AdditionalButtonColors-tertiary" style="margin: 0.5em" onclick="tradeworkerDisplayRequestInformation(' + j + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>',
                                                                                                'Selected' : '<div class="full-width" style="padding-left: 50%"><input type="radio" name="job-requests" id="tradeworker-requests-quoteID-' + j + '" value="' + quoteID + "_" + j + '" readonly></div>'
                                                                                                };
                    userGenericFillColumnSelectTags('tradeworker-manageRequest-search-column',['Commencement Date','Job Type','Area','Description','Homeuser Details']);
                    userGenericSortSelectFill('tradeworker-manageRequest-sortBy',['Commencement Date','Job Type','Area','Description','Homeuser Details']);
                }
                else if(tradeworkerJobRequestArray[j]['HomeuserResponse'] == 0 && tradeworkerJobRequestArray[j]['Status'] != 2){
                    tradeworkerOngoingRequestArray[tradeworkerOngoingRequestArrayCounter++] = {'Commencement Date' : commencementDate,
                                                                                                'Job Type' : workType,
                                                                                                'Area' : locationName,
                                                                                                'Description' : description,
                                                                                                'Homeuser Details' : 'Pending Acceptance',
                                                                                                'Request Details': '<button type="button" class="button AdditionalButtonColors-tertiary" style="margin: 0.5em" onclick="tradeworkerDisplayRequestInformation(' + j + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>',
                                                                                                'Selected' : '<div class="full-width" style="padding-left: 50%"><input type="radio" name="job-requests" id="tradeworker-requests-quoteID-' + j + '" value="' + quoteID + "_" + j + '" readonly></div>'
                                                                                            };
                    userGenericFillColumnSelectTags('tradeworker-manageRequest-search-column',['Commencement Date','Job Type','Area','Description','Homeuser Details']);
                    userGenericSortSelectFill('tradeworker-manageRequest-sortBy',['Commencement Date','Job Type','Area','Description','Homeuser Details']);
                }
                if(tradeworkerJobRequestArray[j]['HomeuserResponse'] == 2 || tradeworkerJobRequestArray[j]['Status'] == 2){
                    tradeworkerCancelledRequestArray[tradeworkerCancelledRequestArrayCounter++] = {'Commencement Date' : commencementDate,
                                                                                                    'Job Type' : workType,
                                                                                                    'Area' : locationName,'Status' : status,
                                                                                                    'Request Details': '<button type="button" class="button AdditionalButtonColors-tertiary" style="margin: 0.5em" onclick="tradeworkerDisplayRequestInformation(' + j + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>'
                                                                                                };
                    //tradeworker-manageRequest-search-column
                    userGenericFillColumnSelectTags('tradeworker-manageRequest-cancelled-search-column',['Commencement Date','Job Type','Area']);
                    userGenericSortSelectFill('tradeworker-manageRequest-cancelled-sortBy',['Commencement Date','Job Type','Area']);
                }
            }

            if(tradeworkerJobRequestArray[j].hasOwnProperty('JobID')){
                var jobProceedDate = tradeworkerJobRequestArray[j]['JobProceedDate'];
                var agreedPrice = tradeworkerJobRequestArray[j]['AgreedPrice'];
                var estimatedCompletionDate = tradeworkerJobRequestArray[j]['EstimatedCompletionDate'];
                status = tradeworkerJobRequestArray[j]['JobStatus'];
                workType = tradeworkerJobRequestArray[j]['WorkType'];
                var tableIndex = j;
                var jobID = tradeworkerJobRequestArray[j]['JobID'];
                if(tradeworkerJobRequestArray[j]['Status'] == 3 && tradeworkerJobRequestArray[j]['HomeuserResponse'] == 3 && tradeworkerJobRequestArray[j]['JobStatus'] == 0){

                    //This will be a button that toggles the request information so that the user can see details
                    //var requestDetails;
                    tradeworkerOngoingJobsArray[tradeworkerOngoingJobsArrayCounter++] = {'Job Start Date' : jobProceedDate,
                                                                                            'Agreed Price' : agreedPrice,
                                                                                            'Estimated Complete Date' : estimatedCompletionDate,
                                                                                            'Work Type' :workType,
                                                                                            'Status':status,
                                                                                            'Job Details': '<button type="button" class="button AdditionalButtonColors-tertiary" style="margin: 0.5em" onclick="tradeworkerDisplayJobFurtherDetails(' + tableIndex + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>',
                                                                                            'Selected' : '<div class="full-height full-width" style="text-align: center;padding-top: 1em"><input type="radio" name="job-initiate-selected" id="requested-user-id" value="' + tableIndex + '"></div>'
                                                                                        };
                    userGenericFillColumnSelectTags('tradeworker-ongoingJobs-search-column',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                    userGenericSortSelectFill('tradeworker-ongoingJobs-sortBy',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                    tradeworkerJobsInitiatedCount++;
                }
                if(tradeworkerJobRequestArray[j]['JobStatus'] == 2){
                    tradeworkerCancelledJobsArray[tradeworkerCancelledJobsArrayCounter++] = {'Job Start Date' : jobProceedDate,
                                                                                            'Agreed Price' : agreedPrice,
                                                                                            'Estimated Complete Date' : estimatedCompletionDate,
                                                                                            'Work Type' :workType,
                                                                                            'Status':status,
                                                                                            'Job Details': '<button type="button" class="button AdditionalButtonColors-tertiary" style="margin: 0.5em" onclick="tradeworkerDisplayJobFurtherDetails(' + j + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>'
                                                                                        };
                    userGenericFillColumnSelectTags('tradeworker-cancelled-search-column',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                    userGenericSortSelectFill('tradeworker-cancelled-sortBy-jobs',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);

                }
                if(tradeworkerJobRequestArray[j]['JobStatus'] == 1){
                    tradeworkerCompletedJobsArray[tradeworkerCompletedJobsArrayCounter++] = {'Job Start Date' : jobProceedDate,
                                                                                            'Agreed Price' : agreedPrice,
                                                                                            'Estimated Complete Date' : estimatedCompletionDate,
                                                                                            'Work Type' :workType,
                                                                                            'Status':status,
                                                                                            'Job Details': '<button type="button" class="button AdditionalButtonColors-tertiary" style="margin: 0.5em" onclick="tradeworkerDisplayJobFurtherDetails(' + j + ')">Details<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/></button>'
                                                                                        };
                    userGenericFillColumnSelectTags('tradeworker-completed-search-column',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                    userGenericSortSelectFill('tradeworker-completed-jobs-sortBy',['Job Start Date','Agreed Price','Estimated Complete Date','Work Type','Status']);
                }
            }

            }
        tradeworkerDisplayReporting();
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
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
            $('#tradeworker-homepage-notification-modal-response').foundation('toggle');
            document.getElementById("tradeworker-homepage-notification-modal-response-additionalInfo").innerHTML = html;

        }
        else{
            //Something went wrong with the request check it out
        }
    }
}

function tradeworkerDisplayCompletedJob(){

    if(tradeworkerCompletedJobsArray.length < 1){
        document.getElementById('tradeworker-completed-areainformation').innerHTML = "<h3>There are no completed jobs to display</h3>";
    }
    else{
        document.getElementById('tradeworker-completed-areainformation').innerHTML = genericTableGenerate(tradeworkerCompletedJobsArray,'completed-jobs');
    }
}

function tradeworkerDisplayCancelledJob(){
    var html = '';
    if(tradeworkerCancelledJobsArray.length < 1){
        html ='<h3>No Jobs To Display</h3>';
        document.getElementById('tradeworker-cancelled-areainformation').innerHTML = html;
    }
    else{
        document.getElementById('tradeworker-cancelled-areainformation').innerHTML = genericTableGenerate(tradeworkerCancelledJobsArray,'cancelled-jobs');
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
    var html = '<h3>Request information</h3>';
    var jobID = tradeworkerJobRequestArray[tableIndex]["JobID"];
    html += '<div class="row">' +
        '<div class="column large-11 medium-11"><table>' +
        '<tr> ' +
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
        '</tr> ';
        if(status != 2){
        html += '<tr> ' +
            '<td class="label">Homeuser Details:</td> <td colspan="2"> <input type="text" name="tradeworker-ongoingJobs-username-WorkType-' + tableIndex + '" id="tradeworker-ongoingJobs-username-WorkType-' + tableIndex + '" value="' + tradeworkerJobRequestArray[tableIndex]["HomeuserName"] + '"  readonly> </td> ' +
            '<td colspan="3"> <input type="text" name="tradeworker-ongoingJobs-surname-jobDescription-' + tableIndex + '" id="tradeworker-ongoingJobs-surname-jobDescription-' + tableIndex + '" value="' + tradeworkerJobRequestArray[tableIndex]["HomeuserSurname"] + '"  readonly> </td> ' +
            '<tr>' +
            '<td colspan="1"></td>' +
            '<td colspan="5"> <input type="text" name="tradeworker-ongoingJobs-contact-jobDescription-' + tableIndex + '" id="tradeworker-ongoingJobs-contact-jobDescription-' + tableIndex + '" value="' + tradeworkerJobRequestArray[tableIndex]["HomeuserContact"] + '"  readonly> </td> ' +
            '</tr>' +
            '</tr>';
        }
        html += '</table></div></div>';
    //console.log(".....6......");
    //console.log(status);
    //console.log(".....6......");
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
        if(tradeworkerJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount'] != 0) {
            html += '<h3>Pictures:</h3>' +
                '<div class="row">' +
                '<div class="column large-11 medium-11">' +
                '<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-orbit>' +
                '<ul class="orbit-container" id="tradeworker-completed-jobs-pic-orbiter" style="height: 600px;width: 800px">' +
                '<button class="orbit-previous"><span class="show-for-sr">Previous Slide</span>&#9664;&#xFE0E;</button>' +
                '<button class="orbit-next"><span class="show-for-sr">Next Slide</span>&#9654;&#xFE0E;</button>';
            //console.log("!!!5!!!");
            //console.log(tradeworkerJobRequestArray[tableIndex]['JobID-' + 0 + '-' + 'PictureCount']);
            //console.log(tradeworkerJobRequestArray[tableIndex]['JobID-' + 0 + '-' + 'PictureID-'+ 0]);

            //console.log("!!!5!!!");
            for (var d = 0; d < tradeworkerJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount']; d++) {
                var picFile = tradeworkerJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureID-' + d];
                //console.log("!!!5!!!");
                //console.log(picFile);
                //console.log("!!!5!!!");
                var picName = picFile.split("_");
                html += '<li class="is-active orbit-slide">' +
                    '<img class="orbit-image" src="UploadedPictures/' + picFile + '" alt="Space">' +
                    '<figcaption class="orbit-caption">' + picName[picName.length - 1] + '</figcaption>' +
                    '</li>';
            }

            html += '</ul>';
            //    '<nav class="orbit-bullets">';
            //for(var w = 0;w < tradeworkerJobRequestArray[tableIndex]['JobID-' + jobID + '-' + 'PictureCount'];w++) {
            //    if(w == 0){
            //        html += '<button class="is-active" data-slide="0"><span class="show-for-sr">' + w + ' slide details.</span><span class="show-for-sr">Current Slide</span></button>';
            //    }
            //    else{
            //        html += '<button data-slide="' + w + '"><span class="show-for-sr">' + w + ' slide details.</span>';
            //    }
            //
            //}
            //html +='</nav>' +
            html += '</div>' +
                '</div>' +
                '</div>';
            html += '<div class="row">' +
                '<div class="large-3 columns">' +
                '<button type="top-bar-button button" class="button success" style="margin-top: 0.2em" onclick="tradeworkerAddPicturesToCompletedJob(' + tableIndex + ')">' +
                'Add Pictures' +
                '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                '</button>' +
                '</div>' +
                '<div class="large-3 columns">' +
                    '<div class="large-3 columns">' +
                    '<button type="top-bar-button button" class="button AdditionalButtonColors-tertiary" style="margin-top: 0.2em" onclick="tradeworkerAddPicturesToCV(' + tableIndex + ')">' +
                    'CV: Picture Selection' +
                    '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                    '</button>' +
                    '</div>' +
                    '</div>';
        }
        else{
            html += '<h3>Pictures:</h3><h5>Please add pictures from the job as soon as you can, will be confirmed by the homeuser</h5>' +
                '<div class="row">' +
                '<div class="large-3 columns">' +
                '<button type="top-bar-button button" class="button success" style="margin-top: 0.2em" onclick="tradeworkerAddPicturesToCompletedJob(' + tableIndex + ')">' +
                'Add Pictures' +
                '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                '</button>' +
                '</div>' +
                '</div>';
        }
    }
    $('#tradeworker-ongoingJobs-modal').foundation('toggle');
    document.getElementById("tradeworker-ongoingJobs-modal-additionalInfo").innerHTML = html;
    picOrbiter = $('#tradeworker-completed-jobs-pic-orbiter');
    //console.log(picOrbiter);
    var elem = null;
    elem = new Foundation.Orbit(picOrbiter);
}

var tradeworkerPictureArrayAccepted = [];
var tradeworkerPictureArrayToAccept = [];
function tradeworkerAddPicturesToCompletedJob(index){
    if(tradeworkerJobRequestArray.length > 0){
        console.log("Should be adding pictures to the completed job");
        console.log(tradeworkerJobRequestArray[index]);
        var numPics = tradeworkerJobRequestArray[index]["JobID-" + tradeworkerJobRequestArray[index]["JobID"] + "-PictureCount"];
        var picN = [];
        for(var j = 0;j < numPics;j++){
            picN = tradeworkerJobRequestArray[index]["JobID-" + tradeworkerJobRequestArray[index]["JobID"] + "-PictureID-" + j +""].split('_');
            var toP = '';
            if(tradeworkerJobRequestArray[index]["JobID-" + tradeworkerJobRequestArray[index]["JobID"] + "-PictureID-" + j +"-TradeworkerAcceptedPic"] == 1){
                toP = '<input class="tradeworker-toAccept-check" type="checkbox" value="'+ picN[0] + '" name="ignore-toAccept-'+ j + '-switch" id="toAccept-'+ j + '-switch" checked/>';
            }
            else{
                toP = '<input class="tradeworker-toAccept-check" type="checkbox" value="'+ picN[0] + '" name="ignore-toAccept-'+ j + '-switch" id="toAccept-'+ j + '-switch"/>';
            }
            if(tradeworkerJobRequestArray[index]["JobID-" + tradeworkerJobRequestArray[index]["JobID"] + "-PictureID-" + j +"-TradeworkerAcceptedPic"] == 0){
                tradeworkerPictureArrayToAccept[j] = {
                    PicName:picN[picN.length-1],
                    ToPrint:toP
                };
            }
            else{
                tradeworkerPictureArrayAccepted[j] = {
                    PicName:picN[picN.length-1],
                    ToPrint:toP
                };
            }


        }
        var html = '';
        if(tradeworkerPictureArrayToAccept.length > 0 || tradeworkerPictureArrayAccepted.length > 0){
            html = '<h3>Pictures To Accept:</h3><h5>tick which Pictures will be accepted</h5><form id="tradeworker-toPrint-check-form" name="tradeworker-toPrint-check-form">';
            if(tradeworkerPictureArrayToAccept.length > 0){
                html += genericTableGenerate(tradeworkerPictureArrayToAccept,'job-pictureList-toAccept');
            }
            else{
                html +="<h5>No Pictures To Accept</h5>";
            }


            html += '</form><div class="row">' +
                '<div class="large-3 columns">' +
                '<button type="top-bar-button button" class="button additionalbuttoncolors-secondary" style="margin-top: 0.2em" onclick="tradeworkerAcceptPictures()">' +
                'Accept Pictures' +
                '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '<h3>Accepted Pictures:</h3>';
            if(tradeworkerPictureArrayAccepted.length > 0){
                html += genericTableGenerate(tradeworkerPictureArrayAccepted,'job-pictureList-accepted');
            }
            else{
                html +="<h5>No Pictures Accepted</h5>";
            }
                html += '<div class="row">' +
            '<div class="large-3 columns">' +
            '<button type="top-bar-button button" class="button AdditionalButtonColors-tertiary" style="margin-top: 0.2em" onclick="tradeworkerAddPicturesToJob()">' +
            'Add Pictures' +
            '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
            '</button>' +
            '</div>' +
            '</div>';
        }
        else{
            html = '<h3>There are no pictures added yet, please add to be able to print a more detailed CV</h3>';
        }
        $('#tradeworker-ongoingJobs-modal-response').foundation('toggle');
        document.getElementById("tradeworker-ongoingJobs-modal-response-additionalInfo").innerHTML = html;
    }
}

function tradeworkerAcceptPictures(){
    console.log("Should be accepting pictures: ");
    var checkbox = $(".tradeworker-toAccept-check");
    console.log(checkbox.length);
    for(var t =0; t < checkbox.length; t++){
        if(checkbox[t].checked){
            console.log("Pic ID " + checkbox[t].value);
        }
    }
}


var primaryGraphColor = '#7363CA';
var secondaryGraphColor = '#FF6B6B';
var tertiaryGraphColor = '#6AD359';
var fourthGraphColor = '#CE5798';

function tradeworkerDisplayReporting(){
    createCanvas('canvas','tradeworker-reporting-areainformation',100);
    createCanvas('canvas1','tradeworker-reporting-areainformation',100);
    createCanvas('canvas2','tradeworker-reporting-areainformation',100);

    var labels = ["Request","Jobs"];
    var data = [];
    console.log("Reporting");
    console.log(tradeworkerOngoingRequestArray.length);
    console.log(tradeworkerCancelledRequestArray.length);
    console.log(tradeworkerOngoingJobsArray.length);
    data[0] = [tradeworkerOngoingRequestArray.length,tradeworkerOngoingJobsArray.length];
    data[1] = [tradeworkerCancelledRequestArray.length,tradeworkerCancelledJobsArray.length];
    data[2] = [tradeworkerOngoingJobsArray.length,tradeworkerCompletedJobsArray.length];
    var dataHeadings = ["Pending", "Cancelled", "Completed"];
    var colours = [primaryGraphColor,secondaryGraphColor,fourthGraphColor];
    var barChartData = createBarGraphConfig("Requests and Jobs",labels,data,dataHeadings,colours);
    var ctx = document.getElementById("canvas").getContext("2d");
    var ctx1 = document.getElementById("canvas1").getContext("2d");
    var ctx2 = document.getElementById("canvas2").getContext("2d");
    //var ctx1 = document.getElementById("canvas1").getContext("2d");
    var test = new Chart(ctx, barChartData);


    ////graphTestRun();
    if(tradeworkerOngoingJobsArray.length > 0 || tradeworkerCompletedJobsArray.length > 0){
        var labels = ["Ongoing Jobs","Completed Jobs"];
        var colors = [];
        colors[0] = [primaryGraphColor,tertiaryGraphColor];

        data = [];
        data[0] = [tradeworkerOngoingJobsArray.length,tradeworkerCompletedJobsArray.length];

        var pieChartData = createPieGraphConfig(labels,colors,data,1,"Ongoing vs Completed");
    }
    //var labels = ["Available Tradeworkers","Unavailable Tradeworkers"];
    //var colors = [];
    //colors[0] = [primaryGraphColor,tertiaryGraphColor];
    //
    //data = [];
    //data[0] = [availableTradeworkers.length,tradeworkers.length - availableTradeworkers.length];
    //
    //var pieChartData = createPieGraphConfig(labels,colors,data,1,"Total Tradeworkers");
    //
    //

    var requestsMonth = [0,0,0,0,0,0,0,0,0,0,0,0];
    var confirmedRequests = [0,0,0,0,0,0,0,0,0,0,0,0];
    var terminatedRequests = [0,0,0,0,0,0,0,0,0,0,0,0];
    var request = tradeworkerJobRequestArray;

    for(var v = 0;v < request.length;v++){
        //console.log(request);
        //console.log(request[v]['JobCommencementDate']);
        var date = new Date(request[v]['JobCommencementDate']);
        //console.log(date);
        var month = date.getMonth();
        //console.log("this is the month: " + month);
        //console.log(request[v]['RequestID']);
        var relatedRequests = admin2DimensionalSearchArray(request,"QuoteID=" + request[v]['QuoteID']);
        if(relatedRequests != null){
            //console.log(".....1.....");
            var acceptedRequests = admin2DimensionalAndSearchArray(relatedRequests,"HomeuserResponse=3","Status=3");
            var rejectedRequests = admin2DimensionalOrSearchArray(relatedRequests,"HomeuserResponse=2","Status=2");
            //console.log(".....1.....");
            if(acceptedRequests != null){
                //console.log("Accepted Requests logged:");
                confirmedRequests[month] += acceptedRequests.length;
            }
            if(rejectedRequests != null){
                terminatedRequests[month] += rejectedRequests.length;
            }

            //console.log("Adding to array");
            requestsMonth[month] += relatedRequests.length;
        }
    }
    data = [requestsMonth,confirmedRequests,terminatedRequests];
    labels = ["January","Febuary","March","April","May","June","July","August","September","October","November","December"];
    var dataLabel = ['Total Number Requests Come in','Total Confirmed Requests','Total Rejected Requests'];
    var lineChartData = createLineGraphConfig(labels,data,dataLabel,"Overall Requests Report");


    window.myLine = new Chart(ctx2, lineChartData);

    //console.log(confirmedRequests);
    //console.log(requestsMonth);
    //console.log(terminatedRequests);
    window.myBar = test;
    window.myPie = new Chart(ctx1, pieChartData);
}


function tradeworkerAddPicturesToJob(){
    console.log("Should be adding pictures to completed job for tradeworker:");
}

var tradeworkerPictureArray = [];
function tradeworkerAddPicturesToCV(index){
    if(tradeworkerJobRequestArray.length > 0){
        console.log("Should be adding pictures for the CV");
        console.log(tradeworkerJobRequestArray[index]);
        var numPics = tradeworkerJobRequestArray[index]["JobID-" + tradeworkerJobRequestArray[index]["JobID"] + "-PictureCount"];
        var picN = [];
        for(var j = 0;j < numPics;j++){
            picN = tradeworkerJobRequestArray[index]["JobID-" + tradeworkerJobRequestArray[index]["JobID"] + "-PictureID-" + j +""].split('_');
            var toP = '';
            if(tradeworkerJobRequestArray[index]["JobID-" + tradeworkerJobRequestArray[index]["JobID"] + "-PictureID-" + j +"-ToPrint"] == 1){
                toP = '<input class="tradeworker-toPrint-check" type="checkbox" value="'+ picN[0] + '" name="ignore-toPrint-'+ j + '-switch" id="toPrint-'+ j + '-switch" checked/>';
            }
            else{
                toP = '<input class="tradeworker-toPrint-check" type="checkbox" value="'+ picN[0] + '" name="ignore-toPrint-'+ j + '-switch" id="toPrint-'+ j + '-switch"/>';
            }
            tradeworkerPictureArray[j] = {
                                            PicName:picN[picN.length-1],
                                            ToPrint:toP
                                        };

        }
        var html = '';
        if(tradeworkerPictureArray.length > 0){
            html = '<h3>Select Pictures:</h3><h5>tick which Pictures will be added to CV when printing</h5><form id="tradeworker-toPrint-check-form" name="tradeworker-toPrint-check-form"><input type="hidden" value="' + numPics + '" id="ignore-toPrint-numpics" name="ignore-toPrint-numpics">';
            html += genericTableGenerate(tradeworkerPictureArray,'job-pictureList');
            html += '</form><div class="row">' +
                '<div class="large-3 columns">' +
                '<button type="top-bar-button button" class="button additionalbuttoncolors-secondary" style="margin-top: 0.2em" onclick="tradeworkerUpdatePicturesToPrint()">' +
                'Edit selection Pictures' +
                '<img class="top-bar-button-icon" type="image/svg+xml" src="Images/user-icon.svg" alt="logo"/>' +
                '</button>' +
                '</div>' +
                '</div>';
        }
        else{
            html = '<h3>There are no pictures added yet, please add to be able to print a more detailed CV</h3>';
        }
        $('#tradeworker-ongoingJobs-modal-response').foundation('toggle');
        document.getElementById("tradeworker-ongoingJobs-modal-response-additionalInfo").innerHTML = html;
    }

}

function tradeworkerUpdatePicturesToPrint(){
    var checkbox = $(".tradeworker-toPrint-check");
    console.log(checkbox.length);
    for(var t =0; t < checkbox.length; t++){
        if(checkbox[t].checked){
            console.log("Pic ID " + checkbox[t].value);

        }
    }
    sendAJAXRequest('tradeworker-update-pictures-toprint',handleTradeworkerUpdatePictureToDisplay,'tradeworker-toPrint-check-form')
}

function handleTradeworkerUpdatePictureToDisplay(response){
    var result = JSON.parse(response);
    console.log("The following was returned for updating cv pics: " + result);
    sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);
}

function tradeworkerDisplayCancelledRequest(){
    var html = '';
    if(tradeworkerCancelledRequestArray.length < 1){
        html = "<h3>There are no requests cancelled to display</h3>";
        document.getElementById("tradeworker-manageRequest-cancelled-areainformation").innerHTML = html;
    }
    else{
        html = genericTableGenerate(tradeworkerCancelledRequestArray,'cancelled-request');
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
            sendAJAXRequest('fetch-job-requests', handleFetchJobRequests);

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