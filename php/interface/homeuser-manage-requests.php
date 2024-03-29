<div class="full-height full-width" xmlns="http://www.w3.org/1999/html">
    <h1>Manage Job Request</h1>
    <!-- TODO:Need to implement sort and search on target array as well as make the buttons interact-able  -->
    <form id="homeuser-manage-requests" name="homeuser-manage-requests">
        <div class="row large-uncollapse">
            <div class="column small-11">
                <div class="row collapse" >
                    <div class="column large-2" style="padding-left: 0.9375rem">
                        <label>Column:</label>
                        <select id="homeuser-manageRTradeworker-search-column" name="ignore-homeuser-manageRTradeworker-search-column" onchange="userGenericSearchTable('homeuser-manageRTradeworker-search','ongoing-requests')">
                        </select>
                    </div>
                    <div class="column large-10" style="padding-right: 0.9375rem">
                        <label>Search:</label><input type="text" name="ignore-homeuser-manageRTradeworker-search" id="homeuser-manageRTradeworker-search" oninput="userGenericSearchTable('homeuser-manageRTradeworker-search','ongoing-requests')"/>
                    </div>
                </div>
            </div>
        </div>
    <div class="row">
        <div class="column large-11">
            <label>Sort By:</label>
            <select id="homeuser-manageRTradeworker-sortBy" name="ignore-homeuser-manageRTradeworker-sortBy" onchange="userGenericSortTable('ongoing-requests','homeuser-manageRTradeworker-sortBy')">
            </select>
        </div>
        <div class="column large-1">

        </div>
    </div>
    <div class="row">
        <div class="column large-11">
            <div class="areainformation-panel-container full-width" id="homeuser-manageRTradeworker-areainformation">

            </div>
        </div>
    </div>
    </form>
    <form id="homeuser-selected-request" name="homeuser-selected-request">
        <input type="hidden" value="-50" id="homeuser-selected-request-id" name="ignore-homeuser-selected-request-id">
    </form>

    <div class="row">
        <div class="large-4 large-offset-4 medium-offset-4 medium-4 columns">
            <button type="button" class="button additionalbuttoncolors-primary" style="margin-top: 0.5em" onclick="editHomeuserJobRequestEntry()">
                Edit
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/addition-icon.svg" alt="logo"/>
            </button>
        </div>
        <div class="large-4 medium-4 columns">
            <button type="button" class="button alert" style="margin-top: 0.5em" onclick="removeHomeuserJobRequestEntry()">
                Delete
                <img class="top-bar-button-icon" type="image/svg+xml" src="Images/remove-icon.svg" alt="logo"/>
            </button>
        </div>
    </div>
</div>

<div class="small reveal" id="homeuser-manageRequest-modal" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-manageRequest-modal-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>

<div class="reveal" id="homeuser-manageRequest-modal-response" data-reveal data-animation-in="spin-in" data-close-on-click="false" data-close-on-esc="false" data-animation-out="spin-out">
    <div id="homeuser-manageRequest-modal-response-additionalInfo">

    </div>
    <button class="close-button" data-close aria-label="Close reveal" type="button">
        <span aria-hidden="true">&times;</span>
    </button>
</div>