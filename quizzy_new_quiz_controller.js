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
		this.score = 0;
		var quizzes = JSON.parse(localStorage.quizzes);
		var questionsData = quizzes[quizTitle]['questions'];
		this.totalQuestions = questionsData.length;
		for (var i = 0; i < this.totalQuestions; i++) {
			var questionModel = new NewQuestion(questionsData[i]);
			var questionView = new ShowQuestionView(questionModel);
			this.questionModels.push(questionModel);
			this.questionViews.push(questionView);
		};
		this.currentQuestionIndex = 0;
		this.showQuestion(this.currentQuestionIndex);
	},
	showResults: function(score) {

	}
}