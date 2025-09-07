import React, { useState } from 'react';
import { CalendarIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

const SchedulerPage: React.FC = () => {
    const [formType, setFormType] = useState<'visit' | 'office'>('visit');
    const [submitted, setSubmitted] = useState(false);
    
    // Shared state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    // Visit-specific state
    const [requirement, setRequirement] = useState('');
    const [budget, setBudget] = useState('');
    const [message, setMessage] = useState('');

    // Office-specific state
    const [appointmentType, setAppointmentType] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [preferredTime, setPreferredTime] = useState('');
    const [notes, setNotes] = useState('');

    const timeSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];
    const visitRequirements = ["New Bungalow Construction", "Duplex/Triplex Construction", "Interior Design Consultation", "Land Search & Acquisition", "General Inquiry"];
    const officeAppointmentTypes = ["Project Discussion", "Design Consultation", "Payment Inquiry", "General Meeting"];


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the form submission (e.g., send data to an API)
        console.log({
            formType,
            ...(formType === 'visit' ? { fullName, phone, email, requirement, budget, message } : {}),
            ...(formType === 'office' ? { fullName, phone, email, appointmentType, preferredDate, preferredTime, notes } : {}),
        });
        setSubmitted(true);
    };

    if(submitted) {
        return (
             <div className="p-4 min-h-screen flex flex-col items-center justify-center text-center">
                 <CheckCircleIcon className="h-20 w-20 text-green-500 mb-4"/>
                <h2 className="text-2xl font-bold mb-2 text-golden-yellow">
                    {formType === 'visit' ? 'Inquiry Submitted!' : 'Appointment Booked!'}
                </h2>
                <p className="text-gray-300">Thank you! Our team will contact you shortly to confirm the details.</p>
            </div>
        )
    }

    const FormInput: React.FC<{ label: string; name: string; type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string; required?: boolean }> = ({ label, ...props }) => (
        <div>
            <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <input {...props} id={props.name} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3" />
        </div>
    );

    const FormSelect: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; children: React.ReactNode; required?: boolean }> = ({ label, ...props }) => (
         <div>
            <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <select {...props} id={props.name} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3 appearance-none">
                {props.children}
            </select>
        </div>
    );

     const FormTextarea: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder: string; rows?: number }> = ({ label, ...props }) => (
        <div>
            <label htmlFor={props.name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <textarea {...props} id={props.name} className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3"></textarea>
        </div>
    );


    return (
        <div className="p-4 min-h-screen">
            <h2 className="text-3xl font-bold mb-2 text-golden-yellow">Book an Appointment</h2>
            <p className="text-gray-300 mb-8">Choose a convenient time to meet us.</p>
            
            <div className="flex gap-4 mb-6">
                <button type="button" onClick={() => setFormType('visit')} className={`flex-1 p-3 rounded-lg text-sm transition-colors ${formType === 'visit' ? 'bg-golden-yellow text-charcoal font-semibold' : 'bg-zinc-700'}`}>Schedule Site Visit</button>
                <button type="button" onClick={() => setFormType('office')} className={`flex-1 p-3 rounded-lg text-sm transition-colors ${formType === 'office' ? 'bg-golden-yellow text-charcoal font-semibold' : 'bg-zinc-700'}`}>Book Office Appointment</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {formType === 'visit' ? (
                    <>
                        <h3 className="text-lg font-semibold text-golden-yellow border-b border-golden-yellow/20 pb-2">Site Visit Inquiry</h3>
                        <FormInput label="Full Name" name="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" required />
                        <FormInput label="Phone Number" name="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Mobile number" required />
                        <FormInput label="Email Address" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
                        <FormSelect label="Select your requirement" name="requirement" value={requirement} onChange={e => setRequirement(e.target.value)} required>
                            <option value="" disabled>-- Select Requirement --</option>
                            {visitRequirements.map(req => <option key={req} value={req}>{req}</option>)}
                        </FormSelect>
                        <FormInput label="Budget (Optional)" name="budget" type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="Budget in Lakhs (e.g., 50)" />
                        <FormTextarea label="Additional Message" name="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us more about your project requirements..." rows={3} />
                        <button type="submit" className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 mt-4">
                            Submit Inquiry
                        </button>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold text-golden-yellow border-b border-golden-yellow/20 pb-2">Office Appointment Booking</h3>
                        <FormInput label="Full Name" name="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" required />
                        <FormInput label="Phone Number" name="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Mobile number" required />
                        <FormInput label="Email Address" name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
                        <FormSelect label="Appointment Type" name="appointmentType" value={appointmentType} onChange={e => setAppointmentType(e.target.value)} required>
                             <option value="" disabled>-- Select appointment type --</option>
                             {officeAppointmentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </FormSelect>
                         <FormInput label="Preferred Date" name="preferredDate" type="date" value={preferredDate} onChange={e => setPreferredDate(e.target.value)} placeholder="dd-mm-yyyy" required />
                        <FormSelect label="Preferred Time" name="preferredTime" value={preferredTime} onChange={e => setPreferredTime(e.target.value)} required>
                             <option value="" disabled>-- Select time --</option>
                            {timeSlots.map(time => <option key={time} value={time}>{time}</option>)}
                        </FormSelect>
                        <FormTextarea label="Additional Notes" name="notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any specific requirements or questions..." rows={3} />
                        <button type="submit" className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 mt-4">
                            Book Appointment
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};

export default SchedulerPage;