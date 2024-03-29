<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <script>

    </script>
    <h1>Manage Job Request</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="tradeworker-manage-requests" name="tradeworker-manage-requests">

    <div class="column small-11">
        <div class="row collapse" >
            <div class="column large-2">
                <label>Column:</label>
                <select id="tradeworker-manageRequest-search-column" name="ignore-tradeworker-manageRequest-search-column" onchange="userGenericSearchTable('tradeworker-manageRequest-search','ongoing-requests')">
                </select>
            </div>
            <div class="column large-10">
                <label>Search:</label><input type="text" name="ignore-tradeworker-manageRequest-search" id="tradeworker-manageRequest-search" oninput="userGenericSearchTable('tradeworker-manageRequest-search','ongoing-requests')"/>

            </div>
        </div>
    </div>
    <div class="row">
        <div class="column large-11">
            <label>Sort By:</label>
            <select id="tradeworker-manageRequest-sortBy" name="tradeworker-manageRequest-sortBy" onchange="userGenericSortTable('ongoing-requests','tradeworker-manageRequest-sortBy')">
                <option value="0">#(asc)</option>
                <option value="1">#(dsc)</option>
                <option value="2">Commencement Date(asc)</option>
                <option value="3">Commencement Date(dsc)</option>
                <option value="4">Job Type(asc)</option>
            </select>
        </div>
        <div class="column large-1">

        </div>
    </div>
    <div class="row">
        <div class="column large-11">
            <div class="areainformation-panel-container full-width" id="tradeworker-manageRequest-areainformation">

            </div>
        </div>
    </div>

    </form>
    <div class="row">
        <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
            <button type="button" class="button success" style="margin-top: 0.5em"  onclick="tradeworkerAcceptJobRequest()">
                Accept
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button alert" style="margin-top: 0.5em" onclick="tradeworkerRejectJobRequest()">
                Reject
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>
            </button>
        </div>
    </div>
    <form id="tradeworker-selected-request" name="tradeworker-selected-request">
        <input type="hidden" value="-50" id="tradeworker-selected-request-id" name="ignore-tradeworker-selected-request-id">
    </form>
</div>

<div class="reveal" id="tradeworker-requests-notification-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">

    <div id="tradeworker-requests-notification-modal-additionalInfo">

    </div>

    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>