import { Button, GameCard, Input } from '../../components'
import { mockFilesGames } from '../../shared/mockfile/mock';
export const ExamplePage = () => {
  return (
    <>
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
      <GameCard img={mockFilesGames[0].url} title={mockFilesGames[0].name}/>
    </>
  )
}
