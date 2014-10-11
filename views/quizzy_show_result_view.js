function ShowResultView(quizTitle, correctAnswers, totalQuestions, missedQuestions) {
	var myTemplate = _.template([
		'<h1>You got <%=correct%> out of <%= total%> for a score of <%=percent%>%!</h1>',
		'<button class="main-view-button" type="button" hidden>Return to Home Page</button>',
		'<div class="save-name">',
			'<label>Submit your name to save your result!</label>',
			'</br>',
			'<input name="save_result" type="text">',
			'<button class="save-result-button" type="button">Save Result</button>',
		'</div>',
		'<% if (missedQuestions.length === 0) { %>',
			'<h2>You did not miss a single question- well done!</h2>',
		'<% } else { %>',
			'<h2>Missed Questions</h2>',
			'<ul>',
				'<% for (var i = 0; i < missedQuestions.length; i++) { %>',
					'<li> <%= missedQuestions[i] %></li>',
				'<% }; %>',
			'</ul>',
		'<% }; %>'
	].join(''));
	var quizResponses = JSON.parse(localStorage.quizresponses)[quizTitle];
	var quiz = JSON.parse(localStorage.quizzes)[quizTitle]['questions'];
	var compiledHTML = myTemplate({
		correct: correctAnswers,
		total: totalQuestions,
		percent: correctAnswers/totalQuestions * 100, 
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
			'<h2>Quiz Results</h2>',
			'<% for (var name in quizresults[quiztitle]){ %>',
				'<h3> <%=name%>: <%=quizresults[quiztitle][name]%>%</h3>',
			'<% } %>',
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
			'</ul>',
		'</div>'
	].join(''));
	$('.save-result-button').on('click', function(){
		if (!localStorage.quizresults) {
			var results = {};
		} else {
			var results = JSON.parse(localStorage['quizresults']);
		};
		if (!results[quizTitle]) {
			results[quizTitle] = {};
		};
		var player = $('input[name="save_result"]').val();
		results[quizTitle][player] = correctAnswers/totalQuestions * 100;
		localStorage.setItem('quizresults', JSON.stringify(results));
		$('.save-name').hide();
		$('.main-view-button').show();
		var otherCompiledHTML = myOtherTemplate({
			results: quizResponses,
			quiz: quiz,
			quizresults: JSON.parse(localStorage['quizresults']),
			quiztitle: quizTitle
		});
		$results = $(otherCompiledHTML);
		$('#quiz-container').append($results);
		$('.main-view-button').on('click', function(){
			$results.remove();
		});
	});
}