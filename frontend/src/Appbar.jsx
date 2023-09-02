import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import { Button, Typography } from '@mui/material';

function Appbar() {

    const [email, setEmail] = React.useState("");

    React.useEffect(() => {
        fetch('http://localhost:3000/admin/me', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((resp) => {
            resp.json().then((data) => {
                if (data.username) {
                    setEmail(data.username);
                }
            });
        });
    }, []);

    if (email) {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                <Typography variant="h6" component="h2">
                    Udemy
                </Typography>
                <div>
                    {email}
                </div>
                <div>

                    <Button
                        style={{ marginRight: '10px' }}
                        variant="contained"
                        component={Link} // Use the Link component for navigation
                        to="/addcourse"    // Specify the target route
                    >
                        Add Course
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => {
                            localStorage.setItem("token", undefined);
                            window.location.reload();
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <Typography variant="h6" component="h2">
                Udemy
            </Typography>

            <div>
                <Button
                    style={{ marginRight: '10px' }}
                    variant="contained"
                    component={Link} // Use the Link component for navigation
                    to="/addcourse"    // Specify the target route
                >
                    Add Course
                </Button>

                <Button
                    style={{ marginRight: '10px' }}
                    variant="contained"
                    component={Link} // Use the Link component for navigation
                    to="/signin"    // Specify the target route
                >
                    Signin
                </Button>

                <Button
                    variant="contained"
                    component={Link} // Use the Link component for navigation
                    to="/signup"    // Specify the target route
                >
                    Signup
                </Button>
            </div>
        </div>
    );
}

export default Appbar;
