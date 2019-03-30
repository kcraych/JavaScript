var selHeaders = ['What size pizza do you want?',
  'What style of crust would you like?',
  'What kind of sauce would you like?',
  'How big of a cheese fan are you?',
  'Do you want any meat on your pizza?<br><i>(first meat free, +$1 for each after)</i>',
  'Do you want any veggies on your pizza?<br><i>(first veggie free, +$1 for each after)</i>'
];
var inputInfo = [{
    'name': 'size',
    'type': 'radio',
    'value': ['Personal', 'Medium', 'Large', 'Extra Large']
  },
  {
    'name': 'crust',
    'type': 'radio',
    'value': ['Plain Crust', 'Garlic Crust', 'Cheese Stuffed Crust', 'Spicy Crust', 'House Special Crust']
  },
  {
    'name': 'sauce',
    'type': 'radio',
    'value': ['Marinera Sauce', 'White Sauce', 'BBQ Sauce', 'No Sauce']
  },
  {
    'name': 'cheese',
    'type': 'radio',
    'value': ['Regular Cheese', 'Extra Cheese', 'No Cheese']
  },
  {
    'name': 'meat',
    'type': 'checkbox',
    'value': ['Pepperoni', 'Sausage', 'Canadian Bacon', 'Beef', 'Anchovy', 'Chicken']
  },
  {
    'name': 'veggies',
    'type': 'checkbox',
    'value': ['Tomatos', 'Onions', 'Olives', 'Green Peppers', 'Mushrooms', 'Pineapple', 'Spinach', 'Jalapeno']
  }
];

//Create menu selection options for a given group (size = Personal, Medium, etc)
function createSelectionOptionsHTML(iArray) {
  var iName = iArray.name;
  var iType = iArray.type;
  var aValues = iArray.value;
  var iOptions = '';
  for (j = 0; j < aValues.length; j++) {
    var iValue = aValues[j];
    var iId = iValue.replace(/\s+/g, '-').toLowerCase();
    var selOptHTML = "<div class='selection-item'>" +
      "<input type='" + iType + "' name='" + iName + "' id='" +
      iId + "' value='" + iValue + "'>" +
      "<label for='" + iId + "'>" + iValue + "</label>" +
      "</div>";
    iOptions = iOptions + selOptHTML;
  };
  return iOptions;
};

//Create menu selection groups (size, crust, sauce, etc)
function createSelectionGroupsHTML(i) {
  var el = document.getElementsByClassName('container-selections');
  var options = createSelectionOptionsHTML(inputInfo[i]);
  var selGroupHTML =
    "<div class='selection-category bdr-lt bdr-rad-lt'>" +
    "<div class='bg-red txt-white txt-md txt-ctr pad-rg'>" +
    selHeaders[i] + "</div>" +
    "<form class='selection-group bg-white'>" + options + "</form>" +
    "</div>";
  el[0].insertAdjacentHTML('afterbegin', selGroupHTML);
};

//Create dots for carousel effect
function createCarouselDots(i) {
    var index = i + 1;
	var el = document.getElementsByClassName('dot-group');
    var newTag = '<span class="dot" onclick="currentSlide('+index+')"></span>';
    el[0].insertAdjacentHTML('afterbegin', newTag);
};

//Run upon page load to create page content
for (i=selHeaders.length-1; i>=0; i--) {
    createSelectionGroupsHTML(i);
    createCarouselDots(i);
};

