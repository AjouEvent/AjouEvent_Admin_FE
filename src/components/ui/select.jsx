import * as React from "react";

export const Select = ({ value, onChange, children }) => {
    return (
        <div className="relative w-full">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
                {children}
            </select>
        </div>
    );
};

export const SelectItem = ({ value, children }) => (
    <option value={value}>{children}</option>
);
