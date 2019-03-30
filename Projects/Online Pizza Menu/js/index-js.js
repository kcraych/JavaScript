/*----------------------------
Carousel Functionality
-----------------------------*/
    var slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    // Change physical display of page based on prev/next control clicks
    function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("selection-category");
        var dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1} 
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

/*----------------------------
Order Summary Functionality
-----------------------------*/
    var aBaseItemOrder = {"size":0,"crust":1,"sauce":2,"cheese":3};
    var aPizzaOrderItems = {"base":[],"meat":[],"veggies":[]};
    var aPizzaOrderCosts = {"base":[],"meat":[],"veggies":[]};
    var aSubTotals = {"base":0,"meat":0,"veggies":0,"total":0};
    var sumLookup = {'class': ['category-title', 'category-content', 'category-cost'],
                    'value': ['Base', 'Meat', 'Veggies']};
  
    //One iteration creates framework for a section of summary
    function sumCatHTML(iClass, aValues) {
        var el = document.getElementsByClassName('total-cost');
        var recCatsHTML = '';
        for (j = 0; j < aValues.length; j++) {
        var iValue = aValues[j];
        var iClassAdd = iClass;
        if (iClass == 'category-title') {
            iClassAdd = iClass + ' txt-ctr pad-lt';
        } else {
            iClassAdd = iClass + ' pz-' + iValue.toLowerCase();
            iValue = '';
        };
        recCatsHTML = recCatsHTML +
            "<div class='receipt-category bdr-lt'>" +
            "<div class='" + iClassAdd + "'>" + iValue + "</div>" +
            "</div>";
        };
        var recFrameHTML =
        "<div class='receipt-categories'>" + recCatsHTML + "</div>";
        el[0].insertAdjacentHTML('beforebegin', recFrameHTML);
    };
  
    //Iterates sumCatHTML to create framework for all sections of summary
    //(title section, content section, subtotal section)
    //Note this only creates the container, but does not fill in order information
    function createSummaryHTML() {
        var aClasses = sumLookup.class;
        var aValues = sumLookup.value;
        for (i = 0; i < aClasses.length; i++) {
        var iClass = aClasses[i];
        sumCatHTML(iClass, aValues);
        };
    };  
  
    //Identify selections on inputs with a certain name
    function inputItems(inputType, inputName) {
        return $("input:"+inputType+"[name="+inputName+"]:checked").map(function() {
            return $(this).val()
        }).get();
    };

    //Assign costs for inputs of a radio type
    function radioCosts(iKey) {
        var aBaseCosts = {"Personal":6,"Medium":10,"Large":14,"Extra-Large":16,
                          "Cheese Stuffed Crust":3,"Extra Cheese":3};
        return (iKey in aBaseCosts) ? aBaseCosts[iKey] : 0;
    };

    //Assing costs for inputs of a checkbox type
    //(these follow rule $0 for first selected, $1 for each selected after)
    function chkboxCosts(iArray) {
        var oArray = [];
        for (i = 0; i < iArray.length; i++) {
            oArray[i] = (i==0) ? 0 : 1;
        };
        return oArray;
    };

    //Store the pizza order selections and associated costs in dictionaries
    function updatePizzaOrderArrays(inputType, inputName) {
        var iArray = inputItems(inputType, inputName);
        var inputGroup = (inputName in aBaseItemOrder) ? "base" : inputName;
        if (inputType=="radio") {
            var bItemIndex = aBaseItemOrder[inputName];
            aPizzaOrderItems[inputGroup][bItemIndex] = iArray[0];
            aPizzaOrderCosts[inputGroup][bItemIndex] = (iArray.length==1) ? radioCosts(iArray[0]):undefined;
        } if (inputType=="checkbox") {
            aPizzaOrderItems[inputGroup] = iArray;
            aPizzaOrderCosts[inputGroup] = chkboxCosts(iArray,inputName);
        };
        var cArray = aPizzaOrderCosts[inputGroup];
        var cSum = cArray.reduce(function(a,b){  return a+b },0);
        aSubTotals[inputGroup] = cSum;
        aSubTotals["total"] = 0;
        var tSum = Object.keys(aSubTotals).reduce((sum,key)=>sum+parseFloat(aSubTotals[key]||0),0);
        aSubTotals["total"] = tSum;
    };

    //Create HTML tags to display pizza order selections and costs in summary framework
    function createHTMLItems(inputName) {   
        var inputGroup = (inputName in aBaseItemOrder) ? "base" : inputName;
        $('.pz-'+inputGroup).empty();
        itemArray = aPizzaOrderItems[inputGroup].filter(function (el) {return el != undefined;});
        costArray = aPizzaOrderCosts[inputGroup].filter(function (el) {return el != undefined;});
        var targetClass = '.pz-'+inputGroup;
        for (i = 0; i < itemArray.length; i++) {
            var lineDiv = $('<div>', {'class': 'content-item item'+i});
            var lineItem = $('<div>', {'html': itemArray[i]});
            var lineCost = $('<div>', {'html': '$'+costArray[i]});
            $('.category-content'+targetClass).append(lineDiv);
            $(targetClass+' .item'+i).append(lineItem);
            $(targetClass+' .item'+i).append(lineCost);
        };
        var catCost = $('<p>', {'html': '$'+aSubTotals[inputGroup]});
        $('.category-cost'+targetClass).append(catCost);
        $('.total-cost').empty();
        var ttlCost = $('<p>', {'html': 'Total Cost = $'+aSubTotals["total"]});
        $('.total-cost').append(ttlCost);
    };

    //counts how many selections have been made for the order
    //this is used to determine when to show summary framework vs not
    function selectionsMade() {
        var aInputs = Object.values(aPizzaOrderItems);
        var aSum = 0;
        for (i=0; i<aInputs.length; i++) {
        aSum = aSum + aInputs[i].length;
        };
        return aSum;
    };

    //runs everything necessary upon user making a selection on the order
    function createListsTrigger() {
        $( ".selection-group" ).change(function() {
            var check = selectionsMade();
            if (check == 0) {
                createSummaryHTML();  
            };
            var inputType = event.target.type;
            var inputName = event.target.name;
            updatePizzaOrderArrays(inputType, inputName);
            createHTMLItems(inputName);
        });
    };  

    createListsTrigger();

    //Alert when order is placed
    $(".submit-button").click(function(){
        alert("Thank you for your order!");
      });
