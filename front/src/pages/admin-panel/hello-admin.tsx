import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { urls, useRouting } from '../../routing/routes';

export const AdminLanding = () => {
    const { routeTo } = useRouting(); 
    return (
        <div>
            <Typography variant="h1">Hello Admin</Typography>

            <Button variant="outlined" onClick={() => routeTo(urls.addBook)}>Add a new Book</Button>
            <Button variant="outlined" onClick={() => routeTo(urls.contentPage)}>Back to content page</Button>
        </div>
    )
}