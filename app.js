class Quiz {

    constructor() {
        this.questions = [
            {
                title: 'Сколько месяцев в году?',
                answers: ['9', '10', '11', '12'],
                answer: null,
                rightAnswer: 3
            },
            {
                title: 'Сколько дней в високосном году?',
                answers: ['364', '365', '366', 'Какой еще високосный?'],
                answer: null,
                rightAnswer: 2,
            },
            {
                title: 'Сколько в метре миллиметров?',
                answers: ['10', '100', '1000', '10000'],
                answer: null,
                rightAnswer: 2
            },
            {
                title: 'Сколько планет в солнечной системе?',
                answers: ['7', '8', '9', '10'],
                answer: null,
                rightAnswer: 1
            },
            {
                title: 'Сколько сантиметров в дюйме?',
                answers: ['2,54', '4,52', '5,24', '2,45'],
                answer: null,
                rightAnswer: 0
            }
        ];
        this.activeQuestion = 0;
        // запускаем опрос при нажатии на кнопку 'Начать'
        this.start();
    }

    // метод для старта приложения
    start() {
        const startButton = document.querySelector('.app__start');
        startButton.addEventListener('click', this.startButtonHandler.bind(this));
    }

    // метод для отображения первого вопроса после нажатия кнопки 'Начать'
    startButtonHandler(e) {
        const welcomeBlock = document.querySelector('.app__welcome');
        const field = document.querySelector('.app__field');
        welcomeBlock.classList.add('js-hide');
        field.classList.remove('js-hide');

        this.showQuestion(this.activeQuestion);

        const submitButton = document.querySelector('.question__button');
        submitButton.addEventListener('click', this.submitButtonHandler.bind(this));
    }

    // метод для отображения вопроса
    showQuestion(activeQuestion) {
        const questionTitle = document.querySelector('.question__title');
        const questionCount = document.querySelector('.app__legend');
        const answers = document.getElementsByName('answer');
        const currentQuestion = this.questions[activeQuestion];

        this.clearAnswers();

        for (let i = 0; i < answers.length; i++) {
            answers[i].addEventListener('change', this.setStyles.bind(this));
        }

        questionCount.textContent = `Вопрос ${activeQuestion + 1} из ${this.questions.length}`;
        questionTitle.textContent = currentQuestion.title;

        [...answers].forEach((item, index) => {
            item.checked = false;
            item.setAttribute('data-value', currentQuestion.answers[index]);
            item.insertAdjacentText('afterend', currentQuestion.answers[index]);
        });
    }

    // метод для обработки ответа после нажатия на кнопку "Ответить"
    submitButtonHandler(e) {
        e.preventDefault();

        let answers = document.getElementsByName('answer');
        // проверяем, выбран ли ответ
        let answerState = [...answers].some(item => {
            return item.checked;
        });

        if (answerState) {
            let answer = [...answers].filter(item => {
                return item.checked;
            });

            this.questions[this.activeQuestion].answer = answer[0].getAttribute('data-value');
            this.activeQuestion = this.activeQuestion + 1;

            this.activeQuestion !== 5 ? this.showQuestion(this.activeQuestion) : this.getResults();
        }
    }

    // метод для отображения результатов
    getResults() {
        const field = document.querySelector('.app__field');
        const result = document.querySelector('.app__result');
        const rightAnswers = document.querySelector('.result__right');
        const allQuestions = document.querySelector('.result__all');

        field.classList.add('js-hide');
        result.classList.remove('js-hide');

        let rightAnswersCount = 0;

        for (let i = 0; i < this.questions.length; i++) {
            if (this.questions[i].answer === this.questions[i].answers[this.questions[i].rightAnswer]) {
                rightAnswersCount++;
            }
        }

        rightAnswers.textContent = `Правильных ответов: ${rightAnswersCount}`;
        allQuestions.textContent = `Всего вопросов: ${this.questions.length}`;
    }

    // метод для очистки структуры перед отображением нового вопроса
    clearAnswers() {
        const answers = document.getElementsByName('answer');

        [...answers].forEach(item => {
            item.nextSibling.textContent = '';
            item.parentElement.classList.remove('js-active');
        });
    }

    // метод для стилизации кнопок вариантов ответов
    setStyles() {
        const answers = document.getElementsByName('answer');

        [...answers].forEach(item => {
            item.checked ? item.parentElement.classList.add('js-active') : item.parentElement.classList.remove('js-active');
        });
    }
}

const quiz = new Quiz();