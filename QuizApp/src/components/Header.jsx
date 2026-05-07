import quizIcon from "../assets/quiz-logo.png";

export default function Header() {

    return (
        <header>
            <img src={quizIcon} alt="Quiz Icon" />
            <h1>React Quiz</h1>
        </header>
    );
}