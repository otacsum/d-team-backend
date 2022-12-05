import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentService {
  async create(createAssignmentDto: CreateAssignmentDto) {
    return 'This action adds a new assignment';
  }

  async findAll() {
    return `This action returns all assignment`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} assignment`;
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    return `This action updates a #${id} assignment`;
  }

  async remove(id: number) {
    return `This action removes a #${id} assignment`;
  }



  /**
   * Helper Function
   * @param err Caught Error
   * @returns Object containing error details.
   */
  private generateFriendlyError(err: any) {
      let payload;
      try {
          const errorMessage: string = `Failed: ${err.message}`;
          const errorDetail: string = err.original.detail;
          console.log(errorMessage);

          payload = {
              success: false,
              message: errorMessage,
              detail: errorDetail
          }

          // return a good error detail if available
          return payload;
      } catch (err) {
          // catch inner error when detail not available.
          console.log(err.message);
      }
      // create detail of outer error if detail not available.
      payload = {
          success: false,
          message: '',
          detail: err.message
      }
      return payload;
  }
}
