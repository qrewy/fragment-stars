import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import axios from 'axios';

@Controller('username')
export class UserController {
  @Get(':username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<object> {
    try {
      const response = await axios.post(
        'https://fragment.com/api?hash=fe12c63c0c711b3728',
        `query=${encodeURIComponent(username)}&quantity=50&method=searchStarsRecipient`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie:
              'stel_ssid=3f8e8a0bdde27bf6a2_17261449625985714210; stel_token=97ea3ebd8774b89df066b38f3574602397ea3ea797ea3f1bd7523fa6956594fe8afda;',
          },
        },
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Failed to fetch user data',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
