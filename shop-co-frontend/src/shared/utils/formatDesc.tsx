interface Props {
  description: string;
}

export default function FormatDesc({ description }: Props) {
  return <p className="ellipsis">
    {description}
  </p>;
}
