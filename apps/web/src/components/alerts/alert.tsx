import React, { useEffect } from "react";
import {
  InformationCircleIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const iconClass = "stroke-current h-6 w-6 shrink-0";

type Severity =
  | "alert"
  | "alert-info"
  | "alert-success"
  | "alert-warning"
  | "alert-error";

export interface IAlert {
  title?: string;
  severity: Severity;
  message: string;
  timeout: number;
  handleDismiss?: () => void;
}

const AlertsWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed z-50 mx-auto sm:w-3/4 md:w-2/4 inset-x-0 bottom-10">
      {children}
    </div>
  );
};

const Alert = ({
  title,
  message = "",
  severity = "alert",
  timeout = 0,
  handleDismiss,
}: IAlert) => {
  useEffect(() => {
    if (timeout > 0 && handleDismiss) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, timeout * 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismissAlert = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (handleDismiss) {
      handleDismiss();
    }
  };

  const getIcon = () => {
    switch (severity) {
      case "alert-success":
        return <CheckCircleIcon className={iconClass} />;
      case "alert-warning":
        return <ExclamationTriangleIcon className={iconClass} />;
      case "alert-error":
        return <XCircleIcon className={iconClass} />;
      default:
        return <InformationCircleIcon className={iconClass} />;
    }
  };

  return (
    <div role="alert" className={`alert ${severity} shadow-md my-4`}>
      {getIcon()}
      {title ? (
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="text-xs">{message}</div>
        </div>
      ) : (
        <span>{message}</span>
      )}
      <div className="ml-auto">
        {handleDismiss && (
          <button
            className="text-sm font-bold"
            type="button"
            onClick={dismissAlert}
          >
            <XMarkIcon className={iconClass} />
          </button>
        )}
      </div>
    </div>
  );
};

export { Alert, AlertsWrapper };
