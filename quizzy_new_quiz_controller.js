var NewQuizzesController = {
	viewQuizzes: function() {
		var mainView = new MainView();
	},
	createQuiz: function() {
		var newQuizView = new NewQuizView();
	},
	addQuestion: function(quizTitle) {
		var newQuestionView = new NewQuestionView(quizTitle);
	},
	setCorrectAnswer: function(quizTitle, questionIndex, answers) {
		var correctAnswerView = new CorrectAnswerView(quizTitle, questionIndex, answers);
	},
	playQuiz: function(quizTitle) {
		this.questionViews = [];
		this.questionModels = [];
		this.correctAnswers = 0;
		this.missedQuestions = [];
		var quizzes = JSON.parse(localStorage.quizzes);
		var questionsData = quizzes[quizTitle]['questions'];
		this.totalQuestions = questionsData.length;
		for (var i = 0; i < this.totalQuestions; i++) {
			var questionModel = new NewQuestion(questionsData[i]);
			var questionView = new ShowQuestionView(questionModel, quizTitle);
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
	scoreAnswer: function(answer) {
		var currentQuestion = this.questionModels[this.currentQuestionIndex];
		var correctAnswer = currentQuestion.answer;
		if (answer === correctAnswer) {
			this.correctAnswers++;
		} else {
			this.missedQuestions.push(currentQuestion.question);
		};
	},
	nextQuestion: function(quizTitle) {
		this.currentQuestionIndex++;
		if (this.questionViews[this.currentQuestionIndex]) {
			this.showQuestion(this.currentQuestionIndex);
		} else{
			this.showResults(quizTitle);
		};
	},
	showResults: function(quizTitle) {
		this.hideQuestions();
		var resultView = new ShowResultView(quizTitle, this.correctAnswers, this.totalQuestions, this.missedQuestions);
	}
}