import excerpt from './excerpt';

const cn = (...args) => args.filter(Boolean).join(' ');

export { excerpt, cn };
