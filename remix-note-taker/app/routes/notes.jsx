import { json, redirect } from '@remix-run/node'
import { Link, useCatch, useLoaderData } from '@remix-run/react'
import NewNote, { links as newNoteLinks } from '~/components/Notes/NewNote'
import NoteList, { links as noteListLinks } from '~/components/Notes/NoteList'
import { getStoredNotes, storeNotes } from '~/data/notes'

export default function NotesPage() {
  const notes = useLoaderData()
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  )
}

export async function loader() {
  const notes = await getStoredNotes()
  if (!notes || notes.length === 0) {
    throw json(
      { message: 'Could not find any notes.' },
      {
        status: 404,
        statusText: 'Not Found'
      }
    )
  }
  return notes
}

export async function action({ request }) {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)

  if (noteData.title.trim().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters long.' }
  }

  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 1000))
  // what do you want to return after submit.
  return redirect('/notes')
}

export function links() {
  // Surfacing Styles in Remix.
  return [...newNoteLinks(), ...noteListLinks()]
}

// Add meta data for pages
export function meta() {
  return {
    title: 'All Notes',
    description: 'Manange your notes with ease!'
  }
}

export function CatchBoundary() {
  const caughtResponse = useCatch()

  const message = caughtResponse.data?.message || 'Data not found.'

  return (
    <main>
      <NewNote />
      <p className='info-message'>{message}</p>
    </main>
  )
}

export function ErrorBoundary({ error }) {
  return (
    <main className='error'>
      <h1>An error related to your notes occurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to='/'>safety</Link>!
      </p>
    </main>
  )
}
