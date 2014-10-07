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
		if (!localStorage.responses) {
			var responses = {};
		} else {
			var responses = JSON.parse(localStorage['responses']);
		};
		if (!responses[questionModel.id]) {
			responses[questionModel.id] = {};
		};
		var selectedChoice = $('input[name=' + questionModel.id + ']:checked').val();
		if (!responses[questionModel.id][selectedChoice]) {
			responses[questionModel.id][selectedChoice] = 1;
		} else{
			responses[questionModel.id][selectedChoice]++;
		};
		localStorage.setItem('responses', JSON.stringify(responses))
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