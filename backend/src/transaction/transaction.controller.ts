import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateTransactionDto } from './transaction.dto';
import axios from 'axios';

@Controller('transaction')
export class TransactionController {
  @Post()
  async createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<object> {
    const { sender, recipient, amount } = createTransactionDto;

    try {
      const response = await axios.post(
        'https://api.rhombis.app/stars/transaction',
        {
          quantity: amount,
          recipient,
          sender,
        },
      );

      return {
        ok: true,
        transaction: response.data,
      };
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Transaction failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
