import Polly from '../polly';

const { defineProperty } = Object;

export function beforeEach(
  context: object,
  recordingName: string,
  defaults?: PollyConfig
) {
  defineProperty(context, 'polly', {
    writable: true,
    enumerable: true,
    configurable: true,
    value: new Polly(recordingName, defaults)
  });
}

export async function afterEach(context: { polly: Polly }, framework: string) {
  await context.polly.stop();

  defineProperty(context, 'polly', {
    enumerable: true,
    configurable: true,
    get() {
      throw new Error(
        `[Polly] You are trying to access an instance of Polly that is no longer available.\n` +
          `See: https://netflix.github.io/pollyjs/#/test-frameworks/${framework}?id=test-hook-ordering`
      );
    }
  });
}
