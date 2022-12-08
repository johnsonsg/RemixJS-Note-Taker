import NewNote, {links as newNoteLinks } from '~/components/Notes/NewNote'

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  )
}

export function links() {
  // Surfacing Styles in Remix.
  return [...newNoteLinks()]
}