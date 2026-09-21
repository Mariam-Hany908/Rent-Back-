import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Code2 } from 'lucide-react';

interface FoundationPlaceholderProps {
  title: string;
  category?: string;
  description: string;
  targetPhase: string;
  dataEntities: string[];
  suggestedActions?: { label: string; to: string }[];
}

export const FoundationPlaceholder: React.FC<FoundationPlaceholderProps> = ({
  title,
  category = 'Application View',
  description,
  targetPhase,
  dataEntities,
  suggestedActions = []
}) => {
  return (
    <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-6 shadow-rentback-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#10605B]">
            {category}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] mt-0.5 tracking-tight">
            {title}
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F6F5] border border-[#A8E6DC] px-3 py-1 text-xs font-semibold text-[#10605B]">
          <Layers className="w-3.5 h-3.5 text-[#10605B]" />
          <span>Visual System Active</span>
        </span>
      </div>

      <p className="mt-4 text-sm text-slate-600 leading-relaxed max-w-3xl">
        {description}
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-slate-50/80 p-4 border border-slate-100 text-xs">
        <div>
          <span className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#10605B]" />
            <span>Bound Data Entities:</span>
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {dataEntities.map((entity) => (
              <span
                key={entity}
                className="rounded-md bg-white px-2.5 py-0.5 font-mono text-[11px] text-slate-700 border border-slate-200 shadow-2xs"
              >
                {entity}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="font-semibold text-slate-800 block mb-1">
            Next Scheduled Step:
          </span>
          <p className="text-slate-500 leading-relaxed">{targetPhase}</p>
        </div>
      </div>

      {suggestedActions.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400">Quick Test Links:</span>
          {suggestedActions.map((act) => (
            <Link
              key={act.to}
              to={act.to}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#10605B] hover:text-[#0B4541] underline underline-offset-4 decoration-[#1EC2A4]"
            >
              <span>{act.label}</span>
              <ArrowRight className="w-3 h-3 text-[#1EC2A4]" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
