import { facultyCoordinator } from '@/data/team';

export function FacultyCard() {
  return (
    <div className="mb-16 flex flex-col md:flex-row items-center gap-8 bg-surface-card border border-border-subtle rounded-sm p-8 max-w-3xl mx-auto">
      <img
        src={facultyCoordinator.photo}
        alt={facultyCoordinator.name}
        className="h-28 w-28 rounded-full object-cover"
        style={{ filter: 'grayscale(15%) contrast(1.05)' }}
      />
      <div>
        <p className="font-mono text-label uppercase tracking-widest text-text-muted mb-2">
          Faculty Coordinator
        </p>
        <h3 className="text-h4 font-heading font-semibold text-text-primary">{facultyCoordinator.name}</h3>
        <p className="text-body-sm text-text-muted mb-3">{facultyCoordinator.credentials} · {facultyCoordinator.role}</p>
        <p className="text-body-sm text-text-secondary">{facultyCoordinator.bio}</p>
      </div>
    </div>
  );
}
