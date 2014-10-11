function ResultView(animal, description, image) {
	var myTemplate = _.template([
		'<h1>Your spirit animal is a <%=animal%>. You are both <%=description%>!</h1>',
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
		'<h2>Spirit Animal Results</h2>',
		'<% for (var name in results){ %>',
			'<h3> <%=name%>: <%=results[name]%></h3>',
		'<% } %>',
		'<h2>Question by Question Responses</h2>',
		'<% for (var question in responses){ %>',
			'<h3> Question <%=parseInt(question) + 1%>:</h3>',
			'<% for (var answer in responses[question]){ %>',
				'<h5> <%=answer%>: <%= responses[question][answer] %> </h5>',
			'<% } %>',
		'<% } %>'
	].join(''));
	$('.save_result').on('click', function() {
		var name = $('input[name="save_result"]').val();
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


