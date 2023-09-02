const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');



app.use(express.json());
app.use(cors());
const secretKey = "SeCrEt"

const generateJwt = (user) => {
    const payload = { username: user, };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};


const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            console.log(user);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

app.get('/admin/me',authenticateJwt,(req,res)=>{
    res.json({
        username:req.user.username
    })
})



app.post('/admin/signup', (req, res) => {
    const admin = req.body;

    fs.readFile('admins.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        else {
            const admins = JSON.parse(data);
            const found = admins.find(a => a.username === admin.username)
            if (found) {
                res.status(403).json({
                    message: "Admin already exists"
                });
            }
            else {
                admins.push(admin);
                fs.writeFile('admins.json', JSON.stringify(admins), (err) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        const token = generateJwt(admin.username);
                        res.json({
                            message: 'Admin created succesfully',
                            token
                        }).status(201);
                    }
                })

            }
        }
    })

})

app.post('/admin/signin', (req, res) => {
    const admin = req.headers;
    fs.readFile('admins.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        else {
            const admins = JSON.parse(data);
            const found = admins.find(a => a.username === admin.username && a.password === admin.password)
            if (found) {
                admins.push(admin);
                const token = generateJwt(admin.username);
                res.status(201).json({
                    message: "Admin logged in succesfully",
                    token
                })

            }
            else {
                res.status(401).json({
                    message: "Admin not found"
                })
            }
        }
    })
})

app.post('/admin/courses', authenticateJwt, (req, res) => {
    const uid = Math.floor(Math.random() * 100000);
    const course = {
        title: req.body.title,
        description: req.body.description,
        published: true,
        imageLink: req.body.imageLink,
        id: uid
    };
    fs.readFile('courses.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        }
        else {
            const courses = JSON.parse(data);
            courses.push(course)
            fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
                if (err) {
                    throw err;
                }
                else {
                    res.status(201).json({
                        message: "Course created succesfully",
                        id: uid
                    })
                }
            })
        }
    })
})

app.get('/admin/courses',authenticateJwt,(req,res)=>{
    fs.readFile('courses.json','utf-8',(err,data)=>{
        if(err)
        {
            throw err;
        }
        else
        {
            const courses=JSON.parse(data);
            res.json(courses);
        }
    })
})

function findById(id,arr)
{
    for(var x=0;x<arr.length;x++)
    {
        if(arr[x].id===id)
        {
            return x;
        }
    }
    return -1;
}

function updateCourseByIndex(index,newArr,arr)
{
    var course=[];
    for(var x=0;x<arr.length;x++)
    {
        if(x!=index)
        {
            course.push(arr[x]);
        }
        else
        {
            course.push(newArr);
        }
    }
    return course;
}

app.put('/admin/course/:courseId',authenticateJwt,(req,res)=>{
    const newCourse=req.body;
    const id=parseInt(req.params.courseId);
    newCourse.id=id;
    fs.readFile('courses.json','utf-8',(err,data)=>{
        if(err)
        {
            throw err;
        }
        else
        {
            const courses=JSON.parse(data);
            const found=courses.find(c=> c.id===id);
            
            if(found)
            {
                var index=findById(id,courses);
                var newCourses=updateCourseByIndex(index,newCourse,courses);
                console.log(index);
                console.log(newCourse);
                console.log(newCourses);
                fs.writeFile('courses.json',JSON.stringify(newCourses),(err)=>{
                    if(err)
                    {
                        throw err;
                    }
                    else
                    {
                        res.json({
                            message :"Updated successfully"
                        })
                    }
                })
            }
            else
            {
                res.json({
                    message :"no such course found"
                })
            }

        }
    })
})

app.listen(3000);