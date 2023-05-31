import { Rte } from './Rte';

export default { title: 'Atoms/Rte', component: Rte };

export const example = () => (
  <Rte>
    {`
      <h1>This html could come from your cms</h1>
      <p>It is dangerousely being set as content, so beware of you submit into this component</p>
      <ul>
        <li>Beware of scripts</li>
        <li>Style all elements scoped to the component</li>
      </ul>
    `}
  </Rte>
);
