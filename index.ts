class Meta {
  value: any = undefined;
  setState = <T>(value: T): void => {
    this.value = value;
  };
  useState = <T>(initialState: T): any[] => {
    return [this.value, this.setState];
  };
}

const React = new Meta();

const [count, setCount] = React.useState<number>(8);
