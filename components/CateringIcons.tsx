// Minimal inline SVG icons for the catering LP.
// All icons use currentColor so they inherit the surrounding text color.

type Props = { size?: number; className?: string };

const P = ({ size = 32, className = "", children }: Props & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {children}
  </svg>
);

// Use case icons
export const GroupIcon = (p: Props) => (
  <P {...p}>
    <circle cx="16" cy="17" r="5" />
    <circle cx="32" cy="17" r="5" />
    <circle cx="24" cy="13" r="5" />
    <path d="M8 36c0-4 3-8 8-8s8 4 8 8" />
    <path d="M24 36c0-4 3-8 8-8s8 4 8 8" />
  </P>
);

export const BuildingIcon = (p: Props) => (
  <P {...p}>
    <path d="M10 40V12l14-4 14 4v28" />
    <path d="M10 40H38" />
    <path d="M16 20h4M28 20h4M16 28h4M28 28h4M22 40v-8h4v8" />
  </P>
);

export const ChartIcon = (p: Props) => (
  <P {...p}>
    <path d="M8 38h32" />
    <path d="M12 38V26" />
    <path d="M20 38V18" />
    <path d="M28 38V22" />
    <path d="M36 38V14" />
    <path d="M10 14l6 4 6-6 8 4 6-4" />
  </P>
);

export const FamilyIcon = (p: Props) => (
  <P {...p}>
    <circle cx="16" cy="14" r="4" />
    <circle cx="32" cy="14" r="4" />
    <circle cx="24" cy="26" r="3" />
    <path d="M10 28c0-4 3-6 6-6s6 2 6 6" />
    <path d="M26 28c0-4 3-6 6-6s6 2 6 6" />
    <path d="M19 38c0-3 2-5 5-5s5 2 5 5" />
  </P>
);

export const ClapperboardIcon = (p: Props) => (
  <P {...p}>
    <rect x="6" y="16" width="36" height="24" rx="2" />
    <path d="M6 24h36" />
    <path d="M12 16l-4-6 8-2 4 6M22 16l-4-6 8-2 4 6M32 16l-4-6 8-2 4 6" />
  </P>
);

export const GlassesIcon = (p: Props) => (
  <P {...p}>
    <path d="M14 8l2 10c0 3 2 5 5 5v14M21 33h-6M21 33h6M14 8h8" />
    <path d="M34 8l-2 10c0 3-2 5-5 5v14M27 33h6M34 8h-8" />
  </P>
);

// Reasons icons
export const TrophyIcon = (p: Props) => (
  <P {...p}>
    <path d="M16 8h16v10c0 5-4 9-8 9s-8-4-8-9V8z" />
    <path d="M16 12H10v4c0 3 3 5 6 5M32 12h6v4c0 3-3 5-6 5" />
    <path d="M20 27v6M28 27v6M16 40h16l-2-6H18l-2 6z" />
  </P>
);

export const ChefIcon = (p: Props) => (
  <P {...p}>
    <path d="M14 22c-3-1-6-4-6-8 0-5 4-8 9-8 2 0 4 1 5 2 1-1 3-2 5-2 5 0 9 3 9 8 0 4-3 7-6 8" />
    <path d="M14 22v14h20V22" />
    <path d="M14 30h20" />
  </P>
);

export const TruckIcon = (p: Props) => (
  <P {...p}>
    <rect x="4" y="14" width="22" height="18" rx="1" />
    <path d="M26 20h10l6 6v6H26" />
    <circle cx="14" cy="36" r="4" />
    <circle cx="34" cy="36" r="4" />
  </P>
);

// Customization icons
export const SwapIcon = (p: Props) => (
  <P {...p}>
    <path d="M10 16l8-8M10 16l8 8M10 16h22" />
    <path d="M38 32l-8-8M38 32l-8 8M38 32H16" />
  </P>
);

