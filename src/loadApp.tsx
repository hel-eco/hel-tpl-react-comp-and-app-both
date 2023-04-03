import comps from 'components';

const { REACT_APP_COMP_TYPE = 'HelloRemoteReactComp' } = process.env;
// @ts-ignore
export const App = comps[REACT_APP_COMP_TYPE] || (() => <h1>comp {REACT_APP_COMP_TYPE} not defined</h1>);
