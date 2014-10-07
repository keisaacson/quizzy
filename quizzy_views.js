function QuestionView(questionModel) {
	var myTemplate = _.template([
		'<div>',
			'<h2><%= question %></h2>',
			'<% for (var i = 0; i < choices.length; i++) { %>',
				'<input name="<%= id %>" type="radio" value="<%= choices[i] %>">',
				'<label><%= choices[i] %></label>',
			'<% } %>',
			'<button class="next-question-button" type="button">Next Question</button>',
		'</div>'	
	].join(''));
	var compiledHTML = myTemplate({
		question: questionModel.question,
		choices: questionModel.choices,
		id: questionModel.id,
		scores: questionModel.scores
	});
	var me = this;
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);
	$view.find('.next-question-button').on('click', function(){
		var selectedChoice = $('input[name=' + questionModel.id + ']:checked').val();
		ApplicationController.scoreAnswer(selectedChoice);
		ApplicationController.nextQuestion();
	})
	this.show = function() {
		$view.show();
	};
	this.hide = function() {
		$view.hide();
	};
};

function ResultView(animal, description, image) {
	var myTemplate = _.template([
		'<h1>Your spirit animal is a <%=animal%>. You are both <%=description%>!</h1>',
		'<img src="<%=image%>" alt=<%= animal %> height="300px"/>'
	].join(''));
	var compiledHTML = myTemplate({
		animal: animal,
		description: description,
		image: image
	});
	var $description = $(compiledHTML); 
	var $submit = $('<label>Submit your name to save your result!</label><input name="save_result" type="text"><button class="save_result" type="button">Save Result</button>');
	$('#quiz-container').append($description, $submit);

	var mySecondTemplate = _.template([
		'<h2>Spirit Animal Results</h2>',
		'<% for (var name in results){ %>',
			'<h3> <%=name%>: <%=results[name]%></h3>',
		'<% } %>'
	].join(''));
	$('.save_result').on('click', function() {
		var player = $('input[name="save_result"]').val();
		if (!localStorage.results) {
			var names = {};
		} else {
			var names = JSON.parse(localStorage['results']);
		};
		names[player] = animal;
		localStorage.setItem('results', JSON.stringify(names))

		$submit.hide();
		var secondCompiledHTML = mySecondTemplate({
			results: JSON.parse(localStorage['results'])
		});
		var $results = $(secondCompiledHTML);
		$('#quiz-container').append($results);
	});
}


