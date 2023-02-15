import MainContainer from "./components/MainContainer";
import Sidebar from "./components/Sidebar";



export default function Home() {
  return (
    // wrapper div
    <div className="flex justify-start items-start w-screen h-screen overflow-x-hidden">
      <Sidebar />
      <MainContainer />

    </div>
  )
}
