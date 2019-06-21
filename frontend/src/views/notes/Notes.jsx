import React from 'react'

import './Notes.css'

const Mails = (props) => {
    return (
        <div className="Notes">
            <div className="Content">
                <input type="text" name="noteTitle" placeholder="Añade una nota..."/>

                <div className="NotesList">

                </div>
            </div>
        </div>
    );
}

export default Mails;