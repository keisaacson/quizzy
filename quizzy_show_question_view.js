function ShowQuestionView(questionModel) {
	var myTemplate = _.template([
		'<div>',
			'<h2><%= question %></h2>',
			'<% for (var i = 0; i < choices.length; i++) { %>',
				'<input name="<%= id %>" type="radio" value="<%= choices[i] %>">',
				'<label><%= choices[i] %></label>',
				'</br>',
			'<% } %>',
			'<button class="next-question-button" type="button">Next Question</button>',
		'</div>'	
	].join(''));
	var compiledHTML = myTemplate({
		question: questionModel.question,
		choices: questionModel.choices,
		answer: questionModel.answer
	});
}