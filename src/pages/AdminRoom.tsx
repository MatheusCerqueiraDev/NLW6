import { Link, useHistory, useParams } from 'react-router-dom'
import answerImg from '../assets/images/answer.svg'
import checkImg from '../assets/images/check.svg'
import deleteImg from '../assets/images/delete.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Questions } from '../components/Question'
import { RoomCode } from '../components/RoomCode'
// import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import '../styles/room.scss'

type RoomParams = {
    id: string;
}

export function AdminRoom (){
    // const {user} = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const {  title, questions} = useRoom(roomId);
    const history = useHistory();

    async function handleEndRoom () {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date (),
        })

        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja que você quer excluir essa pergunta?')){
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true,
        });
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <Link to="/"><img src={logoImg} alt="Letmeask Logo"/></Link>
                    <div>
                    <RoomCode code={roomId}/>
                    <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">

                {questions.map(question =>{
                    return(
                        <Questions 
                        key={question.id}
                        content={question.content}
                        author={question.author}
                        isAnswered={question.isAnswered}
                        isHighlighted={question.isHighlighted}
                        >
                            {!question.isAnswered &&(
                                <>
                                    <button
                            type="button"
                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                            >
                                <img src={checkImg} alt="Pergunta respondida"/>
                            </button>
                            
                            <button
                            type="button"
                            onClick={() => handleHighlightQuestion(question.id)}
                            >
                                <img src={answerImg} alt="Dar destaque à pergunta" />
                            </button>
                                </>
                            )}

                            <button
                            type="button"
                            onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImg} alt="Remover pergunta"/>
                            </button>
                        </Questions>
                    )
                })}
                </div>
            </main>
        </div>
    )
}