import { Col, Row, Spinner } from 'react-bootstrap';
import {
  Briefcase,
  BriefcaseFill,
  Check2All,
  CheckCircle,
  Compass,
  ListOl,
  PatchQuestion,
  PersonWorkspace,
} from 'react-bootstrap-icons';
import { FormattedMessage } from 'react-intl';

import { Glide } from '../../../components/Elements/Carousel/Glide.tsx';

import { StatCard } from './organisms/StatCard.tsx';

interface TicketStatisticsProps {
  stat: Statistics | undefined;
}

export const TicketStatistics = ({ stat }: TicketStatisticsProps) => {
  if (!stat) {
    return <Spinner animation="border" variant="primary"></Spinner>;
  }
  return (
    <Row className="gx-2">
      <Col className="p-0">
        <Glide
          noControls
          options={{
            gap: 0,
            rewind: false,
            bound: true,
            perView: 6,
            breakpoints: {
              400: { perView: 1 },
              600: { perView: 2 },
              1400: { perView: 3 },
              1600: { perView: 4 },
              1900: { perView: 5 },
              3840: { perView: 6 },
            },
          }}
        >
          <StatCard
            helper={<FormattedMessage id="stat.tickets.total-helper" />}
            header={<FormattedMessage id="stat.tickets.total"></FormattedMessage>}
            value={stat.tickets.total}
          >
            <ListOl></ListOl>
          </StatCard>
          <StatCard
            helper={<FormattedMessage id="stat.tickets.open-helper"></FormattedMessage>}
            header={<FormattedMessage id="stat.tickets.open"></FormattedMessage>}
            value={
              stat.tickets.Open +
              ' (' +
              stat.tickets['Open-days'] +
              ' / ' +
              stat.tickets['Open-hours'] +
              ')'
            }
          >
            <Compass></Compass>
          </StatCard>
          <StatCard
            helper={<FormattedMessage id="stat.tickets.in-progress-helper"></FormattedMessage>}
            header={<FormattedMessage id="stat.tickets.in-progress"></FormattedMessage>}
            value={
              stat.tickets['In Progress'] +
              ' (' +
              stat.tickets['In Progress-days'] +
              ' / ' +
              stat.tickets['In Progress-hours'] +
              ')'
            }
          >
            <PersonWorkspace></PersonWorkspace>
          </StatCard>
          <StatCard
            helper={<FormattedMessage id="stat.tickets.wait-response-helper"></FormattedMessage>}
            header={<FormattedMessage id="stat.tickets.wait-response"></FormattedMessage>}
            value={
              stat.tickets['Wait For Response'] +
              ' (' +
              stat.tickets['Wait For Response-days'] +
              ' / ' +
              stat.tickets['Wait For Response-hours'] +
              ')'
            }
          >
            <PatchQuestion></PatchQuestion>
          </StatCard>
          <StatCard
            helper={<FormattedMessage id="stat.tickets.closed-helper"></FormattedMessage>}
            header={<FormattedMessage id="stat.tickets.closed"></FormattedMessage>}
            value={
              stat.tickets.Closed +
              ' (' +
              stat.tickets['Closed-Days'] +
              ' / ' +
              stat.tickets['Closed-Hours'] +
              ')'
            }
          >
            <CheckCircle></CheckCircle>
          </StatCard>
          <StatCard
            helper={<FormattedMessage id="stat.projects.total-helper"></FormattedMessage>}
            header={<FormattedMessage id="stat.projects.total"></FormattedMessage>}
            value={stat.projects.total}
          >
            <BriefcaseFill></BriefcaseFill>
          </StatCard>
          <StatCard
            helper={<FormattedMessage id="stat.projects.closed-helper"></FormattedMessage>}
            header={<FormattedMessage id="stat.projects.closed"></FormattedMessage>}
            value={stat.projects.closed}
          >
            <Check2All></Check2All>
          </StatCard>
          <StatCard
            helper={<FormattedMessage id="stat.projects.open-helper"></FormattedMessage>}
            header={<FormattedMessage id="stat.projects.open"></FormattedMessage>}
            value={stat.projects.open}
          >
            <Briefcase></Briefcase>
          </StatCard>
        </Glide>
      </Col>
    </Row>
  );
};
