import * as Flags from 'country-flag-icons/react/1x1';

type FlagComponentType = React.ComponentType<{ title: string; className: string }>;
type FlagsIndex = {
  [key: string]: FlagComponentType;
};

interface FlagProps {
  countryCode: string;
  className?: string;
}

export default function Flag({ countryCode, className = '' }: FlagProps) {
  if (!countryCode || countryCode === 'ETC') {
    return null;
  }

  const FlagComponent = (Flags as FlagsIndex)[countryCode];

  if (!FlagComponent) {
    return null;
  }

  return <FlagComponent title={countryCode} className={className} />;
}
