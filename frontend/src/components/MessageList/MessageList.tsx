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


    const formatDate = (dateString: string) => {
        const date = dayjs(dateString);
        const now = dayjs();

        if (now.diff(date, 'day') === 1) {
            return "Yesterday";
        }

        if (now.isSame(date, 'year')) {
            if (now.isSame(date, 'day')) {
                return date.format('HH:mm');
            }
            return date.format('DD/MM');
        }

        return date.format('DD/MM/YYYY');
    };


    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Alert severity="error">There is no data. Send a new message or try again!</Alert>
            ) : (
            <Grid container spacing={2}>
                {messages.map((m) => (
                    <Grid size={12} key={m.id}>
                        <Card
                            sx={{
                                minWidth: 275,
                                border: "3px solid",
                                borderRadius: "10px",
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
                                        <strong style={{ color: "blue" }}>Message:</strong> "{m.message}"
                                    </Typography>
                                </Grid>
                                <Grid size={12}>
                                    <Typography sx={{fontSize: 20, ml: 1}}>
                                        <strong style={{ color: "green" }}>Date:</strong> {formatDate(m.datetime)}
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