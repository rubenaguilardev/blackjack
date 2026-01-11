import Table from './components/Table'

const App = () => {
  
  
  return (
    <div className="min-h-screen overflow-x-hidden bg-[url('/table.jpg')] bg-cover">
      <main className="container flex justify-center md:justify-start items-start mx-auto min-h-screen px-5 py-12">
        <img src="/logo.png" alt="blackjack logo" />
        <Table />
      </main>
    </div>
  )
}

export default App