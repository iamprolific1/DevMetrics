"use client";

import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { SnackbarOrigin } from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref){
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
});

type SeverityType = "success" | "error" | "warning" | "info";

interface ToastContextType {
    showToast: (
        message: string,
        severity: SeverityType,
        position?: SnackbarOrigin,
    ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }

    return context;
};

interface ToastProviderProps {
    children: ReactNode;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<SeverityType>("info");
    const [position, setPosition] = useState<SnackbarOrigin>({
        vertical: "top",
        horizontal: "right",
    });

    const pathname = usePathname();

    const showToast = (
        msg: string,
        sev: SeverityType,
        pos: SnackbarOrigin = { vertical: "top", horizontal: "right" }
    ) => {
        setMessage(msg);
        setSeverity(sev);
        setPosition(pos);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=> {
        setOpen(false);
    }, [pathname]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={position}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}
