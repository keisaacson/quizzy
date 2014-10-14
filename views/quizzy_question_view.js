function QuestionView(questionModel) {
	var myTemplate = _.template([
		'<div>',
			'<h2><%= question %></h2>',
			'<% for (var i = 0; i < choices.length; i++) { %>',
				'<input name="<%= id %>" type="radio" value="<%= choices[i] %>">',
				'<label><%= choices[i] %></label>',
				'</br>',
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
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);
	$view.find('.next-question-button').on('click', function(){
		var selectedChoice = $('input[name=' + questionModel.id + ']:checked').val();
		if (!selectedChoice) {
			alert('Please select an answer.');
			return;
		};
		Repo.saveSpiritAnimalResponse(questionModel, selectedChoice);
		ApplicationController.scoreAnswer(selectedChoice);
		ApplicationController.nextQuestion();
	});
	this.show = function() {
		$view.show();
	};
	this.hide = function() {
		$view.hide();
	}
};