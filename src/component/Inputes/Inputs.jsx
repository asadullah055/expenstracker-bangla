import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
const Inputs = ({ value, onChange, label, placeholder, type }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const toggleShowPassword = () => { setShowPassword(!showPassword) }

    const toBanglaDigits = (val = "") =>
        String(val).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);

    const toEnglishDigits = (val = "") =>
        String(val).replace(/[০-৯]/g, (d) => String("০১২৩৪৫৬৭৮৯".indexOf(d)));

    const handleNumberChange = (e) => {
        const rawValue = toEnglishDigits(e.target.value);
        const sanitized = rawValue.replace(/[^0-9.]/g, "");
        onChange({
            ...e,
            target: {
                ...e.target,
                value: sanitized,
            },
        });
    };

    const displayValue = type === "number" ? toBanglaDigits(value ?? "") : (value ?? "");
    return (
        <div>
            <label className="text-[14px] text-slate-800 font-semibold">{label}</label>

            <div className="input-box flex items-center">
                <input
                    type={
                        type === "password"
                            ? showPassword
                                ? "text"
                                : "password"
                            : type === "number"
                                ? "text"
                                : type
                    }
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none"
                    inputMode={type === "number" ? "decimal" : undefined}
                    value={displayValue}
                    onChange={(e) => {
                        if (type === "number") {
                            handleNumberChange(e);
                            return;
                        }
                        onChange(e);
                    }}
                />

                {type === "password" && (
                    showPassword ? (
                        <FaRegEye
                            size={22}
                            className="text-primary cursor-pointer"
                            onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash
                            size={22}
                            className="text-slate-400 cursor-pointer"
                            onClick={() => toggleShowPassword()}
                        />
                    )
                )}
            </div>
        </div>

    );
};

export default Inputs;
