function ShowQuestionView(questionModel, quizTitle) {
	var myTemplate = _.template([
		'<div>',
			'<h2><%= question %></h2>',
			'<% for (var i = 0; i < choices.length; i++) { %>',
				'<input name="<%= question %>" type="radio" value="<%= choices[i] %>">',
				'<label><%= choices[i] %></label>',
				'</br>',
			'<% } %>',
			'<button class="next-question-button" type="button">Next Question</button>',
		'</div>'	
	].join(''));
	var compiledHTML = myTemplate({
		question: questionModel.question,
		choices: questionModel.choices,
	});
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);
	$view.find('.next-question-button').on('click', function(e){
		var $me = (e.target);
		var selectedChoice = $('input[name="' + questionModel.question + '"]:checked').val();
		if (!selectedChoice) {
			alert('Please select an answer.');
			return;
		};
		Repo.saveQuizResponse(quizTitle, questionModel, selectedChoice);
		NewQuizzesController.scoreAnswer(selectedChoice);
		NewQuizzesController.nextQuestion(quizTitle);
	});
	this.show = function() {
		$view.show();
	};
	this.hide = function() {
		$view.hide();
	};
}