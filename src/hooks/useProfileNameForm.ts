import { useState, useEffect } from "react";
import type { User } from "@/types/user";

export function useProfileNameForm(initial: Partial<User> = {}) {
  const [values, setValues] = useState<Partial<User>>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setValues((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(initial)) return prev;
        return initial;
    });
    setErrors((prev) => {
        if (Object.keys(prev).length === 0) return prev;
        return {};
    });
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLInputElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const validate = (vals: Partial<User>) => {
    const errs: Record<string, string> = {};
    if (!vals.name) errs.name = "Le nom est requis";
    return errs;
  };

  const handleSubmit = (cb: (data: Partial<User>) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length === 0) cb(values);
  };

  const resetForm = () => {
    setValues(initial);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  };
}