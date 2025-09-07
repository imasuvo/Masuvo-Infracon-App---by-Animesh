import React, { useState, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import type { Resource, CalculatedResource, QualityOption } from '../types';

const indianStatesAndCities: { [key: string]: string[] } = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  "Arunachal Pradesh": ["Itanagar", "Tawang"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
  "Haryana": ["Faridabad", "Gurugram", "Panipat"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Shillong"],
  "Mizoram": ["Aizawl"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee"],
  "West Bengal": ["Kolkata", "Asansol", "Durgapur", "Siliguri"],
};

const RESOURCES_DATA: Resource[] = [
    { name: 'Cement', unit: 'Bag', quantityFactor: 0.45, qualityOptions: { 'Basic': 350, 'Medium': 382, 'Premium': 420 }, defaultQuality: 'Medium' },
    { name: 'Steel', unit: 'KG', quantityFactor: 3.5, qualityOptions: { 'Basic': 40, 'Medium': 45, 'Premium': 55 }, defaultQuality: 'Medium' },
    { name: 'Bricks', unit: 'Pcs', quantityFactor: 19, qualityOptions: { 'Basic': 6, 'Medium': 7, 'Premium': 9 }, defaultQuality: 'Medium' },
    { name: 'Aggregate', unit: 'Cft', quantityFactor: 1.9, qualityOptions: { 'Basic': 28, 'Medium': 31, 'Premium': 35 }, defaultQuality: 'Medium' },
    { name: 'Sand', unit: 'Cft', quantityFactor: 2, qualityOptions: { 'Basic': 35, 'Medium': 39, 'Premium': 45 }, defaultQuality: 'Medium' },
    { name: 'Flooring', unit: 'Sq. Ft', quantityFactor: 1, qualityOptions: { 'Basic': 60, 'Medium': 89, 'Premium': 150 }, defaultQuality: 'Medium' },
    { name: 'Windows', unit: 'Sq. Ft', quantityFactor: 0.17, qualityOptions: { 'Basic': 180, 'Medium': 221, 'Premium': 300 }, defaultQuality: 'Medium' },
    { name: 'Doors', unit: 'Sq. Ft', quantityFactor: 0.18, qualityOptions: { 'Basic': 280, 'Medium': 318, 'Premium': 450 }, defaultQuality: 'Medium' },
    { name: 'Electrical Fittings', unit: 'Sq. Ft', quantityFactor: 0.15, qualityOptions: { 'Basic': 45, 'Medium': 58, 'Premium': 80 }, defaultQuality: 'Medium' },
    { name: 'Painting', unit: 'Sq. Ft', quantityFactor: 6, qualityOptions: { 'Basic': 18, 'Medium': 24, 'Premium': 35 }, defaultQuality: 'Medium' },
    { name: 'Sanitary Fittings', unit: 'Sq. Ft', quantityFactor: 1, qualityOptions: { 'Basic': 45, 'Medium': 62, 'Premium': 90 }, defaultQuality: 'Medium' },
    { name: 'Kitchen Work', unit: 'Sq. Ft', quantityFactor: 0.055, qualityOptions: { 'Platform/Sink': 700, 'Semi Modular': 921, 'Modular': 1500 }, defaultQuality: 'Semi Modular' },
    { name: 'Contractor (RCC, etc.)', unit: 'Sq. Ft', quantityFactor: 1, qualityOptions: { 'Basic': 180, 'Medium': 210, 'Premium': 250 }, defaultQuality: 'Medium' },
];

const PieChart: React.FC<{ data: { name: string; value: number }[] }> = ({ data }) => {
    const colors = ['#FFD700', '#FFA500', '#FF6347', '#4682B4', '#32CD32', '#DA70D6', '#6A5ACD', '#FF4500', '#20B2AA', '#D2B48C', '#9ACD32', '#BA55D3', '#BDB76B'];
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    return (
        <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-full h-64">
            {data.map((item, index) => {
                const percent = item.value / total;
                const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                cumulativePercent += percent;
                const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                const largeArcFlag = percent > 0.5 ? 1 : 0;

                const pathData = [
                    `M ${startX} ${startY}`, // Move
                    `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                    'L 0 0', // Line to center
                ].join(' ');

                return <path key={item.name} d={pathData} fill={colors[index % colors.length]} />;
            })}
        </svg>
    );
};


const BudgetPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [area, setArea] = useState(1000);
    const [unit, setUnit] = useState<'sqft' | 'sqm'>('sqft');
    const [calculatedData, setCalculatedData] = useState<CalculatedResource[]>([]);
    
    const cities = useMemo(() => indianStatesAndCities[selectedState] || [], [selectedState]);

    useEffect(() => {
        if(cities.length > 0) {
            setSelectedCity(cities[0]);
        } else {
            setSelectedCity('');
        }
    }, [cities]);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        const areaInSqFt = unit === 'sqm' ? area * 10.764 : area;

        const results = RESOURCES_DATA.map(resource => {
            const calculatedQuantity = resource.quantityFactor * areaInSqFt;
            const price = resource.qualityOptions[resource.defaultQuality] || 0;
            const calculatedAmount = calculatedQuantity * price;
            
            return {
                ...resource,
                selectedQuality: resource.defaultQuality,
                calculatedQuantity: `${Math.round(calculatedQuantity).toLocaleString('en-IN')} ${resource.unit}`,
                calculatedAmount: Math.round(calculatedAmount),
            };
        });

        setCalculatedData(results);
        setStep(2);
    };

    const handleQualityChange = (resourceName: string, newQuality: QualityOption) => {
        setCalculatedData(prevData => {
            return prevData.map(resource => {
                if(resource.name === resourceName) {
                    const areaInSqFt = unit === 'sqm' ? area * 10.764 : area;
                    const calculatedQuantity = resource.quantityFactor * areaInSqFt;
                    const price = resource.qualityOptions[newQuality] || 0;
                    const calculatedAmount = calculatedQuantity * price;
                    return { ...resource, selectedQuality: newQuality, calculatedAmount: Math.round(calculatedAmount) };
                }
                return resource;
            });
        });
    };

    const totalCost = useMemo(() => {
        return calculatedData.reduce((sum, item) => sum + item.calculatedAmount, 0);
    }, [calculatedData]);
    
    const areaInSqFt = unit === 'sqm' ? area * 10.764 : area;
    const costPerSqFt = totalCost > 0 ? totalCost / areaInSqFt : 0;

    const chartData = useMemo(() => 
        calculatedData.map(d => ({ name: d.name, value: d.calculatedAmount }))
    , [calculatedData]);

    const renderStep1 = () => (
        <>
            <h2 className="text-3xl font-bold mb-2 text-golden-yellow">Home Construction Cost Calculator</h2>
            <p className="text-gray-300 mb-8">Estimate Your Budget</p>
            <form onSubmit={handleCalculate} className="space-y-6 bg-zinc-800 p-6 rounded-xl">
                 <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-1">Select State</label>
                    <select id="state" value={selectedState} onChange={e => setSelectedState(e.target.value)} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3" required>
                        <option value="" disabled>-- Select a State --</option>
                        {Object.keys(indianStatesAndCities).sort().map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-1">Select City</label>
                    <select id="city" value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3" required disabled={!selectedState}>
                        <option value="" disabled>-- Select a City --</option>
                        {cities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">Area (Plot Size)</label>
                    <input id="area" type="number" value={area} onChange={e => setArea(Number(e.target.value))} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3" required min="1"/>
                </div>
                <div className="flex items-center gap-4">
                    <label className="flex items-center text-gray-300">
                        <input type="radio" name="unit" value="sqft" checked={unit === 'sqft'} onChange={() => setUnit('sqft')} className="form-radio accent-golden-yellow mr-2"/>
                        Sq. Feet
                    </label>
                     <label className="flex items-center text-gray-300">
                        <input type="radio" name="unit" value="sqm" checked={unit === 'sqm'} onChange={() => setUnit('sqm')} className="form-radio accent-golden-yellow mr-2"/>
                        Sq. Meter
                    </label>
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                    Next →
                </button>
            </form>
        </>
    );

    const renderStep2 = () => (
        <>
             <h2 className="text-3xl font-bold mb-2 text-golden-yellow">Estimated Results</h2>
             <p className="text-gray-300 mb-2">For {area} {unit === 'sqft' ? 'Sq. Feet' : 'Sq. Meter'} in {selectedCity}, {selectedState}</p>
             <button onClick={() => setStep(1)} className="text-sm text-golden-yellow hover:underline mb-6">← Go Back & Edit</button>

            <div className="bg-zinc-800 p-6 rounded-xl mb-6">
                <h3 className="text-lg text-gray-400">Total Estimated Cost</h3>
                <p className="text-4xl font-bold text-golden-yellow my-2">₹{totalCost.toLocaleString('en-IN')}</p>
                <p className="text-sm text-gray-300">Cost Per Sq. Ft: <span className="font-semibold">₹{costPerSqFt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                
                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Cost Distribution</h4>
                    <PieChart data={chartData} />
                </div>
            </div>

            <div className="space-y-4">
                 <h3 className="text-xl font-semibold text-golden-yellow mb-2">Phase-wise Cost Breakdown</h3>
                {calculatedData.map(resource => (
                    <div key={resource.name} className="bg-zinc-800 p-4 rounded-xl">
                        <div className="flex justify-between items-start">
                           <div>
                                <h4 className="font-bold">{resource.name}</h4>
                                <p className="text-sm text-gray-400">Qty: {resource.calculatedQuantity}</p>
                           </div>
                           <p className="text-lg font-semibold text-golden-yellow">₹{resource.calculatedAmount.toLocaleString('en-IN')}</p>
                        </div>
                         <div className="mt-2">
                            <select value={resource.selectedQuality} onChange={e => handleQualityChange(resource.name, e.target.value as QualityOption)} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-2 text-sm">
                                {Object.keys(resource.qualityOptions).map(q => <option key={q} value={q}>{q}</option>)}
                            </select>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center bg-zinc-900 p-6 rounded-xl border border-golden-yellow/30">
                <h3 className="text-lg text-gray-400">Total Estimated Amount</h3>
                <p className="text-3xl font-bold text-golden-yellow my-2">₹{totalCost.toLocaleString('en-IN')}</p>
            </div>

             <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button onClick={() => alert('PDF download functionality coming soon!')} className="flex-1 bg-zinc-700 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-zinc-600 transition-colors">
                    Download Estimate PDF
                </button>
                 <ReactRouterDOM.Link to="/contact" className="flex-1 text-center bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                    Request Custom Quote
                </ReactRouterDOM.Link>
            </div>

            <div className="mt-8 text-xs text-gray-500 bg-zinc-800 p-4 rounded-lg">
                <h4 className="font-bold mb-1">Disclaimer</h4>
                <p>The costs indicated are approximate for each resource. Actual costs may vary by city and project requirements. Please consult your contractor or visit our nearest outlet for accurate pricing. The amount shown does not include compound wall area. Default quality is Medium but can be changed using dropdown options.</p>
            </div>
        </>
    );

    return (
        <div className="p-4 min-h-screen">
            {step === 1 ? renderStep1() : renderStep2()}
        </div>
    );
};

export default BudgetPage;