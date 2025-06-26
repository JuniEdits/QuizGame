       // Δεδομένα των ερωτήσεων: ερώτηση, σωστή απάντηση, επεξήγηση
        const questions = [
            { question: "Τριακοσιοστός Δέκατος", correctAnswer: "Τακτικό Αρηθμιτικό"},
            { question: "Εκατόν Τριάντα", correctAnswer: "Απόλυτο Αρηθμιτικό"},
			{ question: "Τετρακόσια Πέντε", correctAnswer: "Απόλυτο Αρηθμιτικό"},
            { question: "Πεντηκοστός Ένατος", correctAnswer: "Τακτικό Αρηθμιτικό"},
			{ question: "Εικοστός", correctAnswer: "Τακτικό Αρηθμιτικό"},
            { question: "Οχτακόσια Δεκατρία", correctAnswer: "Απόλυτο Αρηθμιτικό"},
			{ question: "Δεύτερος", correctAnswer: "Τακτικό Αρηθμιτικό"},
            { question: "Χίλια Πεντακόσια Δέκα", correctAnswer: "Απόλυτο Αρηθμιτικό"},
			{ question: "Σαράντα", correctAnswer: "Απόλυτο Αρηθμιτικό"},
            { question: "Οχτακόστα Ογδόντα", correctAnswer: "Απόλυτο Αρηθμιτικό"},
			{ question: "Εικοστός Δεύτερος", correctAnswer: "Τακτικό Αρηθμιτικό"},
            { question: "Εξακσιοστός Πέμπτος", correctAnswer: "Τακτικό Αρηθμιτικό"}

        ];

        // Μεταβλητές κατάστασης του κουίζ
        let currentQuestionIndex = 0; // Δείκτης της τρέχουσας ερώτησης
        let score = 0; // Σκορ του παίκτη
        let answeredThisQuestion = false; // Έλεγχος αν έχει απαντηθεί η τρέχουσα ερώτηση

        // Αναφορές σε στοιχεία του DOM
        const questionText = document.getElementById('question-text');
        const trueButton = document.getElementById('true-button');
        const falseButton = document.getElementById('false-button');
        const feedback = document.getElementById('feedback');
        const explanationText = document.getElementById('explanation-text');
        const scoreText = document.getElementById('score-text');
        const nextButton = document.getElementById('next-button');
        const quizScreen = document.getElementById('quiz-screen');
        const resultScreen = document.getElementById('result-screen');
        const finalScore = document.getElementById('final-score');
        const restartButton = document.getElementById('restart-button');

        /**
         * Εμφανίζει την τρέχουσα ερώτηση και επαναφέρει την κατάσταση της διεπαφής.
         */
        function displayQuestion() {
            answeredThisQuestion = false; // Επαναφορά για νέα ερώτηση
            feedback.textContent = ''; // Εκκαθάριση μηνύματος ανατροφοδότησης
            feedback.className = 'feedback'; // Επαναφορά κλάσεων ανατροφοδότησης
            explanationText.textContent = ''; // Εκκαθάριση προηγούμενης επεξήγησης
            trueButton.disabled = false; // Ενεργοποίηση κουμπιών
            falseButton.disabled = false;
            nextButton.classList.add('hidden'); // Απόκρυψη κουμπιού "Επόμενη"

            // Έλεγχος αν υπάρχουν ακόμη ερωτήσεις
            if (currentQuestionIndex < questions.length) {
                questionText.textContent = questions[currentQuestionIndex].question; // Εμφάνιση ερώτησης
                scoreText.textContent = `Σκορ: ${score}`; // Ενημέρωση σκορ
            } else {
                showResults(); // Αν τελείωσαν οι ερωτήσεις, εμφάνιση αποτελεσμάτων
            }
        }

        /**
         * Ελέγχει την απάντηση του χρήστη και παρέχει ανατροφοδότηση.
         * @param {string} userAnswer - Η απάντηση του χρήστη ('Σωστό' ή 'Λάθος').
         */
        function checkAnswer(userAnswer) {
            if (answeredThisQuestion) return; // Εάν έχει ήδη απαντηθεί, μην κάνεις τίποτα
            answeredThisQuestion = true; // Σημείωσε ότι η ερώτηση απαντήθηκε

            const currentQuestion = questions[currentQuestionIndex];
            const correctAnswer = currentQuestion.correctAnswer;
            const explanation = currentQuestion.explanation;

            // Έλεγχος αν η απάντηση είναι σωστή
            if (userAnswer === correctAnswer) {
                feedback.textContent = 'Σωστό!';
                feedback.classList.remove('incorrect-feedback');
                feedback.classList.add('correct-feedback');
                score++; // Αύξηση σκορ
            } else {
                feedback.textContent = `Λάθος! Η σωστή απάντηση ήταν: ${correctAnswer}`;
                feedback.classList.remove('correct-feedback');
                feedback.classList.add('incorrect-feedback');
            }
            explanationText.textContent = explanation; // Εμφάνιση της επεξήγησης
            scoreText.textContent = `Σκορ: ${score}`; // Ενημέρωση σκορ
            trueButton.disabled = true; // Απενεργοποίηση κουμπιών μετά την απάντηση
            falseButton.disabled = true;
            nextButton.classList.remove('hidden'); // Εμφάνιση κουμπιού "Επόμενη"
        }

        /**
         * Προχωρά στην επόμενη ερώτηση.
         */
        function nextQuestion() {
            currentQuestionIndex++; // Αύξηση δείκτη ερώτησης
            displayQuestion(); // Εμφάνιση της επόμενης ερώτησης
        }

        /**
         * Εμφανίζει την οθόνη αποτελεσμάτων στο τέλος του κουίζ.
         */
        function showResults() {
            quizScreen.classList.add('hidden'); // Απόκρυψη οθόνης κουίζ
            resultScreen.classList.remove('hidden'); // Εμφάνιση οθόνης αποτελεσμάτων
            finalScore.textContent = `Το τελικό σας σκορ: ${score} / ${questions.length}`; // Εμφάνιση τελικού σκορ
        }

        /**
         * Επαναφέρει το κουίζ στην αρχική του κατάσταση.
         */
        function restartQuiz() {
            currentQuestionIndex = 0; // Επαναφορά δείκτη ερώτησης
            score = 0; // Επαναφορά σκορ
            quizScreen.classList.remove('hidden'); // Εμφάνιση οθόνης κουίζ
            resultScreen.classList.add('hidden'); // Απόκρυψη οθόνης αποτελεσμάτων
            displayQuestion(); // Ξεκίνημα από την πρώτη ερώτηση
        }

        // Προσθήκη Event Listeners στα κουμπιά
        trueButton.addEventListener('click', () => checkAnswer('Τακτικό Αρηθμιτικό'));
        falseButton.addEventListener('click', () => checkAnswer('Απόλυτο Αρηθμιτικό'));
        nextButton.addEventListener('click', nextQuestion);
        restartButton.addEventListener('click', restartQuiz);

        // Αρχικοποίηση του κουίζ όταν φορτωθεί η σελίδα
        displayQuestion();