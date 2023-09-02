import { useParams } from "react-router-dom";
import React from "react";
import { Card, Button, TextField, Typography } from '@mui/material';

function Course() {
    const { courseId } = useParams();
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:3000/admin/courses', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            resp.json().then((data) => {
                setCourses(data);
            })
        })
    }, [])
    var course = null;
    for (var x = 0; x < courses.length; x++) {
        if (courses[x].id === parseInt(courseId)) {
            course = courses[x];
        }
    }

    if (!course) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <CourseTable course={course}></CourseTable>
            <UpdateCourse course={course} setCourses={setCourses}></UpdateCourse>
        </div>
    )
}

function UpdateCourse(props) {

    const [title,setTitle]=React.useState("");
    const [description,setDescription]=React.useState("");
    const [imageLink,setImageLink]=React.useState("");
    const course=props.course;
    props.setCourses();
    return (
        <div>
            <div style={{
                backgroundColor: "",
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "15px",
                    paddingBottom: "20px"
                }}>
                    <Typography variant="h6" component="h2">
                        Admin page, update course below
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
                            onClick={() => {
                                fetch('http://localhost:3000/admin/course/'+course.id, {
                                    method: "PUT",
                                    body: JSON.stringify({
                                        title,
                                        description,
                                        imageLink
                                    }),
                                    headers: {
                                        "Content-type": "application/json",
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    }
                                }).then((resp) => {
                                    resp.json().then((data) => {
                                        console.log(data);
                                        window.location.reload();
                                    })
                                })
                            }}

                        >Update Course</Button>

                    </Card>
                </div>
            </div>
        </div>
    )
}

function CourseTable(props) {
    return (
        <div style={{
            display:"flex",
            justifyContent:"center"
        }}>
            <Card variant="outlined" style={{
                margin: "10px",
                width: "300px",
                height: "auto",
                padding: "20px"
            }}>
                <Typography variant="h5" textAlign={"center"}>{props.course.title}</Typography>
                <br />
                <Typography variant="h8" textAlign={"justify"}>{props.course.description}</Typography>
                <br />
                <img src={props.course.imageLink} alt="course-img" style={{ width: "300px", height: "300px" }} />
            </Card>
        </div>
    )
}

export default Course;