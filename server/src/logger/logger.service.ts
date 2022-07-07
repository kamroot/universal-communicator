import { Injectable, Scope } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  // error(message: any, stack?: string, context?: string) {
  //   // add your tailored logic here
  //   super.error(message, stack, context);
  // }
  // debug(message: any, stack?: string, context?: string) {
  //   context
  //     ? super.debug(message, stack, context)
  //     : super.debug(message, stack ? stack : '', context ? context : '');
  //   // super.debug(message, stack, context);
  // }
  // log(message: any, stack?: string, context?: string) {
  //   // add your tailored logic here
  //   // console.log(`message ${message}, stack ${stack}, context ${context}`);
  //   context ? super.log(message, stack, context) : super.log(message, stack);
  //   // super.log(message, stack, context);
  // }
  // verbose(message: any, stack?: string, context?: string) {
  //   // add your tailored logic here
  //   super.verbose(message, stack, context);
  // }
}
