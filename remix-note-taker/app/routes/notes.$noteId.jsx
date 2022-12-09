// the $ sign in the name lets remix know this is a dynamic route.

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Link } from 'react-router-dom'
import { getStoredNotes } from '~/data/notes'

import styles from '~/styles/noteDetails.css'

export default function NoteDetailsPage() {
  const note = useLoaderData()

  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id='note-details-content'>{note.content}</p>
    </main>
  )
}

export async function loader({ params }) {
  const notes = await getStoredNotes()
  const noteId = params.noteId // identifier (params.identifier / noteId) must match the file identifier name after the dollar sign.
  const selectedNote = notes.find(note => note.id === noteId)

  if (!selectedNote) {
    throw json(
      { message: 'Could not find note for id ' + noteId },
      {
        status: 404
      }
    )
  }

  return selectedNote
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

// Add meta data for dynamic pages
export function meta({ data, params }) {
  return {
    title: data.title,
    description: 'Manange your notes with ease!'
  }
}
