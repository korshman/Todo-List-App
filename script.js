//create todo items and functions
var todoList = {
	todos: [],
	addTodo: function (todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},

	changeTodo: function (position, todoText) {
		this.todos[position].todoText = todoText;
	},

	deleteTodo: function (position) {
		this.todos.splice(position, 1);
	},

	toggleCompleted: function (position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},

	toggleAll: function () {
		var totalTodos = this.todos.length;
		var completedTodos = 0;

		//get number of completed todos
		this.todos.forEach(function (todo) {
			if (todo.completed === true) {
				completedTodos++;
			}
		});


		this.todos.forEach(function (todo) {
			//if everything is true, make everything false
			if (completedTodos === totalTodos) {
				todo.completed = false;
				//case 2: otherwise make everything true
			} else {
				todo.completed = true;
			}
		})
	}
};

//button handlers
var handlers = {

	

	addTodo: function () {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
	 view.displayTodos();		
	},

	changeTodo: function () {
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
		view.displayTodos();
	},

	deleteTodo: function (position) {
		//var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput'); when we were getting vaue from the console.
		todoList.deleteTodo(position);
		view.displayTodos();
	},

	toggleCompleted: function () {
		var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput.value = '';
		view.displayTodos();
	},

	toggleAll: function () {
		todoList.toggleAll();
		view.displayTodos();
	}
};

//views handlers
var view = {
	displayTodos: function () {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';

		todoList.todos.forEach(function (todo, position) {
			var todoLi = document.createElement('li');
			var todoTextWithCompletion = '';

			if (todo.completed === true) {
				todoTextWithCompletion = '( X )' + todo.todoText;
			} else {
				todoTextWithCompletion = '( )' + todo.todoText;
			}

			todoLi.id = position; //access to the elements id

			todoLi.textContent = todoTextWithCompletion; //taking the todo li element and accessing the li element text property and setting it to the todoText propert of each of our todo object
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);
		}, this);
	},

	createDeleteButton: function () {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},

	setUpEventListeners: function () {
		var todosUl = document.querySelector('ul');
		todosUl.addEventListener('click', function (event) { //get the enclosing ul element 
			var elementClicked = event.target;//get the element that was clicked on
			if (elementClicked.className === 'deleteButton') {//checks if the button clicked is delete button
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); //convert the input from a string to an integer (number)
			}
		});

		var input = document.getElementById('addTodoTextInput');
		input.addEventListener('keyup', function(event){
			if(event.keyCode === 13){
				event.preventDefault();
				document.getElementById('addBtn').click();
			}
		});
	}
};

view.setUpEventListeners();

