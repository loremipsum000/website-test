interface NetworkStat {
  title: string;
  value: string;
  url?: string;
}

interface NetworkStatsCardProps {
  stats: NetworkStat[];
}

export const NetworkStatsCard = ({ stats }: NetworkStatsCardProps) => {
  // TODO: These values should be managed in Sanity CMS instead of being hardcoded
  // Current stats array is being overridden to reflect latest requirements
  const hardcodedStats = [
    {
      title: "Confirmation time",
      value: "Real time"
    },
    {
      title: "Transaction speed",
      value: "~400k/s",
      url: "https://chainspect.app/chain/sonic"
    },
    {
      title: "Average transaction cost",
      value: "$0.001"
    }
  ];

  return (
    <div className="grow sm:whitespace-nowrap">
      <div className="flex w-full flex-col gap-y-4 rounded-3xl border shadow-lg p-8">
        {hardcodedStats.map((stat: NetworkStat, i: number) => (
          <div key={i} className="flex flex-col gap-y-2">
            <div className="text-body-lg font-bold">{stat.title}</div>
            <div>
              {stat.url ? (
                <a href={stat.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                  <span className="text-h4 text-transparent bg-clip-text bg-gradient-sonic-horizontal">
                    {stat.value}
                  </span>
                </a>
              ) : (
                <span className="text-h4 text-transparent bg-clip-text bg-gradient-sonic-horizontal">
                  {stat.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
