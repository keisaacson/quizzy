function ShowResultView(quizTitle, correctAnswers, totalQuestions, missedQuestions) {
	var myTemplate = _.template([
		'<h1>You got <%=correct%> out of <%= total%> for a score of <%=percent%>%!</h1>',
		'<button class="main-view-button" type="button">Return to Home Page</button>',
		'<% if (missedQuestions.length === 0) { %>',
			'<h2>You did not miss a single question- well done!</h2>',
		'<% } else { %>',
			'<h2>Missed Questions</h2>',
			'<ul>',
				'<% for (var i = 0; i < missedQuestions.length; i++) { %>',
					'<li> <%= missedQuestions[i] %></li>',
				'<% }; %>',
			'</ul>',
		'<% }; %>',
		'<h2>Response Summary</h2>',
			'<ul>',
				'<% var i = 0; %>',
				'<% for (var question in results) { %>',
					'<li> <h3><%= question %></h3></li>',
					'<ul>',
						'<% for (var response in results[question]) { %>',
							'<% if (response !== "total") { %>',
								'<li><%= response %>: <%= Math.round(results[question][response] / results[question]["total"] * 100) %>%</li>',
							'<% }; %>',
						'<% }; %>',
						'<li><strong>Correct Answer: <%= quiz[i]["answer"] %></strong></li>',
					'</ul>',
					'<% i++; %>',
				'<% }; %>',
			'</ul>'
	].join(''));
	var quizResponses = JSON.parse(localStorage.quizresponses)[quizTitle];
	var quiz = JSON.parse(localStorage.quizzes)[quizTitle]['questions'];
	var compiledHTML = myTemplate({
		correct: correctAnswers,
		total: totalQuestions,
		percent: correctAnswers/totalQuestions * 100, 
		missedQuestions: missedQuestions,
		results: quizResponses,
		quiz: quiz
	});
	$view = $(compiledHTML);
	$('#quiz-container').append($view);
	$('.main-view-button').on('click', function(){
		$view.remove();
		NewQuizzesController.viewQuizzes();
	})
}