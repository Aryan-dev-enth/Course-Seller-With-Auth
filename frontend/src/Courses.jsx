import React from "react";
import { Card, Button, TextField, Typography } from '@mui/material';

function Courses() {
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3000/admin/courses', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
            }
        }).then((resp) => {
            resp.json().then((data) => {
                setCourses(data);
                console.log(data);
            })
        })
    }, [])

    return <div style={{
        display:"flex",
        flexWrap:"wrap"
    }}>
        {courses.map(course => {
            return <Course course={course} />
        })}
    </div>
}

function Course(props) {
    return <div>
        <Card variant="outlined" style={{
            margin:"10px",
            width:"300px",
            height:"auto",
            padding:"20px"
        }}>
            <Typography variant="h5" textAlign={"center"}>{props.course.title}</Typography>
            <br />
            <Typography variant="h8" textAlign={"justify"}>{props.course.description}</Typography>
            <br />
            <img src={props.course.imageLink} alt="course-img" style={{width:"300px",height:"300px"}}/>
        </Card>

    </div>
}

export default Courses;