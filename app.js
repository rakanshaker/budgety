//Budget Controller
var budgetController = (function() {})();

//UI Controller
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be 'inc' or 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
  var DOM = UIController.getDOMstrings();
  var cntrlAddItem = function() {
    //to do: 1. get the field input data
    var input = UIController.getInput();
    console.log(input);
    //2. add item to budget controller
    //3. add the new item to UI
    //4. calculate the budget
    //5. display budget on UI
  };
  document
    .querySelector(DOM.inputButton)
    .addEventListener("click", cntrlAddItem);

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      cntrlAddItem();
    }
  });
})(budgetController, UIController);