export const LeafIcon = (p: Props) => (
  <P {...p}>
    <path d="M10 40c0-18 14-28 32-28-2 18-12 28-28 28-2 0-4 0-4 0z" />
    <path d="M10 40c8-10 14-16 22-20" />
  </P>
);

export const ChildIcon = (p: Props) => (
  <P {...p}>
    <circle cx="24" cy="14" r="5" />
    <path d="M18 22c0 4-3 7-6 9M30 22c0 4 3 7 6 9" />
    <path d="M16 40v-8c0-5 4-10 8-10s8 5 8 10v8" />
    <path d="M20 40v-6M28 40v-6" />
  </P>
);

export const NoEntryIcon = (p: Props) => (
  <P {...p}>
    <circle cx="24" cy="24" r="16" />
    <path d="M13 13l22 22" />
  </P>
);

// Process step icons (same as use case for 1; reuse where possible)
export const PeopleIcon = GroupIcon;
export const ClipboardIcon = (p: Props) => (
  <P {...p}>
    <rect x="12" y="10" width="24" height="32" rx="2" />
    <rect x="18" y="6" width="12" height="8" rx="1" />
    <path d="M18 22h12M18 28h12M18 34h8" />
  </P>
);

export const CheersIcon = (p: Props) => (
  <P {...p}>
    <path d="M12 8l4 14c1 2 3 3 5 3v13M17 38h-5M17 38h5" />
    <path d="M36 8l-4 14c-1 2-3 3-5 3v13M31 38h5M31 38h-5" />
    <path d="M18 14l12-4" />
  </P>
);

// Trust badges
export const ClockIcon = (p: Props) => (
  <P {...p}>
    <circle cx="24" cy="24" r="16" />
    <path d="M24 14v10l6 4" />
  </P>
);

export const ShieldIcon = (p: Props) => (
  <P {...p}>
    <path d="M24 6l14 6v12c0 10-7 16-14 18-7-2-14-8-14-18V12l14-6z" />
    <path d="M18 24l4 4 8-8" />
  </P>
);

export const LockIcon = (p: Props) => (
  <P {...p}>
    <rect x="10" y="20" width="28" height="20" rx="2" />
    <path d="M16 20v-6c0-4 3-8 8-8s8 4 8 8v6" />
    <circle cx="24" cy="30" r="2" />
    <path d="M24 32v4" />
  </P>
);

// — Additional icons used by the /bento-delivery pages —

export const HandshakeIcon = (p: Props) => (
  <P {...p}>
    <path d="M4 22l6-6 6 4 6-4 6 4 6-6M16 20l-4 4M28 20l4 4" />
    <path d="M18 28l2-2 4 2 2-2" />
    <path d="M10 28l4 4h20l4-4" />
  </P>
);

export const TempleIcon = (p: Props) => (
  <P {...p}>
    <path d="M6 18l18-10 18 10" />
    <path d="M10 18v18M38 18v18" />
    <path d="M6 40h36" />
    <path d="M16 36v-10h16v10" />
    <path d="M22 40v-6h4v6" />
  </P>
);

export const CameraIcon = (p: Props) => (
  <P {...p}>
    <rect x="6" y="14" width="36" height="24" rx="2" />
    <path d="M16 14l3-4h10l3 4" />
    <circle cx="24" cy="26" r="6" />
    <circle cx="36" cy="20" r="1.5" fill="currentColor" />
  </P>
);

export const HouseIcon = (p: Props) => (
  <P {...p}>
    <path d="M6 22L24 8l18 14" />
    <path d="M10 20v20h28V20" />
    <path d="M20 40V30h8v10" />
    <path d="M14 26h4M30 26h4" />
  </P>
);

export const CelebrateIcon = (p: Props) => (
  <P {...p}>
    <path d="M8 40l8-20 14 14-20 8z" />
    <path d="M28 8l2 4M36 8l-2 4M38 18l-4 2M38 10l-2-2" />
    <circle cx="36" cy="14" r="1.5" fill="currentColor" />
  </P>
);

