import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Shirt, Cpu, Wrench, ArrowRight, LucideIcon } from 'lucide-react';
import { Category } from '../../types';

export interface CategoryCardProps {
  category: Category;
  itemCount?: number;
  imageUrl?: string;
  className?: string;
}

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  cameras: Camera,
  clothing: Shirt,
  electronics: Cpu,
  tools: Wrench
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  itemCount,
  imageUrl,
  className = ''
}) => {
  const IconComponent = CATEGORY_ICON_MAP[category.slug] || Cpu;

  return (
    <Link
      to={`/categories/${category.slug}`}
      className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#10605B] hover:shadow-rentback-hover ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F6F5] text-[#10605B] group-hover:bg-[#10605B] group-hover:text-[#1EC2A4] transition-colors duration-200 shadow-2xs">
            <IconComponent className="w-6 h-6" />
          </div>

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#10605B]/10 group-hover:text-[#10605B] transition-colors">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        <h3 className="text-base font-bold text-[#0B132B] group-hover:text-[#10605B] transition-colors">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <span className="font-semibold text-slate-400">
          {itemCount !== undefined ? `${itemCount} verified items` : `${category.fieldDefinitions.length} specific fields`}
        </span>
        <span className="font-bold text-[#10605B] opacity-0 group-hover:opacity-100 transition-opacity">
          Browse items →
        </span>
      </div>
    </Link>
  );
};
