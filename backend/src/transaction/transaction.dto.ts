export class CreateTransactionDto {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
}
