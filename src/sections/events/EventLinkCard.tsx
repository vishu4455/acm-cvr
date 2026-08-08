import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { EventLink } from '@/data/events';

export function EventLinkCard({ event }: { event: EventLink }) {
  return (
    <Link to={event.route} className="block">
      <Card interactive className="h-full">
        <h3 className="text-h5 font-heading font-semibold text-text-primary mb-2">{event.title}</h3>
        <p className="text-body-sm text-text-secondary">{event.description}</p>
      </Card>
    </Link>
  );
}
