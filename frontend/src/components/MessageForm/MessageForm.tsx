import Grid from "@mui/material/Grid2";
import {Button, CircularProgress, TextField} from "@mui/material";
import React, {useState} from "react";
import {postMessages} from "../../container/slices/messageSlice/messageSlice.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";

const initialState = {
    author: '',
    message: '',
};

const MessageForm = () => {
    const [formData, setFormData] = useState(initialState);
    const { isLoading } = useAppSelector((state) => state.chat);
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { author, message } = formData;

        if (!author.trim() || !message.trim()) {
            return;
        }

        const messageWithDate = {
            ...formData,
            id: `${Date.now()}`,
            datetime: new Date().toISOString()
        };

        try {
            await dispatch(postMessages(messageWithDate));
            setFormData(initialState);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        mx: "auto",
                        width: "60%",
                        border: "3px solid #001f3d",
                        borderRadius: "10px",
                        p: 3,
                        mt: 3,
                        mb: 2
                    }}
                >

                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            onChange={onChange}
                            value={formData.author}
                            id="author"
                            label="Author"
                            variant="outlined"
                            name="author"
                            required
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            sx={{
                                width: "100%",
                                backgroundColor: "white",
                                borderRadius: "10px",
                            }}
                            onChange={onChange}
                            value={formData.message}
                            multiline
                            id="message"
                            label="Message"
                            variant="outlined"
                            name="message"
                            required
                        />
                    </Grid>
                    <Grid size={12} textAlign='center'>
                        <Button
                            type='submit'
                            size='large'
                            variant="contained"
                            sx={{
                                backgroundColor: "#000000"
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : 'Send'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default MessageForm;