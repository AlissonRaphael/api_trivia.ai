import { PipeTransform } from '@nestjs/common';

export class PlayerValidatorParamsPipe implements PipeTransform {
  transform(value: any): void {
    const size = Number(value.size);
    const page = Number(value.page);

    value.size = !size || size < 0 || size > 50 ? 25 : size;
    value.page = !page || page < 0 ? 1 : page;

    return value;
  }
}
