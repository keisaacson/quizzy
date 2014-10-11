function Question(questionData) {
	this.question = questionData.question;
	this.choices = questionData.choices;
	this.id = questionData.id;
	this.scores = questionData.scores;
};

function NewQuestion(questionData) {
	this.question = questionData.question;
	this.choices = questionData.choices;
	this.answer = questionData.answer;
};