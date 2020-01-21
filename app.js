//Budget Controller
var budgetController = (function() {})();

//UI Controller
var UIController = (function() {
  return {
    getInput: function() {
      var type = document.querySelector(".add__type").value; //will be 'inc' or 'exp'
      var description = document.querySelector(".add__description").value;
      var value = document.querySelector(".add__value").value;
    }
  };
})();

//Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
  var cntrlAddItem = function() {
    //to do: 1. get the field input data
    //2. add item to budget controller
    //3. add the new item to UI
    //4. calculate the budget
    //5. display budget on UI
  };
  document.querySelector(".add__btn").addEventListener("click", cntrlAddItem);

  document.addEventListener("keypress", function(event) {
    if (event.keyCode === 13 || event.which === 13) {
      cntrlAddItem();
    }
  });
})(budgetController, UIController);
