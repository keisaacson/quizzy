function ResultView(animal, description, image) {
	var myTemplate = _.template([
		'<h1>Your spirit animal is a <%=animal%>. You are both <%=description%>!</h1>',
		'<img src="<%=image%>" alt=<%= animal %> height="300px"/>'
	].join(''));
	var compiledHTML = myTemplate({
		animal: animal,
		description: description,
		image: image
	});
	var $description = $(compiledHTML); 
	var $submit = $('<label>Submit your name to save your result!</label><input name="save_result" type="text"><button class="save_result" type="button">Save Result</button>');
	$('#quiz-container').append($description, $submit);

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
		if (!localStorage.results) {
			var results = {};
		} else {
			var results = JSON.parse(localStorage['results']);
		};
		var player = $('input[name="save_result"]').val();
		results[player] = animal;
		localStorage.setItem('results', JSON.stringify(results))
		$submit.hide();
		var secondCompiledHTML = mySecondTemplate({
			results: JSON.parse(localStorage['results']),
			responses: JSON.parse(localStorage['responses'])
		});
		var $results = $(secondCompiledHTML);
		$('#quiz-container').append($results);
	});
}


