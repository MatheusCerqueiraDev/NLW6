import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import '../styles/room.scss'

export function Room (){
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask Logo"/>
                    <div>codigo</div>
                </div>
            </header>

            <main className="content">
                <div className="roomTitle">
                    <h1>SalaReact</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea 
                    placeholder="Faça sua pergunta"
                    />

                    <div className="form-footer">
                        <span>Para enviar uma perguntar, <button>faça seu login</button>.</span>
                        <Button type="submit">Enviar pergunta</Button>
                    </div>

                </form>
            </main>
        </div>
    )
}