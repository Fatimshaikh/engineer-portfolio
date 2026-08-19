export const DNS_STEPS = [
  {
    step: "01",
    title: "Browser",
    text: "You typed fatimashaikh.vercel.app and hit enter. Your browser doesn't know where that actually lives yet.",
  },
  {
    step: "02",
    title: "Resolver",
    text: "Your browser asks a DNS resolver to find out. The resolver's whole job is translating names into addresses.",
  },
  {
    step: "03",
    title: "DNS Infrastructure",
    text: "The resolver checks the root, then the .app TLD, then the authoritative nameserver responsible for this exact domain.",
  },
  {
    step: "04",
    title: "DNS Record",
    text: "The authoritative nameserver returns a record telling the resolver exactly where this hostname points.",
  },
  {
    step: "05",
    title: "Vercel + Next.js",
    text: "With a destination in hand, your browser opens an HTTPS connection. Vercel receives it and serves this Next.js application.",
  },
];

export const RECORD_CARD = {
  hostname: "fatimashaikh.vercel.app",
  type: "CNAME",
  destination: "cname.vercel-dns.com",
  status: "Resolved",
};

export const BEFORE_AFTER = {
  before: "domain -> server -> website",
  after: "Browser -> Resolver -> Root -> TLD -> Authoritative nameserver -> Record -> Destination -> HTTPS -> Vercel -> Next.js",
};
