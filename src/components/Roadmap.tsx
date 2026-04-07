import historyData from "@/data/history.json";

export default function Roadmap() {
  return (
    <div className="relative border-l-2 border-hitam-green/20 ml-4 md:ml-6 py-4 space-y-12">
      {historyData.map((item, index) => (
        <div key={index} className="relative pl-8 md:pl-10 group">
          <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-hitam-green shadow-sm ring-4 ring-hitam-green/10 group-hover:scale-125 group-hover:ring-hitam-green/20 transition-all" />
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
            <span className="text-sm font-bold tracking-wider text-hitam-green/80 uppercase">
              {item.date}
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {item.eventName}
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed max-w-2xl dark:text-gray-400">
            {item.description || item.highlights}
          </p>
        </div>
      ))}
    </div>
  );
}
