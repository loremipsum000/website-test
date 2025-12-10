"use client";

const buttonClasses =
  "w-full md:w-auto font-semibold px-4 py-2 md:px-8 md:py-3 data-[status=active]:bg-hero-2/20 data-[status=active]:text-hero-2 rounded-full";

export const CardTabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: "virtual" | "physical";
  setActiveTab: (tab: "virtual" | "physical") => void;
}) => {
  return (
    <div className="w-full md:w-auto">
      <div className="flex rounded-full border border-[#AEAEB2] p-1 md:w-full md:items-center md:justify-evenly">
        <button
          data-status={activeTab === "virtual" ? "active" : "inactive"}
          onClick={() => setActiveTab("virtual")}
          className={buttonClasses}
        >
          Virtual <span className="hidden md:inline">Card</span>
        </button>
        <button
          data-status={activeTab === "physical" ? "active" : "inactive"}
          onClick={() => setActiveTab("physical")}
          className={buttonClasses}
        >
          Physical <span className="hidden md:inline">Card</span>
        </button>
      </div>
    </div>
  );
};
