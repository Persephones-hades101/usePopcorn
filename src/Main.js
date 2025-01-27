import ListBox from './movie-list-component/ListBox'
import WatchedBox from './watched-movie-list-component/WatchedBox';


export default function Main() {


  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  )
}
