import Navbar from "../../components/Navbar/Navbar.tsx";
import MessageList from "../../components/MessageList/MessageList.tsx";
import {Container} from "@mui/material";

const Chat = () => {
    return (
        <>
          <header>
              <Navbar/>
          </header>
            <main>
                <Container>
                <MessageList/>
            </Container>
            </main>
        </>
    );
};

export default Chat;