import MadeBy from "./components/MadeBy";
import Slider from "./components/Slider";
import Tourist from "./components/Tourist";

function App() {
  return (
    <div className="w-full min-h-dvh-screen relative overflow-hidden">
      <Slider />
      <Tourist />
      <MadeBy />
    </div>
  );
}

export default App;
