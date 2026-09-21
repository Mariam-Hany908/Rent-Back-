import React, { useState } from 'react';
import { FoundationPlaceholder } from '../../components/common/FoundationPlaceholder';
import { CATEGORIES, getCategoryBySlug } from '../../utils/categories';
import { ProductCategorySlug, ProductCondition } from '../../types';
import { FormInput } from '../../components/forms/FormInput';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { Button } from '../../components/common/Button';
import { calculateSecurityDeposit, formatCurrencyEGP } from '../../utils/pricing';
import { ShieldCheck, Upload, Video, Info } from 'lucide-react';

export const AddListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategorySlug>('clothing');
  const [title, setTitle] = useState('');
  const [declaredValue, setDeclaredValue] = useState<number>(10000);
  const [rentalPricePerDay, setRentalPricePerDay] = useState<number>(500);
  const [condition, setCondition] = useState<ProductCondition>('like_new');
  const [usageDuration, setUsageDuration] = useState('6 months');
  const [description, setDescription] = useState('');
  const [categoryFieldValues, setCategoryFieldValues] = useState<Record<string, string>>({});

  const categoryDef = getCategoryBySlug(selectedCategory);
  const calculatedDeposit = calculateSecurityDeposit(declaredValue);

  const handleFieldChange = (name: string, value: string) => {
    setCategoryFieldValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <FoundationPlaceholder
        title="Add New Listing (Dynamic Category-Driven Form)"
        category="Listing Creation Engine"
        description="Dynamic category schema adapter. Form fields morph based on the chosen category (Clothing, Cameras, Electronics, Tools). Submitting initiates the DRAFT → PENDING_REVIEW lifecycle."
        targetPhase="Interactive multi-step wizard, drag-drop image uploader & video condition verification"
        dataEntities={[
          'CategoryFieldDefinition',
          'DynamicListingForm',
          'ProductMedia',
          'SecurityDepositFormula'
        ]}
        suggestedActions={[
          { label: 'Back to My Listings', to: '/owner/listings' },
          { label: 'View How Reviews Work', to: '/how-it-works' }
        ]}
      />

      <div className="rounded-xl border border-stone-200 bg-white p-6 space-y-6">
        {/* Step 1: Category Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
            1. Select Item Category
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setCategoryFieldValues({});
                }}
                className={`p-3 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'border-stone-900 bg-stone-900 text-white font-semibold'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <div className="font-bold">{cat.name}</div>
                <div className={`text-[10px] mt-0.5 line-clamp-1 ${selectedCategory === cat.slug ? 'text-stone-300' : 'text-stone-400'}`}>
                  {cat.fieldDefinitions.length} specific fields
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Core Product Information */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            2. General Product Information
          </h4>

          <FormInput
            label="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Sony Alpha 7 IV or Hugo Boss Tuxedo"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Product Condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value as ProductCondition)}
              options={[
                { value: 'brand_new', label: 'Brand New (Unused / Tagged)' },
                { value: 'like_new', label: 'Like New (Pristine, minor use)' },
                { value: 'good', label: 'Good (Fully functional, normal wear)' },
                { value: 'fair', label: 'Fair (Functional with cosmetic wear)' }
              ]}
            />

            <FormInput
              label="How long has this item been used?"
              value={usageDuration}
              onChange={(e) => setUsageDuration(e.target.value)}
              placeholder="e.g. 6 months, worn twice, 1 year"
              required
            />
          </div>

          <Textarea
            label="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detail the item features, history, and special handling instructions..."
            rows={3}
          />
        </div>

        {/* Step 3: Dynamic Category-Specific Fields */}
        {categoryDef && (
          <div className="space-y-4 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                3. {categoryDef.name} Dynamic Fields
              </h4>
              <span className="text-[11px] text-stone-400 font-mono">Dynamic Category Schema</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryDef.fieldDefinitions.map((field) => {
                if (field.type === 'select' && field.options) {
                  return (
                    <Select
                      key={field.name}
                      label={field.label}
                      value={categoryFieldValues[field.name] || ''}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      options={field.options}
                      placeholder={`Select ${field.label}`}
                    />
                  );
                }
                return (
                  <FormInput
                    key={field.name}
                    label={field.label}
                    value={categoryFieldValues[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder || `Enter ${field.label}`}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Value & Deposit Calculation Rule */}
        <div className="space-y-4 pt-4 border-t border-stone-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
            4. Pricing & Guaranteed 50% Security Deposit
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Product Declared Value (EGP)"
              type="number"
              value={declaredValue}
              onChange={(e) => setDeclaredValue(Number(e.target.value))}
              helperText="Fair market value if item needs total replacement"
              required
            />

            <FormInput
              label="Rental Price / Day (EGP)"
              type="number"
              value={rentalPricePerDay}
              onChange={(e) => setRentalPricePerDay(Number(e.target.value))}
              helperText="10% Rent Back commission deducted upon booking"
              required
            />
          </div>

          {/* Guaranteed Rule Feedback Box */}
          <div className="rounded-lg bg-stone-50 p-4 border border-stone-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <ShieldCheck className="w-4 h-4 text-stone-700" />
              <span>Automated Deposit & Commission Calculation</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-stone-600 pt-1">
              <div>
                <span className="text-stone-400 block text-[10px]">Declared Value</span>
                <span className="font-bold text-stone-900">{formatCurrencyEGP(declaredValue)}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Renter Deposit (Strict 50%)</span>
                <span className="font-bold text-stone-900">{formatCurrencyEGP(calculatedDeposit)}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Your Net per Day (90%)</span>
                <span className="font-bold text-stone-900">
                  {formatCurrencyEGP(rentalPricePerDay * 0.9)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 5: Submission & Review Notice */}
        <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Info className="w-4 h-4 text-stone-400 shrink-0" />
            <span>
              Listings are not visible immediately. They submit to Rent Back as PENDING_REVIEW.
            </span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Save as Draft
            </Button>
            <Button size="sm">Submit for Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
