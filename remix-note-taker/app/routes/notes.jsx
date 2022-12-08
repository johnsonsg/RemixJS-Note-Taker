import { redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import NewNote, { links as newNoteLinks } from '~/components/Notes/NewNote'
import NoteList, { links as noteListLinks} from '~/components/Notes/NoteList'
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
  return notes
}

export async function action({ request }) {
  const formData = await request.formData()
  const noteData = Object.fromEntries(formData)
  // Add Validation...
  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString()
  const updatedNotes = existingNotes.concat(noteData)
  await storeNotes(updatedNotes)
  return redirect('/notes')
}

export function links() {
  // Surfacing Styles in Remix.
  return [...newNoteLinks(), ...noteListLinks()]
}
