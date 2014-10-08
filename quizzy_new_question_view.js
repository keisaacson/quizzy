function NewQuestionView(quizTitle) {
	var possibleAnswerCounter = 2;
	var myTemplate = _.template([
		'<div>',
			'<div class="add-question">',
			'<h2> Add to Your <%= quizTitle %> Quiz </h2>',
				'<label for="quiz-question">Question</label>',
				'<input class="question" name="quiz-question" type="text">',
			'</br>',
				'<label for="possible-answer">Possible Answer</label>',
				'<input class="0" name="possible-answer" type="text">',
			'</br>',
				'<label for="possible-answer">Possible Answer</label>',
				'<input class="1" name="possible-answer" type="text">',
			'</br>',
				'<button class="new-answer-button" type="button">Add Another Answer Choice</button>',
				'<button class="save-answers-button" type="button">Save Question</button>',
			'</div>',
		'</div>'
	].join(''));
	var compiledHTML = myTemplate({
		quizTitle: quizTitle
	});
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);

	$view.find('.new-answer-button').on('click', function(){
		var $answerInput = $('<input name="possible-answer" type="text">');
		var $answerLabel = $('<label for="possible-answer">Possible Answer</label>');
		$answerInput.addClass(possibleAnswerCounter + '');
		$view.find('.new-answer-button').before($answerLabel, $answerInput, '</br>');
		possibleAnswerCounter++;
	});
	$view.find('.save-answers-button').on('click', function(){
		var quizzes = JSON.parse(localStorage.quizzes);
		if (!quizzes[quizTitle]['questions']) {
			quizzes[quizTitle]['questions'] = [];
		};
		var question = {};
		question['question'] = $view.find('.question').val();
		question['choices'] = [];
		var answers = [];
		for (var i = 0; i < possibleAnswerCounter; i++) {
			var answerChoice = $view.find('.' + i + '').val();
			if (answerChoice !== '') {
				question['choices'].push(answerChoice);
				answers.push(answerChoice);
			};
		};
		quizzes[quizTitle]['questions'].push(question);
		var questionIndex = quizzes[quizTitle]['questions'].indexOf(question)
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
		$view.find('.add-question').remove();
		NewQuizzesController.setCorrectAnswer(quizTitle, questionIndex, answers);
	});
}
