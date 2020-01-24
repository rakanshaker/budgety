//Budget Controller
var budgetController = (function() {
  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function(totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
      this.percentage = -1;
    }
  };
  Expense.prototype.getPercentage = function() {
    return this.calcPercentage;
  };
  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function(type) {
    var sum = 0;
    data.allItems[type].forEach(function(cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    },
    budget: 0,
    percentage: -1
  };
  return {
    addItems: function(type, des, val) {
      var newItem;
      //id = last id +1
      //create new id
      if (data.allItems[type].length > 0) {
        id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      //create new item based on type
      if (type === "exp") {
        newItem = new Expense(id, des, val);
      } else if (type === "inc") {
        newItem = new Income(id, des, val);
      }
      //push it into our data structure
      data.allItems[type].push(newItem);
      //returnt the new element
      return newItem;
    },

    deleteItem: function(type, id) {
      var ids, index;

      //id = 3
      //data.allItems[type][id];
      //ids = [1, 2, 4, 6, 8]
      var ids = data.allItems[type].map(function(current) {
        return current.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");
      //calculate the budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;
      //calculate the percentage of income spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },
    calculatePercentages: function() {
      /**
       * a= 20
       * b= 10
       * c = 40
       * income = 100
       * a= 20/100 = 20%
       */
      data.allItems.exp.forEach(function(cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function() {
      var allPerc = data.allItems.exp.map(function(cur) {
          return cur.getPercentage();
      });
      return allPerc;
    },

    getBudget: function() {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },
    testing: function() {
      console.log(data);
    }
  };
})();

function generate_divs(element) {
  var div = document.createElement("div");
  div.style;
  element.appendChild(div);
}
//UI Controller
var UIController = (function() {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMstrings.inputType).value, //will be 'inc' or 'exp'
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
      };
    },
    addlistItem: function(obj, type) {
      var html, newHtml, element;

      // switch (type) {
      //   case "exp":
      //     generate_divs(html);
      //     break;
      //   case "inc":
      //     break;
      // }
      //create html string with placeholder txt
      if (type === "exp") {
        element = DOMstrings.expensesContainer;
        html =
          '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      } else if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
      }
      //replace the placeholder with data
      newHtml = html.replace("%id", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      //insert the html into the dom
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function(selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function() {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function(current, index, array) {
        current.value = "";
      });
      fieldsArr[0].focus();
    },

    displayBudget: function(obj) {
      const { budget, totalInc } = obj;
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        obj.totalExp;
      document.querySelector(DOMstrings.percentageLabel).textContent =
        obj.percentage;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },

    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//Global App Controller
var controller = (function(budgetCtrl, UICtrl) {
  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", cntrlAddItem);

    document.addEventListener("keypress", function(event) {
      if (event.keyCode === 13 || event.which === 13) {
        cntrlAddItem();
      }
    });
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);
  };

  var updateBudget = function() {
    //1. calculate the budget
    budgetCtrl.calculateBudget();
    //2. Return the budget
    var budget = budgetController.getBudget();
    //3. display budget on UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function() {
    //1. calculate percentages
    budgetCtrl.calculatePercentages();
    //2. read them from budget controller
    var percentages = budgetCtrl.getPercentages();
    //3. upodate the UI with new percentages
    console.log(percentages);
  };

  var cntrlAddItem = function() {
    var input, newItem;
    //to do: 1. get the field input data
    input = UICtrl.getInput();
    //test to make sure there is data to show
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //console.log(input);
      //2. add item to budget controller
      newItem = budgetCtrl.addItems(input.type, input.description, input.value);
      //3. add the new item to UI
      UICtrl.addlistItem(newItem, input.type);
      //4. clear the fields
      UICtrl.clearFields();
      //5. Calculate and update budget
      updateBudget();
      //6. Update Percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event) {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      //inc-0
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      //1. delete item from data struction
      budgetCtrl.deleteItem(type, ID);

      //2. delete item from UI
      UICtrl.deleteListItem(itemID);

      //3. update and show new budget
      updateBudget();
      //4. Update Percentages
      updatePercentages();
    }
  };

  return {
    init: function() {
      setupEventListeners();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
      });
    }
  };
})(budgetController, UIController);

controller.init();
