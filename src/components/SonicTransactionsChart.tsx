"use client";

import { Card, Title, AreaChart } from "@tremor/react";
import { useMemo } from "react";

interface TransactionData {
  date: string;
  value: number;
}

export function SonicTransactionsChart() {
  const chartdata = useMemo(() => {
    // This would typically come from an API or props
    // For now, we'll use the CSV data directly
    return [
      { date: "12/2/2024", value: 4540 },
      { date: "12/3/2024", value: 4663 },
      { date: "12/4/2024", value: 6481 },
      { date: "12/5/2024", value: 6763 },
      { date: "12/6/2024", value: 9109 },
      { date: "12/7/2024", value: 6475 },
      { date: "12/8/2024", value: 6685 },
      { date: "12/9/2024", value: 7357 },
      { date: "12/10/2024", value: 9759 },
      { date: "12/11/2024", value: 19628 },
      { date: "12/12/2024", value: 20180 },
      { date: "12/13/2024", value: 10208 },
      { date: "12/14/2024", value: 21775 },
      { date: "12/15/2024", value: 27295 },
      { date: "12/16/2024", value: 22852 },
      { date: "12/17/2024", value: 12959 },
      { date: "12/18/2024", value: 234322 },
      { date: "12/19/2024", value: 335942 },
      { date: "12/20/2024", value: 431200 },
      { date: "12/21/2024", value: 538342 },
      { date: "12/22/2024", value: 594743 },
      { date: "12/23/2024", value: 330495 },
      { date: "12/24/2024", value: 239242 },
      { date: "12/25/2024", value: 453085 },
      { date: "12/26/2024", value: 508005 },
      { date: "12/27/2024", value: 458621 },
      { date: "12/28/2024", value: 384616 },
      { date: "12/29/2024", value: 327506 },
      { date: "12/30/2024", value: 499101 },
      { date: "12/31/2024", value: 317904 },
      { date: "1/1/2025", value: 368383 },
      { date: "1/2/2025", value: 550221 },
      { date: "1/3/2025", value: 702038 },
      { date: "1/4/2025", value: 308639 },
      { date: "1/5/2025", value: 498409 },
      { date: "1/6/2025", value: 682360 },
      { date: "1/7/2025", value: 706103 },
      { date: "1/8/2025", value: 649053 },
      { date: "1/9/2025", value: 424601 },
      { date: "1/10/2025", value: 510498 },
      { date: "1/11/2025", value: 625757 },
      { date: "1/12/2025", value: 816644 },
      { date: "1/13/2025", value: 975252 },
      { date: "1/14/2025", value: 429920 },
      { date: "1/15/2025", value: 403852 },
      { date: "1/16/2025", value: 386764 },
      { date: "1/17/2025", value: 221980 },
      { date: "1/18/2025", value: 382300 },
      { date: "1/19/2025", value: 469595 },
      { date: "1/20/2025", value: 318138 },
      { date: "1/21/2025", value: 341647 },
      { date: "1/22/2025", value: 327881 },
      { date: "1/23/2025", value: 275848 },
      { date: "1/24/2025", value: 236019 },
      { date: "1/25/2025", value: 163822 },
      { date: "1/26/2025", value: 181663 },
      { date: "1/27/2025", value: 295943 },
      { date: "1/28/2025", value: 171645 },
      { date: "1/29/2025", value: 206749 },
      { date: "1/30/2025", value: 201454 },
      { date: "1/31/2025", value: 245293 },
      { date: "2/1/2025", value: 182733 },
      { date: "2/2/2025", value: 328378 },
      { date: "2/3/2025", value: 495058 },
      { date: "2/4/2025", value: 289437 },
      { date: "2/5/2025", value: 239930 },
      { date: "2/6/2025", value: 334486 },
      { date: "2/7/2025", value: 279699 },
      { date: "2/8/2025", value: 267794 },
      { date: "2/9/2025", value: 255443 },
      { date: "2/10/2025", value: 273111 },
      { date: "2/11/2025", value: 251584 },
      { date: "2/12/2025", value: 476379 },
      { date: "2/13/2025", value: 376855 },
      { date: "2/14/2025", value: 310466 },
      { date: "2/15/2025", value: 293103 },
      { date: "2/16/2025", value: 309496 },
      { date: "2/17/2025", value: 407178 },
      { date: "2/18/2025", value: 472407 },
      { date: "2/19/2025", value: 818642 },
      { date: "2/20/2025", value: 1018359 },
      { date: "2/21/2025", value: 1383812 },
      { date: "2/22/2025", value: 760172 },
      { date: "2/23/2025", value: 624143 },
      { date: "2/24/2025", value: 942127 },
      { date: "2/25/2025", value: 1099118 },
      { date: "2/26/2025", value: 852171 },
      { date: "2/27/2025", value: 647575 },
      { date: "2/28/2025", value: 734180 },
      { date: "3/1/2025", value: 557499 },
      { date: "3/2/2025", value: 690468 },
      { date: "3/3/2025", value: 638721 },
      { date: "3/4/2025", value: 818253 },
      { date: "3/5/2025", value: 590573 },
      { date: "3/6/2025", value: 628590 },
      { date: "3/7/2025", value: 590718 },
      { date: "3/8/2025", value: 391874 },
      { date: "3/9/2025", value: 590284 },
      { date: "3/10/2025", value: 582073 },
      { date: "3/11/2025", value: 530271 },
      { date: "3/12/2025", value: 506036 },
      { date: "3/13/2025", value: 645430 },
      { date: "3/14/2025", value: 565143 },
      { date: "3/15/2025", value: 430090 },
      { date: "3/16/2025", value: 415356 },
      { date: "3/17/2025", value: 441323 },
      { date: "3/18/2025", value: 429793 },
      { date: "3/19/2025", value: 509489 },
      { date: "3/20/2025", value: 434642 },
      { date: "3/21/2025", value: 487938 },
      { date: "3/22/2025", value: 458462 },
      { date: "3/23/2025", value: 463695 },
      { date: "3/24/2025", value: 688757 },
      { date: "3/25/2025", value: 604753 },
      { date: "3/26/2025", value: 679479 },
      { date: "3/27/2025", value: 702217 },
      { date: "3/28/2025", value: 594199 },
      { date: "3/29/2025", value: 610317 },
      { date: "3/30/2025", value: 698917 },
      { date: "3/31/2025", value: 747668 },
      { date: "4/1/2025", value: 615031 },
      { date: "4/2/2025", value: 678798 },
      { date: "4/3/2025", value: 662773 },
      { date: "4/4/2025", value: 622484 },
      { date: "4/5/2025", value: 417344 },
      { date: "4/6/2025", value: 611880 },
      { date: "4/7/2025", value: 917815 },
      { date: "4/8/2025", value: 537161 },
      { date: "4/9/2025", value: 856445 },
      { date: "4/10/2025", value: 651736 },
      { date: "4/11/2025", value: 548412 },
      { date: "4/12/2025", value: 524486 },
      { date: "4/13/2025", value: 593420 },
      { date: "4/14/2025", value: 949185 },
      { date: "4/15/2025", value: 378093 },
      { date: "4/16/2025", value: 413934 },
      { date: "4/17/2025", value: 345868 },
      { date: "4/18/2025", value: 271558 },
      { date: "4/19/2025", value: 241314 },
      { date: "4/20/2025", value: 288982 },
      { date: "4/21/2025", value: 568772 },
      { date: "4/22/2025", value: 474944 },
      { date: "4/23/2025", value: 693627 },
      { date: "4/24/2025", value: 642842 },
      { date: "4/25/2025", value: 633449 },
      { date: "4/26/2025", value: 586216 },
      { date: "4/27/2025", value: 515586 },
      { date: "4/28/2025", value: 574592 },
      { date: "4/29/2025", value: 510038 },
      { date: "4/30/2025", value: 593412 },
      { date: "5/1/2025", value: 1309542 },
      { date: "5/2/2025", value: 1017681 },
      { date: "5/3/2025", value: 729136 },
      { date: "5/4/2025", value: 681545 },
      { date: "5/5/2025", value: 734008 },
      { date: "5/6/2025", value: 742209 },
      { date: "5/7/2025", value: 799957 },
      { date: "5/8/2025", value: 858943 },
      { date: "5/9/2025", value: 1016140 },
      { date: "5/10/2025", value: 774410 },
      { date: "5/11/2025", value: 815760 },
      { date: "5/12/2025", value: 976017 },
      { date: "5/13/2025", value: 842768 },
      { date: "5/14/2025", value: 717445 },
      { date: "5/15/2025", value: 893576 },
      { date: "5/16/2025", value: 878179 },
      { date: "5/17/2025", value: 916757 },
      { date: "5/18/2025", value: 869078 },
      { date: "5/19/2025", value: 856868 },
      { date: "5/20/2025", value: 767601 },
      { date: "5/21/2025", value: 952789 },
      { date: "5/22/2025", value: 1170156 },
      { date: "5/23/2025", value: 1799292 },
      { date: "5/24/2025", value: 609703 },
      { date: "5/25/2025", value: 650925 },
    ];
  }, []);

  return (
    <Card className="max-w-7xl mx-auto p-6 bg-black/90 border-shade-2">
      <Title className="text-2xl font-bold mb-4 text-white">Sonic Daily Transactions</Title>
      <AreaChart
        className="h-72 mt-4"
        data={chartdata}
        index="date"
        categories={["value"]}
        colors={["#3b82f6"]}
        valueFormatter={(number: number) => 
          new Intl.NumberFormat("en-US").format(number)
        }
        showLegend={false}
        showGridLines={true}
        showAnimation={true}
        showTooltip={true}
        showXAxis={true}
        showYAxis={true}
        yAxisWidth={80}
        customTooltip={(props) => {
          const { payload, active } = props;
          if (!active || !payload || !payload[0]?.value) return null;
          const value = typeof payload[0].value === 'number' ? payload[0].value : 0;
          return (
            <div className="w-56 rounded-tremor-default border border-shade-2 bg-black/90 p-2 text-white shadow-tremor-dropdown">
              <div className="flex flex-col gap-2">
                <p className="font-medium">
                  {payload[0]?.payload.date}
                </p>
                <p>
                  Transactions: {new Intl.NumberFormat("en-US").format(value)}
                </p>
              </div>
            </div>
          );
        }}
        style={{
          "--tremor-chart-grid": "rgba(255, 255, 255, 0.1)",
          "--tremor-chart-axis": "rgba(255, 255, 255, 0.5)",
          "--tremor-chart-text": "rgba(255, 255, 255, 0.8)",
        } as React.CSSProperties}
      />
    </Card>
  );
} 