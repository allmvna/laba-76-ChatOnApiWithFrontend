import Navbar from "../../components/Navbar/Navbar.tsx";
import MessageList from "../../components/MessageList/MessageList.tsx";
import {Container} from "@mui/material";
import MessageForm from "../../components/MessageForm/MessageForm.tsx";

const Chat = () => {
    return (
        <>
          <header>
              <Navbar/>
          </header>
            <main>
                <Container>
                    <MessageList/>
                    <MessageForm/>
            </Container>
            </main>
        </>
    );
};

export default Chat;