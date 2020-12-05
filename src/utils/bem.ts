// eslint-disable-next-line no-restricted-imports
import {withNaming, ClassNameFormatter} from '@bem-react/classname';
import {panic} from './common';

export const cn = (...args: (boolean | null | undefined | string)[]): string =>
  args.filter(x => x).join(' ');

type Initializer = (blockName: string) => ClassNameFormatter;

const existingBlocks: Record<string, boolean> = {};
const rawInitializer = withNaming({n: '', e: '__', m: '--', v: '_'});
const bem: Initializer =
  process.env.NODE_ENV === 'production'
    ? rawInitializer
    : blockName => {
        if (existingBlocks[blockName]) panic(`block with name '${blockName}' already exists`);
        existingBlocks[blockName] = true;
        return rawInitializer(blockName);
      };
export default bem;
