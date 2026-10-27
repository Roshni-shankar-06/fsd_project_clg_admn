import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  FileCheck2, 
  Award, 
  XCircle, 
  Send 
} from 'lucide-react';

export default function StatusStepper({ currentStatus, statusHistory = [] }) {
  // Steps: 1. Submitted, 2. Under Review, 3. Document Verified, 4. Approved / Rejected
  const isRejected = currentStatus === 'Rejected';

  const getStepIndex = (status) => {
    switch (status) {
      case 'Submitted': return 1;
      case 'Under Review': return 2;
      case 'Document Verified': return 3;
      case 'Approved': return 4;
      case 'Rejected': return 4;
      default: return 1;
    }
  };

  const activeIndex = getStepIndex(currentStatus);

  const getStepDate = (statusName) => {
    const historyItem = statusHistory.find(h => h.status.toLowerCase() === statusName.toLowerCase());
    return historyItem ? historyItem.date : null;
  };

  const steps = [
    {
      index: 1,
      name: "Submitted",
      title: "Application Submitted",
      icon: Send,
      date: getStepDate("Submitted") || "Step 1"
    },
    {
      index: 2,
      name: "Under Review",
      title: "Under Review",
      icon: Clock,
      date: getStepDate("Under Review") || (activeIndex >= 2 ? "Screening Active" : "Pending")
    },
    {
      index: 3,
      name: "Document Verified",
      title: "Document Verified",
      icon: FileCheck2,
      date: getStepDate("Document Verified") || (activeIndex >= 3 ? "Documents Cleared" : "Pending")
    },
    {
      index: 4,
      name: isRejected ? "Rejected" : "Approved",
      title: isRejected ? "Application Rejected" : "Admission Approved",
      icon: isRejected ? XCircle : Award,
      date: getStepDate(isRejected ? "Rejected" : "Approved") || (activeIndex >= 4 ? (isRejected ? "Decision Final" : "Offer Granted") : "Decision Pending")
    }
  ];

  const progressPercent = activeIndex === 1 ? 0 : activeIndex === 2 ? 33 : activeIndex === 3 ? 66 : 100;

  return (
    <div style={{ width: '100%', padding: '0.5rem 0' }}>
      <div className="admission-stepper">
        {/* Track Line */}
        <div className="stepper-track"></div>
        <div 
          className="stepper-progress" 
          style={{ 
            width: `calc(${progressPercent}% * 0.85)`,
            background: isRejected ? 'linear-gradient(90deg, var(--primary-600), var(--danger))' : undefined
          }}
        ></div>

        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = activeIndex > step.index || (activeIndex === 4 && step.index === 4 && !isRejected);
          const isActive = activeIndex === step.index;
          const isCurrentRejected = isActive && isRejected && step.index === 4;

          let nodeClass = "step-node";
          if (isCurrentRejected) {
            nodeClass += " rejected";
          } else if (isCompleted) {
            nodeClass += " completed";
          } else if (isActive) {
            nodeClass += " active";
          }

          return (
            <div key={step.index} className={nodeClass}>
              <div className="step-icon-circle">
                {isCompleted ? <CheckCircle2 size={22} /> : <Icon size={20} />}
              </div>
              <div className="step-title">{step.title}</div>
              <div className="step-date">{step.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
