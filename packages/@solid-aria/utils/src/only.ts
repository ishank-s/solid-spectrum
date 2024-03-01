
export function isValidElement(object:unknown) {
    return (
      typeof object === 'object' &&
      object !== null
    );
  }

export function onlyChild<T>(children: T): T {
    if (!isValidElement(children)) {
      throw new Error(
        'Solid.Children.only expected to receive a single Solid element child.',
      );
    }
  
    return children;
  }