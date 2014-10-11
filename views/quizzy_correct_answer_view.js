function CorrectAnswerView(quizTitle, questionIndex, answers) {
	var myTemplate = _.template([
		'<div>',
			'<div class="set-correct-answer">',
				'<h2>Please Select Which Answer is Correct:</h2>',
				'<label for="correct-answer"><%= question %></label>',
				'</br>',
				'<select class="select_correct_answer" name="correct-answer">',
					'<option value="" selected></option>',
					'<% for (var i = 0; i < answers.length; i++) { %>',
						'<option value="<%= answers[i] %>"><%= answers[i] %></option>',
					'<% }; %>',
				'</select>',
				'</br>',
				'<button class="set-correct-answer-button" type="button">Save Answer</button>',
				'<button class="new-question-button" type="button" disabled>Add A New Question</button>',
				'<button class="save-quiz-button" type="button" disabled>Save Completed Quiz</button>',
			'</div>',
		'</div>'
	].join(''));
	var quizzes = JSON.parse(localStorage.quizzes);
	var compiledHTML = myTemplate({
		answers: answers,
		question: quizzes[quizTitle]['questions'][questionIndex]['question']
	});
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);
	$view.find('.set-correct-answer-button').on('click', function(){
		var correctAnswer = $view.find('option:selected').val();
		quizzes[quizTitle]['questions'][questionIndex]['answer'] = correctAnswer;
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
		$view.find('.set-correct-answer-button').attr('disabled', true);
		$view.find('.new-question-button').attr('disabled', false);
		$view.find('.save-quiz-button').attr('disabled', false);
	});
	$view.find('.new-question-button').on('click', function(){
		$view.find('.set-correct-answer').remove();
		NewQuizzesController.addQuestion(quizTitle);
	});
	$view.find('.save-quiz-button').on('click', function(){
		$view.find('.set-correct-answer').remove();
		NewQuizzesController.viewQuizzes();
	});
}