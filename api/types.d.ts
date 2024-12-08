export interface Message {
    author: string;
    message: string;
}

export interface MessageResponse extends Message {
    id: string;
    datetime: string;
}


