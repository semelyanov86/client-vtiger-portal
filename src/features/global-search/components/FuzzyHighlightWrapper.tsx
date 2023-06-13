import FuzzyHighlighter from 'react-fuzzy-highlighter';

import { SearchItem } from '../types';

type FuzzyHighlighterWrapperProps = {
  query: string;
  data: SearchItem[];
  options: any; // Replace this with the actual options type.
  children: (props: any) => React.ReactNode; // Replace 'any' with the actual type of props passed to children.
};

export const FuzzyHighlightWrapper = (props: FuzzyHighlighterWrapperProps) => {
  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <FuzzyHighlighter {...props}>
        {(fuzzyProps) => {
          const renderedChildren = props.children(fuzzyProps);
          return renderedChildren ? <>{renderedChildren}</> : null;
        }}
      </FuzzyHighlighter>
    </>
  );
};
