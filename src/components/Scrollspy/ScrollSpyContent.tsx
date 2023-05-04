import { ChevronBarRight } from 'react-bootstrap-icons';

import { ScrollSpyItems } from '../../stores/scrollspy.ts';

interface ScrollSpyContentProps {
  items: ScrollSpyItems[];
}

export const ScrollSpyContent = ({ items }: ScrollSpyContentProps) => {
  return (
    <ul className="nav flex-column">
      {items.map((item, index) => (
        <li key={index}>
          <a className="nav-link" href={`#${item.id}`}>
            <ChevronBarRight></ChevronBarRight>
            <span className="align-middle">{item.text}</span>
          </a>
          {item.subs && (
            <ul className="nav flex-column">
              {item.subs.map((sub, subIndex) => (
                <li key={subIndex}>
                  <a className="nav-link" href={`#${sub.id}`}>
                    {sub.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
