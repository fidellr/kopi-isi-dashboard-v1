import React, { Fragment } from 'react';
import { Avatar, Typography } from "@material-ui/core";

export default ({ classes: { userContent, avatar } }) => {
    //   const fullName = userInfo.name;
    //   const email = userInfo.email;
    //   const firstName = userInfo.given_name;
    //   const lastName = userInfo.family_name;
    //   const firstInitial = firstName.length > 0 ? firstName[0] : '';
    //   const lastInitial = lastName.length > 0 ? lastName[0] : '';
    //   const picture = userInfo.picture;

    return (
        <Fragment>
            <Avatar className={avatar}>F</Avatar>
            <Typography variant="body2" className={userContent}>Fidel Ramadhan</Typography>
            <Typography variant="body1" className={userContent}>fidelramadhan@gmail.com</Typography>
        </Fragment>
    )
}