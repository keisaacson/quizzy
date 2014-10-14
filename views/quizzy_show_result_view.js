function ShowResultView(quizTitle, correctAnswers, totalQuestions, missedQuestions) {
	var myTemplate = _.template([
		'<h2>You got <%=correct%> out of <%= total%> for a score of <%=percent%>%!</h2>',
		'<button class="main-view-button" type="button" hidden>Return to Home Page</button>',
		'<div class="save-name">',
			'<label>Submit your name to save your result!</label>',
			'</br>',
			'<input name="save_result" type="text">',
			'<button class="save-result-button" type="button">Save Result</button>',
		'</div>',
		'<% if (missedQuestions.length === 0) { %>',
			'<h3>You did not miss a single question- well done!</h3>',
		'<% } else { %>',
			'<h3>Missed Questions</h3>',
			'<ul>',
				'<% for (var i = 0; i < missedQuestions.length; i++) { %>',
					'<li> <%= missedQuestions[i] %></li>',
				'<% }; %>',
			'</ul>',
		'<% }; %>'
	].join(''));
	var quizResponses = Repo.getRepo('quizresponses')[quizTitle];
	var quiz = Repo.getQuiz(quizTitle)['questions'];
	var score = correctAnswers/totalQuestions * 100;
	var compiledHTML = myTemplate({
		correct: correctAnswers,
		total: totalQuestions,
		percent: score, 
		missedQuestions: missedQuestions
	});
	$view = $(compiledHTML);
	$('#quiz-container').append($view);
	$('.main-view-button').on('click', function(){
		$view.remove();
		NewQuizzesController.viewQuizzes();
	});

	var myOtherTemplate = _.template([
		'<div class="response-summary">',
			'<h3>Quiz Results</h3>',
			'<ul>',
			'<% for (var name in quizresults[quiztitle]){ %>',
				'<li> <%=name%>: <%=quizresults[quiztitle][name]%>%</li>',
			'<% } %>',
			'</ul>',
			'<h3>Response Summary</h3>',
			'<ul>',
				'<% for (var q in results) { %>',
					'<% if (q) {%>',
						'<li> <h4><%= q %></h4></li>',
						'<ul>',
							'<% for (var response in results[q]) { %>',
								'<% if (response !== "total") { %>',
									'<li><%= response %>: <%= Math.round(results[q][response] / results[q]["total"] * 100) %>%</li>',
								'<% }; %>',
							'<% }; %>',
							'<% var obj = quiz.filter(function(o){return (o && o.question === q)}); %>',
							'<li><strong>Correct Answer: <%= obj[0]["answer"] %></strong></li>',
						'</ul>',
					'<% } %>',
				'<% }; %>',
			'</ul>',
		'</div>'
	].join(''));
	$('.save-result-button').on('click', function(){
		var name = $('input[name="save_result"]').val();
		if (!name) {
			alert('Please enter a name.');
			return;
		};
		Repo.saveQuizResult(quizTitle, name, score)
		$('.save-name').hide();
		$('.main-view-button').show();
		var otherCompiledHTML = myOtherTemplate({
			results: quizResponses,
			quiz: quiz,
			quizresults: Repo.getRepo('quizresults'),
			quiztitle: quizTitle
		});
		$results = $(otherCompiledHTML);
		$('#quiz-container').append($results);
		$('.main-view-button').on('click', function(){
			$results.remove();
		});
	});
}