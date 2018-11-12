class ObjectStatus {
    constructor(status = null, ticketType = null, holdToken = null, orderId = null, extraData = null, quantity = null) {
        if (arguments.length === 0) {
            this.FREE = 'free';
            this.BOOKED = 'booked';
            this.HELD = 'reservedByToken';
        }

        /* string */
        typeof status !== 'undefined' && status !== null ? this.status = status : {};
        /* string */
        typeof ticketType !== 'undefined' && ticketType !== null ? this.ticketType = ticketType : {};
        /* string */
        typeof holdToken !== 'undefined' && holdToken !== null ? this.holdToken = holdToken : {};
        /* string */
        typeof orderId !== 'undefined' && orderId !== null ? this.orderId = orderId : {};
        /* obj */
        typeof extraData !== 'undefined' && extraData !== null ? this.extraData = extraData : {};
        /* int */
        typeof quantity !== 'undefined' && quantity !== null ? this.quantity = quantity : {};
    }
}

module.exports = ObjectStatus;
