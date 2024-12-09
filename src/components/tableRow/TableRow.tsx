import { IMovement } from "../../interfaces/Movement";


export interface  Props {
  movement: IMovement
}
export const TableRow = ({movement}:Props) => {
  const convertDate = (date: number) => {
    const dateHuman = new Date(date).toLocaleString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return dateHuman;
  }
  return (
    <tr>
      <td>{convertDate(movement.dateRecharge)}</td>
      <td>{movement.value}</td>
      <td>{movement.concept}</td>
      <td>{movement.payee}</td>
    </tr>
  )
}
