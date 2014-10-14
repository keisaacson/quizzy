function NewQuestionView(quizTitle) {
	var possibleAnswerCounter = 2;
	var myTemplate = _.template([
		'<div>',
			'<div class="add-question">',
				'<h2> Add to Your "<%= quizTitle %>" Quiz </h2>',
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

	var myOtherTemplate = _.template([
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
				'<button class="new-question-button" type="button" hidden>Add A New Question</button>',
				'<button class="save-quiz-button" type="button" hidden>Save Completed Quiz</button>',
			'</div>',
		'</div>'
	].join(''));

	$view.find('.new-answer-button').on('click', function(){
		var $answerInput = $('<input name="possible-answer" type="text">');
		var $answerLabel = $('<label for="possible-answer">Possible Answer</label>');
		$answerInput.addClass(possibleAnswerCounter + '');
		$view.find('.new-answer-button').before($answerLabel, $answerInput, '</br>');
		possibleAnswerCounter++;
	});
	$view.find('.save-answers-button').on('click', function(){
		var quizzes = Repo.getRepo('quizzes');
		var question = $view.find('.question').val();
		var answers = [];
		for (var i = 0; i < possibleAnswerCounter; i++) {
			var answerChoice = $view.find('.' + i + '').val();
			if (answerChoice !== '') {
				answers.push(answerChoice);
			};
		};
		$view.find('.add-question').remove();
		var otherCompiledHTML = myOtherTemplate({
			answers: answers,
			question: question
		});
		var $setAnswer = $(otherCompiledHTML);
		$('#quiz-container').append($setAnswer);
		$setAnswer.find('.set-correct-answer-button').on('click', function(){
			var correctAnswer = $setAnswer.find('option:selected').val();
			Repo.createNewQuestion(quizTitle, question, answers, correctAnswer);
			$setAnswer.find('.set-correct-answer-button').hide();
			$setAnswer.find('.new-question-button').show();
			$setAnswer.find('.save-quiz-button').show();
		});
		$setAnswer.find('.new-question-button').on('click', function(){
			$setAnswer.find('.set-correct-answer').remove();
			NewQuizzesController.addQuestion(quizTitle);
		});
		$setAnswer.find('.save-quiz-button').on('click', function(){
			$setAnswer.find('.set-correct-answer').remove();
			NewQuizzesController.viewQuizzes();
	});
	});
}
