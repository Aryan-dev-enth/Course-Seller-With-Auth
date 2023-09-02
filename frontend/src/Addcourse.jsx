import React from 'react';
import { Card, Button, TextField, Typography } from '@mui/material';

function Addcourse() {

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [imageLink,setImageLink]=React.useState("");

    return <div>
        <div style={{
            backgroundColor: "",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "150px",
                paddingBottom: "20px"
            }}>
                <Typography variant="h6" component="h2">
                    Admin page, add course below
                </Typography>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Card variant="outlined" style={{
                    width: "400px",
                    height: "auto",
                    padding: "30px"

                }}>

                    <TextField

                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        type='text'
                        fullWidth={true}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}

                    />

                    <br /><br />

                    <TextField

                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        type='text'
                        fullWidth={true}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}

                    />

                    <br /><br />

                    <TextField

                        id="outlined-basic"
                        label="Image-Link"
                        variant="outlined"
                        type='text'
                        fullWidth={true}
                        onChange={(e) => {
                            setImageLink(e.target.value);
                        }}

                    />
                    <br /><br />

                    <Button
                        size='large'
                        variant="contained"
                        onClick={()=>{
                            fetch('http://localhost:3000/admin/courses',{method:"POST",
                        body:JSON.stringify({
                            title,
                            description,
                            imageLink
                        }),
                        headers:{
                            "Content-type":"application/json",
                            "Authorization":"Bearer "+localStorage.getItem("token")
                        }
                        }).then((resp)=>{
                            resp.json().then((data)=>{
                                console.log(data);
                            })
                        })
                        }}

                    >Add Course</Button>

                </Card>
            </div>
        </div>
    </div>
}

export default Addcourse;