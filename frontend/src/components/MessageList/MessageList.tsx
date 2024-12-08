import Grid from "@mui/material/Grid2";
import {Alert, Card, CardContent, Typography} from "@mui/material";
import {fetchMessages} from "../../container/slices/messageSlice/messageSlice.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import dayjs from "dayjs";
import Loader from "../../UI/Loader/Loader.tsx";

const MessageList = () => {
    const { messages, isLoading, error } = useAppSelector((state) => state.chat);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);


    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">No data. Try again!</Alert>
            ) : (
            <Grid container spacing={2}>
                {messages.map((m) => (
                    <Grid size={12} key={m.id}>
                        <Card
                            sx={{
                                minWidth: 275,
                                border: "3px solid",
                                borderRadius: "10px",
                                p: 1,
                            }}
                        >
                            <CardContent>
                                <Grid size={12}>
                                    <Typography sx={{fontSize: 20, ml: 1, fontWeight: 'bold'}}>
                                        <strong style={{ color: "red" }}>Author: </strong> {m.author}
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography sx={{fontSize: 20, ml: 1}}>
                                        <strong style={{ color: "blue" }}>Message:</strong> {m.message}
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography sx={{fontSize: 20, ml: 1}}>
                                        <strong style={{ color: "green" }}>Date:</strong> {dayjs(m.datetime).format('DD/MM/YYYY HH:mm')}
                                    </Typography>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            )}
        </>
    );
};

export default MessageList;