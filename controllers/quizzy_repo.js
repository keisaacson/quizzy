var Repo = {
	createNewRepo: function(repoName) {
		var newRepo = {};
		localStorage.setItem(repoName, JSON.stringify(newRepo));
	},
	createNewQuiz: function(quizTitle) {
		var quizzes = JSON.parse(localStorage.quizzes);
		quizzes[quizTitle] = {};
		quizzes[quizTitle]['questions'] = [];
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
	},
	createNewQuestion: function(quizTitle, question, answers) {
		var quizzes = JSON.parse(localStorage.quizzes);
		var newQuestion = {};
		newQuestion['question'] = question;
		newQuestion['choices'] = answers;
		quizzes[quizTitle]['questions'].push(newQuestion);
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
		var questionIndex = quizzes[quizTitle]['questions'].indexOf(newQuestion);
		return questionIndex;
	},
	getRepo: function(repoName) {
		if (!localStorage[repoName]) {
			this.createNewRepo(repoName);
		};
		var repo = JSON.parse(localStorage[repoName]);
		return repo;
	},
	getQuiz: function(quizTitle) {
		var quizzes = JSON.parse(localStorage.quizzes);
		if (!quizzes[quizTitle]) {
			quizzes[quizTitle] = {};
		};
		return quizzes[quizTitle];
	},
	getQuestion: function(quizTitle, questionIndex) {
		var quiz = this.getQuiz(quizTitle);
		var question = quiz['questions'][questionIndex]['question'];
		return question;
	},
	deleteQuiz: function(quizTitle) {
		var quizzes = JSON.parse(localStorage.quizzes);
		var quizResponses = JSON.parse(localStorage.quizresponses);
		var quizResults = JSON.parse(localStorage.quizresults);
		delete quizzes[quizTitle];
		delete quizResponses[quizTitle];
		delete quizResults[quizTitle];
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
		localStorage.setItem('quizresponses', JSON.stringify(quizResponses));
		localStorage.setItem('quizresults', JSON.stringify(quizResults));
	},
	setCorrectAnswer: function(quizTitle, questionIndex, correctAnswer) {
		var quizzes = JSON.parse(localStorage.quizzes);
		quizzes[quizTitle]['questions'][questionIndex]['answer'] = correctAnswer;
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
	}
}

//1. Load page, 2. get data from localStorage, 3. create a quiz model, 4. list quizzes, 5. create question Models on quiz start, 6. play original quiz