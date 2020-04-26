interface TitleOptions {
  title?: string;
  titleStyle?: string;
  styles?: string | string[];
}

interface GroupOptions extends TitleOptions {
  collapsed?: boolean;
}

class Logger {
  protected readonly logger = console;

  table(obj: object): void {
    if (console.table === undefined) {
      this.logger.log(obj);
    }
    switch (typeof obj) {
      case 'object': {
        const formattedObject = Object.entries(obj).map(([key, value]) => [
          key,
          String(value),
        ]);
        this.logger.table(Object.fromEntries(formattedObject));
        break;
      }
      case 'undefined':
        this.logger.warn('No data');
        break;
      default:
        this.logger.log(obj);
    }
  }

  protected message(
    o: TitleOptions & { method: 'log' | 'debug' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...optionalParams: any[]
  ): void {
    const args = [];

    // create title args
    if (o.title) {
      const titleArgs = [
        `%c${o.title}%c`,
        `font-family: sans-serif; ${o.titleStyle}`,
        '',
      ];
      args.push(...titleArgs);
    }

    // pretty print single object
    if (optionalParams.length === 1 && typeof optionalParams[0] === 'object') {
      args.push(
        ...Object.entries(optionalParams[0]).map(entries =>
          Object.fromEntries([entries]),
        ),
      );
    } else {
      args.push(...optionalParams);
    }

    // pass args to selected method
    this.logger[o.method](...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(title?: string, ...optionalParams: any[]): void {
    this.message({ title, method: 'debug' }, ...optionalParams);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(title?: string, ...optionalParams: any[]): void {
    this.message({ title, method: 'log' }, ...optionalParams);
  }

  // group
  group(title: string, body?: () => void): void;
  group(options: GroupOptions, body?: () => void): void;
  group(o: string | GroupOptions, body?: () => void): void {
    const args = [];

    const method = typeof o === 'object' && o.collapsed ? 'groupCollapsed' : 'group';

    // create title args
    const title = typeof o === 'string' ? o : o.title;
    let titleStyles = 'font-weight: lighter; ';
    if (typeof o === 'object' && o.titleStyle) {
      titleStyles += o.titleStyle;
    }
    const titleArgs = [`%c${title}%c`, titleStyles, ''];
    args.push(...titleArgs);

    // create styles args
    if (typeof o === 'object' && o.styles) {
      const stylesArgs = !Array.isArray(o.styles) ? [o.styles] : o.styles;
      if (stylesArgs) {
        args.push(...stylesArgs);
      }
    }

    this.logger[method](...args);
    if (body) {
      body();
    }
    this.logger.groupEnd();
  }
}

export default Logger;
