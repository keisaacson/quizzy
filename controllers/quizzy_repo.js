var Repo = {
	createNewRepo: function(repoName) {
		var newRepo = {};
		localStorage.setItem(repoName, JSON.stringify(newRepo));
	},
	createNewQuiz: function(quizTitle) {
		var quizzes = this.getRepo(quizzes);
		var quizresponses = this.getRepo(quizresponses);
		var quizresults = this.getRepo(quizresults);
		quizzes[quizTitle] = {};
		quizresponses[quizTitle] = {};
		quizresults[quizTitle] = {};
		quizzes[quizTitle]['questions'] = [];
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
		localStorage.setItem('quizresponses', JSON.stringify(quizresponses));
		localStorage.setItem('quizresults', JSON.stringify(quizresults));

	},
	createNewQuestion: function(quizTitle, question, answers, correctAnswer) {
		var quizzes = JSON.parse(localStorage.quizzes);
		var newQuestion = {};
		newQuestion['question'] = question;
		newQuestion['choices'] = answers;
		quizzes[quizTitle]['questions'].push(newQuestion);
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
		var questionIndex = quizzes[quizTitle]['questions'].indexOf(newQuestion);
		quizzes[quizTitle]['questions'][questionIndex]['answer'] = correctAnswer;
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
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
	saveQuizResponse: function(quizTitle, questionModel, selectedChoice) {
		var responses = Repo.getRepo('quizresponses');
		if (!responses[quizTitle][questionModel.question]) {
			responses[quizTitle][questionModel.question] = {};
			responses[quizTitle][questionModel.question]['total'] = 0;
		};
		if (!responses[quizTitle][questionModel.question][selectedChoice]) {
			responses[quizTitle][questionModel.question][selectedChoice] = 1;
			responses[quizTitle][questionModel.question]['total']++;
		} else {
			responses[quizTitle][questionModel.question][selectedChoice]++;
			responses[quizTitle][questionModel.question]['total']++;
		};
		localStorage.setItem('quizresponses', JSON.stringify(responses));
	},
	saveSpiritAnimalResponse: function(questionModel, selectedChoice) {
		var responses = Repo.getRepo('responses');
		if (!responses[questionModel.id]) {
			responses[questionModel.id] = {};
		};
		if (!responses[questionModel.id][selectedChoice]) {
			responses[questionModel.id][selectedChoice] = 1;
		} else{
			responses[questionModel.id][selectedChoice]++;
		};
		localStorage.setItem('responses', JSON.stringify(responses));
	},
	saveQuizResult: function(quizTitle, name, score) {
		var results = Repo.getRepo('quizresults');
		results[quizTitle][name] = score;
		localStorage.setItem('quizresults', JSON.stringify(results));
	},
	saveSpiritAnimalResult: function(name, animal) {
		var results = Repo.getRepo('results');
		results[name] = animal;
		localStorage.setItem('results', JSON.stringify(results));
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
	deleteQuestion: function(quizTitle, questionIndex, question) {
		var quizzes = JSON.parse(localStorage.quizzes);
		var quizResponses = JSON.parse(localStorage.quizresponses);
		delete quizzes[quizTitle]['questions'][questionIndex];
		delete quizResponses[quizTitle][question];
		localStorage.setItem('quizzes', JSON.stringify(quizzes));
		localStorage.setItem('quizresponses', JSON.stringify(quizResponses));
	}
}

//1. Load page, 2. get data from localStorage, 3. create a quiz model, 4. list quizzes, 5. create question Models on quiz start, 6. play original quiz