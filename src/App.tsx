import { Button } from "./components/Button";
import { Input } from "./components/Input";

function App() {
  return (
    <div className="App">
      <Input label="id" name="id" id="text" />
      <Input label="number" id="number" name="number" type="number" />
      <Button action="increase">
        +
      </Button>
      <Button action="decrease">
        -
      </Button>

      <Button>
        See
      </Button>
    </div>
  );
}

export default App;
