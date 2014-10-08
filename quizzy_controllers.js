var ApplicationController = {
	startQuiz: function() {
		this.questionViews = [];
		this.questionModels = [];
		this.score = 0;
		var questionsData = quizData.questions;
		for (var i = 0; i < questionsData.length; i++) {
			var questionModel = new Question(questionsData[i]);
			var questionView = new QuestionView(questionModel);
			this.questionModels.push(questionModel);
			this.questionViews.push(questionView);
		};
		this.currentQuestionIndex = 0;
		this.showQuestion(this.currentQuestionIndex);
	},
	showQuestion: function(index) {
		this.hideQuestions();
		this.questionViews[index].show();
	},
	hideQuestions: function() {
		for (var i = 0; i < this.questionViews.length; i++) {
			this.questionViews[i].hide();
		};
	},
	removeQuestions: function() {
		for (var i = 0; i < this.questionViews.length; i++) {
			this.questionViews[i].remove();
		};
	},
	scoreAnswer: function(userAnswer) {
		var currentQuestion = this.questionModels[this.currentQuestionIndex];
		var scoreIndex = currentQuestion.choices.indexOf(userAnswer);
		this.score += currentQuestion.scores[scoreIndex];
	},
	nextQuestion: function(index) {
		this.currentQuestionIndex++;
		if (this.questionViews[this.currentQuestionIndex]) {
			this.showQuestion(this.currentQuestionIndex);
		} else{
			this.showResults(this.score);
		};
	},
	showResults: function(score) {
		this.hideQuestions();
		var resultsData = quizData.results;
		for (var i = 0; i < resultsData.length; i++) {
			if (score >= resultsData[i].points_range[0] && score <= resultsData[i].points_range[1]) {
				var animal = resultsData[i].animal;
				var description = resultsData[i].description;
				var image = resultsData[i].image;
			};
		};
		var resultView = new ResultView(animal, description, image);
	},
}