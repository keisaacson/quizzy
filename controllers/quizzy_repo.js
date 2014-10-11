var Repo = {
	getQuiz: function(index) {
		var quizzes = localStorage.getItem('quizzes');
		if (quizzes) {
			var parsedQuizzes = JSON.parse(quizzes);
			return quizzes[index];
		}
	},
	getQuestion: function(quizIndex, questionIndex) {

	}
}

//1. Load page, 2. get data from localStorage, 3. create a quiz model, 4. list quizzes, 5. create question Models on quiz start, 6. play original quiz