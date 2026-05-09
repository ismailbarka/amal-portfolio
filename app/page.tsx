import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to French home page
  redirect('/fr')
}
