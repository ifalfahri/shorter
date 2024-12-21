import { createShortUrl } from './actions'
import ShortUrlDisplay from './components/ShortUrlDisplay';

export default function Home() {
  return (
    <main className="container h-screen mx-auto p-4 pt-20">
      <h1 className="text-2xl text-center font-bold">Shorter URL</h1>
      <p className="text-center mb-4">Make your url shorter</p>
      <form action={createShortUrl} className="mb-4 flex justify-center items-center flex-row gap-2">
        <input type="url" name="url" placeholder="Enter your URL" required className="w-96 p-2 border rounded" />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Make it shorter!</button>
      </form>
      <ShortUrlDisplay />
    </main>
  );
}
