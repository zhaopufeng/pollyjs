import createNodeTestConfig from '../../../build-scripts/rollup.node.test.config';

export default createNodeTestConfig({
  external: ['http', 'https', 'url', 'crypto']
});
