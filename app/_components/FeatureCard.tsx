import { FeatureCardProps } from "../_types/types";

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border hover:border-primary/30 group">
      <div className="text-3xl mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-text opacity-80">{description}</p>
    </div>
  );
}
