function editQuizView(quizTitle) {
	var myTemplate = _.template([
		'<div>',
			'<div class="edit-quiz">',
				'<h2>Edit the "<%= quizTitle%>"" quiz:</h2>',
				'<ul>',
					'<% for (var index in quizQuestions) { %>',
						'<% if (quizQuestions[index]) {%>',
							'<li> <h3><%= quizQuestions[index]["question"] %></h3></li>',
							'<ul>',
								'<% for (var i = 0; i < quizQuestions[index]["choices"].length; i++) { %>',
									'<li> <%= quizQuestions[index]["choices"][i] %> </li>',
								'<% } %>',
							'</ul>',
							'<button class="delete-question-button <%=index%>" value="<%=index%>" type="button">Delete Question</button>',
							'</br>',
						'<% } %>',
					'<% } %>',
				'</ul>',
				'</br>',
				'<button class="main-view-button" type="button">Return to Home Page</button>',
				'<button class="add-question-button" type="button">Add New Question to Quiz</button>',
			'</div>',
		'</div>'
	].join(''));
	var quizQuestions = Repo.getQuiz(quizTitle)['questions'];
	var compiledHTML = myTemplate({
		quizTitle: quizTitle,
		quizQuestions: quizQuestions
	});
	var $view = $(compiledHTML);
	$('#quiz-container').append($view);
	$view.find('.delete-question-button').on('click', function(e){
		if (confirm('Are you sure you want to delete this question? All saved statistics for this question will also be deleted.')) {
			var $me = $(e.target);
			var questionIndex = $me.val();
			var question = Repo.getQuestion(quizTitle, questionIndex);
			Repo.deleteQuestion(quizTitle, questionIndex, question);
			$view.find('.edit-quiz').remove();
			NewQuizzesController.editQuiz(quizTitle);
		};
	});
	$view.find('.add-question-button').on('click', function(){
		$view.find('.edit-quiz').remove();
		NewQuizzesController.addQuestion(quizTitle);
	});
	$('.main-view-button').on('click', function(){
		$view.remove();
		NewQuizzesController.viewQuizzes();
	});
}