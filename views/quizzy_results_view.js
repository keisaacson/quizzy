function ResultView(animal, description, image) {
	var myTemplate = _.template([
		'<h2>Your spirit animal is a <%=animal%>. You are both <%=description%>!</h2>',
		'<img src="<%=image%>" alt=<%= animal %> height="300px"/>',
		'</br>'
	].join(''));
	var compiledHTML = myTemplate({
		animal: animal,
		description: description,
		image: image
	});
	var $description = $(compiledHTML); 
	var $submit = $('<label>Submit your name to save your result!</label></br><input name="save_result" type="text"><button class="save_result" type="button">Save Result</button>');
	var $home = $('<button class="main-view-button" type="button">Return to Home Page</button>');
	$('#quiz-container').append($description, $submit, $home);
	var $results;

	var mySecondTemplate = _.template([
		'<h3>Spirit Animal Results</h3>',
		'<ul>',
		'<% for (var name in results){ %>',
			'<li> <%=name%>: <%=results[name]%></li>',
		'<% } %>',
		'</ul>',
		'<h3>Question by Question Responses</h3>',
		'<% for (var question in responses){ %>',
			'<h4> Question <%=parseInt(question) + 1%>:</h4>',
			'<ul>',
			'<% for (var answer in responses[question]){ %>',
				'<li> <%=answer%>: <%= responses[question][answer] %> </li>',
			'<% } %>',
			'</ul>',
		'<% } %>'
	].join(''));
	$('.save_result').on('click', function() {
		var name = $('input[name="save_result"]').val();
		if (!name) {
			alert('Please enter a name.');
			return;
		};
		Repo.saveSpiritAnimalResult(name, animal);
		$submit.remove();
		var secondCompiledHTML = mySecondTemplate({
			results: Repo.getRepo('results'),
			responses: Repo.getRepo('responses')
		});
		$results = $(secondCompiledHTML);
		$('#quiz-container').append($results);
	});
	$('.main-view-button').on('click', function(){
		$description.remove();
		$submit.remove();
		$home.remove();
		if ($results) $results.remove();
		NewQuizzesController.viewQuizzes();
	})
}


