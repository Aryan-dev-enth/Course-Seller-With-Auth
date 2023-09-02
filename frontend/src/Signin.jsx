import React from 'react';
import { Card, Button, TextField, Typography } from '@mui/material';

function Signin() {

    const [username,setUsername]=React.useState("");
    const [password,setPassword]=React.useState("");
    return (
        <div style={{
            backgroundColor: "",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop:"150px",
                paddingBottom:"20px"
            }}>
                <Typography variant="h6" component="h2">
                    Welcome back to coursera sign in here 
                </Typography>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Card variant="outlined" style={{
                    width:"400px",
                    height:"auto",
                    padding:"30px"

                }}>

                    <TextField

                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type='text'
                        fullWidth={true}
                        onChange={(e)=>{
                            setUsername(e.target.value);
                        }}

                    />

                    <br /><br />

                    <TextField

                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type='password'
                        fullWidth={true}
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}

                    />

                    <br /><br />

                    <Button
                        size='large'
                        variant="contained"
                        onClick={()=>{
                            fetch('http://localhost:3000/admin/signin',{method:"POST",
                        headers:{
                            username,
                            password,
                            "Content-type":"application/json"
                        }
                        }).then((resp)=>{
                            resp.json().then((data)=>{
                                localStorage.setItem("token",data.token);
                                window.location.reload();
                            })
                        })
                        }}
                    >Signin</Button>

                </Card>
            </div>
        </div>
    )
}

export default Signin;