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
				'</br>',
				'<button class="select-quiz-button" type="button">Quiz Me!</button>',
				'<button class="make-new-quiz-button" type="button">Make a New Quiz</button>',
			'</div>',
		'</div>'
	].join(''));
	if (localStorage.quizzes) {
		var quizzes = JSON.parse(localStorage.quizzes);
	} else {
		var quizzes = {};
	}
	var compiledHTML = myTemplate({
		quizzes: quizzes
	});
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);
	$view.find('.make-new-quiz-button').on('click', function(){
		$view.find('.main-view').remove();
		NewQuizzesController.createQuiz();
	});
	$view.find('.select-quiz-button').on('click', function(){
		var quizChoice = $view.find('input:checked').val();
		if (quizChoice == 'spirit-animal') {
			$view.find('.main-view').remove();
			ApplicationController.startQuiz();
		} else {
			$view.find('.main-view').remove();
			NewQuizzesController.playQuiz(quizChoice);
		};
	})
}