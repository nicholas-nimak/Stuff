function Sale() {
    this.constructor = Sale
}
Sale.prototype = (function() {

    let price = 100
    return {

        getPrice: () => price,
        decorate: function(decorator) {
            let F = function() {}, overrides = this.constructor.decorators[decorator], i, newobj;
            F.prototype = this;
            newobj = new F();
            newobj.uber = F.prototype;
            for ( i in overrides ) {
                if ( overrides.hasOwnProperty(i) ) { newobj[i] = overrides[i] }
            }
            console.log(newobj)
            return newobj
        }

    }

})()

Sale.decorators = {}
Sale.decorators.fedtax = {
    getPrice: function() {
        return this.uber.getPrice() + this.uber.getPrice() * 5 / 100;
    }
}
Sale.decorators.localtax = {
    getPrice: function() {
        return this.uber.getPrice() + this.uber.getPrice() * 10 / 100;
    }
}

let sale = new Sale()
sale = sale.decorate('fedtax')
console.log(sale.getPrice())
sale = sale.decorate('localtax')
console.log(sale.getPrice())