export const CheckMarkIcon = (p: Props) => (
  <P {...p}>
    <circle cx="24" cy="24" r="18" />
    <path d="M15 24l6 6 12-14" />
  </P>
);

export const YenIcon = (p: Props) => (
  <P {...p}>
    <circle cx="24" cy="24" r="18" />
    <path d="M16 14l8 10 8-10M24 24v12M16 28h16M16 32h16" />
  </P>
);

export const TenIcon = (p: Props) => (
  <P {...p}>
    <circle cx="24" cy="24" r="18" />
    <text
      x="24"
      y="30"
      textAnchor="middle"
      fontSize="16"
      fontFamily="var(--f-mono)"
      fontWeight="500"
      fill="currentColor"
      stroke="none"
    >
      10
    </text>
  </P>
);

export const VanIcon = (p: Props) => (
  <P {...p}>
    <rect x="4" y="14" width="22" height="18" rx="1" />
    <path d="M26 18h10l6 6v8H26" />
    <path d="M4 26h22" />
    <circle cx="14" cy="36" r="4" />
    <circle cx="34" cy="36" r="4" />
  </P>
);

export const BoxIcon = (p: Props) => (
  <P {...p}>
    <path d="M8 16l16-8 16 8v16l-16 8-16-8z" />
    <path d="M8 16l16 8 16-8M24 24v16" />
  </P>
);

export const PinIcon = (p: Props) => (
  <P {...p}>
    <path d="M24 6c-7 0-13 5-13 13 0 10 13 23 13 23s13-13 13-23c0-8-6-13-13-13z" />
    <circle cx="24" cy="19" r="5" />
  </P>
);

export const ShojinIcon = (p: Props) => (
  <P {...p}>
    <path d="M8 28c0-10 7-18 16-18s16 8 16 18H8z" />
    <path d="M8 28l2 8h28l2-8" />
    <path d="M16 14l-2-4M32 14l2-4M24 10V4" />
  </P>
);

export const KidsIcon = ChildIcon;
export const SpecialIcon = (p: Props) => (
  <P {...p}>
    <path d="M24 6l5 12 13 1-10 9 3 13-11-7-11 7 3-13-10-9 13-1z" />
  </P>
);

export const CustomIcon = (p: Props) => (
  <P {...p}>
    <path d="M10 16h28M10 24h28M10 32h20" />
    <circle cx="16" cy="16" r="3" fill="var(--paper)" />
    <circle cx="32" cy="24" r="3" fill="var(--paper)" />
    <circle cx="22" cy="32" r="3" fill="var(--paper)" />
  </P>
);

export const AllergyIcon = LeafIcon;

// Lookup helper — keeps page components concise
export function CateringIcon({
  name,
  size = 32,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const icons: Record<string, (props: Props) => JSX.Element> = {
    group: GroupIcon,
    building: BuildingIcon,
    chart: ChartIcon,
    family: FamilyIcon,
    clapperboard: ClapperboardIcon,
    glasses: GlassesIcon,
    trophy: TrophyIcon,
    chef: ChefIcon,
    truck: TruckIcon,
    swap: SwapIcon,
    leaf: LeafIcon,
    child: ChildIcon,
    noentry: NoEntryIcon,
    people: PeopleIcon,
    clipboard: ClipboardIcon,
    cheers: CheersIcon,
    clock: ClockIcon,
    shield: ShieldIcon,
    lock: LockIcon,
    // bento-delivery extras
    handshake: HandshakeIcon,
    temple: TempleIcon,
    camera: CameraIcon,
    house: HouseIcon,
    celebrate: CelebrateIcon,
    check: CheckMarkIcon,
    yen: YenIcon,
    ten: TenIcon,
    van: VanIcon,
    box: BoxIcon,
    pin: PinIcon,
    shojin: ShojinIcon,
    allergy: AllergyIcon,
    kids: KidsIcon,
    special: SpecialIcon,
    custom: CustomIcon,
  };
  const Cmp = icons[name] || GroupIcon;
  return <Cmp size={size} className={className} />;
}
