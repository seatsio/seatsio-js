const Account = require('./Accounts/Account.js');
const AccountSettings = require('./Accounts/AccountSettings.js');
const ChartValidationSettings = require('./Accounts/ChartValidationSettings.js');
const Event = require('./Events/Event.js');
const ObjectStatus = require('./Events/ObjectStatus.js');
const BestAvailableObjects = require('./Events/BestAvailableObjects.js');
const ForSaleConfig = require('./Events/ForSaleConfig.js');
const ChangeObjectStatusResult = require('./Events/ChangeObjectStatusResult.js');
const Chart = require('./Charts/Chart.js');
const HoldToken = require('./HoldTokens/HoldToken.js');
const EventReportItem = require('./Reports/EventReportItem.js');
const ChartReportItem = require('./Reports/ChartReportItem.js');
const Subaccount = require('./Subaccounts/Subaccount.js');
const StatusChange = require('./Events/StatusChange.js');
const LabelClasses = require('./Common/Labels.js');

module.exports = {

    /**
     * @param {Object} data
     * @returns {Object.<string, Labels>}
     */
    labelsCreator(data) {
        let labels = {};
        for (const key of Object.keys(data.labels)) {
            if (data.labels[key].parent) {
                labels[key] = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels[key].own.label, data.labels[key].own.type), new LabelClasses.LabelAndType(data.labels[key].parent.label, data.labels[key].parent.type));
            } else {
                labels[key] = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels[key].own.label, data.labels[key].own.type));
            }
            if (data.labels[key].section) {
                labels[key].section = data.labels[key].section;
            }

        }
        return labels;
    },

    /**
     * @param data
     * @returns {Labels}
     */
    labelCreator(data) {
        let labels = {};
        if (data.labels.parent) {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels.own.label, data.labels.own.type), new LabelClasses.LabelAndType(data.labels.parent.label, data.labels.parent.type));
        } else {
            labels = new LabelClasses.Labels(new LabelClasses.LabelAndType(data.labels.own.label, data.labels.own.type));
        }
        if (data.labels.section) {
            labels.section = data.labels.section;
        }

        return labels;
    },

    /**
     * @param {object} data
     * @returns {ObjectStatus}
     */
    createObjectStatus(data) {
        return new ObjectStatus(data.status, data.ticketType, data.holdToken, data.orderId, data.extraData, data.quantity)
    },

    /**
     * @param {object} data
     * @returns {BestAvailableObjects}
     */
    createBestAvailableObjects(data) {
        return new BestAvailableObjects(data.objects, this.createChangeObjectStatusDetails(data.objectDetails), data.nextToEachOther);
    },

    /**
     * @param {object} data
     * @returns {ChangeObjectStatusResult}
     */
    createChangeObjectStatusResult(data) {
        return new ChangeObjectStatusResult(this.createChangeObjectStatusDetails(data.objects));
    },

    createChangeObjectStatusDetails(data) {
        let objectDetails = {};
        for(let key in data) {
            objectDetails[key] = this.createEventReportItem(data[key]);
        }
        return objectDetails;
    },

    /**
     * @param {object} data
     * @returns {Event}
     */
    createEvent(data) {
        let createdOn = data.createdOn ? new Date(data.createdOn) : null;
        let updatedOn = data.updatedOn ? new Date(data.updatedOn) : null;

        return new Event(data.id, data.key, data.bookWholeTables,
            data.supportsBestAvailable, data.forSaleConfig, data.tableBookingModes, data.chartKey,
            createdOn, updatedOn);
    },

    /**
     * @param {objects[]} eventsData
     * @returns {Event[]}
     */
    createMultipleEvents(eventsData) {
        return eventsData.map(eventData => this.createEvent(eventData));
    },

    /**
     * @param {objects[]} statusChangesData
     * @returns {StatusChange[]}
     */
    createMultipleStatusChanges(statusChangesData) {
        return statusChangesData.map(statusChangesData => this.createStatusChange(statusChangesData));
    },

    /**
     * @param {object} data
     * @returns {Chart}
     */
    createChart(data) {
        let events = data.events ? this.createMultipleEvents(data.events) : null;

        let draftVersionThumbnailUrl = data.draftVersionThumbnailUrl || null;
        return new Chart(data.name, data.id, data.key, data.status, data.tags,
            data.publishedVersionThumbnailUrl, draftVersionThumbnailUrl, events, data.archived);
    },

    /**
     * @param {object} data
     * @returns {Account}
     */
    createAccount(data) {
        let chartValidation = data.settings.chartValidation;
        let chartValidationSettings = new ChartValidationSettings(chartValidation.VALIDATE_DUPLICATE_LABELS, chartValidation.VALIDATE_OBJECTS_WITHOUT_CATEGORIES, chartValidation.VALIDATE_UNLABELED_OBJECTS, chartValidation.VALIDATE_FOCAL_POINT, chartValidation.VALIDATE_OBJECT_TYPES_PER_CATEGORY);
        let settings = new AccountSettings(data.settings.draftChartDrawingsEnabled, data.settings.holdOnSelectForGAs, data.settings.holdPeriodInMinutes, chartValidationSettings);
        return new Account(data.secretKey, data.designerKey, data.publicKey, settings, data.email);
    },

    /**
     * @param {object} data
     * @returns {HoldToken}
     */
    createHoldToken(data) {
        return new HoldToken(data.holdToken, new Date(data.expiresAt), data.expiresInSeconds);
    },

    /**
     * @param {object} reportsData
     * @returns {Object.<string, EventReportItem>}
     */
    createEventReport(reportsData) {
        let reportObjects = {};
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => this.createEventReportItem(data));
        }
        return reportObjects;
    },

    /**
     *
     */
    createEventReportItem(data) {
        let labels = this.labelCreator(data);
        return new EventReportItem(data.label, labels, data.status, data.categoryLabel, data.categoryKey, data.ticketType,
            data.entrance, data.objectType, data.section, data.orderId, data.forSale, data.holdToken,
            data.capacity, data.numBooked, data.extraData);
    },

    /**
     * @param {object} reportsData
     * @returns {Object.<string, ChartReportItem>}
     */
    createChartReport(reportsData) {
        let reportObjects = {};
        for (const key of Object.keys(reportsData)) {
            reportObjects[key] = reportsData[key].map(data => {
                    let labels = this.labelCreator(data);
                    return new ChartReportItem(data.label, labels, data.categoryLabel, data.categoryKey, data.entrance,
                        data.objectType, data.section,
                        data.capacity);
                }
            );
        }
        return reportObjects;
    },

    /**
     * @param {object} data
     * @returns {Subaccount}
     */
    createSubaccount(data) {
        return new Subaccount(data.id, data.secretKey, data.designerKey, data.publicKey, data.name, data.email, data.active);
    },

    /**
     * @param {object} data
     * @returns {StatusChange}
     */
    createStatusChange(data) {
        if(data.holdToken){
            return new StatusChange(data.id, data.eventId, data.status, data.quantity, data.objectLabel, new Date(data.date), data.orderId, data.extraData, data.holdToken);
        }

        return new StatusChange(data.id, data.eventId, data.status, data.quantity, data.objectLabel, new Date(data.date), data.orderId, data.extraData);
    }

};
