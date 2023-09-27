import { Box, Button, TextField, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import Header from '../components/Header'
import HttpClient from '../utils/HttpClient';
import toast from 'react-hot-toast';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [passord, setPassword] = useState("");

    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!email) return toast.error("Email is Required");
        if (!passord) return toast.error("Email is Required");


        const data = {
            email: email,
            password: passord
        }
        const res = await HttpClient.requestData("login", "POST", data);
        console.log("resCat", res)
        if (res && res.status) {
            navigate("/dashboard")
            reactLocalStorage.setObject("userDataSos", { token: res?.data?.token })
            toast.success("Login Successfully")
            setEmail("");
            setPassword("");
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div>
            <Box m="20px">
                <Header title="Log in" subtitle="" />


                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={passord}
                            name="password"
                            sx={{ gridColumn: "span 2" }}
                        />
                    </Box>

                    <Box display="flex" justifyContent="end" mt="20px">
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>

        </div>
    )
}

export default Login
