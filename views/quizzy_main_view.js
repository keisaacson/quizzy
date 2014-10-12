function MainView() {
	var myTemplate = _.template([
		'<div>',
			'<div class="main-view">',
				'<h1>Welcome to Quizzy!</h1>',
				'<h2>Select a quiz to play, or create a new quiz:</h2>',
				'</br>',
				'<input name="quiz-choice" type="radio" value="spirit-animal">',
				'<label>Spirit Animal Quiz</label>',
				'</br>',
				'<% for (var quizTitle in quizzes) { %>',
					'<input name="quiz-choice" type="radio" value="<%= quizTitle %>">',
					'<label><%= quizTitle %></label>',
					'</br>',
				'<% } %>',
				'<button class="select-quiz-button" type="button">Quiz Me!</button>',
				'<button class="edit-quiz-button" type="button">Edit Quiz</button>',
				'<button class="delete-quiz-button" type="button">Delete Quiz</button>',
				'<button class="make-new-quiz-button" type="button">Make a New Quiz</button>',
			'</div>',
		'</div>'
	].join(''));
	var quizzes = Repo.getRepo('quizzes');
	var compiledHTML = myTemplate({
		quizzes: quizzes
	});
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);
	$view.find('.select-quiz-button').on('click', function(){
		var quizChoice = $view.find('input:checked').val();
		if (quizChoice == 'spirit-animal') {
			$view.find('.main-view').remove();
			ApplicationController.startQuiz();
		} else {
			$view.find('.main-view').remove();
			NewQuizzesController.playQuiz(quizChoice);
		};
	});
	$view.find('.edit-quiz-button').on('click', function(){
		var quizChoice = $view.find('input:checked').val();
		if (quizChoice == 'spirit-animal') {
			alert('This quiz cannot be edited.');
		} else {
			$view.find('.main-view').remove();
			NewQuizzesController.editQuiz(quizChoice);
		};
	});
	$view.find('.delete-quiz-button').on('click', function(){
		var quizChoice = $view.find('input:checked').val();
		if (quizChoice == 'spirit-animal') {
			alert('This quiz cannot be deleted.');
		} else if (confirm('Are you sure you want to delete the "' + quizChoice + '" quiz?')) {
			Repo.deleteQuiz(quizChoice);
			$view.find('.main-view').remove();
			NewQuizzesController.viewQuizzes();
		};
	});
	$view.find('.make-new-quiz-button').on('click', function(){
		$view.find('.main-view').remove();
		NewQuizzesController.createQuiz();
	});
}