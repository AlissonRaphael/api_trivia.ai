import { PipeTransform } from '@nestjs/common';

export class IndexValidatorQueryPipe implements PipeTransform {
  transform(value: any): any {
    const size = Number(value.size);
    const page = Number(value.page);

    value.size = !size || size < 0 || size > 50 ? 25 : size;
    value.page = !page || page < 0 ? 1 : page;

    return value;
  }
}
