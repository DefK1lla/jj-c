import { Button, GameCard, Input } from '../../components'

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
      <GameCard img={"image/photo.jpg"} title='KRE. KO'/>
    </>
  )
}
