function NewQuizView() {
	var quizTitle = undefined;
	var myTemplate = _.template([
		'<div>',
			'<h2> Make Your Own Quiz </h2>',
			'<input name="quiz-title" type="text">',
			'<label for="quiz-title">Quiz Title</label>',
			'</br>',
			'<button class="new-question-button" type="button">Add A Question</button>',
		'</div>'
	].join(''));
	var compiledHTML = myTemplate({});
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);
	$view.find('.new-question-button').on('click', function(){
		var quizzes = Repo.getRepo('quizzes');
		quizTitle = $('input[name="quiz-title"]').val();
		if (!quizTitle) {
			alert('Please enter a quiz name.');
			return;
		};
		if (!quizzes[quizTitle]) {
			Repo.createNewQuiz(quizTitle);
			$view.remove();
			NewQuizzesController.addQuestion(quizTitle);
		} else {
			alert('There is already a quiz with this name. Please enter a new quiz name.')
		};		
	});
}