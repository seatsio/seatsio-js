const Page = require('../Page.js');
const Subaccount = require('./Subaccount.js');

class IterableAsyncSubaccounts{
    constructor(url, client, params = {}) {
        this.items = []; /*  array of Status Changes */
        this.pages = []; /*  array of Pages of Status Changes */
        this.index = 0;
        this.nextPageMustBeFetched = true;
        this.client = client;
        this.url = url;
        this.params = params;
    }

    subaccountCreator(data) {
        let subaccounts = [];
        data.items.forEach((subaccountData) => {
            let subaccount = new Subaccount(subaccountData.id, subaccountData.secretKey, subaccountData.designerKey,
                subaccountData.publicKey, subaccountData.name, subaccountData.email, subaccountData.active);
            this.items.push(subaccount);
            subaccounts.push(subaccount);
        });
        this.pages.push(new Page(subaccounts, data.next_page_starts_after, data.previous_page_ends_before));
    }

    fetch(fetchParams = {}) {
        return this.client.get(this.url, {params: fetchParams})
            .then((res) => {
                if (res.data.next_page_starts_after) {
                    this.nextPageStartsAfter = res.data.next_page_starts_after;
                    this.nextPageMustBeFetched = true;
                } else {
                    this.nextPageMustBeFetched = false;
                }

                this.subaccountCreator(res.data);
            });
    }

    [Symbol.asyncIterator]() {
        let _this = this;

        return {
            async next() {
                if (_this.nextPageMustBeFetched && _this.items.length === 0) {
                    await _this.fetch(_this.params);
                } else if (_this.nextPageMustBeFetched && _this.nextPageStartsAfter) {
                    _this.params.start_after_id = _this.nextPageStartsAfter;
                    await _this.fetch(_this.params);
                }
                if (!_this.items[_this.index]) {
                    return {undefined, done: true};
                }
                else {
                    return {value: _this.items[_this.index++], done: false};
                }
            }
        };
    }
}

module.exports = IterableAsyncSubaccounts;
