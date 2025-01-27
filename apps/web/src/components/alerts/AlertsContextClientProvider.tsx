import { createContext, useContext, useRef, useState } from "react";
import { ulid } from "ulid";
import type { IAlert } from "./alert";
import { Alert, AlertsWrapper } from "./alert";

interface IInternalAlert extends IAlert {
  id: string;
}

interface IAlertsContext {
  alerts: IInternalAlert[];
  addAlert: (alert: IAlert) => string;
  dismissAlert: (id: string) => void;
}

const AlertsContext = createContext<IAlertsContext>({
  addAlert: () => "",
  alerts: [],
  dismissAlert: () => {},
});

const AlertsProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<IInternalAlert[]>([]);

  const addAlert = (alert: IAlert) => {
    const id = ulid();
    setAlerts((prev) => [{ ...alert, id }, ...prev]);
    return id;
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertsContext.Provider value={{ addAlert, alerts, dismissAlert }}>
      {children}
      <AlertsWrapper>
        {alerts.map((alert) => (
          <Alert
            {...alert}
            key={alert.id}
            handleDismiss={() => {
              dismissAlert(alert.id);
            }}
          />
        ))}
      </AlertsWrapper>
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => {
  const [alertIds, setAlertIds] = useState<string[]>([]);
  const alertIdsRef = useRef(alertIds);
  const { addAlert, dismissAlert } = useContext(AlertsContext);

  const addAlertWithId = (alert: IAlert) => {
    const id = addAlert(alert);
    alertIdsRef.current.push(id);
    setAlertIds(alertIdsRef.current);
  };

  const clearAlerts = () => {
    alertIdsRef.current.forEach((id) => dismissAlert(id));
    alertIdsRef.current = [];
    setAlertIds([]);
  };
  return { addAlert: addAlertWithId, clearAlerts };
};

export default AlertsProvider;
