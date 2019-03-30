//Function to switch page content to item reservation view once potluck is selected/created
function showPotluck() {
    $("#potluckSignupItems").empty();
    $("#createPotluckDiv").hide();
    $("#potluckSignupDiv").show();
}

// Classes
function potluck(name, items) {
    var self = this
    self.name = ko.observable(name);
}

function itemReservation(name, initialType, item, qty) {
    var self = this
    self.name = name;
    self.type = ko.observable(initialType);
    self.item = item;
    self.qty = ko.observable(qty);
}

// Overall viewmodel for this screen, along with initial state
function PotluckViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableItemTypes = [
        { itemType: "Appetizer", qtyNeeded: 5 },
        { itemType: "Entree", qtyNeeded: 2 },
        { itemType: "Dessert", qtyNeeded: 3 },
        { itemType: "Drink", qtyNeeded: 4}
    ];

    //Editable data
    self.potluckName = ko.observable();
    self.potluckItems = ko.observableArray([]);
    self.potlucks = ko.observable();

    // Operations
    self.addPotluck = function () {
        //self.potlucks.push(new potluck("TEST"));
        showPotluck();
    }
    self.addItem = function () {
        self.potluckItems.push(new itemReservation("", self.availableItemTypes[0], "", 1));
    }
    self.removeItem = function (item) { self.potluckItems.remove(item) }
    /*self.typeQtyNeeded = ko.computed(function () {
        var needed = self.availableItemTypes.find(x => x.itemType === "Drink").qtyNeeded;
        for (var itemReservation in self.items()) {
            if (itemReservation.type == "Drink") { needed -= self.items.qty; };
        };
        return needed;
    });*/
}

$(document).ready(function () {
    console.info("ready");
    ko.applyBindings(new PotluckViewModel());
});
